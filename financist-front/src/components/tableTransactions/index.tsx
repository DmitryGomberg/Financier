import { FC } from 'react';
import { TableTransactionsContainer, TableTransactionsEdit } from './styled';
import { UiTableCell, UiTableHeader, UiTableRow } from 'ui/Table/styled';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {formatDateDots, formatPrice, IContractTypes, ITransactionTypes} from "../../utils";

type ITableTransactionsProps = {
   data: ITransactionTypes[];
   contracts: IContractTypes[];
}

export const TableTransactions: FC<ITableTransactionsProps> = (props) => {
   const navigate = useNavigate();
   const handleEdit = (id:number) => {
      navigate(`/transaction/${id}/edit`);
   };

   if (props.data.length === 0) return <div>Нет данных</div>;

   const transactionsData = props.data?.map((transaction) => {
      const contract = props.contracts?.find(c => c.id === transaction.contractId);
      return [
         contract?.name || '-',
         contract?.number || '-',
         transaction.type === 'get' ? 'Получение' : 'Списание',
         transaction.description || '-',
         transaction.provider || '-',
         formatPrice(String(transaction.price)),
         formatDateDots(transaction.date),
         transaction.id
      ];
   }) || [];

   return (
      <TableTransactionsContainer>
         <thead>
            <UiTableRow>
               <UiTableHeader key={1}>Наименование</UiTableHeader>
               <UiTableHeader key={1}>Номер договора</UiTableHeader>
               <UiTableHeader key={1}>Тип</UiTableHeader>
               <UiTableHeader key={1}>Описание</UiTableHeader>
               <UiTableHeader key={1}>Поставщик</UiTableHeader>
               <UiTableHeader key={1}>Сумма BYN</UiTableHeader>
               <UiTableHeader key={1}>Дата</UiTableHeader>
            </UiTableRow>
         </thead>
         <tbody>
            {transactionsData.reverse().map((row, rowIndex) => (
               <UiTableRow key={rowIndex}>
                  {row.slice(0, -1).map((cell, cellIndex) => (
                     <UiTableCell key={cellIndex}>{cell}</UiTableCell>
                  ))}
                  <TableTransactionsEdit onClick={()=> {
                     handleEdit(row[7] as number);
                  }}>
                     <Edit />
                  </TableTransactionsEdit>
               </UiTableRow>
            ))}
         </tbody>
      </TableTransactionsContainer>
   );
};