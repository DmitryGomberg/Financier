import { FC } from 'react';
import {
   NotificationsPageContainer,
   NotificationsPageItem, NotificationsPageItemDate,
   NotificationsPageItemIcon,
   NotificationsPageItemText,
   NotificationsPageList,
} from './styled';
import { Title } from 'styled';
import { PriorityHigh } from '@mui/icons-material';

export const NotificationsPage: FC = () => {
   return (
      <NotificationsPageContainer>
         <Title>Уведомления</Title>
         <NotificationsPageList>
            <NotificationsPageItem>
               <NotificationsPageItemIcon><PriorityHigh /></NotificationsPageItemIcon>
               <NotificationsPageItemText>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, eos ex
                  perspiciatis quam repudiandae sed sint totam velit? </NotificationsPageItemText>
               <NotificationsPageItemDate>17.01.2025</NotificationsPageItemDate>
            </NotificationsPageItem>
            <NotificationsPageItem read>
               <NotificationsPageItemIcon><PriorityHigh /></NotificationsPageItemIcon>
               <NotificationsPageItemText>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, eos ex
                  perspiciatis quam repudiandae sed sint totam velit? </NotificationsPageItemText>
               <NotificationsPageItemDate>17.01.2025</NotificationsPageItemDate>
            </NotificationsPageItem>
         </NotificationsPageList>
      </NotificationsPageContainer>
   );
};