import {errorsInterface} from "./attrsInterfaces";

const Error404Attrs: errorsInterface = {
    code: '404',
    text: 'Такой страницы нет'
}

const Error500Attrs: errorsInterface = {
    code: '500',
    text: 'Мы уже фиксим'
}

export { Error404Attrs, Error500Attrs }