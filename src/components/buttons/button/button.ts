import Block from '../../../framework/Block'
import {ButtonsInterface} from "../../../utils/interfaces/attrsInterfaces";

export class Button extends Block {
    constructor(props: ButtonsInterface) {
        super({
            ...props
        })
    }

    override render() {
        return `<button class="{{ class }}" id="{{ id }}" type="{{ type }}">
               {{ text }}
            </button>`
    }
}
