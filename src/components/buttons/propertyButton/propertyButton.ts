import Block from "../../../framework/Block"
import { ButtonsInterface } from "../../../utils/interfaces/attrsInterfaces"
import { addUserForm, createNewChat, deleteUserForm } from "../../../utils/FormsAttrs"
import Store from "../../../framework/Store/Store"
import { doDeleteChat } from "../../../utils/controllers/chats/doDeleteChat"

export class PropertyButton extends Block {
  constructor(props: ButtonsInterface) {
    const store = Store.getInstance()
    super({
      ...props,
      title: store.getState().title,
      attrs: {
        rowClass: "dropdown__properties-element"
      },
      events: {
        click: (event: MouseEvent) => {
          let target = event.target as HTMLElement
          const targetTag = target.tagName.toLowerCase()
          if (targetTag !== "div") {
            if (targetTag === "span") {
              target = target.parentElement as HTMLElement
            } else if (targetTag === "img") {
              target = target.parentElement?.parentElement as HTMLElement
            } else return
          }
          switch (target.id) {
            case "add_chat":
              store.set('form', {...createNewChat, formClass: 'chat-form__change'})
              break
            case "delete_chat":
              doDeleteChat(store.getState().currentChat as number)
              store.getState().currentChat = ''
              break
            case "add_user":
              store.set('form', {...addUserForm, formClass: 'chat-form__change'})
              break
            case "delete_user":
              store.set('form', {...deleteUserForm, formClass: 'chat-form__change'})
              break
          }
        }
      }
    })
  }

  override render() {
    return `<div class="{{ attrs.rowClass }}" id="{{ id }}">
                    <span>
                      <img src="{{ src }}" alt="{{ alt }}"/>
                    </span>
                    {{text}}
                </div>`
  }
}
