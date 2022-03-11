import * as React from 'react';

import * as S from './styles';

import imdbIcon from '../../assets/logo/logo-imdb.svg';
import rottenTomatoesIcon from '../../assets/logo/logo-rotten-tomatoes.svg';

import type { Movie } from '../../types/api';

import { Group, Image, Spoiler, Text, Title } from '@mantine/core';
import { theme } from '../../styles/theme';

type MovieInfoProps = {
	movie: Movie;
};

export const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => (
	<>
		<Group grow>
			<Title order={6}>{movie.Year}</Title>
			<Title order={6}>{movie.Runtime}</Title>
			<Title
				order={6}
				sx={({ colors }) => ({
					color: colors.background,
					backgroundColor: colors.gray[5],
					borderRadius: 5,
					padding: 5,
					lineHeight: 2,
				})}
			>
				{movie.Rated}
			</Title>
		</Group>

		<Title
			order={1}
			sx={({ colors }) => ({ color: colors.white, fontSize: 65 })}
		>
			{movie.Title}
		</Title>
		<Group spacing="xs">
			<S.IMDB>
				<Image
					src={imdbIcon}
					alt="IMDB logo"
					width={35}
					radius="sm"
					styles={{
						image: { padding: '0.6rem', backgroundColor: theme.colors.yellow },
					}}
				/>
				<Text
					sx={({ colors }) => ({
						color: colors.white,
						padding: '0.425rem 0.25rem 0',
					})}
				>
					{movie.Ratings[0]?.Value ?? '--'}
				</Text>
			</S.IMDB>

			<S.RottenTomatoes>
				<Image
					src={rottenTomatoesIcon}
					alt="Rotten Tomatoes logo"
					width={12.5}
					radius="sm"
					styles={{
						image: { padding: '0.6rem', backgroundColor: theme.colors.red },
					}}
				/>

				<Text
					sx={({ colors }) => ({
						color: colors.white,
						padding: '0.325rem 0.375rem 0',
					})}
				>
					{movie.Ratings[1]?.Value ?? '--'}
				</Text>
			</S.RottenTomatoes>
		</Group>

		<S.MoreInfo>
			<S.Plot>
				<S.MoreInfoTitle>Plot</S.MoreInfoTitle>
				<Spoiler
					maxHeight={120}
					showLabel="Show more"
					hideLabel="Hide"
					transitionDuration={160}
				>
					<Text sx={{ color: 'white' }}>{movie.Plot}</Text>
				</Spoiler>
			</S.Plot>
			<S.Cast>
				<S.MoreInfoTitle>Cast</S.MoreInfoTitle>
				<S.MoreInfoText>{movie.Actors}</S.MoreInfoText>
			</S.Cast>
			<S.Genre>
				<S.MoreInfoTitle>Genre</S.MoreInfoTitle>
				<S.MoreInfoText>{movie.Genre}</S.MoreInfoText>
			</S.Genre>
			<S.Director>
				<S.MoreInfoTitle>Director</S.MoreInfoTitle>
				<S.MoreInfoText>{movie.Director}</S.MoreInfoText>
			</S.Director>
		</S.MoreInfo>
	</>
);

export default MovieInfo;
