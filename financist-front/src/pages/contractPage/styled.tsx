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
    gap: 10px;
    width: 100%;
`
export const ContractPageFile = styled.li`
    border: 1px solid ${colors.gray};
    border-bottom-color: ${colors.accentOrange};
    border-radius: 8px;

	background: rgba(255, 255, 255, 0.45);
	backdrop-filter: blur(9.1px);
	-webkit-backdrop-filter: blur(9.1px);
    
    & span{
        color: ${colors.light};
        background-color: ${colors.accentOrange};
        border-radius: 8px;
        padding: 2px 8px;
    }
    &>div, &>a{
        padding: 10px 10px;
        display: flex;
	    align-items: center;
	    gap: 10px;
    }
	& button {
	   margin-left: auto;
       color: ${colors.accentOrange};
       text-decoration: underline;
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