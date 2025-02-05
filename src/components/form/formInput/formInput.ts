import Block from '../../../framework/Block'

export class FormInput extends Block {
    constructor(props: any) {
        super({
            ...props,
            events: {
                blur: (event: Event) => {
                    console.log('blur input', event)
                    event.stopPropagation()
                    event.preventDefault()
                },
                click: (event: SubmitEvent) => {
                    console.log('click click', event)
                }
            },
            attrs: {
                formFieldClass: 'form__field',
                formInputClass: 'form__input',
                formLabelClass: 'form__label',
                formLabelValidate: 'form__input-validate'
            }
        })
    }

    override addEvents(): void {
        const {events = {}} = this.props

        console.log('OVER events', this._element, this.props, events)

        // super.addEvents()
        Object.keys(events).forEach(eventName => {
            if (this._element) {
                console.log('OVER events exist')

                this._element.addEventListener(eventName, events[eventName])
            }
        })
    }

    override render() {
        return `
            <div class="{{ attrs.formFieldClass }}">
                <input id="{{ id }}" 
                       name="{{ id }}"
                       class="{{ attrs.formInputClass }}" 
                       type="{{ type }}" 
                       value="{{ value }}" 
                       placeholder="{{ placeholder }}">
                <div class="{{ attrs.formLabelClass }}"> {{ placeholder }}</div>
                <span class="{{ attrs.formLabelValidate }}">{{ validateText }}</span>
            </div>
        `
    }
}