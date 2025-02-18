import React, { FC } from 'react';
import { EDateType } from 'utils';
import { Subtitle } from '../../../styled';
import { PayConditionsItem } from './item';
import { PayConditionsContainer, PayConditionsMore, PayConditionsWrapper } from './styled';
import { Add } from '@mui/icons-material';

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
};

export const PayConditions: FC<PayConditionsProps> = ({ stages, addStage, updateStage, deleteStage }) => {
   return (
      <PayConditionsContainer>
         <Subtitle>Укажите условия оплаты</Subtitle>
         <PayConditionsWrapper>
            {stages.map(stage => (
               <PayConditionsItem key={stage.id} stage={stage} updateStage={updateStage} deleteStage={deleteStage} />
            ))}
            <PayConditionsMore onClick={addStage}><Add />Добавить этап</PayConditionsMore>
         </PayConditionsWrapper>
      </PayConditionsContainer>
   );
};