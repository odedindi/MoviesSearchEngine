import styled from 'styled-components';

const RatingsSection = styled.section`
	border: 2px solid #353f4c;
	border-radius: 5px;
	overflow: hidden;
	display: flex;
`;

export const IMDB = styled(RatingsSection)`
	max-width: 125px;
`;
export const RottenTomatoes = styled(RatingsSection)`
	max-width: 90px;
`;
