import { FC, useState } from 'react';
import { Subtitle } from 'styled';
import { UiButton, UiInput, UiCheckbox } from 'ui';
import { FilterBlock, FilterBlockDate, FilterContainer, FilterLabel, FilterLine } from '../styled';

type IFilterContractsProps = {
   handleSubmit: (isDrafted: boolean, isSigned: boolean, isClosed: boolean) => void;
}
export const FilterContracts: FC<IFilterContractsProps> = (props) => {
   let [isDrafted, setIsDrafted] = useState(false);
   let [isSigned, setIsSigned] = useState(false);
   let [isClosed, setIsClosed] = useState(false);

   const sendRes = () => {
      console.log(
         isDrafted,
         isSigned,
         isClosed,
      );
      props.handleSubmit(isDrafted, isSigned, isClosed);
   };

   return (
      <FilterContainer>
         <Subtitle>Фильтровать по</Subtitle>
         <FilterLine>
            <FilterBlock>
               <FilterLabel>по состоянию:</FilterLabel>
               <div>
                  <UiCheckbox label={'Составлен'} checked={isDrafted} onChange={() => setIsDrafted(!isDrafted)} />
               </div>
               <div>
                  <UiCheckbox label={'Подписан'} checked={isSigned} onChange={() => setIsSigned(!isSigned)} />
               </div>
               <div>
                  <UiCheckbox label={'Закрыт'} checked={isClosed} onChange={() => setIsClosed(!isClosed)} />
               </div>
            </FilterBlock>
            <UiButton label={'Применить'} onClick={sendRes} />
         </FilterLine>
      </FilterContainer>
   );
};