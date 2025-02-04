import Block from '../../framework/Block'

export class ProfileInput extends Block {
    constructor(props: any) {
        console.log('PROFILE input')
        super({
            ...props,
            attrs: {
                profileInputClass: 'profile-input',
                profileInputLabelClass: 'profile-input__label',
                profileInputValueClass: 'profile-input__value',
                specialClass: 'width-250',
            }
        })
    }

    override render() {
        let bodyHtml: string = ''
        if (this.props['value']) {
            if (this.props['disabled']) {
                bodyHtml += `
                    <input class="{{ attrs.profileInputValueClass }}" 
                           value="{{ value }}"
                           name="{{ id }}"
                           id="{{ id }}"
                           disabled>
                `
            } else {
                bodyHtml += `
                    <input class="{{ attrs.profileInputValueClass }}" 
                           value="{{ value }}"
                           name="{{ id }}"
                           id="{{ id }}">
                `
            }
        } else {
            bodyHtml += `
                <input class="{{ attrs.profileInputValueClass }} {{ specialClass }}"
                       placeholder="{{ placeholder }}"
                       type="{{ type }}"
                       name="{{ id }}"
                       id="{{ id }}">
            `
        }
        return `
                <div class="{{ attrs.profileInputClass }} {{ inputClass }}">
                <div class="{{ attrs.profileInputLabelClass }} {{ labelClass }}" 
                     id="{{ idButton }}">
                     {{ label }}
                </div>
                ${bodyHtml}
            </div>
        `
    }
}