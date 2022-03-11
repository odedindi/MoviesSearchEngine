import * as React from 'react';
import { useParams } from 'react-router-dom';

import { baseUrl } from '../utils/constants';
import type { APISearchResultsFailure, Movie } from '../types/api';

import { useFetchCacheMovieDetails } from '../hooks/useFetchCacheMovieDetails';

import Details from '../Components/Details';
import Spinner from '../Components/Spinner';
import ErrorMessage from '../Components/ErrorMessage';

const MovieDetailsPage: React.FC = () => {
	const url = `${baseUrl}&i=${useParams().imdbID}&plot=full`;
	const movieDetails = useFetchCacheMovieDetails(url);

	return movieDetails ? (
		(movieDetails as APISearchResultsFailure).Error ? (
			<ErrorMessage error={(movieDetails as APISearchResultsFailure).Error} />
		) : (
			<Details movie={movieDetails as Movie} />
		)
	) : (
		<Spinner />
	);
};

export default MovieDetailsPage;
