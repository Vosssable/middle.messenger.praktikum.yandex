import Block from '../../framework/Block'
import {ProfileInputMain} from "./profileInputMain";

export class ProfileInputLabel extends Block {
    constructor(props: any) {
        super({
            ...props,
            profileInputMain: !props.idButton || props.idButton.length <= 0 ? new ProfileInputMain({
                placeholder: props.placeholder,
                value: props.value,
                name: props.id,
                id: props.id,
                disabled: true,
                type: props.type
            }) : '',
            attrs: {
                profileInputClass: 'profile-input',
                profileInputLabelClass: 'profile-input__label',
                profileInputValueClass: 'profile-input__value',
                specialClass: 'width-250',
            }
        })
    }

    override render() {
        return `
            <div class="{{ attrs.profileInputClass }} {{ inputClass }}">
                <div class="{{ attrs.profileInputLabelClass }} {{ labelClass }}" 
                     id="{{ idButton }}">
                     {{ label }}
                </div>
                {{{ profileInputMain }}}
            </div>
        `
    }
}