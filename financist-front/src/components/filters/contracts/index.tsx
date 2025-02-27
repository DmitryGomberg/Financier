import { FC, useState } from 'react';
import { Subtitle } from 'styled';
import { UiButton, UiInput, UiCheckbox } from 'ui';
import { FilterBlock, FilterBlockDate, FilterContainer, FilterLabel, FilterLine } from '../styled';

type IFilterContractsProps = {
   handleSubmit: (isDrafted: boolean, isSigned: boolean, isClosed: boolean, dateFrom: string, dateTo: string) => void;
}
export const FilterContracts: FC<IFilterContractsProps> = (props) => {
   let [isDrafted, setIsDrafted] = useState(false);
   let [isSigned, setIsSigned] = useState(false);
   let [isClosed, setIsClosed] = useState(false);
   let [dateFrom, setDateFrom] = useState('');
   let [dateTo, setDateTo] = useState('');

   const sendRes = () => {
      props.handleSubmit(isDrafted, isSigned, isClosed, dateFrom, dateTo);
   };

   return (
      <FilterContainer>
         <Subtitle>Фильтровать по</Subtitle>
         <FilterLine>
            <FilterBlock>
               <FilterLabel>по состоянию:</FilterLabel>
               <div>
                  <UiCheckbox label={'Создан'} checked={isDrafted} onChange={() => setIsDrafted(!isDrafted)} />
               </div>
               <div>
                  <UiCheckbox label={'Подписан'} checked={isSigned} onChange={() => setIsSigned(!isSigned)} />
               </div>
               <div>
                  <UiCheckbox label={'Закрыт'} checked={isClosed} onChange={() => setIsClosed(!isClosed)} />
               </div>
            </FilterBlock>
            <FilterBlock>
               <FilterLabel>по времени:</FilterLabel>
               <FilterBlockDate>
                  с
                  <UiInput type={'date'} label={''} onChange={(text) => {
                     setDateFrom(text);
                  }} value={dateFrom} />
                  по
                  <UiInput type={'date'} label={''} onChange={(text: string) => {
                     setDateTo(text);
                  }} value={dateTo} />
               </FilterBlockDate>
            </FilterBlock>
            <UiButton label={'Применить'} onClick={sendRes} />
         </FilterLine>
      </FilterContainer>
   );
};