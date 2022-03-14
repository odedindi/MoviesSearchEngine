# Movies Search Engine.

[Live Demo](https://movies-search-engine.bovercel.app/)

## App Features

- Movies search engine, using [OMDb API](http://www.omdbapi.com/).

## Tech/framework used

This is a [React.js](https://reactjs.org/) project with

- [RxJS](https://rxjs.dev/)
- [GSAP](https://greensock.com/gsap/)
- for styling
  - [styled-components](https://github.com/styled-components/styled-components)
  - [Mantine](https://mantine.dev/)

### getting started and important scripts

- run `yarn dev` to run it locally on [localhost:3000](http://localhost:3000)
- run `yarn check:types` to check types
- run `yarn check:lint` to check linting
- run `yarn check:all` to check both types, linting and format (using prettier)
- run `yarn check:build` to check types, linting, format and build

### Env vars

```
REACT_APP_OMDB_KEY
```

### Code examples

- React hook to generate (what i call) a destroySubscription RxJS Subject

```
	export const useDestroySubscription = (): Subject<boolean> => {
		const destroySubscription$ = new Subject<boolean>();
		React.useEffect(() => {
			return () => {
				destroySubscription$.next(true);
				destroySubscription$.complete();
			};
		}, []);

		return destroySubscription$;
	};
```

- RxJS observable for debouncing user input and fetching

```
	const [search$] = React.useState(() => new Subject<string>());

    const searchMovie = (searchValue: string) => search$.next(searchValue);

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

```

- An inMemory fetch with caching hooks

```
	export const useFetchCacheMovieDetails = (url: string) => {
		const inMemoryCache = new Map<string, Movie>();

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
```

## Contributing

- If you'd like to contribute, please do fork the repository and use a feature branch.
- Pull requests are most welcome.

## Links

- Project homepage: https://github.com/odedindi/MoviesSearchEngine
- Repository: git@github.com:odedindi/MoviesSearchEngine.git
- Issue tracker: https://github.com/odedindi/MoviesSearchEngine/issues
  #### I value the care and effort to improve the security and privacy of this project!
- In case of sensitive bugs like security vulnerabilities, please contact
  odedindi@gmail.com directly instead of using issue tracker.

## Licensing

The code in this project is licensed under MIT [license](https://github.com/odedindi/MoviesSearchEngine/blob/main/LICENSE).
