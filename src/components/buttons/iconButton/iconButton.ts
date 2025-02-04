import Block from '../../../framework/Block'

export class IconButton extends Block {
    constructor(props: any) {
        super({
            ...props
        })
    }

    override render() {
        return `<img src="{{ src }}" alt="{{ alt }}" class="{{ class }}"/>`
    }
}