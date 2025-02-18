import {FC, useCallback, useEffect, useState} from 'react';
import {UiButton, UiInput} from 'ui';
import {FilterContracts, TableContracts} from 'components';
import {Title} from 'styled';
import {ContractsPageContainer, ContractsPageHeader, ContractsPageSearch} from './styled';
import {log} from "node:util";
import {IContractTypes} from "../../utils";

export const ContractsPage: FC = () => {
   let [activeFilter, setActiveFilter] = useState(false);
   let [searchValue, setSearchValue] = useState('');
   const [contracts, setContracts] = useState<IContractTypes[]>([]);
   const [contractsFiltered, setContractsFiltered] = useState<IContractTypes[]>([]);

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

   const handleFilter = (isDrafted?: boolean, isSigned?: boolean, isClosed?: boolean) => {
      let filtered = contracts;

      if (isDrafted || isSigned || isClosed) {
         filtered = contracts.filter((contract: IContractTypes) => {
            return (isDrafted && contract.dateOfCreate && !contract.dateOfWrite && !contract.dateOfClose)
               || (isSigned && contract.dateOfCreate && contract.dateOfWrite && !contract.dateOfClose)
               || (isClosed && contract.dateOfCreate && contract.dateOfWrite && contract.dateOfClose);
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
      handleFilter(activeFilter, activeFilter, activeFilter);
   }, [searchValue, activeFilter, contracts]);

   return (
      <ContractsPageContainer>
         <ContractsPageHeader>
            <Title>Договоры</Title>
            <ContractsPageSearch>
               <UiInput onChange={(text) => setSearchValue(text)} value={searchValue} placeholder={'Найти...'} />
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