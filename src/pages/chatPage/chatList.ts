import Block from "../../framework/Block"
import { ChatPageAttrsInterface, ChatsInterface } from "../../utils/interfaces/attrsInterfaces"
import { ChatPageAttrs } from "../../utils/ChatPageAttrs"
import { IconButton } from "../../components/buttons/iconButton/iconButton"
import { Chat } from "../../components/chat/chat"

export default class ChatList extends Block {
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
      attrs: {
        searchChatClass: "search-chat",
        chatsClass: "chats",

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
    <div>
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
    `
  }
}