import * as React from 'react';

import * as S from './styles';

import imdbIcon from '../../assets/logo/logo-imdb.svg';
import rottenTomatoesIcon from '../../assets/logo/logo-rotten-tomatoes.svg';

import type { Movie } from '../../types/api';

import { theme } from '../../styles/theme';

import { Group, Image, Text } from '@mantine/core';

type RatingsProps = {
	ratings: Movie['Ratings'];
};

export const Ratings: React.FC<RatingsProps> = ({ ratings }) => (
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
				{ratings[0]?.Value ?? '--'}
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
				{ratings[1]?.Value ?? '--'}
			</Text>
		</S.RottenTomatoes>
	</Group>
);

export default Ratings;
