import Block from '../../../framework/Block'
import inputsValidation from "../../../utils/helpers/inputsValidation";

export class FormInput extends Block {
    constructor(props: any) {
        super({
            ...props,
            events: {
                blur: (event: Event) => {
                    event.preventDefault()
                    const elemTarget = <HTMLInputElement>event.target,
                        validationClassList = elemTarget.parentElement?.children[elemTarget.parentElement?.children.length - 1].classList
                    if (inputsValidation(elemTarget['id'], elemTarget['value'])) {
                        validationClassList?.contains('display-block') ? validationClassList?.remove('display-block') : ''
                        return
                    } else {
                        !validationClassList?.contains('display-block') ? validationClassList?.add('display-block') : ''
                        return
                    }
                }
            }
        })
    }

    override render() {
        return `
                <input id="{{ id }}" 
                       name="{{ id }}"
                       class="form__input" 
                       type="{{ type }}" 
                       value="{{ value }}" 
                       placeholder="{{ placeholder }}">
        `
    }
}