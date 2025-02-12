import {ErrorsInterface} from "./interfaces/attrsInterfaces";

const Error404Attrs: ErrorsInterface = {
    code: '404',
    text: 'Такой страницы нет',
    label: 'Назад к чатам'
}

const Error500Attrs: ErrorsInterface = {
    code: '500',
    text: 'Мы уже фиксим',
    label: 'Назад к чатам'
}

export { Error404Attrs, Error500Attrs }