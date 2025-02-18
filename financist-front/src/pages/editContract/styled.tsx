import styled from 'styled-components';
import { BorderContainer } from '../../styled';
import {colors} from "styles/vars";

export const EditContractPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: flex-start;
	gap: 15px;
`;
export const EditContractPageType = styled(BorderContainer)``;
export const EditContractPageLine = styled.div`
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
export const EditContractPageWrapper = styled.div`
    display: flex;
	align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
 `;
export const EditContractPageInner = styled.div`flex: 1 1 auto;`;
export const EditContractPageDates = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;
export const EditContractPageDateBlock = styled.div`
    padding: 10px;
    border: 1px solid ${colors.gray};
    border-right: none;
    border-radius: 10px 0 0 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
export const EditContractPageAddFiles = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`