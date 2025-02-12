import Block from '../../../framework/Block'
import inputsValidation from "../../../utils/helpers/inputsValidation";
import {FormInputPropsInterface} from "../../../utils/interfaces/propsInterfaces";

export class FormInput extends Block {
    constructor(props: FormInputPropsInterface) {
        super({
            ...props,
            events: {
                blur: (event: Event) => {
                    event.preventDefault()
                    const elemTarget = <HTMLInputElement>event.target,
                        validationClassList = elemTarget.parentElement?.children[elemTarget.parentElement?.children.length - 1].classList
                    if (inputsValidation(elemTarget['id'], elemTarget['value'])) {
                        if (validationClassList?.contains('display-block')) {
                            validationClassList?.remove('display-block');
                        }
                        return
                    } else {
                        if (!validationClassList?.contains('display-block')) {
                            validationClassList?.add('display-block')
                        }
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