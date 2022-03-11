import * as React from 'react';

import type { Movie } from '../../types/api';

import { Box, Grid, Spoiler, Text as MantineText } from '@mantine/core';

const Title: React.FC = ({ children }) => (
	<MantineText
		sx={({ colors }) => ({
			color: colors.gray[5],
			letterSpacing: '0.0125rem',
			padding: '0.5rem 0',
		})}
	>
		{children}
	</MantineText>
);

const Text: React.FC<{ center?: true }> = ({ center, children }) => (
	<MantineText
		align={center ? 'center' : undefined}
		sx={({ colors }) => ({ color: colors.white })}
	>
		{children}
	</MantineText>
);

type MovieDescriptionProps = {
	plot: Movie['Plot'];
	actors: Movie['Actors'];
	genre: Movie['Genre'];
	director: Movie['Director'];
};

export const MovieDescription: React.FC<MovieDescriptionProps> = ({
	plot,
	actors,
	genre,
	director,
}) => (
	<Box sx={{ textAlign: 'left' }}>
		<Box sx={{ padding: '0 5%' }}>
			<Title>Plot</Title>
			<Spoiler
				maxHeight={100}
				showLabel="Show more"
				hideLabel="Hide"
				transitionDuration={160}
			>
				<Text center>{plot}</Text>
			</Spoiler>
		</Box>
		<Grid>
			<Grid.Col xs={5}>
				<Title>Cast</Title>
				<Text>{actors}</Text>
			</Grid.Col>
			<Grid.Col xs={2}>
				<Title>Genre</Title>
				<Text>{genre}</Text>
			</Grid.Col>
			<Grid.Col xs={5}>
				<Title>Director</Title>
				<Text>{director}</Text>
			</Grid.Col>
		</Grid>
	</Box>
);

export default MovieDescription;
