import styled from 'styled-components';
import { colors } from 'styles/vars';
import {BorderContainer} from "../../../styled";

export const ContractPageOptionsContainer = styled(BorderContainer)`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 5px;
    column-gap: 20px;
	align-self: flex-start;
`;
export const ContractPageOptionsItem = styled.div`
	& span {
		color: ${colors.accentOrange}
	}
`;