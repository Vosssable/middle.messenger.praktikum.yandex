import Block from '../../framework/Block'
import {loginForm} from "../../utils/FormsAttrs"
import {Form} from "../../components/form/formMain/form"

export class LoginPage extends Block {
    constructor() {
        super({
            loginForm: new Form(loginForm)
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