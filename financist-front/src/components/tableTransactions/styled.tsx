import styled from 'styled-components';
import { colors } from 'styles/vars';

export const TableTransactionsContainer = styled.div`
	width: 100%;
	border-collapse: collapse;
`;
export const TableTransactionsEdit = styled.div`
	width: 24px;
	height: 24px;
	color: ${colors.accentOrange};

	position: absolute;
	top: 50%;
	transform: translateY(-50%);

	cursor: pointer;
	padding-left: 10px;
`;