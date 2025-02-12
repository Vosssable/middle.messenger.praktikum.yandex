import {KeyValueInterface} from "./requestInterfaces";

export interface ChatPageAttrsInterface {
    chats: {
        avatar: string
        chatName: string
        lastMessage?: string
        lastMessageDatetime?: string
        class?: string
        newMessageCount?: number
    }[],
    currentAvatar?: string
    currentChatName?: string
}

export interface ButtonsInterface {
    src?: string
    text?: string
    id: string
    alt?: string
    class?: string
}

export interface ErrorsInterface {
    code: string
    text: string
    label: string
}

export interface FormsInterface extends KeyValueInterface {
    title: string,
    labels: {
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
    }[]
}

export interface InputsInterface {
    label: string
    value: string
    id: string
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

export interface ProfileEditPasswordAttrsInterface {
    inputs: {
        label: string
        id: string
        type: string
    }[]
}