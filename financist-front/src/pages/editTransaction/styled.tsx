import styled from 'styled-components';
import { BorderContainer } from '../../styled';

export const EditTransactionPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 760px;
	width: 100%;
	align-items: flex-start;
	gap: 15px;
`;
export const EditTransactionPageType = styled(BorderContainer)``;
export const EditTransactionPageLine = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
	width: 100%;

	& > div {
	     flex: 1 1 auto;       
   }
`;
export const EditTransactionPageButtons = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;

	& > button:last-child {
		background-color: white;
		border: 1px solid red;
		color: red;

		&:hover {
			background-color: rgba(255, 0, 0, 0.03);
		}
	}
`;