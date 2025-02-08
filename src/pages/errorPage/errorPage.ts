import Block from '../../framework/Block'
import {ProfileInputLabel} from "../../components/input/profileInputLabel";

export class ErrorPage extends Block {
    constructor(props: any) {
        super({
            ...props,
            errorMessage: new ProfileInputLabel({
                label: props['label'],
                inputClass: 'width-auto display-block',
                labelClass: 'primary',
                idButton: 'error_back'
            }),
            attrs: {
                errorContainerClass: 'error-container',
                errorCodeClass: 'error__code',
                errorMessageClass: 'error__message',
            }

        });
    }

    override render() {
        return `
        <main id="app">
            <div>
                <div class="{{ attrs.errorContainerClass }}">
                    <h1 class="{{ attrs.errorCodeClass }}">{{ code }}</h1>
                    <h2 class="{{ attrs.errorMessageClass }}">{{ text }}</h2>
                    {{{ errorMessage }}}
                </div>
            </div>
        </main>
        `
    }
}