import Block from "../../framework/Block"
import { IconButton } from "../../components/buttons/iconButton/iconButton"
import { DropDown } from "../../components/dropdown/dropdown"
import { FooterButtons } from "../../utils/ChatPageAttrs"
import ChatMessageInput from "../../components/inputs/chatInputs/chatMessageInput"

export default class ChatFooter extends Block {
  constructor() {
    super({
      filePropertiesBtn: new IconButton({
        id: "chat-footer_icon-btn",
        src: "/fileProperties.svg",
        alt: "Добавить к сообщению",
        class: "file-properties"
      }),
      footerDropdown: new DropDown({
        id: "chat-footer_properties-dropdown",
        class: "chat-footer__properties__active",
        buttons: FooterButtons
      }),
      chatMessageInput: new ChatMessageInput(),
      sendMessageBtn: new IconButton({
        id: 'send_message',
        src: "/arrowRight.svg",
        alt: "Отправить сообщение",
        class: "send-message"
      }),
      attrs: {
        chatFooterClass: "chat-footer",
        chatFooterPropertiesClass: "chat-footer__properties"
      },
      events: {
        click: (event: MouseEvent) => {
          const target = event.target as HTMLElement,
            dropdown = document.getElementById("chat-footer_properties-dropdown") as HTMLElement
          if (target.id === "chat-footer_icon-btn" || target.classList.contains("chat-footer__properties")) {
            dropdown.classList.add("display-block")
          }
        }
      }
    })
  }

  override render() {
    return `
     <div class="{{ attrs.chatFooterClass }}">
         <button class="{{ attrs.chatFooterPropertiesClass }}">
             {{{ filePropertiesBtn }}}
         </button>
         {{{ footerDropdown }}}
         {{{ chatMessageInput }}}
         {{{ sendMessageBtn }}}
     </div>
    `
  }
}
