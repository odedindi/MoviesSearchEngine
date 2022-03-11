import * as React from 'react';

import type { Movie } from '../../types/api';

import { Group, Title } from '@mantine/core';

type GeneralInfoProps = {
	year: Movie['Year'];
	runtime: Movie['Runtime'];
	rated: Movie['Rated'];
};

export const GeneralInfo: React.FC<GeneralInfoProps> = ({
	year,
	runtime,
	rated,
}) => (
	<Group grow>
		<Title order={6}>{year}</Title>
		<Title order={6}>{runtime}</Title>
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
			{rated}
		</Title>
	</Group>
);

export default GeneralInfo;
