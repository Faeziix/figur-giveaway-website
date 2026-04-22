import { createAdminApiClient } from "@shopify/admin-api-client";
import axios from "axios";

const HERITAGE_BOX_PRODUCT_GIDS = [
  "gid://shopify/Product/9120587645185",
];

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

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }

  const myshopifyDomain = process.env.SHOPIFY_MYSHOPIFY_DOMAIN ?? "figur-7317.myshopify.com";

  const { data } = await axios.post<{ access_token: string; expires_in?: number }>(
    `https://${myshopifyDomain}/admin/oauth/access_token`,
    {
      grant_type: "client_credentials",
      client_id: process.env.SHOPIFY_CLIENT_ID!,
      client_secret: process.env.SHOPIFY_CLIENT_SECRET!,
    }
  );

  const ttl = (data.expires_in ?? 86400) * 1000;
  cachedToken = { value: data.access_token, expiresAt: Date.now() + ttl - 60_000 };

  return data.access_token;
}

export async function createDiscountCode(
  discountPercent: number,
  prizeId: number,
  productHandle?: string
): Promise<string> {
  const accessToken = await getAccessToken();

  const client = createAdminApiClient({
    storeDomain: process.env.SHOPIFY_MYSHOPIFY_DOMAIN ?? "figur-7317.myshopify.com",
    apiVersion: "2025-07",
    accessToken,
  });

  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const code = `FIGUR-${discountPercent}OFF-${random}`;

  const now = new Date().toISOString();
  const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString();

  const isHeritageBox = productHandle === "small-heritage-gift-box";
  const items = isHeritageBox
    ? { products: { productsToAdd: HERITAGE_BOX_PRODUCT_GIDS } }
    : { all: true };

  const { data, errors } = await client.request(CREATE_DISCOUNT_MUTATION, {
    variables: {
      basicCodeDiscount: {
        title: `Giveaway ${discountPercent}% Off — ${code}`,
        code,
        startsAt: now,
        endsAt: expiry,
        usageLimit: 1,
        customerSelection: { all: true },
        customerGets: {
          value: { percentage: discountPercent / 100 },
          items,
        },
        appliesOncePerCustomer: true,
      },
    },
  });

  if (errors || !data) {
    throw new Error(`Shopify discount creation failed: ${JSON.stringify(errors ?? data)}`);
  }

  const userErrors = data.discountCodeBasicCreate?.userErrors ?? [];
  if (userErrors.length > 0) {
    throw new Error(`Shopify user errors: ${JSON.stringify(userErrors)}`);
  }

  const returnedCode =
    data.discountCodeBasicCreate?.codeDiscountNode?.codeDiscount?.codes?.edges?.[0]?.node?.code;

  return returnedCode ?? code;
}
