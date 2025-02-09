import Block from '../../../framework/Block'
import {Button} from "../../buttons/button/button";
import {FormInput} from "../formInput/formInput";
import inputsValidation from "../../../utils/helpers/inputsValidation";

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
                    placeholder: label['placeholder']
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

        super({
            ...props,
            events: {
                submit: (event: SubmitEvent) => {
                    event.preventDefault()
                    for (let label of props.labels) {
                        if (label['input']) {
                            const tempElement: HTMLInputElement = <HTMLInputElement>document.getElementById(label['id'])
                                console.log(`Проверяем по сабмиту ${label['id']}`)
                            if (tempElement && tempElement['value']) {
                                console.log(`${inputsValidation(label['id'], tempElement['value']) ? 'Bалидацию проходит' : 'Bалидацию не проходит'}`)
                            } else {
                                console.log(`Не заполнено поле`)
                            }
                        }
                    }
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
                const currentInput = this.lists['labels'].find(field => field.id === input),
                    placeholder = currentInput.placeholder,
                    validateText = currentInput.validateText
                return `
                    <div class="form__field">
                        {{{ ${input} }}}                
                        <div class="form__label"> ${placeholder} </div>
                        <span class="form__input-validate"> ${validateText} </span>
                    </div>`;
            }).join(''),
            buttonsHTML = this.lists.buttons.map((button: string) => {
                return `{{{ ${button} }}}`;
            }).join('')
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