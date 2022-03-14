import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { catchError, switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';

import type { APISearchResultsFailure, Movie } from '../types/api';

export const useFetchCacheMovieDetails = (url: string) => {
	const storageName = 'fetchCacheMovieDetails';

	const localStorageCache = localStorage.getItem(storageName);
	const inMemoryCache = localStorageCache
		? new Map<string, Movie>(JSON.parse(localStorageCache))
		: new Map<string, Movie>();

	const cacheKey = `${useLocation().pathname}`;
	const cached = inMemoryCache.get(cacheKey);
	const [movieDetails, setData] = React.useState<
		Movie | APISearchResultsFailure | null
	>(() => cached ?? null); // initialize from the cache
	const [loading, setLoading] = React.useState(() => (cached ? false : true)); // avoid the fetch if cached

	React.useEffect(() => {
		const controller = new AbortController();
		if (loading) {
			fromFetch(url, { signal: controller.signal })
				.pipe(
					switchMap(async (res) => await res.json()),
					catchError(async (e) => {
						if (process.env.NODE_ENV !== 'production') console.error(e);
						return {
							Error: 'An application error occurred while fetching data.',
						};
					}),
				)
				.subscribe({
					next: (data: APISearchResultsFailure | Movie) => {
						if (controller.signal.aborted) return;
						if (data.Response === 'True') {
							// cache only when response contains data
							inMemoryCache.set(cacheKey, data);
							localStorage.setItem(
								storageName,
								JSON.stringify(Array.from(inMemoryCache.entries())),
							);
						}
						setData(data);
					},
				});
		}
		return () => controller.abort();
	}, [cacheKey, loading]);

	React.useEffect(() => {
		setLoading(true);
	}, [url]);

	return movieDetails;
};
