import styled from 'styled-components';
import { colors } from 'styles/vars';
import {Container} from "../../styled";

export const NavContainer = styled(Container)`
    &&{
       display: flex;
       align-items: center;
       border-bottom: 1px solid ${colors.gray};
    }
`;
export const NavLogo = styled.div`
    margin-right: auto;
    & a{
        height: 50px;
        @media (max-width: 768px){
            height: 40px;
        }
    }
    & img{
        height: 100%;
    }
`;
export const NavCompany = styled.div`
    flex: 1 1 auto;
    text-align: right;
    padding-right: 8px;
    font-weight: 400;
    @media (max-width: 768px){
        display: none;
    }
`;
export const NavSearch = styled.div`
    padding: 8px;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    &::before{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0px;
        border-right: 1px solid ${colors.gray};
        height: 30px;
        background-color: ${colors.gray};
    }
`;
export const Navnotifications = styled.div`
    padding: 8px 0 8px 8px;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    & span{
        position: absolute;
        top: 9px;
        left: 17px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        font-size: 12px;
        line-height: 5px;
        color: ${colors.light};
        background-color: red;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &::before{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0px;
        border-right: 1px solid ${colors.gray};
        height: 30px;
        background-color: ${colors.gray};
    }
`;