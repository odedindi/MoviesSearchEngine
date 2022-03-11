import * as React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Spinner from '../Components/Spinner';

const HomePage = React.lazy(() => import('../pages/home'));
const MovieDetailsPage = React.lazy(() => import('../pages/[imdbID]'));
const NoMatch = React.lazy(() => import('../pages/noMatch'));

type CustomSuspenseProps = {
	Component: React.LazyExoticComponent<React.FC>;
};

const CustomSuspense: React.FC<CustomSuspenseProps> = ({ Component }) => (
	<React.Suspense fallback={<Spinner />}>
		<Component />
	</React.Suspense>
);

export const Router = () => (
	<Routes>
		<Route path="/" element={<Outlet />}>
			<Route index element={<CustomSuspense Component={HomePage} />} />
			<Route
				path="/details/:imdbID"
				element={<CustomSuspense Component={MovieDetailsPage} />}
			/>
			<Route path="*" element={<CustomSuspense Component={NoMatch} />} />
		</Route>
	</Routes>
);

export default Router;
