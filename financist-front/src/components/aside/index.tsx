import React, {FC, useEffect, useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
   AccessTimeFilled,
   Add,
   ArrowBack,
   Assessment,
   InsertDriveFile,
   Notifications
} from '@mui/icons-material';
import { UiButton } from 'ui/Button';
import {AsideArrow, AsideButtons, AsideContainer, AsideLink, AsideLinks} from './styled';

export const Aside: FC = () => {
   const navigate = useNavigate();
   const locate = useLocation();
   const [active, setActive] = useState(true);

   useEffect(() => {
      const sidebarState = localStorage.getItem('sidebarOpened');
      setActive(sidebarState === 'true');
   }, []);

   const handleClick = () => {
      const newActiveState = !active;
      setActive(newActiveState);
      localStorage.setItem('sidebarOpened', newActiveState.toString());
   };

   return (
      <AsideContainer active={active}>
         <AsideArrow active={active} onClick={handleClick}>
            <ArrowBack />
         </AsideArrow>
         <AsideLinks active={active}>
            <AsideLink active={locate.pathname === '/analytics'} openedSidebar={active}>
               <Link to="/analytics"><Assessment />Аналитика</Link>
            </AsideLink>
            <AsideLink active={locate.pathname === '/contracts'} openedSidebar={active}>
               <Link to="/contracts"><InsertDriveFile />Договоры</Link>
            </AsideLink>
            <AsideLink active={locate.pathname === '/journal'} openedSidebar={active}>
               <Link to="/journal"><AccessTimeFilled />Журнал</Link>
            </AsideLink>
            <AsideLink active={locate.pathname === '/notifications'} openedSidebar={active}>
               <Link to="/notifications"><Notifications />{active ? 'Уведомления' : 'Уведомл.'}
                  <span>2</span>
               </Link>
            </AsideLink>
         </AsideLinks>
         <AsideButtons openedSidebar={active}>
            <UiButton label={'Добавить договор'} contentLeft={<Add />}
                      onClick={() => navigate('/contracts/create')} />
            <UiButton label={'Добавить запись'} contentLeft={<Add />} onClick={() => navigate('/')} />
         </AsideButtons>
      </AsideContainer>
   );
};
