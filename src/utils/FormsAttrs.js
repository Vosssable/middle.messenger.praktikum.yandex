const loginForm = {
    title: 'Вход',
    labels: [
        {
            input: true,
            id: 'login',
            type: 'text',
            placeholder: 'Логин'
        },
        {
            input: true,
            id: 'password',
            type: 'password',
            placeholder: 'Пароль'
        },
        {
            button: true,
            class: 'primary_button',
            id: 'submit_login',
            text: 'Авторизироваться'
        },
        {
            button: true,
            class: 'special_button',
            id: 'no_account_button',
            text: 'Нет аккаунта?'
        }]
}

const createUserForm = {
    title: 'Регистрация',
    labels: [
        {
            input: true,
            id: 'email',
            placeholder: 'Почта',
            type: 'email',
        },
        {
            input: true,
            id: 'login',
            placeholder: 'Логин',
            type: 'text',
        },
        {
            input: true,
            id: 'first_name',
            placeholder: 'Имя',
            type: 'text',
        },
        {
            input: true,
            id: 'second_name',
            placeholder: 'Фамилия',
            type: 'text',
        },
        {
            input: true,
            id: 'phone',
            placeholder: 'Телефон',
            type: 'email',
        },
        {
            input: true,
            id: 'password',
            placeholder: 'Пароль',
            type: 'password',
        },
        {
            input: true,
            id: 'second_password',
            placeholder: 'Пароль (ещё раз)',
            type: 'password',
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

const loadFileForm = {
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

const addUserForm = {
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

const deleteUserForm = {
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