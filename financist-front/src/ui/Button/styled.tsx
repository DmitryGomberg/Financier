import styled from 'styled-components';
import { colors } from 'styles/vars';

export const UiButtonContainer = styled.button`
	padding: 10px 20px;
	display: inline-flex;
	align-items: center;
	gap: 10px;
	color: ${colors.light};
	background-color: ${colors.accentOrange};
	border-radius: 5px;
	font-size: 16px;
	font-weight: 900;
	line-height: 17px;
	cursor: pointer;
	transition: all .2s ease;

	&:hover {
		background-color: #b46f48;
	}

	& svg {
		width: 17px;
		height: 17px;

		& path {
			fill: ${colors.light};
		}
	}
`;
