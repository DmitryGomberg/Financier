import React, { FC } from 'react';
import { ContractPageOptionsContainer, ContractPageOptionsItem } from './styled';
import {formatDateDots, formatPrice, IContractTypes} from "../../../utils";

type IContractPageOptionsProps = {
   contract: IContractTypes;
}

export const ContractPageOptions: FC<IContractPageOptionsProps> = (props) => {
   return (
      <ContractPageOptionsContainer>
         <ContractPageOptionsItem>Договор {props.contract.number}</ContractPageOptionsItem>
         <ContractPageOptionsItem><span>Заказчик: </span>“{props.contract.customerName}”</ContractPageOptionsItem>
         <ContractPageOptionsItem><span>Сумма договора: </span>{formatPrice(String(props.contract.price))} BYN</ContractPageOptionsItem>
         <ContractPageOptionsItem><span>Исполнитель: </span>“{props.contract.executorName}”</ContractPageOptionsItem>
         <ContractPageOptionsItem><span>Срок выполнения работ: </span>{props.contract.deadline} {props.contract.deadlineType === 'work' ? 'рабочих' : 'календарных'} дней</ContractPageOptionsItem>
         <ContractPageOptionsItem><span>Дата составления договора: </span>{formatDateDots(props.contract.dateOfCreate)}</ContractPageOptionsItem>
         <ContractPageOptionsItem><span>Дата подписания договора: </span>{props.contract.dateOfWrite ? formatDateDots(props.contract.dateOfWrite) : 'не подписан'}</ContractPageOptionsItem>
         <ContractPageOptionsItem><span>Дата закрытия договора: </span>{props.contract.dateOfClose ? formatDateDots(props.contract.dateOfClose) : 'не закрыт'}</ContractPageOptionsItem>
      </ContractPageOptionsContainer>
   );
};