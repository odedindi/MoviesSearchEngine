import * as React from 'react';

import type { Movie } from '../../types/api';

import { Title } from '@mantine/core';

type MovieTitleProps = {
	title: Movie['Title'];
};

export const MovieTitle: React.FC<MovieTitleProps> = ({ title }) => (
	<Title order={1} sx={({ colors }) => ({ color: colors.white, fontSize: 65 })}>
		{title}
	</Title>
);

export default MovieTitle;
