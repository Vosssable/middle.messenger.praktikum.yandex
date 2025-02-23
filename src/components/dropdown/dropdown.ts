import Block from '../../framework/Block'
import {PropertyButton} from "../buttons/propertyButton/propertyButton";
import {DropDownPropsInterface} from "../../utils/interfaces/propsInterfaces";
import {ButtonsInterface} from "../../utils/interfaces/attrsInterfaces";

export class DropDown extends Block {
    constructor(props: DropDownPropsInterface) {
        super({
            ...props
        })
    }

    override render() {
        let bodyHtml: string = ``
        const list: ButtonsInterface[] = this.lists['buttons']
        for (const el of list) {
            bodyHtml += new PropertyButton({
                src: el['src'],
                text: el['text'],
                id: el['id']
            }).getContent().outerHTML
        }
        return `<div class="{{ class }}">${bodyHtml}</div>`
    }
}
