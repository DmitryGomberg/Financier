import {FC, useEffect, useState} from 'react';
import { Title } from 'styled';
import { UiButton } from 'ui/Button';
import { JournalPageContainer, JournalPageHeader } from './styled';
import { FilterTransactions } from 'components/filters';
import { TableTransactions } from 'components/tableTransactions';

export const JournalPage: FC = () => {
   let [activeFilter, setActiveFilter] = useState(false);
   const [transactions, setTransactions] = useState([]);
   const [transactionsFiltered, setTransactionsFiltered] = useState([]);
   const [contracts, setContracts] = useState<any>([]);

   useEffect(() => {
      const fetchTransactions = async () => {
         try {
            const response = await fetch('http://localhost:4565/transactions', {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               }
            });
            if (!response.ok) {
               throw new Error(`Ошибка при получении записи: ${response.status}`);
            }
            const data = await response.json();
            setTransactions(data);
         } catch (error) {
            console.error(error);
         }
      };
      const fetchContracts = async () => {
         try {
            const response = await fetch(`http://localhost:4565/contracts/`);
            if (!response.ok) {
               throw new Error(`Error fetching contract: ${response.status}`);
            }
            const data = await response.json();
            setContracts(data);
            console.log(data);
         } catch (error) {
            console.error(error);
         }
      };

      fetchContracts();
      fetchTransactions();
   }, []);

   const handleFilter = (transactionTypeGet: boolean, transactionTypePost: boolean, dateFrom: string, dateTo: string) => {
      const filtered = transactions.filter((transaction: any) => {
         const transactionDate = new Date(transaction.date);
         const fromDate = dateFrom ? new Date(dateFrom) : null;
         const toDate = dateTo ? new Date(dateTo) : null;

         if (fromDate) {
            fromDate.setHours(fromDate.getHours() - 3);
         }
         if (toDate) {
            toDate.setHours(toDate.getHours() - 3);
         }

         const isTypeMatch = (transactionTypeGet && transaction.type === 'get') || (transactionTypePost && transaction.type === 'send');
         const isDateMatch = (!fromDate || transactionDate >= fromDate) && (!toDate || transactionDate <= toDate);

         return isTypeMatch && isDateMatch;
      });

      setTransactionsFiltered(filtered);
   };

   return (
      <JournalPageContainer>
         <JournalPageHeader>
            <Title>Журнал</Title>
            <UiButton label={'Фильтровать'} onClick={() => {
               setActiveFilter(!activeFilter);
            }} />
         </JournalPageHeader>
         {activeFilter && <FilterTransactions handleSubmit={handleFilter}/>}
         <TableTransactions data={activeFilter ? transactionsFiltered : transactions} contracts={contracts} />
      </JournalPageContainer>
   );
};