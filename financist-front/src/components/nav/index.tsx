import { FC } from 'react';
import logo from 'assets/logo.png';
import { NotificationsNone, Search } from '@mui/icons-material';
import { NavCompany, NavContainer, NavLogo, Navnotifications, NavSearch } from 'components/nav/styled';
import { Link, useNavigate } from 'react-router-dom';

export const Nav: FC = () => {
   const navigate = useNavigate();
   return (
      <NavContainer>
         <NavLogo>
            <Link to={'/'}>
               <img src={logo} alt="My Image" />
            </Link>
         </NavLogo>
         <NavCompany>ООО “Фина-проминжиниринг”</NavCompany>
         <NavSearch>
            <Search />
         </NavSearch>
         <Navnotifications onClick={() => navigate('/notifications')}>
            <NotificationsNone />
            <span>2</span>
         </Navnotifications>
      </NavContainer>
   );
};