/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import * as React from 'react';

import { useSearchParams } from 'react-router-dom';

import { BehaviorSubject, Subject } from 'rxjs';
import {
	catchError,
	combineLatestWith,
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
	switchMap,
	takeUntil,
	tap,
} from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';

import { baseUrl } from '../utils/constants';
import type {
	APISearchResultsFailure,
	APIMoviesSearchResultsSuccess,
	Movie,
	MovieFromMoviesSearchResults,
	MoviesSearch,
} from '../types/api';

import SearchField from '../Components/SearchField';
import SearchResults from '../Components/SearchResults';
import NoResults from '../Components/NoResults';

import useDestroySubscription from '../hooks/useDestroySubscription';
import PaginationButton from '../Components/Pagination/Button';
import { useFetchCacheMovieDetails } from '../hooks/useFetchCacheMovieDetails';
import { useDebouncedValue } from '../hooks/useDebounceValue';
import { useFetchCacheSearchMovies } from '../hooks/useFetchCacheSearchMovies';
import ErrorMessage from '../Components/ErrorMessage';

const HomePage: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const searchMovie = (str: string) => setSearchParams({ search: str });

	const destroySubscription$ = useDestroySubscription();

	const [search$] = React.useState(() => new Subject<string>());
	const [page$] = React.useState(() => new BehaviorSubject<number>(1));

	const [moviesSearch, setData] = React.useState<
		Partial<MoviesSearch & APISearchResultsFailure> | undefined
	>();

	const [pageNumber, setPageNumber] = React.useState(() => 1);
	const prevPage = () => {
		if (moviesSearch?.totalPages)
			pageNumber > 1
				? setPageNumber((prev) => prev - 1)
				: setPageNumber(moviesSearch.totalPages);
	};
	const nextPage = () => {
		// if (moviesSearch?.totalPages) {
		// if (pageNumber < moviesSearch.totalPages)
		setPageNumber((prev) => {
			page$.next(prev + 1);
			return prev + 1;
		});
		// else {
		// 	setPageNumber(1);
		// 	page$.next(1);
		// }
		// }
	};

	page$.subscribe((v) => console.log(v));

	React.useEffect(() => {
		console.log(pageNumber);
	}, [pageNumber]);
	React.useEffect(() => {
		search$
			.pipe(
				map((query) => {
					if (pageNumber !== 1) {
						console.log(pageNumber !== 1);
						setPageNumber(1);
						page$.next(1);
					}
					return query.trim().split(' ').join('+');
				}),
				distinctUntilChanged(),
				filter((v) => v.length > 2),
				combineLatestWith(page$),
				debounceTime(750),
				tap((s) => console.log('tap1', s)),
				map(([query, page]) => `${baseUrl}&type=movie&s=${query}&page=${page}`),
				tap((s) => console.log('tap2', s)),
				takeUntil(destroySubscription$),
			)
			.subscribe((url) => {
				console.log(url);
				fromFetch(url)
					.pipe(
						switchMap(async (res) => await res.json()),
						catchError(async (e) => {
							if (process.env.NODE_ENV !== 'production') console.error(e);
							return { Error: 'Error occured while fetching data.' };
						}),
					)
					.subscribe({
						next: (
							data: APISearchResultsFailure | APIMoviesSearchResultsSuccess,
						) => {
							if (data.Response === 'True') {
								const { Search, totalResults } = data;
								const moviesSearch: MoviesSearch = {
									data: Search,
									totalPages: Math.ceil(Number(totalResults) / 10),
									noResults: !!Search.length,
								};
								return setData(moviesSearch);
							}
							setData(data);
						},
					});
			});
	}, []);

	// const searchMovie = (searchValue: string) => search$.next(searchValue);

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const inputRef = React.useRef<HTMLInputElement>(undefined!);

	React.useEffect(() => {
		if (inputRef.current) inputRef.current.focus();
	}, []);

	return (
		<>
			<PaginationButton
				// disabled={!moviesSearch?.data || pageNumber === 1}
				prev
				clickHandler={prevPage}
			/>

			<PaginationButton
				// disabled={!moviesSearch?.data || pageNumber === moviesSearch.totalPages}
				clickHandler={nextPage}
			/>
			<SearchField changeHandler={searchMovie} ref={inputRef} />

			{moviesSearch?.Error ? (
				<ErrorMessage error={(moviesSearch as APISearchResultsFailure).Error} />
			) : moviesSearch?.data?.length ? (
				<SearchResults movies={moviesSearch.data} />
			) : (
				<NoResults />
			)}
		</>
	);
};

export default HomePage;
