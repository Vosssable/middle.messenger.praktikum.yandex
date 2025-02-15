import {FormsInterface} from "./interfaces/attrsInterfaces";

const loginForm: FormsInterface = {
    title: 'Вход',
    labels: [
        {
            input: true,
            id: 'login',
            type: 'text',
            placeholder: 'Логин',
            validateText: 'Неверный логин'
        },
        {
            input: true,
            id: 'password',
            type: 'password',
            placeholder: 'Пароль',
            validateText: 'Неверный пароль'
        },
        {
            button: true,
            class: 'primary_button',
            id: 'submit_login',
            text: 'Авторизироваться',
            type: 'submit'
        },
        {
            button: true,
            class: 'special_button',
            id: 'no_account_button',
            text: 'Нет аккаунта?'
        }]
}

const createUserForm: FormsInterface = {
    title: 'Регистрация',
    labels: [
        {
            input: true,
            id: 'email',
            placeholder: 'Почта',
            type: 'email',
            validateText: 'Неверный почтовый адрес'
        },
        {
            input: true,
            id: 'login',
            placeholder: 'Логин',
            type: 'text',
            validateText: 'Неверный формат логина'
        },
        {
            input: true,
            id: 'first_name',
            placeholder: 'Имя',
            type: 'text',
            validateText: 'Неверный формат имени'
        },
        {
            input: true,
            id: 'second_name',
            placeholder: 'Фамилия',
            type: 'text',
            validateText: 'Неверный формат фамилии'
        },
        {
            input: true,
            id: 'phone',
            placeholder: 'Телефон',
            type: 'phone',
            validateText: 'Неверный формат номера телефона'
        },
        {
            input: true,
            id: 'password',
            placeholder: 'Пароль',
            type: 'password',
            validateText: 'Пароль не соответствует стандартным требованиям'
        },
        {
            input: true,
            id: 'second_password',
            placeholder: 'Пароль (ещё раз)',
            type: 'password',
            validateText: 'Пароли не совпадают'
        },
        {
            button: true,
            class: 'primary_button',
            id: 'submit_registration',
            text: 'Зарегистрироваться'
        },
        {
            button: true,
            class: 'special_button',
            id: 'sign_in',
            text: 'Войти'
        }
    ]
}

const loadFileForm: FormsInterface = {
    title: 'Загрузите файл',
    labels: [
        {
            upload: true,
            text: 'Выбрать файл на компьютере',
            class: 'upload_file',
            id: 'upload_file',
            value: 'avatar'
        },
        {
            button: true,
            class: 'primary_button',
            id: 'change_file',
            text: 'Поменять',
        }
    ]
}

const addUserForm: FormsInterface = {
    title: 'Добавить пользователя',
    labels: [
        {
            input: true,
            id: 'input_login',
            placeholder: 'Логин',
            type: 'text',
        },
        {
            button: true,
            class: 'primary_button',
            id: 'add_user',
            text: 'Добавить'
        }
    ]
}

const deleteUserForm: FormsInterface = {
    title: 'Удалить пользователя',
    labels: [
        {
            input: true,
            id: 'input_login',
            placeholder: 'Логин',
            type: 'text',
        },
        {
            button: true,
            class: 'primary_button',
            id: 'delete_user',
            text: 'Удалить'
        }
    ]
}



export {loginForm, createUserForm, loadFileForm, addUserForm, deleteUserForm}