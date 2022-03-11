import * as React from 'react';

import BrowserRouterProvider from './BrowserRouter';
import { StylesProvider, MantineStylesProvider } from './Styles';

export const Providers: React.FC = ({ children }) => (
	<BrowserRouterProvider>
		<MantineStylesProvider>{children}</MantineStylesProvider>
	</BrowserRouterProvider>
);

export default Providers;
