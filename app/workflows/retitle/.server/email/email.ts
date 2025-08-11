export type GenerateEmailBodyParams = {
	titles: string[];
	generationLink: string;
};

export type SendEmailParams = {
	to: string;
	subject: string;
	html: string;
};

export type SendEmailResponse = {
	messageId: string;
	accepted: string[];
	rejected: string[];
};
