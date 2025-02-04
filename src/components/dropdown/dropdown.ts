import Block from '../../framework/Block'
import {PropertyButton} from "../buttons/propertyButton/propertyButton";

export class DropDown extends Block {
    constructor(props: any) {
        super({
            ...props
        })
    }

    override render() {
        let bodyHtml: string = ``
        for (let el of this.lists['buttons']) {
            bodyHtml += new PropertyButton({
                src: el['src'],
                text: el['text'],
                id: el['id']
            }).getContent().outerHTML
        }
        return `<div class="{{ class }}">${bodyHtml}</div>`
    }
}