import Block from '../../framework/Block'

export class ProfileInputMain extends Block {
    constructor(props: any) {
        super({
            ...props,
            attr: {
                class: props.value ? 'profile-input__value' : 'profile-input__value width-250',
                placeholder: props.placeholder,
                type: props.type ? props.type : '',
                disabled: props.disabled ? props.disabled : false,
            },
            attrs: {
                profileInputClass: 'profile-input',
                profileInputLabelClass: 'profile-input__label'
            }
        })
    }

    override render() {

        return `
                <input value="{{ value }}"
                       name="{{ id }}"
                       id="{{ id }}">
        `
    }
}