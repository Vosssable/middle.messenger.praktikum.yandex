import {ButtonsInterface} from "./interfaces/attrsInterfaces";

const HeaderButtons: ButtonsInterface[] = [
    {
        src: '/addUser.svg',
        text: 'Добавить пользователя',
        id: 'add_user',
        alt: 'Добавить пользователя'
    },
    {
        src: '/deleteUser.svg',
        text: 'Удалить пользователя',
        id: 'delete_user',
        alt: 'Удалить пользователя'
    },
    {
        src: '/addChat.svg',
        text: 'Создать новый чат',
        id: 'add_chat',
        alt: 'Создать новый чат'
    },
    {
        src: '/deleteChat.svg',
        text: 'Удалить чат',
        id: 'delete_chat',
        alt: 'Удалить чат'
    }
]

const FooterButtons: ButtonsInterface[] = [
    {
        src: '/photo.svg',
        text: 'Фото или видео',
        id: 'add_photo',
        alt: 'Добавить медиа'
    },
    {
        src: '/file.svg',
        text: 'Файл',
        id: 'add_file',
        alt: 'Добавить файл'
    },
    {
        src: '/location.svg',
        text: 'Локация',
        id: 'add_location',
        alt: 'Добавить локацию'
    }
]

export {HeaderButtons, FooterButtons}
