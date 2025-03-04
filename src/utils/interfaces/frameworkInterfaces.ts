import { ButtonsInterface, FormLabelsInterface, InputsInterface, ProfileBtnsInterface } from "./attrsInterfaces"
import Block from "../../framework/Block"

export interface EventPropsInterface {
  [key: string]: (event: Event, element?: HTMLElement | HTMLInputElement | HTMLFormElement) => void
}

export interface BlockProps {
  elements?: Block[];
  events?: EventPropsInterface;
  [key: string]: unknown;
}

export interface BlockListInterface {
  [key: string]: ProfileBtnsInterface[] | InputsInterface[] | ButtonsInterface[] | FormLabelsInterface[];
}

export type Indexed<T = any> = {
  [key in string]: T
}