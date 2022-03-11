import * as React from 'react';

import * as S from './styles';

import { MagnifyingGlassIcon } from '@modulz/radix-icons';

type SearchFieldProps = {
	changeHandler: (str: string) => void;
};

const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
	({ changeHandler }, ref) => (
		<S.SearchContainer>
			<S.SearchInput
				sx={(theme) => ({
					backgroundColor: theme.colors.gray[0],
					'&:hover': {
						backgroundColor: theme.colors.gray[2],
					},
					input: {
						color: theme.colors.gray[9],
						'&::placeholder': { color: theme.colors.gray[6] },
					},
				})}
				variant="unstyled"
				icon={<MagnifyingGlassIcon />}
				aria-label="Search Movies"
				placeholder="Search movies, type at least 3 characters.."
				ref={ref}
				type="search"
				onChange={({ currentTarget: { value } }) => changeHandler(value)}
			/>
		</S.SearchContainer>
	),
);
SearchField.displayName = 'SearchField';
export default SearchField;
