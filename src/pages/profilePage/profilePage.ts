import Block from '../../framework/Block'
import {Form} from "../../components/form/formMain/form";
import {ProfileInput} from "../../components/input/profileInput";
import {Button} from "../../components/buttons/button/button";

export class ProfilePage extends Block {
    constructor(props: any) {
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
        });
    }

    override render() {
        let avatarFormHtml: string = ``,
            inputsHtml: string = ``,
            inputs = this.lists['inputs'],
            buttons = this.lists['buttons']

        console.log(this)
        this.props['avatar'] ? avatarFormHtml += new Form({
            title: this.props['title'],
            labels: this.lists['labels'],
            avatarClass: 'change-avatar'
        }) : ''

        for (let raw of inputs) {
            console.log(raw)
            inputsHtml += new ProfileInput({
                label: raw['label'],
                placeholder: raw['placeholder'],
                disabled: !!this.props['disabled'],
                id: raw['id'],
                value: this.props['disabled'] ? raw['value'] : '',
                type: this.props['password'] ? 'password' : ''
            }).getContent().outerHTML
        }

        for (let button of buttons) {
            inputsHtml += new ProfileInput({
                inputClass: button['inputClass'],
                idButton: button['id'],
                labelClass: button['labelClass'],
                label: button['label']
            }).getContent().outerHTML
        }

        if (this.props['change']) {
            inputsHtml += new Button({
                class: 'primary_button',
                id: this.props['change']['id'],
                text: this.props['change']['text'],
            }).getContent().outerHTML
        }
        return `
        <main id="app">
            <div>
                ${avatarFormHtml}
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
                                ${inputsHtml}
                        </div>
                    </div>
                </div>
            </div>     
        </main>                     
        `
    }
}