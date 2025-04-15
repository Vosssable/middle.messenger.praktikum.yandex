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


export default class ChatPage extends Block {
  private intervalId: number

  constructor() {
    const store = Store.getInstance()
    store.set("form", {})
    doGetChats({})

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
          if (target.classList.contains('chat-list__item')) {
            console.log('clicked')
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
          form: new Form(store.getState().form)
        })
        const tmpl = document.getElementById("form")?.parentElement as HTMLElement
        tmpl.children[1].classList.add("overlay")
        tmpl.children[1].classList.add("no-cursor")
      } else {
        this.setProps({ ...filterChildren(this.children, 'form') })
      }
    })

    store.on("currentChatUpdated", async () => {
      const currentChat = store.getState().currentChat

      if (currentChat) {
        doGetInfoForChat(currentChat).then((value) => {
          console.log('ANSWER', value)
          if (value) {
            this.setProps({
              ...this.children,
              isCurrentChat: true,
              currentChat: new CurrentChat(),
              chatHeader: new ChatHeader(),
              chatFooter: new ChatFooter(),
            })
          }
        })
      } else {
        this.setProps({ ...filterChildren(this.children, "currentChat") })
      }
    })
  }

  // Запускаем при подключении компонента
  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      doGetChats({})
    }, 5000)
    console.log('Проверка айди интервала',this.intervalId)
  }

  // Делаем UnMount
  componentWillBeUnMounted() {
    console.error('TYT КОНЕЦ ИНТЕРВАЛА', this.intervalId)
    Store.getInstance().reset("chats")
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  override render() {
    console.log("rendered", this)
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
