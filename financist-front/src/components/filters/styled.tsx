import styled from 'styled-components';
import { colors } from 'styles/vars';

export const FilterContainer = styled.div`
	padding: 10px 20px;
	border-radius: 10px;
	border: 1px solid ${colors.gray};
	display: flex;
	flex-direction: column;
	gap: 10px;
	position: relative;
	width: 100%;
`;
export const FilterLine = styled.div`
	display: flex;
	align-items: flex-start;
    flex-wrap: wrap;
	gap: 20px;

    & button{
        align-self: flex-end;
        justify-self: flex-end;
        margin-left: auto
    }
`;
export const FilterBlock = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;
export const FilterLabel = styled.div``;

export const FilterBlockDate = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
    &>div{
        max-width: 150px;
    }
`;