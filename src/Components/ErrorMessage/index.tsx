import * as React from 'react';
import { Link } from 'react-router-dom';

import { Anchor, Box, Text, Title } from '@mantine/core';

type ErrorMessageProps = {
	error?: string;
	customMessage?: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
	customMessage,
	error,
}) => (
	<Box sx={(theme) => ({ padding: theme.spacing.xl, color: theme.colors.red })}>
		<Title order={2}>
			{customMessage ? customMessage : 'oops-a-daisy an error occured..'}
		</Title>
		{error && <Text>Error: {error}</Text>}
		<Title order={5}>
			Go back{' '}
			<Anchor
				component={Link}
				to="/"
				underline={false}
				transform="capitalize"
				variant="gradient"
			>
				home
			</Anchor>
		</Title>
	</Box>
);

export default ErrorMessage;
