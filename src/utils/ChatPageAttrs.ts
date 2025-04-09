import {ButtonsInterface, ChatPageAttrsInterface} from "./interfaces/attrsInterfaces";

//TODO: Удалить после настройки чатов с апишки
const ChatPageAttrs: ChatPageAttrsInterface = {
    chats: [
        {
            avatar: '',
            chatName: 'Пасхалка',
            lastMessage: 'Почему роверы ездят зиг-загом?',
            lastMessageDatetime: '12:00',
            class: 'current-select',
            chatId: 712312
        },
        {
            avatar: '',
            chatName: 'Иван',
            lastMessage: 'Изображение',
            lastMessageDatetime: '15:12',
            newMessageCount: 3,
            chatId: 712211
        },
        {
            avatar: '',
            chatName: 'Кинопоиск',
            lastMessage: 'Друзья, у меня для вас особенный выпуск новостей!...',
            lastMessageDatetime: 'Ср',
            chatId: 7124121
        },
        {
            avatar: '',
            chatName: 'Эльфийка',
            lastMessage: 'Миллионы россиян ежедневно проводят десятки часов свое...',
            lastMessageDatetime: 'Пн',
            newMessageCount: 4,
            chatId: 412441
        },
        {
            avatar: '',
            chatName: 'Гарри',
            lastMessage: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
            lastMessageDatetime: '1 Мая 2020',
            newMessageCount: 3,
            chatId: 12415512
        },
    ],
    currentAvatar: '',
    currentChatName: 'Вадим'
}

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

export {ChatPageAttrs, HeaderButtons, FooterButtons}
