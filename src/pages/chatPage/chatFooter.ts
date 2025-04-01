import Block from "../../framework/Block"
import { IconButton } from "../../components/buttons/iconButton/iconButton"
import { DropDown } from "../../components/dropdown/dropdown"
import { FooterButtons } from "../../utils/ChatPageAttrs"


export default class ChatFooter extends Block {
  constructor() {
    super({
      filePropertiesBtn: new IconButton({
        src: "/fileProperties.svg",
        alt: "Добавить к сообщению",
        class: "file-properties"
      }),
      footerDropdown: new DropDown({ class: "chat-footer__properties__active", buttons: FooterButtons }),
      sendMessageBtn: new IconButton({ src: "/arrowRight.svg", alt: "Отправить сообщение", class: "send-message" }),
      attrs: {
        chatFooterClass: "chat-footer",
        chatFooterPropertiesClass: "chat-footer__properties"
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
         <input type="text" placeholder="Напишите сообщение..." id="message" name="message">
         {{{ sendMessageBtn }}}
     </div>
    `
  }
}