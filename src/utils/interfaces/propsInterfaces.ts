import {ButtonsInterface, InputsInterface, ProfileBtnsInterface} from "./attrsInterfaces";
import {KeyValueInterface} from "./requestInterfaces";

export interface BtnPropsInterface {
    id: string
    class: string
    text: string
}

export interface IconButtonPropsInterface {
    src: string
    alt: string
    class: string
}

export interface PropertyButtonPropsInterface {
    src: string
    text: string
    id: string
}

export interface DropDownPropsInterface {
    class: string
    buttons: ButtonsInterface[]
}

export interface FormInputPropsInterface {
    id: string,
    type?: string,
    value?: string,
    placeholder?: string,
}

export interface ProfilePagePropsInterface extends KeyValueInterface{
    name: string
    inputs: InputsInterface[]
    buttons: ProfileBtnsInterface[]
    labels: []
    password: boolean
    title: string
    disabled: string
    avatar: string
}

export interface ProfileInputLabelInterface {
    placeholder?: string
    value?: string
    name?: string
    id?: string
    disabled?: boolean
    type?: string
    idButton?: string
    inputClass?: string
    labelClass?: string
    label?: string
}
