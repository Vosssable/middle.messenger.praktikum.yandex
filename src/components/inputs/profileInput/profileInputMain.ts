import Block from '../../../framework/Block'
import {ProfileInputLabelInterface} from "../../../utils/interfaces/propsInterfaces";
import inputsValidation from "../../../utils/helpers/inputsValidation";

export class ProfileInputMain extends Block {
    constructor(props: ProfileInputLabelInterface) {
        super({
            ...props,
            attr: {
                class: props.value ? 'profile-input__value' : 'profile-input__value width-250',
                placeholder: props.placeholder,
                type: props.type ? props.type : '',
                disabled: props.disabled ? props.disabled : false,
            },
            attrs: {
                profileInputClass: 'profile-inputs',
                profileInputLabelClass: 'profile-input__label'
            },
            events: {
                blur: (event: Event) => {
                    event.preventDefault()
                    const elemTarget = <HTMLInputElement>event.target,
                        validationClassList = elemTarget.parentElement?.children[elemTarget.parentElement?.children.length - 1].classList
                    if (inputsValidation(elemTarget['id'], elemTarget['value'])) {
                        if (validationClassList?.contains('profile-validation-error')) {
                            validationClassList?.remove('profile-validation-error');
                        }
                        return
                    } else {
                        if (!validationClassList?.contains('profile-validation-error')) {
                            validationClassList?.add('profile-validation-error')
                        }
                        return
                    }
                }
            }
        })
    }

    override render() {
        return `
                <input value="{{ value }}"
                       name="{{ id }}"
                       id="{{ id }}"
                       placeholder="{{ placeholder }}">
        `
    }
}
