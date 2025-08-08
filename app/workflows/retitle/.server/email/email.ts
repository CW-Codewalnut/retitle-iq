export interface GenerateEmailBodyParams {
	titles: string[];
	clickableLink: string;
}

export interface SendEmailParams {
	to: string;
	subject: string;
	html: string;
}

export interface SendEmailResponse {
	messageId: string;
	accepted: string[];
	rejected: string[];
}
