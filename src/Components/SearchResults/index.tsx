import * as React from 'react';

import type { MovieFromMoviesSearchResults } from '../../types/api';

import gsap from 'gsap';

import { Grid } from '@mantine/core';
import ResultCard from './ResultCard';

type SearchResultsProps = {
	movies: MovieFromMoviesSearchResults[];
};

export const SearchResults: React.FC<SearchResultsProps> = ({ movies }) => {
	const cards = React.useRef<Set<HTMLAnchorElement>>(new Set());
	const cardRef = (el: HTMLAnchorElement) => cards.current.add(el);

	React.useEffect(() => {
		const animation = gsap
			.from(Array.from(cards.current), { opacity: 0, stagger: 0.75 })
			.duration(1);

		return () => {
			animation.kill();
		};
	}, []);

	return (
		<Grid columns={15} gutter="xs" align="center">
			{movies.map((m) => (
				<ResultCard movie={m} ref={cardRef} key={`${m.Title}-${m.imdbID}`} />
			))}
		</Grid>
	);
};

export default SearchResults;
