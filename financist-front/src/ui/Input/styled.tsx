import styled from 'styled-components';
import { colors } from 'styles/vars';

export const UiInputContainer = styled.div`
	display: flex;
	gap: 3px;
	flex-direction: column;
	max-width: 730px;
	width: 100%;
`;
export const UiInputLabel = styled.div<{error?: boolean}>`
	color: ${({error}) => error ? 'red' : colors.blueDark};
`;
export const UiInputMain = styled.input`
	padding: 3px 15px;
	border-radius: 3px;
	background-color: ${colors.gray};
	outline: none;
	border: 1px solid transparent;
	border-bottom-color: ${colors.accentOrange};
	font-weight: 900;

	&:focus {
		border: 1px solid ${colors.accentOrange};
	}
`;