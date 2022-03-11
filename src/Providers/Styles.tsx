import * as React from 'react';

import {
	ColorScheme,
	ColorSchemeProvider,
	MantineProvider,
	MantineThemeOverride,
} from '@mantine/core';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global';
import { theme } from '../styles/theme';
import { useHotkeys, useLocalStorageValue } from '@mantine/hooks';

export const StylesProvider: React.FC = ({ children }) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const myTheme: MantineThemeOverride = {
	colorScheme: 'dark',
	fontFamily: 'Roboto, sans-serif',

	colors: {
		background: ['#0a1014'],
		darkGray: ['#353F4C'],
		mediumGray: ['#7a8c99'],
		lightGray: ['#979797'],
		gsapGreen: ['#92bf3e'],
		darkBlue: ['#353f4cb3'],
		yellow: ['#FF9F1C'],
		red: ['#FF4040'],
		white: ['#fff'],
	},
};
export const MantineStylesProvider: React.FC = ({ children }) => {
	const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
		key: 'color-scheme',
		defaultValue: 'dark',
	});

	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	useHotkeys([['mod+J', () => toggleColorScheme()]]);

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider theme={{ ...myTheme, colorScheme }}>
				<GlobalStyle />

				{children}
			</MantineProvider>
		</ColorSchemeProvider>
	);
};
