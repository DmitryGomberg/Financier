import { FC } from 'react';
import { TableContractsContainer } from './styled';
import { useNavigate } from 'react-router-dom';
import { formatDateDots, formatPrice, IContractTypes } from 'utils';
import { UiTable } from 'ui/Table';

type ITableContractsProps = {
   headers: string[];
   data: IContractTypes[];
}

export const TableContracts: FC<ITableContractsProps> = ({ headers, data }) => {
   const navigate = useNavigate();
   const handleRowClick = (contract: IContractTypes) => {
      navigate(`/contracts/${contract.id}`);
   };

   const getRowData = (contract: IContractTypes) => [
      contract.name,
      contract.number,
      contract.customerName,
      contract.executorName,
      formatPrice(String(contract.price)),
      `${contract.deadline} ${contract.deadlineType === 'work' ? 'рабочих' : 'календарных'} дней`,
      contract.dateOfClose ? 'закрыт' : contract.dateOfWrite ? 'подписан' : 'создан',
      contract.dateOfWrite ? formatDateDots(contract.dateOfWrite) : '-',
      contract.dateOfClose ? formatDateDots(contract.dateOfClose) : '-',
   ];

   return (
      <TableContractsContainer>
         <UiTable headers={headers} data={data} getRowData={getRowData} onRowClick={handleRowClick} />
      </TableContractsContainer>
   );
};