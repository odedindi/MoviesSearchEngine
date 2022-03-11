import * as React from 'react';

import { Subject } from 'rxjs';
import {
	catchError,
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
	switchMap,
	takeUntil,
} from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';

import { baseUrl } from '../utils/constants';
import type {
	APISearchResultsFailure,
	APIMoviesSearchResultsSuccess,
	MoviesSearch,
} from '../types/api';

import useDestroySubscription from '../hooks/useDestroySubscription';
import { useDocumentTitle } from '@mantine/hooks';

import SearchField from '../Components/SearchField';
import SearchResults from '../Components/SearchResults';
import NoResults from '../Components/NoResults';
import ErrorMessage from '../Components/ErrorMessage';

const HomePage: React.FC = () => {
	useDocumentTitle('Movies Search Engine');
	const destroySubscription$ = useDestroySubscription();

	const [search$] = React.useState(() => new Subject<string>());

	const [moviesSearch, setData] = React.useState<
		Partial<MoviesSearch & APISearchResultsFailure> | undefined
	>();

	React.useEffect(() => {
		search$
			.pipe(
				map((query) => query.trim().split(' ').join('+')),
				distinctUntilChanged(),
				filter((v) => v.length > 2),
				debounceTime(750),
				map((query) => `${baseUrl}&type=movie&s=${query}&page=1`),
				takeUntil(destroySubscription$),
			)
			.subscribe((url) => {
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

	const searchMovie = (searchValue: string) => search$.next(searchValue);

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const inputRef = React.useRef<HTMLInputElement>(undefined!);

	React.useEffect(() => {
		if (inputRef.current) inputRef.current.focus();
	}, []);

	return (
		<>
			<SearchField changeHandler={searchMovie} ref={inputRef} />

			{moviesSearch &&
				(moviesSearch.Error ? (
					<ErrorMessage
						error={(moviesSearch as APISearchResultsFailure).Error}
					/>
				) : moviesSearch.data?.length ? (
					<SearchResults movies={moviesSearch.data} />
				) : (
					<NoResults />
				))}
		</>
	);
};

export default HomePage;
