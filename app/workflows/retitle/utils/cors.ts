const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",") ?? [];

export function applyCORSHeaders(response: Response, origin: string | null) {
	if (origin && ALLOWED_ORIGINS.includes(origin)) {
		response.headers.set("Access-Control-Allow-Origin", origin);
		response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
		response.headers.set(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization",
		);
		response.headers.set("Access-Control-Allow-Credentials", "true");
	} else {
		response.headers.set("Access-Control-Allow-Origin", "null");
	}
	return response;
}

export function handlePreflight(request: Request) {
	if (request.method === "OPTIONS") {
		const origin = request.headers.get("Origin");
		const preflightResponse = new Response(null, { status: 204 });
		return applyCORSHeaders(preflightResponse, origin);
	}
	return null;
}
