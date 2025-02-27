import {FC, useEffect, useRef, useState} from 'react';
import { UiButton, UiInput } from 'ui';
import {FilterContracts, TableContracts} from 'components';
import { useFocus } from 'context';
import { IContractTypes } from 'utils';
import { Title } from 'styled';
import { ContractsPageContainer, ContractsPageHeader, ContractsPageSearch } from './styled';

export const ContractsPage: FC = () => {
   let [activeFilter, setActiveFilter] = useState(false);
   let [searchValue, setSearchValue] = useState('');
   const [contracts, setContracts] = useState<IContractTypes[]>([]);
   const [contractsFiltered, setContractsFiltered] = useState<IContractTypes[]>([]);
   const { focusState, setFocusState } = useFocus();
   const searchInputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      if (focusState === 1 && searchInputRef.current) {
         searchInputRef.current.focus();
         setFocusState(0);
      }
   }, [focusState, setFocusState]);

   useEffect(() => {
      const fetchContracts = async () => {
         try {
            const response = await fetch(`http://localhost:4565/contracts/`);
            if (!response.ok) {
               throw new Error(`Error fetching contract: ${response.status}`);
            }
            const data = await response.json();
            setContracts(data);
            setContractsFiltered(data);
         } catch (error) {
            console.error(error);
         }
      };

      fetchContracts();
   }, []);

   const handleFilter = (isDrafted?: boolean, isSigned?: boolean, isClosed?: boolean, dateFrom?: string, dateTo?: string) => {
      let filtered = contracts;

      if (isDrafted || isSigned || isClosed) {
         filtered = filtered.filter((contract: IContractTypes) => {
            return (isDrafted && contract.dateOfCreate && !contract.dateOfWrite && !contract.dateOfClose)
               || (isSigned && contract.dateOfCreate && contract.dateOfWrite && !contract.dateOfClose)
               || (isClosed && contract.dateOfCreate && contract.dateOfWrite && contract.dateOfClose);
         });
      }

      if(dateFrom && dateTo){
         filtered = filtered.filter((contract: any) => {
            const transactionDate = new Date(contract.dateOfWrite);
            const fromDate = dateFrom ? new Date(dateFrom) : null;
            const toDate = dateTo ? new Date(dateTo) : null;

            if (fromDate) {
               fromDate.setHours(fromDate.getHours() - 3);
            }
            if (toDate) {
               toDate.setHours(toDate.getHours() - 3);
            }

            const isDateMatch = (!fromDate || transactionDate >= fromDate) && (!toDate || transactionDate <= toDate);

            return isDateMatch;
         });
      }

      if (searchValue) {
         filtered = filtered.filter((contract: IContractTypes) => {
            return (contract.name?.toLowerCase().includes(searchValue.toLowerCase()))
               || (contract.customerName?.toLowerCase().includes(searchValue.toLowerCase()))
               || (contract.executorName?.toLowerCase().includes(searchValue.toLowerCase()))
               || (contract.number?.toLowerCase().includes(searchValue.toLowerCase()));
         });
      }

      setContractsFiltered(filtered);
   };

   useEffect(() => {
      handleFilter(activeFilter, activeFilter, activeFilter, '', '');
   }, [searchValue, activeFilter, contracts]);


   return (
      <ContractsPageContainer>
         <ContractsPageHeader>
            <Title>Договоры</Title>
            <ContractsPageSearch>
               <UiInput onChange={(text) => setSearchValue(text)} value={searchValue} placeholder={'Найти...'} ref={searchInputRef}/>
            </ContractsPageSearch>
            <UiButton label={'Фильтровать'} onClick={() => {
               setActiveFilter(!activeFilter);
            }} />
         </ContractsPageHeader>
         {activeFilter && <FilterContracts handleSubmit={handleFilter} />}
         <TableContracts
            headers={['Название', 'Номер договора', 'Заказчик', 'Исполнитель', 'Сумма', 'Срок выполнения работ', 'Состояние договора', 'Дата подписания', 'Дата закрытия']}
            data={contractsFiltered}
         />
      </ContractsPageContainer>
   );
};