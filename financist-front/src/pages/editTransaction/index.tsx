import {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {EditTransactionPageButtons, EditTransactionPageContainer, EditTransactionPageLine, EditTransactionPageType} from './styled';
import {RadioCheckboxWrapper, Subtitle, Title} from '../../styled';
import {UiRadio} from 'ui/Radio';
import {UiDropdown} from 'ui/Dropdown';
import {UiInput} from 'ui/Input';
import {UiButton} from 'ui/Button';
import {ETransactionType, formatDateForMySQL, IContractTypes} from "utils";
import { format } from 'date-fns';

export const EditTransactionPage: FC = () => {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   let [type, setType] = useState<ETransactionType>(ETransactionType.get);
   let [category, setCategory] = useState<IContractTypes>();
   let [date, setDate] = useState<string>('');
   let [sum, setSum] = useState<string>('');
   let [descr, setDescr] = useState<string>('');
   let [provider, setProvider] = useState<string>('');
   const [contracts, setContracts] = useState([]);

   useEffect(() => {
      const fetchContracts = async () => {
         try {
            const response = await fetch('http://localhost:4565/contracts/', {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               }
            });
            if (!response.ok) {
               throw new Error(`Ошибка при получении договоров: ${response.status}`);
            }

            const data = await response.json();
            setContracts(data);
         } catch (error) {
            console.error(error);
         }
      };

      fetchContracts();
   }, []);

   useEffect(() => {
      const fetchTransactionData = async () => {
         try {
            const response = await fetch(`http://localhost:4565/transactions/${id}`, {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               }
            });
            if (!response.ok) {
               throw new Error(`Ошибка при получении договоров: ${response.status}`);
            }
            const data = await response.json();
            setType(data.type === 'get' ? ETransactionType.get : ETransactionType.send);
            setDate(format(new Date(data.date), 'yyyy-MM-dd'));
            setSum(data.price);
            setDescr(data.description);
            setProvider(data.provider);

            const contract = contracts.find((contract: IContractTypes) => contract.id === data.contractId);
            setCategory(contract);
         } catch (error) {
            console.error(error);
         }
      };

      fetchTransactionData();
   }, [id, contracts]);

   const validateFields = () => {
      if (!category) {
         alert('Выберите договор');
         return false;
      }
      if (!date) {
         alert('Введите дату');
         return false;
      }
      if (!sum || isNaN(Number(sum)) || Number(sum) <= 0) {
         alert('Введите корректную сумму');
         return false;
      }
      return true;
   };

   const handleSave = () => {
      if (!validateFields()) {
         return;
      }

      const updatedTransaction = {
         id: Date.now(),
         type: type === ETransactionType.get ? 'get' : 'send',
         contractId: category?.id,
         date: formatDateForMySQL(new Date(date)),
         price: Number(sum),
         description: descr,
         provider: provider,
      };

      fetch(`http://localhost:4565/transactions/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(updatedTransaction)
      })
         .then(response => response.json())
         .then(() => {
            alert('Запись успешно изменена');
            navigate('/journal');
         });
   };

   const handleDelete = () => {
      let agreement = window.confirm('Вы уверены, что хотите удалить запись?');
      if (!agreement) return;
      fetch(`http://localhost:4565/transactions/${id}`, {
         method: 'DELETE'
      })
         .then(() => {
            alert('Запись успешно удалена');
            navigate('/journal');
         });
   };


   const handleRadioMore = () => {
      setType(ETransactionType.get);
   };
   const handleRadioLess = () => {
      setType(ETransactionType.send);
   };

   return (
      <EditTransactionPageContainer>
         <Title>Редактировать запись</Title>
         <EditTransactionPageType>
            <Subtitle>Выберите тип записи</Subtitle>
            <RadioCheckboxWrapper>
               <UiRadio label={'Поступление'} checked={type === ETransactionType.get} onChange={handleRadioMore} />
               <UiRadio label={'Затраты'} checked={type === ETransactionType.send} onChange={handleRadioLess} />
            </RadioCheckboxWrapper>
         </EditTransactionPageType>
         <UiDropdown
            items={contracts.slice().reverse()}
            onSelect={(item) => setCategory(item)}
            placeholder={'Выберите вариант из списка'}
            label={'Выберите договор'}
            selectedItem={category}
         />
         <EditTransactionPageLine>
            <UiInput type={'date'} value={date} onChange={(text) => setDate(text)} label={'Дата'} />
            <UiInput type={'number'} value={sum} onChange={(val) => {
               setSum(val);
            }} label={'Сумма'} />
         </EditTransactionPageLine>
         <EditTransactionPageLine>
            <UiInput onChange={(text) => setDescr(text)} value={descr} label={'Примечание'}
                     placeholder={'Введите примечание'} />
            <UiInput onChange={(text) => setProvider(text)} value={provider} label={'Поставщик'}
                     placeholder={'Введите поставщика'} />
         </EditTransactionPageLine>
         <EditTransactionPageButtons>
            <UiButton label={'Сохранить изменения'} onClick={handleSave} />
            <UiButton label={'Удалить запись'} onClick={handleDelete} />
         </EditTransactionPageButtons>
      </EditTransactionPageContainer>
   );
};