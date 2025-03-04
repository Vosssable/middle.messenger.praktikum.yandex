    import Block from '../../framework/Block'
    import {Form} from "../../components/form/form";
    import {ProfileInputLabel} from "../../components/inputs/profileInput/profileInputLabel";
    import {ProfilePagePropsInterface} from "../../utils/interfaces/propsInterfaces";
    import {Button} from "../../components/buttons/button/button";
    import inputsValidation from "../../utils/helpers/inputsValidation";
    import { ProfileAttrs, ProfileBtns } from "../../utils/ProfileAttrs"
    import Store from "../../framework/Store/Store"

    interface ProfileFormDataInterface {
        [key: string]: unknown;
        first_name?: string
        second_name?: string
        login?: string
        email?: string
        password?: string
        second_password?: string
        old_password?: string
        new_password?: string
        new_password_submit?: string
        phone?: string
        message?: string
    }

    export default class ProfilePage extends Block {
        constructor() {
            const store = new Store()
            let state = store.getState()
            console.log('profile state', state)

            const props: ProfilePagePropsInterface = {
                name: 'state.user.name', inputs: ProfileAttrs.inputs, buttons: ProfileBtns, disabled: true
            }
            if (props['avatar']) {
                if (props['title']) {
                    props['avatarForm'] = new Form({
                        title: props['title'] ? props['title'] : '',
                        labels: props['labels'],
                        avatarClass: 'change-avatar'
                    })
                }
            }

            if (props.inputs) {
                for (const input of props.inputs) {
                    props[input['id']] = new ProfileInputLabel({
                        label: input['label'],
                        placeholder: props['password'] ? input['placeholder']: '',
                        disabled: !!props['disabled'],
                        id: input['id'],
                        value: !props['password'] ? input['value'] : '',
                        type: props['password'] ? 'password' : ''
                    })
                }
            }

            if (props.buttons) {
                for (const button of props.buttons) {
                    props[button['id']] = new ProfileInputLabel({
                        inputClass: button['inputClass'],
                        idButton: button['id'],
                        labelClass: button['labelClass'],
                        label: button['label']
                    })
                }
            }

            if (props.change) {
                props['changeButton'] = new Button({
                    class: 'primary_button',
                    id: props.change.id,
                    text: props.change.text
                })
            }

            super({
                ...props,
                attrs: {
                    profileClass: 'profile',
                    profileContainerClass: 'profile-container',
                    profileBackClass: 'profile-back',
                    profileAvatarClass: 'profile-avatar',
                    profileAvatarChangeClass: 'profile-avatar__change',
                    profileNameClass: 'profile-name',
                },
                events: {
                    click: (event: MouseEvent) => {
                        if (event.target instanceof HTMLElement && props.onClick) {
                            event.preventDefault()
                            switch (event.target.id) {
                                case 'change_avatar':
                                    props.onClick(event, 'profileChangeAvatar')
                                    break
                                case 'change_user_data':
                                    props.onClick(event, 'profileChangeUserData')
                                    break
                                case 'change_password':
                                    props.onClick(event, 'profileChangePassword')
                                    break
                                case 'sign_out':
                                    props.onClick(event, 'profileSignOut')
                                    break
                            }
                        }
                    },
                    submit: (event: SubmitEvent) => {
                        event.preventDefault()
                        if (props.inputs) {
                            const formData: ProfileFormDataInterface  = {}
                            for (const input of props.inputs) {
                                    const tempElement: HTMLInputElement = <HTMLInputElement>document.getElementById(input['id'])
                                    if (tempElement && tempElement['value']) {
                                        if (inputsValidation(input['id'], tempElement['value'])) {
                                            formData[input['id']] = tempElement['value']
                                            if (document.getElementById(input['id'])?.classList.contains('profile-validation-error')) {
                                                document.getElementById(input['id'])?.classList.remove('profile-validation-error')
                                            }
                                        }
                                        else {
                                            if (!document.getElementById(input['id'])?.classList.contains('profile-validation-error')) {
                                                document.getElementById(input['id'])?.classList.add('profile-validation-error')
                                            }
                                        }
                                    } else {
                                        if (!document.getElementById(input['id'])?.classList.contains('profile-validation-error')) {
                                            document.getElementById(input['id'])?.classList.add('profile-validation-error')
                                        }
                                        alert(`Не заполнено поле ${input['id']}`)
                                        return
                                    }
                            }
                            console.log(formData)
                        }
                    }
                }
            })
        }

        override render() {
            const avatarForm = this.children['avatarForm'],
                inputs = this.lists['inputs'],
                buttons = this.lists['buttons'],
                changeButton = this.children.changeButton
            let avatarHTML = ``,
                inputsHTML = ``,
                buttonsHTML = ``,
                changeHTML = ``
            if (inputs) {
                for (const input in inputs) {
                    inputsHTML += `{{{ ${inputs[input]['id']} }}}`
                }
            }
            if (buttons) {
                for (const button in buttons) {
                    buttonsHTML += `{{{ ${buttons[button]['id']} }}}`
                }
            }
            if (changeButton) {
                changeHTML += `{{{changeButton}}}`
            }
            if (avatarForm) {
                avatarHTML += `{{{avatarForm}}}`
            }
            return `
            <main id="app">
                <div>
                ${avatarHTML}
                    <form id="profile">
                        <div class="{{ attrs.profileContainerClass }}">
                        <a href="/chat" class="{{ attrs.profileBackClass }}">
                                <img src="/arrowLeft.svg" alt="Назад">
                            </a>
                            <div class="{{ attrs.profileClass }}">
                                <div class="{{ attrs.profileAvatarClass }}" >
                                    <img src="/avatarNoPhoto.svg" alt="Безаватарочный">
                                    <label class="{{ attrs.profileAvatarChangeClass }} " id="change_avatar">Поменять аватар</label>
                                </div>
                                <h2 class="{{ attrs.profileNameClass }}">{{ name }}</h2>
                                ${inputsHTML}
                                ${buttonsHTML}
                                ${changeHTML}
                            </div>
                        </div>
                    </form>
                </div>     
            </main>                     
            `
        }
    }
