import styled from 'styled-components';

import { TextInput } from '@mantine/core';

export const SearchContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 6rem 0;
`;

export const SearchInput = styled(TextInput)`
	width: calc(100% - 2rem);
	border-radius: 4px;
`;
