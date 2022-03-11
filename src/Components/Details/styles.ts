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

export const MoreInfo = styled.div`
	text-align: left;
`;

export const Plot = styled(MoreInfo)`
	max-width: 480px;

	@media screen and (max-width: 768px) {
		max-width: 100%;
	}
`;
export const Cast = styled(MoreInfo)`
	max-width: 165px;
	display: inline-block;
	margin-right: 55px;
	vertical-align: top;
`;
export const Genre = styled(MoreInfo)`
	max-width: 60px;
	display: inline-block;
	margin-right: 55px;
	vertical-align: top;
`;
export const Director = styled(MoreInfo)`
	max-width: 130px;
	display: inline-block;
	vertical-align: top;
`;

export const MoreInfoTitle = styled.p`
	color: #7a8c99;
	line-height: 24px;
	letter-spacing: 0.17px;
	margin: 0;
	padding-bottom: 10px;
`;
export const MoreInfoText = styled.p`
	color: #fff;
	line-height: 24px;
	letter-spacing: 0.17px;
	margin: 0;
	padding-bottom: 40px;
`;
