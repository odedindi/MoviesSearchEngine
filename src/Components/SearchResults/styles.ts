import styled from 'styled-components';
import { Image } from '@mantine/core';

export const Img = styled(Image)`
	transition: 0.2s ease-in-out;
	transform: scale(0.975);
	:hover {
		transform: scale(1.125);
	}
`;
