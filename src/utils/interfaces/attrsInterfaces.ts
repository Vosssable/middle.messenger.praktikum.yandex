import {KeyValueInterface} from "./requestInterfaces";

export interface ChatsInterface {
        avatar: string
        chatName: string
        lastMessage?: string
        lastMessageDatetime?: string
        class?: string
        newMessageCount?: number
}

export interface ChatPageAttrsInterface extends KeyValueInterface {
    chats: ChatsInterface[]
    currentAvatar: string
    currentChatName: string
}

export interface ButtonsInterface {
    src?: string
    text?: string
    id?: string
    alt?: string
    class?: string
    type?: string
}

export interface ErrorsInterface {
    code: string
    text: string
    label: string
}

export interface FormLabelsInterface {
    upload?: boolean
    input?: boolean
    button?: boolean
    type?: string
    placeholder?: string
    class?: string
    id: string
    text?: string
    value?: string
    validateText?: string
}

export interface FormsInterface extends KeyValueInterface {
    title: string,
    labels?: FormLabelsInterface[]
}

export interface InputsInterface {
    label: string
    value?: string
    id: string
    type?: string
    placeholder?: string
}

export interface ProfileAttrsInterface {
    name: string
    inputs: InputsInterface[]
}

export interface ProfileBtnsInterface {
    label: string
    id: string
    inputClass: string
    labelClass: string
}

export interface ProfileEditBtnInterface {
    id: string
    text: string
}
