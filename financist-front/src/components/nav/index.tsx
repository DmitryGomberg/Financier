import { FC } from 'react';
import logo from 'assets/logo.png';
import { NotificationsNone, Search } from '@mui/icons-material';
import { NavCompany, NavContainer, NavLogo, Navnotifications, NavSearch } from 'components/nav/styled';
import { Link, useNavigate } from 'react-router-dom';
import { useFocus } from 'context';

export const Nav: FC = () => {
   const navigate = useNavigate();
   const { setFocusState } = useFocus();

   const handleSearchClick = () => {
      setFocusState(1);
      navigate('/contracts');
   };

   return (
      <NavContainer>
         <NavLogo>
            <Link to={'/'}>
               <img src={logo} alt="My Image" />
            </Link>
         </NavLogo>
         <NavCompany>ООО “Фина-Проминжиниринг”</NavCompany>
         <NavSearch onClick={handleSearchClick}>
            <Search />
         </NavSearch>
         {/*<Navnotifications onClick={() => navigate('/notifications')}>*/}
         {/*   <NotificationsNone />*/}
         {/*   <span>2</span>*/}
         {/*</Navnotifications>*/}
      </NavContainer>
   );
};