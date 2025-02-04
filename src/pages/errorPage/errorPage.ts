import Block from '../../framework/Block'
import {ProfileInput} from "../../components/input/profileInput";

export class ErrorPage extends Block {
    constructor(props: any) {
        super({
            ...props,
            errorContainerClass: 'error-container',
            errorCodeClass: 'error__code',
            errorMessageClass: 'error__message',
        });
    }

    override render() {
        let bodyHtml: string = ``
        bodyHtml += new ProfileInput({
            label: this.props['label'],
            inputClass: 'width-auto display-block',
            labelClass: 'primary',
            idButton: 'error_back'
        }).getContent().outerHTML

        return `
        <main id="app">
            <div>
                <div class="{{ errorContainerClass }}">
                    <h1 class="{{ errorCodeClass }}">{{ code }}</h1>
                    <h2 class="{{ errorMessageClass }}">{{ text }}</h2>
                    ${bodyHtml}
                </div>
            </div>
        </main>
        `
    }
}