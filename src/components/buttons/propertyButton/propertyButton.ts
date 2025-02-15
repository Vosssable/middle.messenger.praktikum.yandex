import Block from '../../../framework/Block'
import {ButtonsInterface} from "../../../utils/interfaces/attrsInterfaces";

export class PropertyButton extends Block {
    constructor(props: ButtonsInterface) {
        super({
            ...props,
            attrs: {
                rowClass: 'dropdown__properties-element'
            }
        })
    }

    override render() {
        let bodyHtml: string = ``
        if (this.props['src']) {
            bodyHtml += `
                <span>
                    <img src="{{ src }}" alt="{{ text }}"/>
                </span>`
        }
        return `<div class="{{ attrs.rowClass }}" id="{{ id }}">
                    ${bodyHtml}
                    {{text}}
               </div>`
    }
}