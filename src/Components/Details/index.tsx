import * as React from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';

import type { Movie } from '../../types/api';
import { useDocumentTitle } from '@mantine/hooks';

import { Box, Grid } from '@mantine/core';

import MovieDescription from './MovieDetails';
import PaginationButton from '../Pagination/Button';
import { MoviePoster } from '../SearchResults/Poster';

type DetailsProps = {
	movie: Movie;
};

export const Details: React.FC<DetailsProps> = ({ movie }) => {
	useDocumentTitle(movie.Title);
	return (
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
					<MovieDescription movie={movie} />
				</Grid.Col>
				<Grid.Col md={12} lg={5}>
					<MoviePoster noHeightLimit Poster={movie.Poster} />
				</Grid.Col>
			</Grid>
		</>
	);
};

export default Details;
