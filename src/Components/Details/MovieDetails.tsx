import * as React from 'react';

import type { Movie } from '../../types/api';

import { Divider, Title } from '@mantine/core';

import Ratings from './Ratings';
import GeneralInfo from './GeneralInfo';
import MovieDescription from './MovieDescription';
import MovieTitle from './Title';

type MovieDetailsProps = {
	movie: Movie;
};

export const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => (
	<>
		<GeneralInfo
			year={movie.Year}
			runtime={movie.Runtime}
			rated={movie.Rated}
		/>
		<MovieTitle title={movie.Title} />
		<Ratings ratings={movie.Ratings} />
		<Divider my={5} />
		<MovieDescription
			plot={movie.Plot}
			actors={movie.Actors}
			genre={movie.Genre}
			director={movie.Director}
		/>
	</>
);

export default MovieDetails;
