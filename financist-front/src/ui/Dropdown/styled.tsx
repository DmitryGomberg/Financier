import styled from 'styled-components';
import { colors } from 'styles/vars';

export const UiDropdownContainer = styled.div`
	display: inline-flex;
	align-items: stretch;
	flex-direction: column;
	gap: 3px;
	width: 100%;
	max-width: 730px;
`;
export const UiDropdownInner = styled.div`
	display: flex;
	align-items: stretch;
	position: relative;
	flex-direction: column;
`;
export const UiDropdownMain = styled.div<{ isOpen: boolean }>`
	cursor: pointer;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	user-select: none;
	background-color: ${colors.gray};
	padding: 3px 15px;

	border-bottom: 1px solid ${colors.accentOrange};
	border-radius: 3px;
	z-index: 2;

	& svg {
		transition: all .2s ease;
		transform: rotate(${({ isOpen }) => isOpen ? '180deg' : '0deg'});
	}
`;
export const UiDropdownList = styled.div<{ isOpen: boolean }>`
	background-color: ${colors.gray};
	position: absolute;
	top: calc(100% + 2px);
	transition: all .2s ease;
	opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
	visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
	transform: translateY(${({ isOpen }) => isOpen ? '0' : '-20px'});
	right: 0;
	width: 100%;
	z-index: 1;
	border-radius: 3px;
	box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
`;
export const UiDropdownItem = styled.div`
	cursor: pointer;
	padding: 3px 15px;
	border-bottom: 1px solid ${colors.accentOrange};

	&:last-child {
		border-bottom: none;
	}
`;
export const UiDropdownLabel = styled.div<{error?: boolean}>`
	color: ${({error}) => error ? 'red' : colors.blueDark};
`;
