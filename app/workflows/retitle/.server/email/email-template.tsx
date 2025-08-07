import type { GenerateEmailBodyParams } from "./email";

export function generateEmailBody({
	titles,
	clickableLink,
}: GenerateEmailBodyParams): string {
	return `
    <div style="max-width:600px;font-family:sans-serif;color:#333;">
      <h2 style="font-size:24px;font-weight:600;color:#1d72b8;">
        Thanks for Using Retitle IQ!
      </h2>
      <p style="margin-top:16px;">
        We’ve generated some title suggestions based on your recent input. Here’s what we recommend:
      </p>
      <table style="margin-top:20px;width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background-color:#f1f1f1;">
            <th style="border:1px solid #ccc;padding:8px;text-align:left;">#</th>
            <th style="border:1px solid #ccc;padding:8px;text-align:left;">Suggested Titles</th>
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
        To review your title suggestions or see your previous generation history, use the link below:
      </p>
      <p style="text-align:center;margin-top:12px;">
        <a href="${clickableLink}" style="font-size:18px;font-weight:600;color:#1d72b8;">
          ${clickableLink}
        </a>
      </p>
      <p style="margin-top:32px;text-align:center;font-size:12px;color:#888;">
        If you have any questions or feedback, feel free to reply to this email. We're happy to help!
      </p>
    </div>
  `;
}
