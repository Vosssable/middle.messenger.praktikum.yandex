const ProfileAttrs = {
    name: 'Иван',
    inputs: [
        {
            label: 'Почта',
            value: 'pochta@yandex.ru',
            id: 'email'
        },
        {
            label: 'Логин',
            value: 'ivanovivanov',
            id: 'login'
        },
        {
            label: 'Имя',
            value: 'Иван',
            id: 'first_name'
        },
        {
            label: 'Фамилия',
            value: 'Иванов',
            id: 'second_name'
        },
        {
            label: 'Имя в чате',
            value: 'Иван',
            id: 'display_name'
        },
        {
            label: 'Телефон',
            value: '+7 (909) 967 30 30',
            id: 'phone'
        }]
}

const ProfileBtns = [
    {
        label: 'Изменить данные',
        id: 'change_user_data',
        inputClass: 'profile-button',
        labelClass: 'primary'
    },
    {
        label: 'Изменить пароль',
        id: 'change_password',
        inputClass: 'profile-button',
        labelClass: 'primary'
    },
    {
        label: 'Выйти',
        id: 'sign_out',
        inputClass: 'profile-button',
        labelClass: 'danger'
    }
]

const ProfileEditBtn = {
    id: 'change',
    text: 'Сохранить'
}

const ProfileEditPasswordAttrs = {
    inputs: [
        {
            label: 'Старый пароль',
            id: 'oldPassword',
            type: 'password'
        },
        {
            label: 'Новый пароль',
            id: 'newPassword',
            type: 'password'
        },
        {
            label: 'Повторите новый пароль',
            id: 'newPasswordConfirm',
            type: 'password'
        }
    ]
}


export {ProfileAttrs, ProfileBtns, ProfileEditBtn, ProfileEditPasswordAttrs}