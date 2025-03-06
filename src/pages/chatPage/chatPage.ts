import Block from "../../framework/Block"
import { IconButton } from "../../components/buttons/iconButton/iconButton"
import { DropDown } from "../../components/dropdown/dropdown"
import { ChatPageAttrs, FooterButtons, HeaderButtons } from "../../utils/ChatPageAttrs"
import { Chat } from "../../components/chat/chat"
import { ChatPageAttrsInterface, ChatsInterface } from "../../utils/interfaces/attrsInterfaces"


export default class ChatPage extends Block {
  constructor() {
    const props: ChatPageAttrsInterface = {
        chats: ChatPageAttrs.chats,
        currentAvatar: ChatPageAttrs.currentAvatar,
        currentChatName: ChatPageAttrs.currentChatName
      },
      chats: ChatsInterface[] = props.chats
    for (const chat of chats) {
      props[chat.chatName] = new Chat({
        avatar: chat["avatar"],
        chatName: chat["chatName"],
        lastMessage: chat["lastMessage"],
        lastMessageDatetime: chat["lastMessageDatetime"],
        newMessageCount: chat["newMessageCount"],
        class: chat["class"]
      })
    }
    super({
      ...props,
      searchIconBtn: new IconButton({ src: "/search.svg", alt: "Поиск чата", class: "" }),
      userPropertiesBtn: new IconButton({ src: "/userProperties.svg", alt: "Настройки пользователя", class: "" }),
      filePropertiesBtn: new IconButton({
        src: "/fileProperties.svg",
        alt: "Добавить к сообщению",
        class: "file-properties"
      }),
      sendMessageBtn: new IconButton({ src: "/arrowRight.svg", alt: "Отправить сообщение", class: "send-message" }),
      headerDropdown: new DropDown({ class: "chat-header__properties__active", buttons: HeaderButtons }),
      footerDropdown: new DropDown({ class: "chat-footer__properties__active", buttons: FooterButtons }),
      attrs: {
        sidebarClass: "sidebar",
        sidebarProfileClass: "sidebar__profile",
        searchChatClass: "search-chat",
        chatContainerClass: "chat_container",
        chatsClass: "chats",
        messagesClass: "messages",
        messagesDateClass: "messages_date",
        messageTimeClass: "message_time",
        messageClass: "message",
        receivedClass: "received",
        sentClass: "sent",
        profileNameClass: "profile-name",
        chatWindowClass: "chat-window",
        chatHeaderClass: "chat-header",
        chatHeaderNameClass: "chat-header__name",
        chatHeaderInfoClass: "chat-header__info",
        chatHeaderAvatarClass: "chat-header__avatar",
        chatHeaderPropertiesClass: "chat-header__properties",
        chatFooterClass: "chat-footer",
        chatFooterPropertiesClass: "chat-footer__properties"
      }
    })
  }

  override render() {
    const chats: ChatsInterface[] = <ChatsInterface[]>this.lists["chats"]
    let chatsHTML = ``

    for (const chat in chats) {
      chatsHTML += `{{{ ${chats[chat]["chatName"]} }}}`
    }
    return `
        <main id="app">
            <div>
                <div class="{{ attrs.chatContainerClass }}">
                    <div class="{{ attrs.sidebarClass }}">
                    <a href="/settings">
                        <div class="{{ attrs.sidebarProfileClass }}">
                            Профиль ›
                        </div>
                        </a>
                        <div class="{{ attrs.searchChatClass }}">
                            <input id="search-chat__input" type="text" placeholder="Поиск" name="chat">
                            <label for="search-chat__input">
                                {{{ searchIconBtn }}}
                                Поиск
                            </label>
                        </div>
                        <div class="{{ attrs.chatsClass }}">
                            ${chatsHTML}
                        </div>
                    </div>
                    <div class="{{ attrs.chatWindowClass }}">
                        <div class="{{ attrs.chatHeaderClass }}">
                            <div class="{{ attrs.chatHeaderInfoClass }}">
                                <div class="{{ attrs.chatHeaderAvatarClass }}">
                                    {{ currentAvatar }}
                                </div>
                                <div class="{{ attrs.chatHeaderNameClass }}">
                                    {{ currentChatName }}
                                </div>
                            </div>
                            <button class="{{ attrs.chatHeaderPropertiesClass }}">
                                {{{ userPropertiesBtn }}}
                            </button>
                            {{{ headerDropdown }}}
                        </div>
                        <div class="{{ attrs.messagesClass }}">
                            <div class="{{ attrs.messagesDateClass }}"> 19 июня</div>
                            <div class="{{ attrs.messageClass }} {{ attrs.receivedClass }}">Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА
                                в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все
                                знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще
                                находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
            
                                Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда
                                и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000
                                евро.
                                <span class="{{ attrs.messageTimeClass }} {{ attrs.receivedClass }}">12:20</span>
                            </div>
                            <div class="{{ attrs.messageClass }} {{ attrs.sentClass }}">Круто!
                                <span class="{{ attrs.messageTimeClass }} {{ attrs.sentClass }}">
                                <img src="/received.svg" alt="Сообщение просмотрено"> 12:00</span></div>
                        </div>
                        <div class="{{ attrs.chatFooterClass }}">
                            <button class="{{ attrs.chatFooterPropertiesClass }}">
                                {{{ filePropertiesBtn }}}
                            </button>
                            {{{ footerDropdown }}}
                            <input type="text" placeholder="Напишите сообщение..." id="message" name="message">
                            {{{ sendMessageBtn }}}
                        </div>
                    </div>
                </div>
            </div>
        </main>
        `
  }
}
