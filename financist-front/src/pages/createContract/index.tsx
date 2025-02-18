import React, { FC, useState } from 'react';
import { CreateContractPageContainer, CreateContractPageLine } from './styled';
import {RadioCheckboxWrapper, Subtitle, Title} from '../../styled';
import { UiButton } from 'ui/Button';
import { UiInput } from 'ui/Input';
import { UiRadio } from 'ui/Radio';
import { PayConditions } from './payConditions';
import {EDateType, IContractTypes, IStageTypes, formatDateForMySQL, validateStages, validateNames} from 'utils';

export const CreateContractPage: FC = () => {
   let [name, setName] = useState<string>('');
   let [num, setNum] = useState<string>('');
   let [customer, setCustomer] = useState<string>('');
   let [executor, setExecutor] = useState<string>('');
   let [sum, setSum] = useState<string>('0');
   let [date, setDate] = useState<string>('');
   let [timeDelivery, setTimeDelivery] = useState<string>('');
   let [timeDeliveryType, setTimeDeliveryType] = useState<EDateType>(EDateType.calendar);
   let [stages, setStages] = useState<IStageTypes[]>([]);
   let [error, setError] = useState(false);
   let [files, setFiles] = useState<File[]>([]);

   const addStage = () => {
      setStages([...stages, { id: Date.now(), name: '', percent: 0, time: 0, dayType: EDateType.calendar }]);
   };

   const updateStage = (id: number, updatedStage: Partial<IStageTypes>) => {
      setStages(stages.map(stage => (stage.id === id ? { ...stage, ...updatedStage } : stage)));
   };

   const deleteStage = (id: number) => {
      setStages(stages.filter(stage => stage.id !== id));
   };

   function validate() {
      if (!name || !num || !customer || !executor || !sum || !date || !timeDelivery || !validateStages(stages) || !validateNames(stages)) {
         alert('Исправьте ошибки в форме');
         console.log(
            !name, !num, !customer, !executor, !sum, !date, !timeDelivery, !validateStages(stages), !validateNames(stages)
         );
         return false;
      }
      return true;
   }

   const handleSubmit = async () => {
      const contractData = {
         id: Date.now(),
         name: name,
         number: num,
         customerName: customer,
         executorName: executor,
         price: Number(sum),
         dateOfCreate: formatDateForMySQL(new Date(date)),
         deadline: Number(timeDelivery),
         deadlineType: timeDeliveryType === EDateType.calendar ? 'calendar' : 'work',
         payCondition: stages,
      };

      const createContract = async (contractData: IContractTypes) => {
         try {
            const response = await fetch('http://localhost:4565/contracts', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(contractData),
            });
            if (!response.ok) {
               throw new Error(`Ошибка при создании договора: ${response.status}`);
            } else {
               const data = await response.json();
               return data.contractId;
            }
         } catch (error) {
            console.error(error);
         }
      };

      const contractId = await createContract(contractData);
      if (contractId) {
         await saveFiles(String(contractId));
         alert('Договор успешно создан');
      }
   };

   const saveFiles = async (contractId: string) => {
      const formData = new FormData();
      formData.append('contractId', contractId);
      files.forEach(file => {
         const encodedFileName = encodeURIComponent(file.name);
         formData.append('file', new File([file], encodedFileName, { type: file.type }));
      });

      try {
         const response = await fetch('http://localhost:4565/upload', {
            method: 'POST',
            body: formData,
         });
         if (!response.ok) {
            throw new Error(`Ошибка при загрузке файлов: ${response.status}`);
         }
      } catch (error) {
         console.error(error);
      }
   };

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
         setFiles(Array.from(event.target.files));
      }
   };

   return (
      <CreateContractPageContainer>
         <Title>Добавить договор +</Title>

         <UiInput onChange={(text) => setName(text)} value={name} label={'Предмет договора'}
                  placeholder={'Введите значение'} validated={error}/>
         <UiInput onChange={(text) => setNum(text)} value={num} label={'Номер договора'}
                  placeholder={'Введите значение'} validated={error}/>
         <UiInput onChange={(text) => setCustomer(text)} value={customer} label={'Наименование заказчика'}
                  placeholder={'Введите значение'} validated={error}/>
         <UiInput onChange={(text) => setExecutor(text)} value={executor} label={'Наименование исполнителя'}
                  placeholder={'Введите значение'} validated={error}/>
         <CreateContractPageLine>
            <UiInput type={'number'} value={sum} onChange={(text) => setSum(text)} label={'Сумма договора (с НДС)'}
                     validated={error}/>
            <UiInput type={'date'} value={date} onChange={(text) => setDate(text)}
                     label={'Дата составления договора'} validated={error}/>
         </CreateContractPageLine>
         <CreateContractPageLine>
            <UiInput onChange={(text) => setTimeDelivery(text)} value={timeDelivery} label={'Срок выполнения работ'}
                     placeholder={'Введите значение'} type={'number'} validated={error}/>
            <RadioCheckboxWrapper>
               <UiRadio label={'Календарных дней'} checked={timeDeliveryType === EDateType.calendar}
                        onChange={() => setTimeDeliveryType(EDateType.calendar)}/>
               <UiRadio label={'Рабочих дней'} checked={timeDeliveryType === EDateType.work}
                        onChange={() => setTimeDeliveryType(EDateType.work)}/>
            </RadioCheckboxWrapper>
         </CreateContractPageLine>

         <PayConditions stages={stages} addStage={addStage} updateStage={updateStage} deleteStage={deleteStage}
                        error={error}/>

         <Subtitle>Прикрепите файлы</Subtitle>
         <input type="file" multiple onChange={handleFileChange}/>

         <UiButton label={'Сохранить договор'} onClick={() => {
            validate() ? handleSubmit() : setError(true)
         }}/>
      </CreateContractPageContainer>
   );
};