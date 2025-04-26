import Block from "../../framework/Block"
import { IconButton } from "../../components/buttons/iconButton/iconButton"
import { Chat } from "../../components/chat/chat"
import { ChatListResponseInterface } from "../../utils/interfaces/responseInterfaces"
import { Indexed } from "../../utils/interfaces/frameworkInterfaces"
import Store from "../../framework/Store/Store"
import { isEmpty } from "../../utils/mydash/isEmpty"
import changeClassList from "../../utils/helpers/changeClassList"
import { formatDateToLocal } from "../../utils/helpers/formatDateToLocal"

export default class ChatList extends Block {
  constructor() {
    const store = Store.getInstance()

    super({
      searchIconBtn: new IconButton({ src: "/search.svg", alt: "Поиск чата", class: "" }),
      attrs: {
        searchChatClass: "search-chat",
        chatsClass: "chats"
      }
    })

    const addChats = (chats: ChatListResponseInterface[]) => {
      if (chats) {
        const chatList = {} as Indexed,
          chatKeys = []
        for (const chat of chats) {
          chatList["chat_" + chat.id] = new Chat({
              avatar: chat.avatar || "",
              chatName: chat.title || "",
              lastMessage: chat.last_message?.content || "",
              lastMessageDatetime: chat.last_message?.time ? formatDateToLocal(chat.last_message?.time) : "",
              newMessageCount: chat.unread_count || 0,
              chatId: chat.id
            })
          chatKeys.push("chat_" + chat.id)
        }
        this.setProps({
           ...chatList, chatKeys: chatKeys
        })
        this.render()
        const currentChat = store.getState().currentChat as string
        if (currentChat) {
          changeClassList('current-select', document.getElementById('chat_item_'+currentChat) as HTMLElement)
        }
      }
    }

    store.on("chatListUpdated", () => {
      const chats = store.getState().chats
      if (chats) {
        addChats(chats as ChatListResponseInterface[])
      }
    })

  }

  override render() {
    const chatList = !isEmpty(this.lists["chatKeys"]) ? this.lists["chatKeys"] : []
    let chatsHTML = ``

    if (!isEmpty(chatList)) {
      chatsHTML = chatList.map((chat) => {
        return `{{{ ${chat} }}}`
      }).join("")
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