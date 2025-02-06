import Block from '../../../framework/Block'
import {Button} from "../../buttons/button/button";
import {FormInput} from "../formInput/formInput";

export class Form extends Block {
    constructor(props: any) {
        console.log(props.labels)
        for (let label of props.labels) {
            if (label['input']) {
                props[label['id']] = new FormInput({
                    id: label['id'],
                    type: label['type'],
                    value: label['value'],
                    placeholder: label['placeholder'],
                    validateText: label['validateText']
                })
            } else if (label['button']) {
                props[label['id']] = new Button({
                    id: label['id'],
                    class: label['class'],
                    text: label['text']
                })
            }
        }
        console.log(props)
        super({
            ...props,
            events: {
                submit: (event: SubmitEvent) => {
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
        return `
            <form class="{{attrs.formClass}} {{ class }}">
                <h1 class="{{attrs.headerClass}}">
                    {{ title }}
                </h1>
                {{{ login }}}
                {{{ password }}}
                {{{ submit_login }}}
                {{{ no_account_button }}}
            </form>
        `
    }
}