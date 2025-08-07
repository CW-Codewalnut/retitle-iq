import type { BrevoSendEmailResponse, SendEmailParams } from "./email";

export async function sendEmail({
	to,
	subject,
	html,
}: SendEmailParams): Promise<BrevoSendEmailResponse> {
	const BREVO_API_KEY = process.env.BREVO_API_KEY;
	const SENDER_EMAIL_ID = process.env.SENDER_EMAIL_ID;

	if (!BREVO_API_KEY || !SENDER_EMAIL_ID) {
		throw new Error("Required configuration missing.");
	}

	try {
		const response = await fetch("https://api.brevo.com/v3/smtp/email", {
			method: "POST",
			headers: {
				"api-key": BREVO_API_KEY,
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				sender: {
					name: "Retitle IQ",
					email: SENDER_EMAIL_ID,
				},
				to: [
					{
						email: to,
						name: to.split("@")[0],
					},
				],
				subject,
				htmlContent: html,
			}),
		});

		if (!response.ok) {
			throw new Error("Failed to send email. Please try again.");
		}

		const data: BrevoSendEmailResponse = await response.json();
		return data;
	} catch (error) {
		throw new Error("Failed to send email. Please try again later.");
	}
}
