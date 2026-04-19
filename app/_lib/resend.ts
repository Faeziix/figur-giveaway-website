import type { Prize } from "@/app/_types";

export async function sendPrizeEmail(
  email: string,
  firstName: string,
  prize: Prize,
  code: string | null
) {
  console.log(`[email stub] To: ${email} | ${firstName} | ${prize.headline} | code: ${code}`);
}

function discountEmailHtml(firstName: string, prize: Prize, code: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /><title>Your Figur Prize</title></head>
    <body style="margin:0;padding:0;background:#FFFBF4;font-family:Georgia,serif;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td align="center" style="padding:48px 16px;">
          <table width="520" cellpadding="0" cellspacing="0" style="background:#660033;padding:40px 48px;">
            <tr><td align="center" style="padding-bottom:32px;">
              <p style="margin:0;color:#C5A258;font-size:11px;letter-spacing:4px;text-transform:uppercase;font-family:Georgia,serif;">A Gift From Figur</p>
              <h1 style="margin:12px 0 0;color:#FFFBF4;font-size:32px;font-weight:400;">FIGŪR</h1>
            </td></tr>
            <tr><td style="border-top:1px solid rgba(197,162,88,0.3);padding-top:32px;">
              <p style="margin:0 0 16px;color:#C5A258;font-size:12px;letter-spacing:3px;text-transform:uppercase;">Dear ${firstName},</p>
              <p style="margin:0 0 24px;color:#FFFBF4;font-size:16px;line-height:1.6;">Your moon has been opened. Here is your prize from Figur:</p>
              <h2 style="margin:0 0 8px;color:#FFFBF4;font-size:22px;font-weight:400;">${prize.headline}</h2>
              <p style="margin:0 0 32px;color:rgba(255,251,244,0.6);font-size:14px;">${prize.description}</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(197,162,88,0.4);">
                <tr><td align="center" style="padding:24px;">
                  <p style="margin:0 0 8px;color:#C5A258;font-size:10px;letter-spacing:3px;text-transform:uppercase;">Discount Code</p>
                  <p style="margin:0;color:#FFFBF4;font-size:28px;font-weight:400;letter-spacing:6px;">${code}</p>
                </td></tr>
              </table>
              <p style="margin:24px 0 0;color:rgba(255,251,244,0.4);font-size:12px;">Use this code at checkout on figur.ae. Single use only.</p>
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

function pointsEmailHtml(firstName: string, prize: Prize): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /><title>Your Figur Points</title></head>
    <body style="margin:0;padding:0;background:#FFFBF4;font-family:Georgia,serif;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td align="center" style="padding:48px 16px;">
          <table width="520" cellpadding="0" cellspacing="0" style="background:#660033;padding:40px 48px;">
            <tr><td align="center" style="padding-bottom:32px;">
              <p style="margin:0;color:#C5A258;font-size:11px;letter-spacing:4px;text-transform:uppercase;font-family:Georgia,serif;">A Gift From Figur</p>
              <h1 style="margin:12px 0 0;color:#FFFBF4;font-size:32px;font-weight:400;">FIGŪR</h1>
            </td></tr>
            <tr><td style="border-top:1px solid rgba(197,162,88,0.3);padding-top:32px;">
              <p style="margin:0 0 16px;color:#C5A258;font-size:12px;letter-spacing:3px;text-transform:uppercase;">Dear ${firstName},</p>
              <p style="margin:0 0 24px;color:#FFFBF4;font-size:16px;line-height:1.6;">Congratulations — you hold ${prize.pointsAwarded} Figur Loyalty Points.</p>
              <h2 style="margin:0 0 8px;color:#C5A258;font-size:48px;font-weight:400;text-align:center;">${prize.pointsAwarded}</h2>
              <p style="margin:0 0 24px;color:rgba(255,251,244,0.6);font-size:14px;text-align:center;">Figur Loyalty Points</p>
              <p style="margin:0;color:rgba(255,251,244,0.5);font-size:12px;line-height:1.7;">These points are banked to your account and will be redeemable when the Figur loyalty program launches. You will receive a notification when they're ready to use.</p>
              <p style="margin:24px 0 0;color:rgba(255,251,244,0.3);font-size:11px;text-align:center;font-style:italic;">Ancient Fruit. Modern Indulgence.</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}
