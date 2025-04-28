import Block from "../../framework/Block"
import { PropertyButton } from "../buttons/propertyButton/propertyButton"
import { DropDownPropsInterface } from "../../utils/interfaces/propsInterfaces"

export class DropDown extends Block {
  constructor(props: DropDownPropsInterface) {
    for (const button of props.buttons) {
      if (button.id) {
          props[button.id] = new PropertyButton({
            src: button.src,
            text: button.text,
            id: button.id,
            alt: button.text
          })
      }
    }
    super({
      ...props,
    })
  }

  override render() {
    const buttonsHtml = this.lists.buttons.map((button) => {
        return `{{{ ${button.id} }}}`
      }).join("")

    return `<div class="{{ class }}" id="{{ id }}">
           ${buttonsHtml}
        </div>`
  }
}
