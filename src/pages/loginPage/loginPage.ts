import Block from '../../framework/Block'
import {loginForm} from "../../utils/FormsAttrs"
import {Form} from "../../components/form/formMain/form";
import inputsValidation from "../../utils/helpers/inputsValidation";
import {KeyValueInterface} from "../../utils/interfaces/requestInterfaces";

export class LoginPage extends Block {
    constructor() {
        super({
            loginForm: new Form(loginForm),
            // events: {
            //     click: (event: SubmitEvent) => {console.log('clicked', event)}
            // }
            //     submit: (event: SubmitEvent) => {
            //         if (!event) return
            //         if (event.submitter) {
            //             if (event.submitter.id === 'submit_login') {
            //                 const formData = new FormData(document.forms[0])
            //                 let tempFormData: KeyValueInterface = {}
            //                 for (let [key, value] of formData.entries()) {
            //                     if (!inputsValidation(key, <string>value)) {
            //                         console.log(`Не прошел валидацию ${key}: ${value}`)
            //                         document?.getElementById(key)?.parentElement?.getElementsByClassName('form__input-validate')[0].classList.add('display-block')
            //                     }
            //                     tempFormData[key] = value
            //                 }
            //                 console.log(tempFormData)
            //             } else if (event.submitter.id === 'no_account_button') {
            //                 console.log('redirect to new user')
            //             }
            //         }
            //         event.preventDefault()
            //     }
            // },
        })
    }

    override addEvents(): void {
            const { events = {} } = this.props

            console.log('OVERRIDE LOGIN PAGE events', this._element, events)

            // super.addEvents()
            Object.keys(events).forEach(eventName => {
                if (this._element) {
                    console.log('OVERRIDE LOGIN PAGE events')

                    this._element.addEventListener(eventName, events[eventName])
                }
            })
    }



    override render() {
        return `
        <main id="app">
            <div>
                <div class="app">
                    {{{ loginForm }}}
                </div>
            </div>
        </main>
        `
    }
}