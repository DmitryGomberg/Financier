import styled from 'styled-components';
import { BorderContainer } from '../../styled';

export const CreateContractPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: flex-start;
	gap: 15px;
`;
export const CreateContractPageLine = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
	width: 100%;
	max-width: 730px;

	& > div {
		flex: 1 1 auto;
		width: 100%;
	}
`;
