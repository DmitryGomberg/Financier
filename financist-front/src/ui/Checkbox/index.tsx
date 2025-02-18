import { FC } from 'react';
import { UiCheckboxContainer, UiCheckboxLabel, UiCheckboxMain } from './styled';
import { Check } from '@mui/icons-material';

type IUiCheckboxProps = {
   label: string;
   checked: boolean;
   onChange(): void;
};

export const UiCheckbox: FC<IUiCheckboxProps> = (props) => {
   return (
      <UiCheckboxContainer onClick={props.onChange}>
         <UiCheckboxMain active={props.checked.toString()}>
            <Check />
         </UiCheckboxMain>
         <UiCheckboxLabel>{props.label}</UiCheckboxLabel>
      </UiCheckboxContainer>
   );
};