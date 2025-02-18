import {FC, ReactNode} from 'react'
import {UiButtonContainer} from "./styled";

type IUiButtonProps = {
   label: string;
   contentLeft?: ReactNode;
   contentRight?: ReactNode;
   onClick?(): void;
}

export const UiButton: FC<IUiButtonProps> = (props) => {
  return (
    <UiButtonContainer onClick={props.onClick}>
       {props.contentLeft}
       {props.label}
       {props.contentRight}
    </UiButtonContainer>
  )
}
