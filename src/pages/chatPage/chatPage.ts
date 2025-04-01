import Block from "../../framework/Block"
import { IconButton } from "../../components/buttons/iconButton/iconButton"
import { DropDown } from "../../components/dropdown/dropdown"
import { ChatPageAttrs, FooterButtons, HeaderButtons } from "../../utils/ChatPageAttrs"
import { Chat } from "../../components/chat/chat"
import { ChatPageAttrsInterface, ChatsInterface } from "../../utils/interfaces/attrsInterfaces"
import ChatList from "./chatList"
import CurrentChat from "./currentChat"
import ChatFooter from "./chatFooter"
import ChatHeader from "./chatHeader"
// import Store from "../../framework/Store/Store"


export default class ChatPage extends Block {
  constructor() {
    // const store = Store.getInstance()
    // console.log('Chat Store ', store.getState())
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
          if (target.id === "go_to_profile") {
            this.Router.go('/settings')
            return
          }
        }
      }
    })
  }

  override render() {

    return `
        <main id="app">
            <div>
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
