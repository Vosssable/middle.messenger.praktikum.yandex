import Block from "../../framework/Block"
import { IconButton } from "../../components/buttons/iconButton/iconButton"
import { DropDown } from "../../components/dropdown/dropdown"
import { HeaderButtons } from "../../utils/ChatPageAttrs"

export default class ChatHeader extends Block {
  constructor() {
    super({
      userPropertiesBtn: new IconButton({
        src: "/userProperties.svg",
        alt: "Настройки пользователя",
        class: "",
        id: "chat-header_icon-btn"
      }),
      headerDropdown: new DropDown({
        id: "chat-header_properties-dropdown",
        class: "chat-header__properties__active",
        buttons: HeaderButtons
      }),

      attrs: {
        chatHeaderClass: "chat-header",
        chatHeaderNameClass: "chat-header__name",
        chatHeaderInfoClass: "chat-header__info",
        chatHeaderAvatarClass: "chat-header__avatar",
        chatHeaderPropertiesClass: "chat-header__properties"
      },

      events: {
        click: (event: MouseEvent) => {
          const target = event.target as HTMLElement,
            dropdown = document.getElementById("chat-header_properties-dropdown") as HTMLElement

          if (target.id === "chat-header_icon-btn" || target.classList.contains("chat-header__properties")) {
            dropdown.classList.add("display-block")
          } else {

          }
        }
      }
    })
  }

  override render() {
    return `
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
    `
  }
}