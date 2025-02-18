import {FC, useState} from 'react';
import { UiButton, UiCheckbox, UiInput } from 'ui';
import { Subtitle } from 'styled';
import {FilterBlock, FilterBlockDate, FilterContainer, FilterLabel, FilterLine} from '../styled';

type IFilterTransactionsProps = {
   handleSubmit: (transactionTypeGet: boolean, transactionTypePost: boolean, dateFrom: string, dateTo: string) => void;
}
export const FilterTransactions: FC<IFilterTransactionsProps> = (props) => {
   let [transactionTypeGet, setTransactionTypeGet] = useState<boolean>(true);
   let [transactionTypePost, setTransactionTypePost] = useState<boolean>(true);
   let [dateFrom, setDateFrom] = useState('');
   let [dateTo, setDateTo] = useState('');

   const sendRes = () => {
      console.log(
         transactionTypeGet,
         transactionTypePost,
         dateFrom,
         dateTo,
      );
     props.handleSubmit(transactionTypeGet, transactionTypePost, dateFrom, dateTo);
   };

   return (
      <FilterContainer>
         <Subtitle>Фильтровать по</Subtitle>
         <FilterLine>
            <FilterBlock>
               <FilterLabel>по типу:</FilterLabel>
               <UiCheckbox label={'Поступления'} checked={transactionTypeGet}
                           onChange={() => setTransactionTypeGet(!transactionTypeGet)} />
               <UiCheckbox label={'Затраты'} checked={transactionTypePost}
                           onChange={() => setTransactionTypePost(!transactionTypePost)} />
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