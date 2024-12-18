export interface ChatPageAttrsInterface {
    chats: {
        avatar: string,
        chatName: string,
        lastMessage?: string,
        lastMessageDatetime?: string,
        class?: string,
        newMessageCount?: number
    }[],
    currentAvatar?: string,
    currentChatName?: string
}

export interface buttonsInterface {
    src: string,
    text: string,
    id: string,
    alt: string
}

export interface errorsInterface {
    code: string,
    text: string
}

export interface formsInterface {
    title: string,
    labels: {
        upload?: boolean,
        input?: boolean,
        button?: boolean,
        type?: string,
        placeholder?: string,
        class?: string,
        id: string,
        text?: string,
        value?: string
    }[]
}

export interface profileAttrsInterface {
    name: string,
    inputs: {
        label: string,
        value: string,
        id: string
    }[]
}

export interface ProfileBtnsInterface {
    label: string,
    id: string,
    inputClass: string,
    labelClass: string
}

export interface ProfileEditBtnInterface {
    id: string,
    text: string
}

export interface ProfileEditPasswordAttrsInterface {
    inputs: {
        label: string,
        id: string,
        type: string
    }[]
}