import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UiButton, UiTable } from 'ui';
import { BorderContainer, Subtitle, Title } from 'styled';
import { ContractPageOptions } from './options';
import { formatDateDots, formatPrice, getFileType, IStageTypes, ITransactionTypes } from 'utils';
import { ContractPageContainer, ContractPageFile, ContractPageFiles, ContractPageHeader, ContractPageRes, ContractPageResLine } from './styled';

const dayTypeMap = {
   0: 'календарных',
   1: 'рабочих'
};

export const ContractPage: FC = () => {
   const { id } = useParams<{ id: string }>();
   const [contract, setContract] = useState<any>();
   const [expenses, setExpenses] = useState<any>();
   const [receipts, setReceipts] = useState<any>();
   const [files, setFiles] = useState<string[]>([]);
   const navigate = useNavigate();

   const calculateTotal = (transactions: ITransactionTypes[]): number => {
      return transactions.reduce((total, transaction: ITransactionTypes) => total + parseFloat(String(transaction.price)), 0);
   };
   const calculateRemainingBalance = (contractAmount: number, totalExpenses: number): number => {
      return contractAmount - totalExpenses;
   };

   useEffect(() => {
      const fetchContract = async () => {
         try {
            const response = await fetch(`http://localhost:4565/contracts/${id}`);
            if (!response.ok) {
               throw new Error(`Error fetching contract: ${response.status}`);
            }
            const data = await response.json();
            setContract(data);
         } catch (error) {
            console.error(error);
         }
      };
      const fetchExpenses = async () => {
         try {
            const response = await fetch(`http://localhost:4565/contracts/${id}/expenses`);
            if (!response.ok) {
               throw new Error(`Error fetching expenses: ${response.status}`);
            }
            const data = await response.json();
            setExpenses(data);
         } catch (error) {
            console.error(error);
         }
      };
      const fetchReceipts = async () => {
         try {
            const response = await fetch(`http://localhost:4565/contracts/${id}/receipts`);
            if (!response.ok) {
               throw new Error(`Error fetching receipts: ${response.status}`);
            }
            const data = await response.json();
            setReceipts(data);
         } catch (error) {
            console.error(error);
         }
      };
      const fetchFiles = async () => {
         try {
            const response = await fetch(`http://localhost:4565/download/${id}`);
            if (!response.ok) {
               throw new Error(`Error fetching files: ${response.status}`);
            }
            const data = await response.json();
            setFiles(data.files);
         } catch (error) {
            console.error(error);
         }
      };

      fetchContract();
      fetchExpenses();
      fetchReceipts();
      fetchFiles();
   }, [id]);

   if (!contract) {
      return <div>Loading...</div>;
   }

   const getPaymentStageRowData = (stage: IStageTypes) => [
      stage.name,
      stage.percent,
      `${stage.time} ${dayTypeMap[stage.dayType]} дней`
   ];

   const getExpenseRowData = (expense: ITransactionTypes) => [
      formatDateDots(expense.date),
      expense.description,
      formatPrice(String(expense.price))
   ];

   const getReceiptRowData = (receipt: ITransactionTypes) => [
      formatDateDots(receipt.date),
      receipt.description,
      formatPrice(String(receipt.price))
   ];

   const totalExpenses = calculateTotal(expenses || []);
   const totalReceipts = calculateTotal(receipts || []);

   const handleEdit = () => {
      navigate(`${window.location.pathname}/edit`);
   }

   return (
      <ContractPageContainer>
         <ContractPageHeader>
            <Title>{contract.name}</Title>
            <UiButton label={'Редактировать'} onClick={handleEdit} />
         </ContractPageHeader>
         <ContractPageOptions contract={contract} />
         <Subtitle>Этапы оплаты</Subtitle>
         <UiTable headers={['Название', 'Процент от суммы %', 'Срок получения средств']} data={contract.payCondition || []} getRowData={getPaymentStageRowData} />

         <BorderContainer>
            <Subtitle>Поступления</Subtitle>
            <UiTable headers={['Дата', 'Описание', 'Сумма BYN']} data={receipts || []} getRowData={getReceiptRowData} />
            <ContractPageRes>
               <ContractPageResLine>Итого: {formatPrice(String(totalReceipts))} BYN</ContractPageResLine>
               <ContractPageResLine>Остаток: {formatPrice(String(calculateRemainingBalance(contract.price, totalReceipts)))} BYN</ContractPageResLine>
            </ContractPageRes>
         </BorderContainer>

         <BorderContainer>
            <Subtitle>Зарегистрированные затраты</Subtitle>
            <UiTable headers={['Дата', 'Описание', 'Сумма BYN']} data={expenses || []} getRowData={getExpenseRowData} />
            <ContractPageRes>
               <ContractPageResLine>Итого: {formatPrice(String(totalExpenses))} BYN</ContractPageResLine>
               <ContractPageResLine>Остаток: {formatPrice(String(calculateRemainingBalance(contract.price, totalExpenses)))} BYN</ContractPageResLine>
            </ContractPageRes>
         </BorderContainer>

         {files.length > 0 && <Subtitle>Документы</Subtitle>}
         <ContractPageFiles>
            {files.map((file, index) => (
               <ContractPageFile key={index}>
                  <span>{getFileType(file)}</span>
                  {file.substring(37)}
                  <a href={`http://localhost:4565/uploads/${file}`} download target={'_blank'}>Просмотр</a>
               </ContractPageFile>
            ))}
         </ContractPageFiles>
      </ContractPageContainer>
   );
};