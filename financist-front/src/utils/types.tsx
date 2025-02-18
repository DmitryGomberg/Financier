import { EDateType } from './enums';

export type IStageTypes = {
   id: number;
   name: string;
   percent: number;
   time: number;
   dayType: EDateType;
};
export type IContractTypes = {
   id: number;
   name: string;
   number: string;
   customerName: string;
   executorName: string;
   price: number;
   dateOfCreate: string;
   dateOfWrite?: string;
   dateOfClose?: string;
   deadline: number;
   deadlineType: string;
   payCondition: IStageTypes[];
}
export type ITransactionTypes = {
   id: number,
   type: string,
   contractId: number,
   date: string,
   price: number,
   description: string,
   provider: string,
}