import styled from 'styled-components';
import { colors } from 'styles/vars';

export const PayConditionsItemContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;

	& > div:nth-child(4) {
		flex: 0 0 180px;
	}
`;
export const PayConditionsItemDelete = styled.div`
	color: ${colors.accentOrange};
	cursor: pointer;
	transition: opacity .3s ease;
	opacity: .5;

	&:hover {
		opacity: 1;
	}
`;