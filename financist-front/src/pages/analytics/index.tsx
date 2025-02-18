import {FC, useEffect, useState} from 'react';
import {formatDateDashes, formatDateDots, formatPrice, IContractTypes, ITransactionTypes} from 'utils';
import {UiInput, UiTable} from 'ui';
import { Subtitle, Title } from 'styled';
import { AnalyticsPageBlock, AnalyticsPageContainer, AnalyticsPagePeriod, AnalyticsPagePeriodLine } from './styled';


export const AnalyticsPage: FC = () => {
   const today = new Date();
   const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

   let [dateFrom, setDateFrom] = useState(formatDateDashes(firstDayOfMonth));
   let [dateTo, setDateTo] = useState(formatDateDashes(today));
   let [contracts, setContracts] = useState<IContractTypes[]>([]);
   let [transactions, setTransactions] = useState<ITransactionTypes[]>([]);

   useEffect(() => {
      const fetchContractsByDateRange = async (dateFrom: string, dateTo: string) => {
         try {
            const response = await fetch(`http://localhost:4565/contracts/date-range?dateFrom=${dateFrom}&dateTo=${dateTo}`);
            if (!response.ok) {
               throw new Error(`Error fetching contracts: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setContracts(data);
         } catch (error) {
            console.error(error);
         }
      };
      const fetchTransactionsByDateRange = async (dateFrom: string, dateTo: string) => {
         try {
            const response = await fetch(`http://localhost:4565/transactions/date-range?dateFrom=${dateFrom}&dateTo=${dateTo}`);
            if (!response.ok) {
               throw new Error(`Error fetching transactions: ${response.status}`);
            }
            const data = await response.json();
            setTransactions(data);
         } catch (error) {
            console.error(error);
         }
      };

      fetchContractsByDateRange(dateFrom, dateTo);
      fetchTransactionsByDateRange(dateFrom, dateTo);
   }, [dateFrom, dateTo]);

   const getContractNameById = (contractId: number) => {
      const contract = contracts.find(contract => contract.id === contractId);
      return contract ? contract.name : 'Unknown';
   };

   const totalAmountSpent = transactions.reduce((total, transaction) => total + Number(transaction.price), 0);

   return (
      <AnalyticsPageContainer>
         <Title>Аналитика</Title>
         <AnalyticsPagePeriod>
            <Subtitle>Период</Subtitle>
            <AnalyticsPagePeriodLine>
               <div>
                  с
                  <UiInput type={'date'} label={''} onChange={(text) => {
                     setDateFrom(text);
                  }} value={dateFrom} />
               </div>
               <div>
                  по
                  <UiInput type={'date'} label={''} onChange={(text) => {
                     setDateTo(text);
                  }} value={dateTo} />
               </div>
            </AnalyticsPagePeriodLine>
         </AnalyticsPagePeriod>
          <AnalyticsPageBlock>
              <Subtitle>Подписано договоров за указанный период: {contracts.filter(contract => contract.dateOfWrite && (contract.dateOfWrite > dateFrom)).length}</Subtitle>
              <UiTable headers={['Название', 'Номер договора', 'Дата подписания']}
                       data={contracts.filter(contract => contract.dateOfWrite).reverse().map(contract => [
                          contract.name || '',
                          contract.number || '',
                          formatDateDots(contract.dateOfWrite|| '')
                       ])} />
          </AnalyticsPageBlock>
         <AnalyticsPageBlock>
            <Subtitle>Закрыто договоров за указанный период: {contracts.filter(contract => contract.dateOfClose && (contract.dateOfClose < dateTo)).length}</Subtitle>
            <UiTable headers={['Название', 'Номер договора', 'Дата закрытия']}
                     data={contracts.filter(contract => contract.dateOfClose && (contract.dateOfClose < dateTo)).reverse().map(contract => [
                        contract.name || '',
                        contract.number || '',
                        formatDateDots(contract.dateOfClose|| '')
                     ])} />
         </AnalyticsPageBlock>
         <AnalyticsPageBlock>
            <Subtitle>Потрачено всего средств: {formatPrice(totalAmountSpent.toString())}</Subtitle>
            <UiTable headers={['Контракт', 'Описание', 'Сумма', 'Дата']}
                     data={transactions.map(transaction => [
                        getContractNameById(transaction.contractId),
                        transaction.description || '',
                        formatPrice(transaction.price.toString()),
                        formatDateDots(transaction.date) || ''
                     ])} />
         </AnalyticsPageBlock>
      </AnalyticsPageContainer>
   );
};