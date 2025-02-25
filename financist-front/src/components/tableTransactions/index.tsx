import { FC } from 'react';
import { TableTransactionsContainer } from './styled';
import { formatDateDots, formatPrice, ITransactionTypes } from 'utils';
import { UiTable } from 'ui/Table';
import { useNavigate } from 'react-router-dom';
import { Edit } from '@mui/icons-material';

type ITableTransactionsProps = {
   headers: string[];
   data: ITransactionTypes[];
   contracts: any[];
}

export const TableTransactions: FC<ITableTransactionsProps> = (props) => {
   const navigate = useNavigate();

   const getRowData = (transaction: ITransactionTypes) => {
      const contract = props.contracts?.find(c => c.id === transaction.contractId);
      if (!transaction || !contract) {
         return [];
      }
      return [
         contract.name,
         contract.number,
         transaction.type === 'get' ? 'Поступление' : 'Списание',
         transaction.description,
         contract.executorName,
         formatPrice(String(transaction.price)),
         formatDateDots(transaction.date),
         <Edit onClick={() => navigate(`/transaction/${transaction.id}/edit`)} style={{ cursor: 'pointer' }} />
      ];
   };

   return (
      <TableTransactionsContainer>
         <UiTable headers={[...props.headers, 'Ред.']} data={props.data} getRowData={getRowData} />
      </TableTransactionsContainer>
   );
};