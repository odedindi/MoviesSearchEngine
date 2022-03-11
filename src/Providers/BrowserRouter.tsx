import * as React from 'react';

import { BrowserRouter } from 'react-router-dom';

export const BrowserRouterProvider: React.FC = ({ children }) => (
	<BrowserRouter>{children}</BrowserRouter>
);

export default BrowserRouterProvider;
