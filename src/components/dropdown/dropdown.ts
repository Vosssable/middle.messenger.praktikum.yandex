import Block from '../../framework/Block'
import {PropertyButton} from "../buttons/propertyButton/propertyButton";
import {DropDownPropsInterface} from "../../utils/interfaces/propsInterfaces";

export class DropDown extends Block {
    constructor(props: DropDownPropsInterface) {
        super({
            ...props
        })
    }

    override render() {
        let bodyHtml: string = ``
        for (const el of this.lists['buttons']) {
            bodyHtml += new PropertyButton({
                src: el['src'],
                text: el['text'],
                id: el['id']
            }).getContent().outerHTML
        }
        return `<div class="{{ class }}">${bodyHtml}</div>`
    }
}