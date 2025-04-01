import {
    ButtonsInterface,
    FormLabelsInterface,
    InputsInterface,
    ProfileBtnsInterface,
    ProfileEditBtnInterface
} from "./attrsInterfaces";
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

export interface ProfilePagePropsInterface extends KeyValueInterface {
    name?: string
    inputs: InputsInterface[]
    buttons?: ProfileBtnsInterface[]
    change?: ProfileEditBtnInterface
    labels?: FormLabelsInterface[]
    password?: boolean
    title?: string
    disabled?: boolean
    avatar?: boolean
    onClick?: (event: Event, action: string) => void
    action?: string
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
