import * as React from 'react';

import ErrorMessage from '../Components/ErrorMessage';

const NoMatch: React.FC = () => (
	<div
		style={{
			position: 'fixed',
			top: '15%',
			bottom: '35%',
			left: '20%',
			right: '20%',
		}}
	>
		<ErrorMessage customMessage="Nothing to see here!" />
	</div>
);

export default NoMatch;
