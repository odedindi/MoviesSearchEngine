/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react';

import * as S from './styles';

import gsap from 'gsap';
import Arrow from './Arrow';

type PaginationButtonProps = {
	clickHandler: () => void;
	prev?: boolean;
	disabled?: boolean;
	title?: string;
};

export const PaginationButton: React.FC<PaginationButtonProps> = ({
	clickHandler,
	disabled,
	prev,
	title,
}) => {
	const [tl] = React.useState(() => gsap.timeline({ paused: true }));

	const buttonRef = React.useRef<HTMLButtonElement>(undefined!);
	const arrowRef = React.useRef<SVGGElement>(undefined!);

	const init = React.useCallback(() => {
		gsap.set(arrowRef.current, { x: -35 });

		const btnSelector = gsap.utils.selector(buttonRef.current);
		const buttonAnim = { x: 0, ease: 'power2.easeInOut' };
		tl.to(btnSelector('g'), buttonAnim, '-=0.3').duration(0.5);
	}, [tl]);

	const handleMouseEnter = () => tl.play();
	const handleMouseLeave = () => tl.reverse();

	React.useEffect(() => {
		init();
		return () => {
			tl.kill();
		};
	}, [init]);

	return (
		<S.Button
			disabled={disabled}
			prev={prev}
			ref={buttonRef}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={clickHandler}
		>
			<S.ButtonContainer>
				<Arrow prev={prev} ref={arrowRef} />
				<S.ButtonTitle>{title ? title : prev ? 'Prev' : 'Next'}</S.ButtonTitle>
			</S.ButtonContainer>
		</S.Button>
	);
};

export default PaginationButton;
