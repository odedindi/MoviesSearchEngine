import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { catchError, switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';

import type {
	APISearchResultsFailure,
	APIMoviesSearchResultsSuccess,
	MoviesSearch,
} from '../types/api';

export const useFetchCacheSearchMovies = (url: string) => {
	const storageName = 'fetchCacheSearchMovies';

	const localStorageCache = localStorage.getItem(storageName);
	const inMemoryCache = localStorageCache
		? new Map<string, MoviesSearch>(JSON.parse(localStorageCache))
		: new Map<string, MoviesSearch>();

	const cacheKey = `${useLocation().pathname}`;
	const cached = inMemoryCache.get(cacheKey);
	const [moviesSearch, setData] = React.useState<
		MoviesSearch | APISearchResultsFailure | null
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
							Error: 'An application error occured while fetching data.',
						};
					}),
				)
				.subscribe({
					next: (
						data: APISearchResultsFailure | APIMoviesSearchResultsSuccess,
					) => {
						if (controller.signal.aborted) return;
						if (data.Response === 'True') {
							// cache only when response contains data
							const { Search, totalResults } = data;
							const moviesSearch: MoviesSearch = {
								data: Search,
								totalPages: Math.ceil(Number(totalResults) / 10),
								noResults: !!Search.length,
							};
							inMemoryCache.set(cacheKey, moviesSearch);
							localStorage.setItem(
								storageName,
								JSON.stringify(Array.from(inMemoryCache.entries())),
							);
							return setData(moviesSearch);
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

	return moviesSearch;
};
