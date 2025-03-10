import styled from 'styled-components';
import { colors } from 'styles/vars';
import decor from './assets/decor.png';

export const Container = styled.div`
	max-width: 1440px;
	width: 100%;
	margin: 0 auto;
	padding: 0 10px;
`;
export const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	min-height: 100vh;
`;
export const AppMain = styled(Container)`
	display: flex;
	flex: 1 1 auto;
    background-image: url(${decor});
    background-position: right bottom;
	background-size: 500px;
	background-repeat: no-repeat;
	background-attachment: fixed;
    
	& > div:last-child {
		padding: 30px;
	}
`;
export const Title = styled.h1`
	font-size: 36px;
	line-height: 43px;
	font-weight: 900;
	letter-spacing: -0.05em;
	color: ${colors.blue};
	position: relative;

	&::before {
		content: '';
		position: absolute;
		left: 0;
		bottom: 7px;
		width: 100%;
		height: 4px;
		border-radius: 2px;
		background-color: ${colors.accentGreen};
		z-index: -1;
	}
`;
export const Subtitle = styled.h2`
	font-size: 28px;
	font-weight: 900;
	letter-spacing: -0.05em;
	color: ${colors.blue};
`;
export const BorderContainer = styled.div`
	border: 1px solid ${colors.gray};

	background: rgba(255, 255, 255, 0.45);
	backdrop-filter: blur(9.1px);
	-webkit-backdrop-filter: blur(9.1px);
    
	border-radius: 10px;
	padding: 10px 15px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	min-width: 424px;
`;
export const RadioCheckboxWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	align-items: flex-start;
`;