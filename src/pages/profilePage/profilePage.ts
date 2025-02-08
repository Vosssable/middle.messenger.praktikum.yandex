import Block from '../../framework/Block'
import {Form} from "../../components/form/formMain/form";
import {ProfileInputLabel} from "../../components/input/profileInputLabel";

export class ProfilePage extends Block {
    constructor(props: any) {

        props['avatar'] ? props['title'] += new Form({
            title: props['title'],
            labels: props['labels'],
            avatarClass: 'change-avatar'
        }) : ''
        for (let input of props.inputs) {
            props[input['id']] = new ProfileInputLabel({
                label: input['label'],
                placeholder: input['placeholder'],
                disabled: !!props['disabled'],
                id: input['id'],
                value: props['disabled'] ? input['value'] : '',
                type: props['password'] ? 'password' : ''
            })
        }
        for (let button of props.buttons) {
            props[button['id']] = new ProfileInputLabel({
                inputClass: button['inputClass'],
                idButton: button['id'],
                labelClass: button['labelClass'],
                label: button['label']
            })
        }
        console.log(props)
        super({
            ...props,
            attrs: {
                profileClass: 'profile',
                profileContainerClass: 'profile-container',
                profileBackClass: 'profile-back',
                profileAvatarClass: 'profile-avatar',
                profileAvatarChangeClass: 'profile-avatar__change',
                profileNameClass: 'profile-name',
            }
        })
    }

    override render() {
        const inputs = this.lists['inputs'],
            buttons = this.lists['buttons']
        let inputsHTML = ``,
            buttonsHTML = ``
        for (let input in inputs) {
            inputsHTML += `{{{ ${inputs[input]['id']} }}}`
        }
        for (let button in buttons) {
            buttonsHTML += `{{{ ${buttons[button]['id']} }}}`
        }
        // if (this.props['change']) {
        //     inputsHtml += new Button({
        //         class: 'primary_button',
        //         id: this.props['change']['id'],
        //         text: this.props['change']['text'],
        //     }).getContent().outerHTML
        // }
        console.log(this)
        return `
        <main id="app">
            <div>
                <div id="profile">
                    <div class="{{ attrs.profileContainerClass }}">
                        <div class="{{ attrs.profileBackClass }}">
                            <img src="/arrowLeft.svg" alt="Назад">
                        </div>
                        <div class="{{ attrs.profileClass }}">
                            <div class="{{ attrs.profileAvatarClass }}" id="change_avatar">
                                <img src="/avatarNoPhoto.svg" alt="Безаватарочный">
                                <label class="{{ attrs.profileAvatarChangeClass }}">Поменять аватар</label>
                            </div>
                            <h2 class="{{ attrs.profileNameClass }}">{{ name }}</h2>
                            ${inputsHTML}
                            ${buttonsHTML}
                        </div>
                    </div>
                </div>
            </div>     
        </main>                     
        `
    }
}