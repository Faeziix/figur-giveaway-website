import Airtable from "airtable";
import { createAdminApiClient } from "@shopify/admin-api-client";
import axios from "axios";

const TABLE = "tblYsG727GXqlo7QW";

const PRIZES = [
  { id: 1, headline: "20% Off Your Order", discountPercent: 20 },
  { id: 2, headline: "20% Off Your Order", discountPercent: 20 },
  { id: 3, headline: "Free Small Heritage Box", discountPercent: 100, shopifyProductHandle: "small-heritage-box" },
  { id: 4, headline: "30% Off Your Order", discountPercent: 30 },
  { id: 5, headline: "30% Off Your Order", discountPercent: 30 },
  { id: 6, headline: "40% Off Your Order", discountPercent: 40 },
];

const HERITAGE_BOX_PRODUCT_GIDS = ["gid://shopify/Product/9120587645185"];

const INVISIBLE_CHARS = /[​-‏‪-‮﻿­]/g;

function cleanStr(s: string): string {
  return s.replace(INVISIBLE_CHARS, "").trim();
}

function normalizePhone(phone: string): string {
  const stripped = cleanStr(phone).replace(/[^\d+]/g, "");
  return stripped.replace(/^(\+\d{1,3})0(\d{7,})$/, "$1$2");
}

async function getAccessToken(): Promise<string> {
  const myshopifyDomain = process.env.SHOPIFY_MYSHOPIFY_DOMAIN ?? "figur-7317.myshopify.com";
  const { data } = await axios.post<{ access_token: string }>(
    `https://${myshopifyDomain}/admin/oauth/access_token`,
    {
      grant_type: "client_credentials",
      client_id: process.env.SHOPIFY_CLIENT_ID!,
      client_secret: process.env.SHOPIFY_CLIENT_SECRET!,
    }
  );
  return data.access_token;
}

const CREATE_DISCOUNT_MUTATION = `
  mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
    discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
      codeDiscountNode {
        codeDiscount {
          ... on DiscountCodeBasic {
            codes(first: 1) {
              edges {
                node {
                  code
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

async function run() {
  const phone = process.argv[2];
  if (!phone) {
    console.error("Usage: bun scripts/generate-code-for-entry.ts <phone>");
    process.exit(1);
  }

  const normalized = phone.replace(/\s+/g, "");

  const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(process.env.AIRTABLE_BASE_ID!);

  const digits = normalized.replace(/\D/g, "");

  const records = await base(TABLE)
    .select({
      filterByFormula: `FIND("${digits.slice(-9)}", SUBSTITUTE({Phone}, " ", ""))`,
      maxRecords: 1,
    })
    .firstPage();

  if (records.length === 0) {
    console.error(`No Airtable record found for phone: ${phone}`);
    process.exit(1);
  }

  const record = records[0];
  console.log(`Found record: ${record.id} — ${record.get("Name")} (status: ${record.get("Status")})`);

  const prize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
  console.log(`Assigning prize: [${prize.id}] ${prize.headline}`);

  const accessToken = await getAccessToken();
  const client = createAdminApiClient({
    storeDomain: process.env.SHOPIFY_MYSHOPIFY_DOMAIN ?? "figur-7317.myshopify.com",
    apiVersion: "2025-07",
    accessToken,
  });

  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const code = `FIGUR-${prize.discountPercent}OFF-${random}`;

  const now = new Date().toISOString();
  const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString();

  const isHeritageBox = prize.shopifyProductHandle === "small-heritage-box";
  const items = isHeritageBox
    ? { products: { productsToAdd: HERITAGE_BOX_PRODUCT_GIDS } }
    : { all: true };

  const { data, errors } = await client.request(CREATE_DISCOUNT_MUTATION, {
    variables: {
      basicCodeDiscount: {
        title: `Giveaway ${prize.discountPercent}% Off — ${code} | ${normalizePhone(phone)}`,
        code,
        startsAt: now,
        endsAt: expiry,
        usageLimit: 1,
        customerSelection: { all: true },
        customerGets: {
          value: { percentage: prize.discountPercent / 100 },
          items,
        },
        appliesOncePerCustomer: true,
      },
    },
  });

  if (errors || !data) {
    console.error("Shopify error:", JSON.stringify(errors ?? data, null, 2));
    process.exit(1);
  }

  const userErrors = (data as any).discountCodeBasicCreate?.userErrors ?? [];
  if (userErrors.length > 0) {
    console.error("Shopify user errors:", JSON.stringify(userErrors, null, 2));
    process.exit(1);
  }

  const returnedCode =
    (data as any).discountCodeBasicCreate?.codeDiscountNode?.codeDiscount?.codes?.edges?.[0]?.node?.code ?? code;

  console.log(`Discount code created: ${returnedCode}`);

  await base(TABLE).update(record.id, {
    "Prize": prize.headline,
    "Prize Type": "Discount Code",
    "Discount Code": returnedCode,
    "Status": "claimed",
  });

  console.log(`Airtable updated. Done!`);
  console.log(`\nPhone: ${phone}\nPrize: ${prize.headline}\nCode:  ${returnedCode}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
