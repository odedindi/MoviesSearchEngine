import * as React from 'react';

import * as S from './styles';

import emptyImg from '../../assets/illustrations/illustration-empty-state@2x.png';

import { Image, Title } from '@mantine/core';

export const NoResults: React.FC = () => (
	<S.NoResults>
		<Title order={4}>Nothing Found</Title>
		<Image src={emptyImg} alt="No Results" fit="contain" height={250} />
		<Title order={5}>Try again ?</Title>
	</S.NoResults>
);

export default NoResults;
