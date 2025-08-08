import nodemailer from "nodemailer";
import type { SendEmailParams, SendEmailResponse } from "./email";

export async function sendEmail({
	to,
	subject,
	html,
}: SendEmailParams): Promise<SendEmailResponse> {
	const SMTP_PASS = process.env.SMTP_PASS;
	const SMTP_USER = process.env.SMTP_USER;

	if (!SMTP_USER || !SMTP_PASS) {
		throw new Error(
			"SMTP credentials are missing. Please set SMTP_USER and SMTP_PASS.",
		);
	}

	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false,
			auth: {
				user: SMTP_USER,
				pass: SMTP_PASS,
			},
		});

		const info = await transporter.sendMail({
			from: `"Retitle IQ" <${SMTP_USER}>`,
			to,
			subject,
			html,
		});

		return {
			messageId: info.messageId,
			accepted: info.accepted.map(String),
			rejected: info.rejected.map(String),
		};
	} catch (error) {
		throw new Error("Failed to send email. Please try again later.");
	}
}
