const ChatPageAttrs = {
    chats: [
        {
            avatar: '',
            chatName: 'Вадим',
            lastMessage: 'Круто!',
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

const HeaderButtons = [
    {
        src: '../../../public/addUser.svg',
        text: 'Добавить пользователя',
        id: 'add_user'
    },
    {
        src: '../../../public/deleteUser.svg',
        text: 'Удалить пользователя',
        id: 'delete_user',
    }
]

const FooterButtons = [
    {
        src: '../../../public/photo.svg',
        text: 'Фото или видео',
        id: 'add_photo',
    },
    {
        src: '../../../public/file.svg',
        text: 'Файл',
        id: 'add_file'
    },
    {
        src: '../../../public/location.svg',
        text: 'Локация',
        id: 'add_location'
    }
]

export {ChatPageAttrs, HeaderButtons, FooterButtons}