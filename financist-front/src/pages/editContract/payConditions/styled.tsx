import styled from 'styled-components';
import { colors } from 'styles/vars';

export const PayConditionsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px
`;
export const PayConditionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 15px
`;
export const PayConditionsMore = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	color: ${colors.accentOrange};
	cursor: pointer;
	align-self: flex-start;
`;