import Block from '../../../framework/Block'

export class Button extends Block {
    constructor(props: any) {
        super({
            ...props
        })
    }

    override render() {
        return `<button class="{{ class }}" id="{{ id }}">
               {{ text }}
            </button>`
    }
}

