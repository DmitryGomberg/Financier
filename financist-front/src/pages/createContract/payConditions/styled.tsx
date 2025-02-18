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
export const PayConditionsError = styled.div`
	color: red;
	padding: 5px 15px;
    border-radius: 5px;
	background-color: rgba(255, 0, 0, 0.12);
	font-size: 14px;
`;