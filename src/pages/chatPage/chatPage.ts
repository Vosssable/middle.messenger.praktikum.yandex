import Block from "../../framework/Block"
import ChatList from "./chatList"
import CurrentChat from "./currentChat"
import ChatFooter from "./chatFooter"
import ChatHeader from "./chatHeader"
import { hideChatDropdown } from "../../utils/helpers/hideChatDropdown"
import { Form } from "../../components/form/form"
import Store from "../../framework/Store/Store"
import { filterChildren } from "../../utils/helpers/filterChildren"
import EmptyChat from "./emptyChat"
import { doGetChats } from "../../utils/controllers/chats/doGetChats"
import { doGetInfoForChat } from "../../utils/controllers/chats/doGetInfoForChat"
import { ChatListResponseInterface } from "../../utils/interfaces/responseInterfaces"
import { getSocket, useSocket } from "../../utils/helpers/webSocket"
import { FormsInterface } from "../../utils/interfaces/attrsInterfaces"
import { ProfileInfoInterface } from "../../utils/interfaces/apiInterfaces"

export default class ChatPage extends Block {
  private intervalId: number|undefined

  constructor() {
    const store = Store.getInstance()
    store.set("form", {})

    super({
      isCurrentChat: false,
      chatList: new ChatList(),
      emptyChat: new EmptyChat(),
      attrs: {
        sidebarClass: "sidebar",
        sidebarProfileClass: "sidebar__profile",
        chatContainerClass: "chat_container",
        profileNameClass: "profile-name",
        chatWindowClass: "chat-window"
      },
      events: {
        click: (event: MouseEvent) => {
          const target = event.target as HTMLElement
          if (target.classList.contains("chat-list__item")) {
            return
          }

          if (target.id === "chat_page") {
            if (target.children[1].classList.contains("overlay")) {
              this.setProps({ ...filterChildren(this.children, "form") })
            }
          }

          if ((target.id !== "chat-header_icon-btn" && !target.classList.contains("chat-header__properties")) &&
            (target.id !== "chat-footer_icon-btn" && !target.classList.contains("chat-footer__properties"))) {
            hideChatDropdown()
          }

          if (target.id === "go_to_profile") {
            event.preventDefault()
            store.reset('currentChat')
            this.Router.go("/settings")
          }
        }
      }
    })

    store.on("updated", () => {
      const formAttrs = store.getState().form

      if (formAttrs) {
        this.setProps({
          ...this.children,
          form: new Form(store.getState().form as FormsInterface)
        })
        const tmpl = document.getElementById("form")?.parentElement as HTMLElement
        tmpl.children[1].classList.add("overlay")
        tmpl.children[1].classList.add("no-cursor")
      } else {
        this.setProps({ ...filterChildren(this.children, "form") })
      }
    })

    store.on('chatListUpdated', () => {
      const currentChat = store.getState().currentChat as ChatListResponseInterface,
        chatList = store.getState().chats
      if (currentChat) {
        if (Array.isArray(chatList) && chatList.length > 0) {
          if (chatList.find((item: ChatListResponseInterface) =>
            item.id === currentChat.id
          )) {
            this.setProps({
              ...this.children,
              isCurrentChat: false
            })
          }
        } else {
          this.setProps({
            ...this.children,
            isCurrentChat: false
          })
        }
      }
    })

    store.on("currentChatUpdated", async () => {
      const currentChat = store.getState().currentChat as number
      if (currentChat) {
        doGetInfoForChat(currentChat).then((value) => {
          if (value) {
            const chatInfoResponse: { token: string, chatId: string } = value as { token: string, chatId: string }
            const currentChatInfo = (chatId: number) => {
              const chats = store.getState().chats as ChatListResponseInterface[]

              return chats.filter((chatItem: ChatListResponseInterface) => {
                return chatItem["id"] === chatId
              })
            }
            const chatInfoForRender: ChatListResponseInterface = currentChatInfo(currentChat)[0],
              ownUserId: number = (store.getState().user as ProfileInfoInterface).id

            if (getSocket()) {
              getSocket().close(1000, 'Закрыли чат')
            }

            useSocket(ownUserId, chatInfoForRender.id, chatInfoResponse.token)

            this.setProps({
              ...this.children,
              isCurrentChat: true,
              currentChat: new CurrentChat({ownUserId: ownUserId}),
              chatHeader: new ChatHeader({
                currentChatName: chatInfoForRender.title,
                currentAvatar: chatInfoForRender.avatar
              }),
              chatFooter: new ChatFooter()
            })
          }
        })
      } else {
        this.setProps({ ...filterChildren(this.children, "currentChat"), isCurrentChat: false })
      }
    })
  }

  // Делаем UnMount
  componentWillBeUnMounted() {
    Store.getInstance().reset("chats")
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = undefined
    }
  }

  override render() {
    doGetChats({})
    if (!this.intervalId) {
      this.intervalId = window.setInterval(() => {
        doGetChats({})
      }, 10000)
    }
    return `
        <main id="app">
            <div id="chat_page">
                {{{ form }}}
                <div class="{{ attrs.chatContainerClass }}">
                    <div class="{{ attrs.sidebarClass }}">
                        <div class="{{ attrs.sidebarProfileClass }}">
                            <div id="go_to_profile">Профиль ›</div>
                        </div>
                   {{{ chatList }}}
                    </div>
                    <div class="{{ attrs.chatWindowClass }}">
                    {{#if isCurrentChat}}
                        {{{ chatHeader }}}
                        {{{ currentChat }}}
                        {{{ chatFooter }}}  
                    {{else}}
                        {{{ emptyChat }}}
                    {{/if}}
                    </div>
                </div>
            </div>
        </main>
        `
  }
}
