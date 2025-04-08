import { useCallback, useEffect, useMemo, useRef } from "react";
import useSWRInfinite from "swr/infinite";

import type { InfiniteAPIResponse } from "@/utils/types";

async function defaultFetcher<T>(url: string) {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json() as Promise<InfiniteAPIResponse<T>>;
}

export function useInfiniteList<DataType, ErrorType = unknown>(apiURL: string) {
	const loadMoreRef = useRef<HTMLLIElement>(null);
	const observerRef = useRef<IntersectionObserver>(null);

	type APIResponse = InfiniteAPIResponse<DataType>;

	const getKey = useCallback(
		(pageIndex: number, previousPageData: APIResponse | null) => {
			if (pageIndex === 0) {
				return apiURL;
			}

			if (!previousPageData?.nextCursor) {
				return null;
			}

			return `${apiURL}?cursor=${previousPageData.nextCursor}`;
		},
		[apiURL],
	);

	const { data, error, setSize, isLoading, isValidating } = useSWRInfinite<
		APIResponse,
		ErrorType
	>(getKey, defaultFetcher);

	useEffect(() => {
		if (!loadMoreRef.current) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (
					entries.at(0)?.isIntersecting &&
					!isLoading &&
					!isValidating &&
					data?.at(-1)?.nextCursor
				) {
					void setSize((s) => s + 1);
				}
			},
			{ threshold: 0.5 },
		);

		observer.observe(loadMoreRef.current);
		observerRef.current = observer;

		return () => {
			observerRef.current?.disconnect();
		};
	}, [data, isLoading, isValidating, setSize]);

	const flattenedData = useMemo(() => {
		return data ? data.flatMap((page) => page.items) : [];
	}, [data]);

	const hasReachedEnd = useMemo(() => {
		return data && data?.at(-1)?.nextCursor === null;
	}, [data]);

	return {
		isLoading,
		data: flattenedData,
		error,
		isValidating,

		hasReachedEnd,
		loadMoreRef,
	};
}
