import {FC, useState, useEffect, ReactNode} from 'react';
import { UiTableContainer, UiTableHeader, UiTableRow, UiTableCell, ArrowDropUp } from './styled';
import { ArrowDropDown } from "@mui/icons-material";
import { isDate, isNumeric } from 'utils';

type UiTableProps<T> = {
   headers: string[];
   data: T[];
   getRowData: (item: T) => (string | number | null | ReactNode)[];
   onRowClick?: (item: T) => void;
};

type SortConfig = {
   key: string;
   direction: 'ascending' | 'descending';
};

export const UiTable: FC<UiTableProps<any>> = ({ headers, data, getRowData, onRowClick }) => {
   const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
   const [sortedData, setSortedData] = useState([...data].reverse());

   useEffect(() => {
      if (sortConfig === null) {
         setSortedData([...data].reverse());
      } else {
         const sorted = [...data].sort((a, b) => {
            const aValue = String(getRowData(a)[headers.indexOf(sortConfig.key)]).replace(/\s+/g, '');
            const bValue = String(getRowData(b)[headers.indexOf(sortConfig.key)]).replace(/\s+/g, '');

            if (isNumeric(aValue) && isNumeric(bValue)) {
               return sortConfig.direction === 'ascending'
                  ? parseFloat(aValue) - parseFloat(bValue)
                  : parseFloat(bValue) - parseFloat(aValue);
            }

            if ((aValue.includes('рабочихдней') || bValue.includes('календарныхдней')) || (aValue.includes('рабочихдней') || bValue.includes('календарныхдней'))) {
               const aDays = parseInt(aValue.replace(/\D/g, ''), 10);
               const bDays = parseInt(bValue.replace(/\D/g, ''), 10);
               return sortConfig.direction === 'ascending' ? aDays - bDays : bDays - aDays;
            }

            if (isDate(aValue) && isDate(bValue)) {
               const dateA = new Date(aValue.split('.').reverse().join('-'));
               const dateB = new Date(bValue.split('.').reverse().join('-'));
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
         setSortedData(sorted);
      }
   }, [data, sortConfig, getRowData, headers]);

   const requestSort = (key: string) => {
      let direction: 'ascending' | 'descending' = 'ascending';
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
         direction = 'descending';
      }
      setSortConfig({ key, direction });
   };

   const getSortIcon = (key: string) => {
      if (!sortConfig || sortConfig.key !== key) {
         return null;
      }
      return sortConfig.direction === 'ascending' ? <ArrowDropUp /> : <ArrowDropDown />;
   };

   if (data.length === 0) return <div>Нет данных</div>;

   return (
      <UiTableContainer>
         <thead>
         <UiTableRow>
            {headers.map((header) => (
               <UiTableHeader key={header} onClick={() => requestSort(header)}>
                  {header} {getSortIcon(header)}
               </UiTableHeader>
            ))}
         </UiTableRow>
         </thead>
         <tbody>
         {sortedData.map((item, rowIndex) => (
            <UiTableRow key={rowIndex} clickable={!!onRowClick} onClick={() => onRowClick && onRowClick(item)}>
               {getRowData(item).map((cell, cellIndex) => (
                  <UiTableCell key={cellIndex}>{cell || '-'}</UiTableCell>
               ))}
            </UiTableRow>
         ))}
         </tbody>
      </UiTableContainer>
   );
};