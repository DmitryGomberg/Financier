import styled from 'styled-components';
import { colors } from 'styles/vars';

export const UiRadioContainer = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
`;
export const UiRadioMain = styled.div<{active: string}>`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid ${({active}) => active === 'true' ? colors.accentOrange: colors.blueDark};
    position: relative;
    transition: all .2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &::after{
        content: '';
        position: absolute;
        top: 50%;
        right: 50%;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: ${colors.accentOrange};
        transition: all .2s ease;
        
        transform: translate(50%, -50%) scale(${({active}) => active === 'true' ? 1 : 0});
    }
`;
export const UiRadioLabel = styled.div`
    user-select: none
`;