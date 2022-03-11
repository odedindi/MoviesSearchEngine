/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react';
import { Link } from 'react-router-dom';

import type { MovieFromMoviesSearchResults } from '../../types/api';

import { Grid } from '@mantine/core';
import { Card } from '@mantine/core';
import { MoviePoster } from './Poster';

type ResultCardProps = React.ComponentProps<typeof Grid.Col> & {
	movie: MovieFromMoviesSearchResults;
};

export const ResultCard = React.forwardRef<HTMLAnchorElement, ResultCardProps>(
	({ movie: { imdbID, Poster }, ...rest }, ref) => {
		return (
			<Grid.Col xs={7.5} sm={5} md={3} lg={3} {...rest}>
				<Card component={Link} to={`/details/${imdbID}`} radius="sm" ref={ref}>
					<Card.Section>
						<MoviePoster Poster={Poster} />
					</Card.Section>
				</Card>
			</Grid.Col>
		);
	},
);

ResultCard.displayName = 'ResultCard';

export default React.memo(ResultCard);
