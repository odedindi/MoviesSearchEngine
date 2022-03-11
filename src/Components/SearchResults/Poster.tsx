import * as React from 'react';

import styled from 'styled-components';

import { Box, Divider, Image } from '@mantine/core';

export const Img = styled(Image)<{ grow?: 'false' | 'true' }>`
	transition: 0.2s ease-in-out;
	transform: scale(0.975);
	:hover {
		transform: ${({ grow }) => (grow === 'true' ? 'scale(1.125)' : null)};
	}
`;

import { CameraIcon } from '@modulz/radix-icons';

const NoPoster = () => (
	<Box
		sx={{
			height: 375,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
		}}
	>
		<Divider mb="xl" />
		<Divider />
		<Divider
			my="lg"
			variant="dashed"
			labelPosition="center"
			label={
				<>
					<CameraIcon />
					<Box m={5}>No Poster</Box>
					<CameraIcon />
				</>
			}
		/>
		<Divider />
		<Divider mt="xl" />
	</Box>
);

type PosterProps = {
	Poster?: string;
	noHeightLimit?: true;
};

export const MoviePoster: React.FC<PosterProps> = ({ Poster, noHeightLimit }) =>
	!Poster || Poster === 'N/A' ? (
		<NoPoster />
	) : (
		<Img
			src={Poster}
			alt="Movie Poster"
			height={noHeightLimit ? '100%' : 375}
			fit="cover"
			radius="md"
			grow={noHeightLimit ? 'false' : 'true'}
		/>
	);
