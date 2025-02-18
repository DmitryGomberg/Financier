import styled from 'styled-components';
import { BorderContainer } from '../../styled';

export const CreateTransactionPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 760px;
	width: 100%;
	align-items: flex-start;
	gap: 15px;
`;
export const CreateTransactionPageType = styled(BorderContainer)``;
export const CreateTransactionPageLine = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
	width: 100%;
    
    &>div{
        flex: 1 1 auto;
    }
`;