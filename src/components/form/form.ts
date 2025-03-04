import Block from '../../framework/Block'
import {Button} from "../buttons/button/button";
import {FormInput} from "../inputs/formInput/formInput";
import inputsValidation from "../../utils/helpers/inputsValidation";
import {FormLabelsInterface, FormsInterface} from "../../utils/interfaces/attrsInterfaces";
import doSignIn from "../../utils/controllers/auth/doSignIn"
import doSignUp from "../../utils/controllers/auth/doSignUp"
import { SignUpBodyInterface } from "../../utils/interfaces/apiInterfaces"

interface FormDataInterface {
    [key: string]: unknown;
    first_name?: string
    second_name?: string
    login?: string
    email?: string
    password?: string
    second_password?: string
    phone?: string
    message?: string
}

export class Form extends Block {
    constructor(props: FormsInterface) {
        const inputs = [],
            buttons = []

        if (props.labels) {
            for (const label of props.labels) {
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
                } else if (label['upload']) {
                    props[label['id']] = `
                        <label class="${label['class']}" id="${label['id']}">${label['text']}
                            <input type="file" id="upload_button__upload_form" hidden="hidden" name="${label['value']}">
                        </label>
                    `
                }
            }
            props.inputs = inputs
            props.buttons = buttons
        }


        super({
            ...props,
            events: {
                submit: (event: SubmitEvent) => {
                    event.preventDefault()
                    if (props.labels) {
                        const formData: FormDataInterface  = {}
                        for (const label of props.labels.filter(item => item.id !== 'second_password')) {
                            if (label['input']) {
                                const tempElement: HTMLInputElement = <HTMLInputElement>document.getElementById(label['id'])
                                if (tempElement && tempElement['value']) {
                                    if (inputsValidation(label['id'], tempElement['value'])) {
                                        formData[label['id']] = tempElement['value']
                                    }
                                } else {
                                    alert(`Не заполнено поле ${label['id']}`)
                                    return
                                }
                            }
                        }
                        switch (window.location.pathname) {
                            case '/':
                                doSignIn(formData.login as string, formData.password as string)
                            break
                            case '/auth':
                                doSignUp(formData as SignUpBodyInterface)
                            break
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
        const inputList: string[] = <string[]>this.lists.inputs,
            labelList: FormLabelsInterface[] = <FormLabelsInterface[]>this.lists.labels
        const inputsHTML = inputList.length > 0 ? inputList.map((input) => {
                const currentInput: FormLabelsInterface = <FormLabelsInterface>labelList.find((field: FormLabelsInterface) => field.id === input),
                    placeholder = currentInput.placeholder,
                    validateText = currentInput.validateText
                return `
                    <div class="form__field">
                        {{{ ${input} }}}                
                        <div class="form__label"> ${placeholder} </div>
                        <span class="form__input-validate"> ${validateText} </span>
                    </div>`;
            }).join('') : this.props['upload_file'],
            buttonsHTML = this.lists.buttons.map((button) => {
                return `{{{ ${button} }}}`;
            }).join('')
        return `
            <form class="{{attrs.formClass}} {{ avatarClass }} {{ class }}">
                <h1 class="{{attrs.headerClass}}">
                    {{ title }}
                </h1>
                ${inputsHTML}
                ${buttonsHTML}
            </form>
        `
    }
}
