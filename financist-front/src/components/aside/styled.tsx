import styled from 'styled-components';
import { colors } from 'styles/vars';
import {css} from "@emotion/react";

export const AsideContainer = styled.div<{active: boolean}>`
	flex: 0 0 ${({active}) => active ? '300px' : '60px'};
	border-right: 1px solid ${colors.gray};
	padding: 30px 0;
	position: relative;
`;
export const AsideLinks = styled.div<{ active?: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding-bottom: 20px;
	align-items: ${({active}) => active ? 'inherit' : 'center'}
`;
export const AsideLink = styled.div<{ active?: boolean; openedSidebar: boolean }>`
	position: relative;
	align-self: flex-start;
    width: ${({openedSidebar}) => openedSidebar ? '' : '60px'};

	&::after {
		content: '';
		position: absolute;
		bottom: ${({openedSidebar}) => openedSidebar ? '4px' : '-4px'};;
		z-index: -1;
		width: 100%;
		height: 4px;
		right: 0;
		border-radius: 1px;
		background-color: ${colors.accentGreen};
		display: ${({ active }) => active ? 'flex' : 'none'};
	}

	& a {
		display: flex;
		align-items: center;
       line-height: 120%;
		gap: ${({openedSidebar}) => openedSidebar ? '10px' : '3px'};
      flex-direction: ${({openedSidebar}) => openedSidebar ? 'row' : 'column'};
	   font-size: ${({openedSidebar}) => openedSidebar ? '14px' : '9px'};
	}

	& span {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: red;
		color: white;
		font-size: 14px;

		display: flex;
		align-items: center;
		justify-content: center;
	   ${({openedSidebar}) => openedSidebar ? '' : `
	      position: absolute;
	      top: 0;
	      right: 10px;
	      font-size: 12px; 
	      width: 16px; 
	      height: 16px;
      `}
	}
`;
export const AsideButtons = styled.div<{openedSidebar: boolean}>`
    padding-top: 20px;
	border-top: 1px solid ${colors.gray};
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: ${({openedSidebar}) => openedSidebar ? 'flex-start' : 'center'};
	&>button{
       transition: none;
       ${({openedSidebar}) => openedSidebar ? '' : `
           padding: 5px 3px;
           font-size: 11px; 
           line-height: 12px;
           gap: 2px;
           flex-direction: column;
       `};
   }
`;
export const AsideArrow = styled.div<{active: boolean}>`
	position: absolute;
	right: 0;
	top: 0;
	cursor: pointer;
	padding: 5px 0 5px 2px;
	background-color: ${colors.accentGreen};
	border-radius: ${({active}) => active ? '20px 0 0 20px' : '0 20px 20px 0'};
	color: ${colors.light};
	display: flex;
	align-items: center;
	justify-content: center;
    transform: translateX(${({active}) => active ? '0' : '100%'});
    z-index: 2;
    & svg{
        transform: rotate(${({active}) => active ? '0' : '180'}deg);
    }
`;