import styled from 'styled-components';
import { colors } from 'styles/vars';
import {ArrowDropDown} from "@mui/icons-material";

export const UiTableContainer = styled.table`
	width: 100%;
	border-collapse: collapse;
	text-align: center;
`;

export const UiTableHeader = styled.th<{hasIcon: boolean}>`
	border: 1px solid ${colors.blue};
	padding: 3px;
	background-color: ${colors.accentGreen};
	font-size: 15px;
	line-height: 17px;
    cursor: pointer;
	position: relative;
    user-select: none;
    text-align: ${({hasIcon}) => hasIcon ? 'left' : 'center'};
    & svg{
	    position: absolute;
        right: 0px;
        top: 1px;
    }
`;

export const UiTableRow = styled.tr<{clickable?: boolean}>`
	position: relative;
	cursor: ${({clickable}) => clickable ? 'pointer' : 'default'};

	&:nth-child(even) {
		background-color: #f9f9f9;
	}
`;

export const UiTableCell = styled.td`
	border: 1px solid ${colors.blue};
	padding: 8px 3px;
	font-size: 15px;
	line-height: 17px;
	min-width: 80px;
    text-align: center;
`;
export const ArrowDropUp = styled(ArrowDropDown)`
    transform: rotate(180deg);
`