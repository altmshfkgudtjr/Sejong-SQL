import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
	from { opacity: 0; }
	to { opacity: 1; }
`;

export const fadeOut = keyframes`
	from { opacity: 1; }
	to { opacity: 0; }
`;

export const zoomIn = (v = 1.2) => keyframes`
	from { transform: scale(1) };
	to { transform: scale(${v}) };
`;

export const zoomOut = (v = 0.8) => keyframes`
	from { transform: scale(1) };
	to { transform: scale(${v}) };
`;
