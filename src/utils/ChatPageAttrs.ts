import {buttonsInterface, ChatPageAttrsInterface} from "./interfaces/attrsInterfaces";

const ChatPageAttrs: ChatPageAttrsInterface = {
    chats: [
        {
            avatar: '',
            chatName: 'Пасхалка',
            lastMessage: 'Почему роверы ездят зиг-загом?',
            lastMessageDatetime: '12:00',
            class: 'current-select'
        },
        {
            avatar: '',
            chatName: 'Иван',
            lastMessage: 'Изображение',
            lastMessageDatetime: '15:12',
            newMessageCount: 3
        },
        {
            avatar: '',
            chatName: 'Кинопоиск',
            lastMessage: 'Друзья, у меня для вас особенный выпуск новостей!...',
            lastMessageDatetime: 'Ср',
        },
        {
            avatar: '',
            chatName: 'Эльфийка',
            lastMessage: 'Миллионы россиян ежедневно проводят десятки часов свое...',
            lastMessageDatetime: 'Пн',
            newMessageCount: 4
        },
        {
            avatar: '',
            chatName: 'Гарри',
            lastMessage: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
            lastMessageDatetime: '1 Мая 2020',
            newMessageCount: 3
        },
    ],
    currentAvatar: '',
    currentChatName: 'Вадим'
}

const HeaderButtons: buttonsInterface[] = [
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
    }
]

const FooterButtons: buttonsInterface[] = [
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

export {ChatPageAttrs, HeaderButtons, FooterButtons}