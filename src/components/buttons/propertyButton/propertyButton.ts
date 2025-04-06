import Block from "../../../framework/Block"
import { ButtonsInterface } from "../../../utils/interfaces/attrsInterfaces"
import ChatPage from "../../../pages/chatPage/chatPage"
import { Form } from "../../form/form"
import { createNewChat } from "../../../utils/FormsAttrs"
import Store from "../../../framework/Store/Store"

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
          console.log(target.id)
          switch (target.id) {
            case "add_user":
              store.set('form', {...createNewChat, formClass: 'chat-form__change'})
              console.log(store.getState())
              break
            case "delete_user":
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
