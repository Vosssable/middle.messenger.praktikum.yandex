import Block from '../../../framework/Block'
import {ButtonsInterface} from "../../../utils/interfaces/attrsInterfaces";
import { getSocket } from "../../../utils/helpers/webSocket"

export class IconButton extends Block {
    constructor(props: ButtonsInterface) {
        super({
            ...props,
            events: {
                click: (event: MouseEvent) => {
                    const target = event.target as HTMLElement;
                    if (target.id === 'send_message') {
                        const input = document.getElementById('input_message') as HTMLInputElement
                        if (!input.value) return
                        const socket = getSocket()

                        socket.send(JSON.stringify({
                            content: input.value,
                            type: 'message',
                        }))

                        input.value = ''
                    }
                }
            }
        })
    }

    override render() {
        return `<img src="{{ src }}" alt="{{ alt }}" class="{{ class }}" id="{{ id }}"/>`
    }
}
