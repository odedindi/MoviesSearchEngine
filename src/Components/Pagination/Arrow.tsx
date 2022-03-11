import * as React from 'react';

import * as S from './styles';

type ArrowProps = {
	prev?: boolean;
};
export const Arrow = React.forwardRef<SVGGElement, ArrowProps>(
	({ prev }, ref) => (
		<S.ArrowSvg
			prev={prev}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 71 15"
		>
			<g ref={ref}>
				<polyline
					id="large-arrow__head"
					points="43 2.775 49.125 7.5 43 12.5"
					fill="none"
					stroke="white"
					strokeMiterlimit="10"
				/>
				<rect x="1" y="7" width="46.5" height="1" fill="white" />
			</g>
		</S.ArrowSvg>
	),
);
Arrow.displayName = 'Arrow';

export default Arrow;
