import type { GenerateEmailBodyParams } from "./email";

export function generateEmailBody({
	titles,
	clickableLink,
}: GenerateEmailBodyParams): string {
	return `
    <div style="max-width:600px;font-family:Arial, sans-serif;color:#333;line-height:1.5;">
      <h2 style="font-size:22px;font-weight:600;color:#1d72b8;margin:0;">
        Your Optimized Title List from RetitleIQ
      </h2>
      <p style="margin-top:16px;">
        Thanks for using <strong>RetitleIQ</strong>! Based on your recent input, we’ve created a set of 
        <strong>optimized title suggestions</strong> designed to improve your search rankings and engagement.
      </p>

      <h3 style="font-size:18px;margin-top:20px;margin-bottom:8px;color:#444;">
        Optimized Title Suggestions
      </h3>
      <table style="margin-top:8px;width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background-color:#f1f1f1;">
            <th style="border:1px solid #ccc;padding:8px;text-align:left;width:40px;">#</th>
            <th style="border:1px solid #ccc;padding:8px;text-align:left;">Suggested Title</th>
          </tr>
        </thead>
        <tbody>
          ${titles
						.map(
							(title, index) => `
              <tr style="background-color:${index % 2 === 0 ? "#fff" : "#f9f9f9"};">
                <td style="border:1px solid #ccc;padding:8px;">${index + 1}</td>
                <td style="border:1px solid #ccc;padding:8px;">${title}</td>
              </tr>
            `,
						)
						.join("")}
        </tbody>
      </table>
        <p style="margin-top:24px;">
          Want to see the <strong>full analysis</strong> and understand how these titles were generated? 
          Click the link below to view the complete breakdown and your recent RetitleIQ session.
        </p>

        <p style="margin-top:12px;">
          <a href="${clickableLink}" style="font-size:16px;color:#1d72b8;text-decoration:underline;">
            View Full Analysis
          </a>
        </p>

        <p style="margin-top:24px;font-size:14px;color:#333;">
          If you have any questions or feedback, simply reply to this email we’d love to hear from you.
        </p>

        <p style="margin-top:24px;font-size:14px;color:#333;">
          Best regards,<br>
          <strong>LeadWalnut Team</strong>
        </p>
    </div>
  `;
}
