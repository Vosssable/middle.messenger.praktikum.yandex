import Block from '../../../framework/Block'
import {Button} from "../../buttons/button/button";
import {FormInput} from "../formInput/formInput";

export class Form extends Block {

    constructor(props: any) {
        console.log('PROFILE input click')

        super({
            ...props,
            events: {
                blur: (event: Event) => {
                    console.log('form-blur', event)
                    event.stopPropagation()
                    event.preventDefault()
                }
            },
            attrs: {
                formClass: 'container__form',
                headerClass: 'title__form'
            }
        })
    }

    override render() {
        let bodyHtml: string = ''
        console.log(this)

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