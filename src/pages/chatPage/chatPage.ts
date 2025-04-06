import Block from "../../framework/Block"
import ChatList from "./chatList"
import CurrentChat from "./currentChat"
import ChatFooter from "./chatFooter"
import ChatHeader from "./chatHeader"
import { hideChatDropdown } from "../../utils/helpers/hideChatDropdown"
import { Form } from "../../components/form/form"
import Store from "../../framework/Store/Store"
import { filterChildren } from "../../utils/helpers/filterChildren"


export default class ChatPage extends Block {
  constructor() {
    const store = Store.getInstance()
    store.set("form", {})
    super({
      bool: true,
      chatList: new ChatList(),
      chatHeader: new ChatHeader(),
      currentChat: new CurrentChat(),
      chatFooter: new ChatFooter(),
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
          if (target.id === "chat_page") {
            if (target.children[1].classList.contains("overlay")) {
              this.setProps({ ...filterChildren(this.children) })
            }
          }

          if ((target.id !== "chat-header_icon-btn" && !target.classList.contains("chat-header__properties")) &&
            (target.id !== "chat-footer_icon-btn" && !target.classList.contains("chat-footer__properties"))) {
            hideChatDropdown()
          }

          if (target.id === "go_to_profile") {
            event.preventDefault()
            this.Router.go("/settings")
            console.log("go")
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
        this.setProps({ ...filterChildren(this.children) })
      }
    })
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
                    {{#if bool}}
                        {{{ chatHeader }}}
                        {{{ currentChat }}}
                        {{{ chatFooter }}}  
                    {{/if}}
                    {{#else}}
                    
                    {{/else}}
                    </div>
                </div>
            </div>
        </main>
        `
  }
}
