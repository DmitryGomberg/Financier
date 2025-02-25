import {FC, useEffect, useState} from 'react';
import {ETransactionType, formatDateForMySQL, IContractTypes, ITransactionTypes} from 'utils';
import {UiRadio} from 'ui/Radio';
import {UiDropdown} from 'ui/Dropdown';
import {UiInput} from 'ui/Input';
import {UiButton} from 'ui/Button';
import {CreateTransactionPageContainer, CreateTransactionPageLine, CreateTransactionPageType} from './styled';
import {RadioCheckboxWrapper, Subtitle, Title} from '../../styled';
import {useNavigate} from "react-router-dom";

export const CreateTransactionPage: FC = () => {
   let [type, setType] = useState<ETransactionType>(ETransactionType.get);
   let [category, setCategory] = useState<IContractTypes>();
   let [date, setDate] = useState<string>('');
   let [sum, setSum] = useState<string>('');
   let [descr, setDescr] = useState<string>('');
   let [provider, setProvider] = useState<string>('');
   let [error, setError] = useState(false);
   const [contracts, setContracts] = useState([]);

   const handleRadioMore = () => {
      setType(ETransactionType.get);
   };
   const handleRadioLess = () => {
      setType(ETransactionType.send);
   };

   useEffect(() => {
      const fetchContracts = async () => {
         try {
            const response = await fetch('http://localhost:4565/contracts/names', {
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

   const addTransaction = async (transaction: ITransactionTypes) => {
      try {
         const response = await fetch('http://localhost:4565/transactions', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),
         });

         if (!response.ok) {
            throw new Error(`Ошибка при добавлении транзакции: ${response.status}`);
         } else {
            setSum('');
            setDescr('');
            alert('Транзакция добавлена');
            setError(false)
         }
      } catch (error) {
         console.error('Ошибка:', error);
      }
   };

   function validate(){
      if (!category || !date || !sum){
         alert('Заполните обязательные поля');
         setError(true);
         return false
      }
      return true
   }

   const handleClick = () => {
      if (validate()) {
         if (category) {
            const transaction = {
               id: Date.now(),
               type: type === ETransactionType.get ? 'get' : 'send',
               contractId: category.id,
               date: formatDateForMySQL(new Date(date)),
               price: Number(sum),
               description: descr,
               provider: provider,
            };

            addTransaction(transaction);
         }
      }
   }

   return (
      <CreateTransactionPageContainer>
         <Title>Добавить запись +</Title>
         <CreateTransactionPageType>
            <Subtitle>Выберите тип записи</Subtitle>
            <RadioCheckboxWrapper>
               <UiRadio label={'Поступление'} checked={type === ETransactionType.get} onChange={handleRadioMore} />
               <UiRadio label={'Затраты'} checked={type === ETransactionType.send} onChange={handleRadioLess} />
            </RadioCheckboxWrapper>
         </CreateTransactionPageType>
         <UiDropdown
            items={contracts.slice().reverse()}
            onSelect={(item) => setCategory(item)}
            placeholder={'Выберите вариант из списка'}
            label={'Выберите договор'}
            validated={error}
         />
         <CreateTransactionPageLine>
            <UiInput
               type={'date'}
               value={date}
               onChange={(text) => setDate(text)}
               label={'Дата'}
               validated={error}
            />
            <UiInput
               type={'number'}
               value={sum}
               placeholder={'0'}
               onChange={(val) => setSum(val)}
               label={'Сумма'}
               validated={error} />
         </CreateTransactionPageLine>
         <CreateTransactionPageLine>
            <UiInput
               onChange={(text) => setDescr(text)}
               value={descr}
               label={'Примечание'}
               placeholder={'Введите примечание'}
               validated={error}
            />
            <UiInput
               onChange={(text) => setProvider(text)}
               value={provider}
               label={'Поставщик'}
               placeholder={'Введите поставщика'}
               validated={error}
            />
         </CreateTransactionPageLine>
         <UiButton label={'Создать запись'} onClick={handleClick}/>
      </CreateTransactionPageContainer>
   );
};