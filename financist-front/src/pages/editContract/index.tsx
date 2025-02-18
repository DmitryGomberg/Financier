import {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {format} from "date-fns";
import {EditContractPageAddFiles, EditContractPageContainer,
   EditContractPageDateBlock, EditContractPageDates, EditContractPageInner, EditContractPageLine, EditContractPageWrapper} from './styled';
import {UiButton, UiRadio, UiInput, UiCheckbox} from 'ui';
import {EDateType, getFileType, IContractTypes, validateNames, validateStages} from 'utils';
import {PayConditions} from './payConditions';
import {RadioCheckboxWrapper, Title} from '../../styled';
import {ContractPageFile, ContractPageFiles} from 'pages/contractPage/styled';

export type IStageTypes = {
   id: number;
   name: string;
   percent: number;
   time: number;
   dayType: EDateType;
};

export const EditContractPage: FC = () => {
   const { id } = useParams<{ id: string }>();
   let [name, setName] = useState<string>('');
   let [num, setNum] = useState<string>('');
   let [customer, setCustomer] = useState<string>('');
   let [executor, setExecutor] = useState<string>('');
   let [sum, setSum] = useState<string>('');
   let [date, setDate] = useState<string>(new Date().toLocaleDateString('ru-RU'));
   let [timeDelivery, setTimeDelivery] = useState<string>('');
   let [timeDeliveryType, setTimeDeliveryType] = useState<EDateType>(EDateType.calendar);
   let [stages, setStages] = useState<IStageTypes[]>([]);
   const [contract, setContract] = useState<IContractTypes>();
   const [files, setFiles] = useState<string[]>([]);
   const [newFiles, setNewFiles] = useState<File[]>([]);


   let [isWrite, setIsWrite] = useState(false);
   let [isWriteDate, setIsWriteDate] = useState<string>();
   let [isClose, setIsClose] = useState(false);
   let [isCloseDate, setIsCloseDate] = useState<string>();


   useEffect(() => {
      const fetchContract = async () => {
         try {
            const response = await fetch(`http://localhost:4565/contracts/${id}`, {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               }
            });
            if (!response.ok) {
               throw new Error(`Ошибка при получении договора: ${response.status}`);
            }

            const data = await response.json();
            setContract(data);
            console.log(data);
            if (data) {
               setName(data.name);
               setNum(data.number);
               setCustomer(data.customerName);
               setExecutor(data.executorName);
               setSum(data.price);
               setDate(format(new Date(data.dateOfCreate), 'yyyy-MM-dd'));
               if (data.dateOfWrite) {
                  setIsWriteDate(format(new Date(data.dateOfWrite), 'yyyy-MM-dd'));
                  setIsWrite(true)
               }
               if (data.dateOfClose) {
                  setIsCloseDate(format(new Date(data.dateOfClose), 'yyyy-MM-dd'));
                  setIsClose(true)
               }
               setTimeDelivery(data.deadline);
               setTimeDeliveryType(data.deadlineType === 'work' ? EDateType.work : EDateType.calendar);
               setStages(data.payCondition)
            }
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
      fetchFiles();
   }, []);


   const addStage = () => {
      setStages([...stages, { id: Date.now(), name: '', percent: 0, time: 0, dayType: EDateType.calendar }]);
   };

   const updateStage = (id: number, updatedStage: Partial<IStageTypes>) => {
      setStages(stages.map(stage => (stage.id === id ? { ...stage, ...updatedStage } : stage)));
   };

   const deleteStage = (id: number) => {
      setStages(stages.filter(stage => stage.id !== id));
   };

   const handleSubmit = async () => {
      const contractData = {
         name,
         number: num,
         customerName: customer,
         executorName: executor,
         price: sum,
         dateOfCreate: date,
         deadline: timeDelivery,
         deadlineType: timeDeliveryType,
         payCondition: stages,
         dateOfWrite: isWriteDate,
         dateOfClose: isCloseDate,
      };
      try {
         const response = await fetch(`http://localhost:4565/contracts/${id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(contractData),
         });

         if (!response.ok) {
            throw new Error(`Ошибка при обновлении договора: ${response.status}`);
         }

         const result = await response.json();
         alert('Договор успешно обновлен');
      } catch (error) {
         console.error('Ошибка при обновлении договора:', error);
         alert('Произошла ошибка при обновлении договора');
      }
   };

   function validate () {
      if(!name || !num || !customer || !executor || !sum || !date || !timeDelivery  || !validateStages(stages) || !validateNames(stages)){
         alert('Не все обязательные поля заполнены!');
         console.log(
            !name, !num, !customer, !executor, !sum, !date, !timeDelivery, !validateStages(stages), !validateNames(stages)
         );
         return false;
      }
      return true;
   }

   const handleDelete = async (fileName: string) => {

      let agreement = window.confirm('Вы уверены, что хотите удалить запись?');
      if (!agreement) return;

      try {
         const response = await fetch(`http://localhost:4565/delete`, {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileName, contractId: id }),
         });
         if (!response.ok) {
            throw new Error(`Error deleting file: ${response.status}`);
         }
         setFiles(files.filter(file => file !== fileName));
      } catch (error) {
         console.error(error);
      }
   };

   const saveFiles = async (contractId: string) => {
      const formData = new FormData();
      formData.append('contractId', contractId);
      newFiles.forEach(file => {
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

      try {
         const response = await fetch(`http://localhost:4565/download/${contractId}`);
         if (!response.ok) {
            throw new Error(`Error fetching files: ${response.status}`);
         }
         const data = await response.json();
         setFiles(data.files);
      } catch (error) {
         console.error(error);
      }
   };


   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
         setNewFiles(Array.from(event.target.files));
      }
   };

   return (
      <EditContractPageContainer>
         <Title>Редактировать договор</Title>

         <EditContractPageWrapper>
            <EditContractPageInner>
               <UiInput onChange={(text) => setName(text)} value={name} label={'Наименование поставляемой продукции'}
                        placeholder={'Введите значение'}/>
               <UiInput onChange={(text) => setNum(text)} value={num} label={'Номер договора'}
                        placeholder={'Введите значение'}/>
               <UiInput onChange={(text) => setCustomer(text)} value={customer} label={'Наименование заказчика'}
                        placeholder={'Введите значение'}/>
               <UiInput onChange={(text) => setExecutor(text)} value={executor} label={'Наименование исполнителя'}
                        placeholder={'Введите значение'}/>
               <EditContractPageLine>
                  <UiInput type={'number'} value={sum} onChange={(text: string) => setSum(text)}
                           label={'Сумма договора'}/>
                  <UiInput type={'date'} value={date} onChange={(text) => setDate(text)}
                           label={'Дата составления договора'}/>
               </EditContractPageLine>
               <EditContractPageLine>
                  <UiInput onChange={(text) => setTimeDelivery(text)} value={timeDelivery} label={'Срок выполнения работ'}
                           placeholder={'Введите значение'} type={'number'}/>
                  <RadioCheckboxWrapper>
                     <UiRadio label={'Календарных дней'} checked={timeDeliveryType === EDateType.calendar}
                              onChange={() => setTimeDeliveryType(EDateType.calendar)}/>
                     <UiRadio label={'Рабочих дней'} checked={timeDeliveryType === EDateType.work}
                              onChange={() => setTimeDeliveryType(EDateType.work)}/>
                  </RadioCheckboxWrapper>
               </EditContractPageLine>
            </EditContractPageInner>
            <EditContractPageDates>
               <EditContractPageDateBlock>
                  <UiCheckbox label={'Договор подписан'} checked={isWrite} onChange={() => {
                     setIsWrite(!isWrite);
                     setIsWriteDate('')
                  }}/>
                  {isWrite && <UiInput type={'date'} onChange={(text) => setIsWriteDate(text)} value={isWriteDate || ''}
                                       label={'Дата подписания'}/>}
               </EditContractPageDateBlock>
               {
                  isWrite &&
                   <EditContractPageDateBlock>
                       <UiCheckbox label={'Договор закрыт'} checked={isClose} onChange={() => {
                          setIsClose(!isClose);
                          setIsCloseDate('')
                       }}/>
                      {isClose &&
                          <UiInput type={'date'} onChange={(text) => setIsCloseDate(text)} value={isCloseDate || ''}
                                   label={'Дата закрытия'}/>}
                   </EditContractPageDateBlock>
               }
            </EditContractPageDates>
         </EditContractPageWrapper>

         <PayConditions stages={stages} addStage={addStage} updateStage={updateStage} deleteStage={deleteStage}/>

         <ContractPageFiles>
            {files.map((file, index) => (
               <ContractPageFile key={index}>
                  <span>{getFileType(file)}</span>
                  {file.substring(37)}
                  <button onClick={() => handleDelete(file)}>Удалить</button>
               </ContractPageFile>
            ))}
         </ContractPageFiles>

         <EditContractPageAddFiles>
            <input type="file" multiple onChange={handleFileChange} />
            {newFiles.length > 0 && <UiButton label={'Добавить'} onClick={()=> saveFiles(String(id))} />}
         </EditContractPageAddFiles>

         <UiButton label={'Сохранить изменения'} onClick={() => {
            validate() && handleSubmit()
         }}/>
      </EditContractPageContainer>
   );
};