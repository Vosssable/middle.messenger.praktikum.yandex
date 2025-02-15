import ReactiveElement from "../helpers/reactiveElement";

export interface KeyValueReactiveInterface {
    [key: string]: ReactiveElement<string>
}

export interface AuthFormInterface {
    email: string,
    login: string,
    first_name: string,
    second_name: string,
    phone: string,
    password: string,
    second_password: string
}
