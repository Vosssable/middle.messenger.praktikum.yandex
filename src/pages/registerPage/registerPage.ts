import Block from '../../framework/Block'
import {createUserForm} from "../../utils/FormsAttrs"
import {Form} from "../../components/form/form"

export default class RegisterPage extends Block {
    constructor() {
        super({
            registerPage: new Form(createUserForm)
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
