import { FC } from 'react';
import { UiTableContainer, UiTableHeader, UiTableRow, UiTableCell } from './styled';

type UiTableProps = {
   headers: string[];
   data: string[][];
};

export const UiTable: FC<UiTableProps> = ({ headers, data }) => {
   if (data.length === 0) return <div>Нет данных</div>;
   return (
      <UiTableContainer>
         <thead>
         <UiTableRow>
            {headers.map((header, index) => (
               <UiTableHeader key={index}>{header}</UiTableHeader>
            ))}
         </UiTableRow>
         </thead>
         <tbody>

         {data.map((row, rowIndex) => (
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