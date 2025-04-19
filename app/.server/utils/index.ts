export function getInfiniteAPIParams(
	searchParams: URLSearchParams,
	defaultPageSize = 20,
) {
	const cursor = searchParams.get("cursor") ?? undefined;
	const limit = Number(searchParams.get("limit") ?? defaultPageSize);

	const prismaParams = {
		take: limit,
		skip: cursor ? 1 : 0,
		cursor: cursor ? { id: cursor } : undefined,
	} as const;

	return {
		limit,
		cursor,
		prismaParams,
	};
}
