import Block from '../../../framework/Block'
import {ButtonsInterface} from "../../../utils/interfaces/attrsInterfaces";

export class IconButton extends Block {
    constructor(props: ButtonsInterface) {
        super({
            ...props
        })
    }

    override render() {
        return `<img src="{{ src }}" alt="{{ alt }}" class="{{ class }}" id="{{ id }}"/>`
    }
}
