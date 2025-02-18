import styled from 'styled-components';
import {colors} from "styles/vars";

export const ContractPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 100%;
`;
export const ContractPageHeader = styled.div`display: flex;
	align-items: flex-start;
	justify-content: space-between;`
;
export const ContractPageFiles = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
`
export const ContractPageFile = styled.li`
    border: 1px solid ${colors.gray};
    padding: 5px 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    & span{
        color: ${colors.accentOrange}
    }
    & a {
        margin-left: auto;
    }
    & button{
        color: red;
        margin-left: auto;
    }
`;
export const ContractPageRes = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;
export const ContractPageResLine = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;