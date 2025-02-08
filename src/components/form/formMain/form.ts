import Block from '../../../framework/Block'
import {Button} from "../../buttons/button/button";
import {FormInput} from "../formInput/formInput";

export class Form extends Block {
    constructor(props: any) {
        let inputs = [],
            buttons = []
        for (let label of props.labels) {
            if (label['input']) {
                props[label['id']] = new FormInput({
                    id: label['id'],
                    type: label['type'],
                    value: label['value'],
                    placeholder: label['placeholder'],
                    validateText: label['validateText']
                })
                inputs.push(label['id'])
            } else if (label['button']) {
                props[label['id']] = new Button({
                    id: label['id'],
                    class: label['class'],
                    text: label['text']
                })
                buttons.push(label['id'])
            }
        }
        props.inputs = inputs
        props.buttons = buttons

        console.log('FORM', props)
        super({
            ...props,
            events: {
                submit: (event: SubmitEvent) => {
                    event.preventDefault()
                    for (let label of props.labels) {
                        if (label['input']) {
                            if (document.getElementById(label['id'])) {
                                console.log(document.getElementById(label['id'])['value'])
                            }
                        }
                    }
                    console.log('click click', event)
                }
            },
            attrs: {
                formClass: 'container__form',
                headerClass: 'title__form'
            }
        })
    }

    override render() {
        const inputsHTML = this.lists.inputs.map((input: string) => {
            return `<div class='form__field'>{{{ ${input} }}}</div>`;
        }).join(''),
            buttonsHTML = this.lists.buttons.map((button: string) => {
                return `{{{ ${button} }}}`;
            }).join('')
        console.log(inputsHTML)
        return `
            <form class="{{attrs.formClass}} {{ class }}">
                <h1 class="{{attrs.headerClass}}">
                    {{ title }}
                </h1>
                ${inputsHTML}
                ${buttonsHTML}
            </form>
        `
    }
}