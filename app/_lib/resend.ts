import { Resend } from "resend";
import type { Prize } from "@/app/_types";

const resend = new Resend(process.env.RESEND_API_KEY);

const LOGO_URL = "https://cdn.shopify.com/s/files/1/0803/4150/0161/files/figur-logo-cream.svg?v=1776682050";

export async function sendPrizeEmail(
  email: string,
  firstName: string,
  prize: Prize,
  code: string | null
) {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN ?? "figur.ae";
  const cartUrl = prize.shopifyProductHandle
    ? `https://${storeDomain}/products/${prize.shopifyProductHandle}?discount=${code}`
    : `https://${storeDomain}?discount=${code}`;

  await resend.emails.send({
    from: "Figùr <noreply@updates.figur.ae>",
    to: email,
    subject: `Your Figur Prize: ${prize.headline}`,
    html: discountEmailHtml(firstName, prize, code ?? "", cartUrl),
  });
}

const LOGO_HEADER = `
  <tr><td align="center" style="padding-bottom:32px;">
    <img src="${LOGO_URL}" alt="Figùr" width="200" style="display:block;max-width:200px;height:auto;" />
  </td></tr>
`;

function discountEmailHtml(firstName: string, prize: Prize, code: string, cartUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /><title>Your Figur Prize</title></head>
    <body style="margin:0;padding:0;background:#FFFBF4;font-family:Georgia,serif;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td align="center" style="padding:48px 16px;">
          <table width="520" cellpadding="0" cellspacing="0" style="background:#660033;padding:40px 48px;">
            ${LOGO_HEADER}
            <tr><td style="border-top:1px solid rgba(197,162,88,0.3);padding-top:32px;">
              <p style="margin:0 0 16px;color:#C5A258;font-size:12px;letter-spacing:3px;text-transform:uppercase;">Dear ${firstName},</p>
              <p style="margin:0 0 24px;color:#FFFBF4;font-size:16px;line-height:1.6;">Your treasure has been opened. Here is your prize from Figùr:</p>
              <h2 style="margin:0 0 8px;color:#FFFBF4;font-size:22px;font-weight:400;">${prize.headline}</h2>
              <p style="margin:0 0 32px;color:rgba(255,251,244,0.6);font-size:14px;">${prize.description}</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(197,162,88,0.4);">
                <tr><td align="center" style="padding:24px;">
                  <p style="margin:0 0 8px;color:#C5A258;font-size:10px;letter-spacing:3px;text-transform:uppercase;">Discount Code</p>
                  <p style="margin:0;color:#FFFBF4;font-size:28px;font-weight:400;letter-spacing:6px;">${code}</p>
                </td></tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                <tr><td align="center">
                  <a href="${cartUrl}" style="display:inline-block;background:#C5A258;color:#3B0020;font-family:Georgia,serif;font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:14px 32px;">
                    ${prize.shopifyProductHandle ? "Claim Your Heritage Box →" : "Shop Now →"}
                  </a>
                </td></tr>
              </table>
              <p style="margin:16px 0 0;color:rgba(255,251,244,0.4);font-size:12px;text-align:center;">Code applied automatically. Single use only.</p>
            </td></tr>
            <tr><td style="border-top:1px solid rgba(197,162,88,0.2);padding-top:32px;margin-top:32px;">
              <p style="margin:0;color:rgba(255,251,244,0.3);font-size:11px;text-align:center;font-style:italic;">Ancient Fruit. Modern Indulgence.</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}
