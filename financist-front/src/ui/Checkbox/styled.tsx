import styled from 'styled-components';
import { colors } from 'styles/vars';

export const UiCheckboxContainer = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
`;
export const UiCheckboxMain = styled.div<{active: string}>`
    width: 20px;
    height: 20px;
    border-radius: 3px;
    border: 2px solid ${({active}) => active === 'true' ? colors.accentOrange: colors.blueDark};
    position: relative;
    transition: all .2s ease;
    & svg {
        content: '';
        opacity: ${({active}) => active === 'true' ? 1: 0};
        position: absolute;
        top: 0;
        right: 0;
        width: 16px;
        height: 16px;
        color: ${colors.accentOrange};
        transition: all .2s ease;
    }
`;
export const UiCheckboxLabel = styled.div`
user-select: none`;