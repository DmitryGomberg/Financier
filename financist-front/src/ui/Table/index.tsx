import { FC, useState } from 'react';
import { UiTableContainer, UiTableHeader, UiTableRow, UiTableCell, ArrowDropUp } from './styled';
import { ArrowDropDown } from "@mui/icons-material";
import { isDate, isNumeric } from 'utils';

type UiTableProps = {
   headers: string[];
   data: string[][];
};

type SortConfig = {
   key: string;
   direction: 'ascending' | 'descending';
};

export const UiTable: FC<UiTableProps> = ({ headers, data }) => {
   const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

   const sortedData = [...data];
   if (sortConfig !== null) {
      sortedData.sort((a, b) => {
         let aValue = a[headers.indexOf(sortConfig.key)].replace(/\s+/g, '');
         let bValue = b[headers.indexOf(sortConfig.key)].replace(/\s+/g, '');

         console.log(aValue + ' ' + isDate(aValue));
         console.log(bValue + ' ' + isDate(bValue));

         if (isNumeric(aValue) && isNumeric(bValue)) {
            return sortConfig.direction === 'ascending'
               ? parseFloat(aValue) - parseFloat(bValue)
               : parseFloat(bValue) - parseFloat(aValue);
         }

         if (isDate(aValue) && isDate(bValue)) {
            const dateA = new Date(aValue.split('.').reverse().join('-'));
            const dateB = new Date(bValue.split('.').reverse().join('-'));
            console.log(dateA, dateB);
            return sortConfig.direction === 'ascending' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
         }

         if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
         }
         if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
         }
         return 0;
      });
   }

   const requestSort = (key: string) => {
      let direction: 'ascending' | 'descending' = 'ascending';
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
         direction = 'descending';
      }
      setSortConfig({ key, direction });
   };

   if (data.length === 0) return <div>Нет данных</div>;

   return (
      <UiTableContainer>
         <thead>
            <UiTableRow>
               {headers.map((header) => (
                  <UiTableHeader key={header} onClick={() => requestSort(header)}>
                     {header}
                  </UiTableHeader>
               ))}
            </UiTableRow>
         </thead>
         <tbody>
            {sortedData.map((row, rowIndex) => (
               <UiTableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                     <UiTableCell key={cellIndex}>{cell || '-'}</UiTableCell>
                  ))}
               </UiTableRow>
            ))}
         </tbody>
      </UiTableContainer>
   );
};