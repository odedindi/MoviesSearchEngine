import * as React from 'react';

import * as S from './styles';

import type { Movie } from '../../types/api';

import MovieInfo from './MovieInfo';
import { Link } from 'react-router-dom';
import PaginationButton from '../Pagination/Button';

import { Box, Grid } from '@mantine/core';
import { MoviePoster } from '../SearchResults/Poster';

type DetailsProps = {
	movie: Movie;
};

export const Details: React.FC<DetailsProps> = ({ movie }) => (
	<>
		<Grid gutter="lg" align="center">
			<Grid.Col lg={12} style={{ minHeight: 150 }}>
				<Box component={Link} to={'/'}>
					<PaginationButton
						aria-label="Go Back"
						prev
						title="Go Back"
						clickHandler={() => null}
					/>
				</Box>
			</Grid.Col>
			<Grid.Col md={12} lg={7}>
				<MovieInfo movie={movie} />
			</Grid.Col>
			<Grid.Col md={12} lg={5}>
				<MoviePoster noHeightLimit Poster={movie.Poster} />
			</Grid.Col>
		</Grid>
	</>
);

export default Details;
