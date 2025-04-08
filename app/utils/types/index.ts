export type InfiniteAPIResponse<T = unknown> = {
	items: T[];
	status: "success";
	nextCursor: string | null;
};

export type UserUpload = {
	id: string;
	url: string;
	name: string;
	contentType: string;
};
