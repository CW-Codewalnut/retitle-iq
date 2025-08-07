export interface SendEmailParams {
	to: string;
	subject: string;
	html: string;
}

export interface BrevoSendEmailResponse {
	messageId: string;
}

export interface GenerateEmailBodyParams {
	titles: string[];
	clickableLink: string;
}
