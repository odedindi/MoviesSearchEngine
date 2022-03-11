import styled, { css } from 'styled-components';

export const Button = styled.button<{ prev?: boolean; disabled?: boolean }>`
	visibility: ${({ disabled }) => (disabled ? 'hidden' : 'visible')};
	position: absolute;
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30%;
	height: 6rem;
	background-color: transparent;
	color: #fff;
	text-decoration: none;
	transition: all 0.2s linear;
	cursor: pointer;
	&:hover {
		color: #92bf3e;
	}

	border: none;
	${({ prev }) =>
		prev
			? css`
					left: 0;
			  `
			: css`
					right: 0;
			  `}
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	align-items: center;
`;
export const ButtonTitle = styled.span`
	padding: 0 15px;
	text-transform: uppercase;
	font-size: 14px;
`;

export const ArrowSvg = styled.svg<{ prev?: boolean }>`
	width: 71px;
	height: 15px;
	${({ prev }) =>
		prev &&
		css`
			transform: rotate(180deg);
		`}
`;

export const PagesCarousel = styled.div`
	height: 20%;
	height: 2rem;
	width: 60%;

	position: fixed;
	left: 17%;

	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
`;

export const Box = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background: green;
	height: 80%;
	width: 20%;
	margin: 0;
	padding: 0;
	position: relative;
	flex-shrink: 0;
	color: #fff;
	font-size: 14px;
	cursor: pointer;
	border: solid 0.125rem;
	border-color: transparent;

	:hover {
		border-color: #92bf3e;
	}
`;
