const ProfileAttrs = {
    name: 'Иван',
    inputs: [
        {
            label: 'Почта',
            value: 'pochta@yandex.ru',
            id: 'email',
            disabled: true,
        },
        {
            label: 'Логин',
            value: 'ivanovivanov',
            id: 'login',
            disabled: true,
        },
        {
            label: 'Имя',
            value: 'Иван',
            id: 'first_name',
            disabled: true,
        },
        {
            label: 'Фамилия',
            value: 'Иванов',
            id: 'second_name',
            disabled: true,
        },
        {
            label: 'Имя в чате',
            value: 'Иван',
            id: 'display_name',
            disabled: true,
        },
        {
            label: 'Телефон',
            value: '+7 (909) 967 30 30',
            id: 'phone',
            disabled: true,
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

export {ProfileAttrs, ProfileBtns}