import Block from '../../framework/Block'
import {createUserForm} from "../../utils/FormsAttrs"
import {Form} from "../../components/form/formMain/form";
import {KeyValueInterface} from "../../utils/interfaces/requestInterfaces";
import inputsValidation from "../../utils/helpers/inputsValidation";

export class RegisterPage extends Block {
    constructor() {
        super({
            registerPage: new Form(createUserForm),
            events: {
                submit: (event: SubmitEvent) => {
                    if (!event) return
                    if (event.submitter) {
                        if (event.submitter.id === 'submit_registration') {
                            const formData = new FormData(document.forms[0])
                            let tempFormData: KeyValueInterface = {}
                            for (let [key, value] of formData.entries()) {
                                if (!inputsValidation(key, <string>value) && inputsValidation(key, <string>value) !== undefined) {
                                    console.log(`Не прошел валидацию ${key}: ${value}`, inputsValidation(key, <string>value))
                                    document?.getElementById(key)?.parentElement?.getElementsByClassName('form__input-validate')[0].classList.add('display-block')
                                } else if (key === 'second_password' && value !== tempFormData['password']) {
                                    document?.getElementById(key)?.parentElement?.getElementsByClassName('form__input-validate')[0].classList.add('display-block')
                                }
                                tempFormData[key] = value
                            }
                            console.log(tempFormData)
                        } else if (event.submitter.id === 'sign_in') {
                            console.log('redirect to login')
                        }
                    }
                    event.preventDefault()
                }
            }
        })
    }

    override render() {
        return `
            <main id="app">
              {{{ registerPage }}}
            </main>
        `
    }
}