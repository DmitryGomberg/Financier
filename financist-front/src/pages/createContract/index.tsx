import React, { FC } from 'react';
import {EDateType, validateNames, validateStages} from 'utils';
import { Subtitle } from '../../../styled';
import { PayConditionsItem } from './item';
import { Add } from '@mui/icons-material';
import { PayConditionsContainer, PayConditionsMore, PayConditionsWrapper, PayConditionsError  } from './styled';

export type IStageTypes = {
   id: number;
   name: string;
   percent: number;
   time: number;
   dayType: EDateType;
};

type PayConditionsProps = {
   stages: IStageTypes[];
   addStage: () => void;
   updateStage: (id: number, updatedStage: Partial<IStageTypes>) => void;
   deleteStage: (id: number) => void;
   error?: boolean
};

// todo: бывают не в процентах а в цифрах
export const PayConditions: FC<PayConditionsProps> = ({ stages, addStage, updateStage, deleteStage, error }) => {
   return (
      <PayConditionsContainer>
         <Subtitle>Укажите условия оплаты</Subtitle>
         {validateNames(stages)}
         {error && !validateStages(stages) && <PayConditionsError>{stages.length > 0 ? "Неверно указаны проценты от общей суммы - их сумма должна давать 100 %" : "Укажите условия оплаты"}</PayConditionsError>}
         <PayConditionsWrapper>
            {stages.map(stage => (
               <PayConditionsItem key={stage.id} stage={stage} updateStage={updateStage} deleteStage={deleteStage} error={error} />
            ))}
            <PayConditionsMore onClick={addStage}><Add />Добавить этап</PayConditionsMore>
         </PayConditionsWrapper>
      </PayConditionsContainer>
   );
};