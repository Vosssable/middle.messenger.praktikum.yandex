import Block from '../../../framework/Block'
import {Button} from "../../buttons/button/button";
import {FormInput} from "../formInput/formInput";

export class Form extends Block {

    constructor(props: any) {
        super({
            ...props,
            events: {
                click: (event: SubmitEvent) => {
                    event.preventDefault()
                    console.log('click click', event)
                }
            },
            attrs: {
                formClass: 'container__form',
                headerClass: 'title__form'
            }
        })
    }

    override addEvents(): void {
        const {events = {}} = this.props

        console.log('OVERRIDE events', this._element, this.props, events)

        // super.addEvents()
        Object.keys(events).forEach(eventName => {
            if (this._element) {
                console.log('OVERRIDE events')

                this._element.addEventListener(eventName, events[eventName])
            }
        })
    }

    override render() {
        let bodyHtml: string = ''

        for (let label of this.lists['labels']) {
            if (label['input']) {
                bodyHtml += new FormInput({
                    id: label['id'],
                    type: label['type'],
                    value: label['value'],
                    placeholder: label['placeholder'],
                    validateText: label['validateText']
                }).getContent().outerHTML
            } else if (label['button']) {
                bodyHtml += new Button({
                    id: label['id'],
                    class: label['class'],
                    text: label['text']
                }).getContent().outerHTML
            }
        }
        return `
            <form class="{{attrs.formClass}} {{ class }}">
                <h1 class="{{attrs.headerClass}}">
                    {{ title }}
                </h1>
                ${bodyHtml}
            </form>
        `
    }
}