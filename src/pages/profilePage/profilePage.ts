import Block from "../../framework/Block"
import { ProfilePagePropsInterface } from "../../utils/interfaces/propsInterfaces"
import { ProfileAttrs, ProfileBtns } from "../../utils/ProfileAttrs"
// import Store from "../../framework/Store/Store"
import ProfileMain from "./profileMain"
import Store from "../../framework/Store/Store"
import ProfileBack from "./profileBack"

export interface ProfileFormDataInterface {
  [key: string]: unknown

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
  constructor(props?: ProfilePagePropsInterface) {
    const userInfo = Store.getInstance().getState().user
    for (const input of ProfileAttrs.inputs) {
      if (userInfo[input.id]) {
        input.value = userInfo[input.id].length > 0 ? userInfo[input.id] : '-'
      }
    }

    // const currProps: ProfilePagePropsInterface = props ? props : {
    //     name: 'state.user.name', inputs: ProfileAttrs.inputs, buttons: ProfileBtns, disabled: true
    // }
    // if (currProps['avatar']) {
    //     if (currProps['title']) {
    //       currProps['avatarForm'] = new Form({
    //             title: currProps['title'] ? currProps['title'] : '',
    //             labels: currProps['labels'],
    //             avatarClass: 'change-avatar'
    //         })
    //     }
    // }
    //
    //
    //
    // if (currProps.buttons) {
    //     for (const button of currProps.buttons) {
    //       currProps[button['id']] = new ProfileInputLabel({
    //             inputClass: button['inputClass'],
    //             idButton: button['id'],
    //             labelClass: button['labelClass'],
    //             label: button['label']
    //         })
    //     }
    // }
    //
    // if (currProps.change) {
    //   currProps['changeButton'] = new Button({
    //         class: 'primary_button',
    //         id: currProps.change.id,
    //         text: currProps.change.text
    //     })
    // }

    super({
      ...props,
      mainProfile: new ProfileMain({
        name: userInfo.first_name, inputs: ProfileAttrs.inputs, buttons: ProfileBtns, disabled: true
      }),
      profileBack: new ProfileBack(),
      attrs: {
        profileClass: "profile",
        profileContainerClass: "profile-container",
        profileAvatarClass: "profile-avatar",
        profileAvatarChangeClass: "profile-avatar__change",
        profileNameClass: "profile-name"
      },
        //         if (event.target instanceof HTMLElement) {
        //           if (event.target.id === 'back_to_messenger') {
        //             return
        //           }
        //             event.preventDefault()
        //             switch (event.target.id) {
        //                 case 'change_avatar':
        //
        //                     break
        //                 case 'change_user_data':
        //                   this.setProps({
        //                     name: 'Ivan', inputs: ProfileAttrs.inputs, change: ProfileEditBtn
        //                   })
        //                     break
        //                 case 'change_password':
        //                     break
        //                 case 'sign_out':
        //                     break
        //             }
        //         }
        //     },

      // }
      //         event.preventDefault()
      //         if (currProps.inputs) {
      //             const formData: ProfileFormDataInterface  = {}
      //             for (const input of currProps.inputs) {
      //                     const tempElement: HTMLInputElement = <HTMLInputElement>document.getElementById(input['id'])
      //                     if (tempElement && tempElement['value']) {
      //                         if (inputsValidation(input['id'], tempElement['value'])) {
      //                             formData[input['id']] = tempElement['value']
      //                             if (document.getElementById(input['id'])?.classList.contains('profile-validation-error')) {
      //                                 document.getElementById(input['id'])?.classList.remove('profile-validation-error')
      //                             }
      //                         }
      //                         else {
      //                             if (!document.getElementById(input['id'])?.classList.contains('profile-validation-error')) {
      //                                 document.getElementById(input['id'])?.classList.add('profile-validation-error')
      //                             }
      //                         }
      //                     } else {
      //                         if (!document.getElementById(input['id'])?.classList.contains('profile-validation-error')) {
      //                             document.getElementById(input['id'])?.classList.add('profile-validation-error')
      //                         }
      //                         alert(`Не заполнено поле ${input['id']}`)
      //                         return
      //                     }
      //             }
      //         }
      //     }
      // }
    })
  }

  override render() {
    // let avatarHTML = ``,
    //   inputsHTML = ``,
    //   buttonsHTML = ``,
    //   changeHTML = ``
    //
    // const inputs = <InputsInterface[]>this.lists.inputs
    //
    // if (inputs) {
    //   for (const input of inputs) {
    //     this.children[input.id] = new ProfileInputLabel({
    //       label: input['label'],
    //       placeholder: this.lists['password'] ? input['placeholder']: '',
    //       disabled: !!this.props['disabled'],
    //       id: input['id'],
    //     })
    //   }
    // }
    //
    //   const avatarForm = this.children['avatarForm'],
    //       buttons = this.lists['buttons'],
    //       changeButton = this.children.changeButton
    //
    //   // if (inputs) {
    //   //     for (const input in inputs) {
    //   //         inputsHTML += `{{{ ${this.children[input.label]} }}}`
    //   //     }
    //   // }
    //   if (buttons) {
    //       for (const button in buttons) {
    //           buttonsHTML += `{{{ ${buttons[button]['id']} }}}`
    //       }
    //   }
    //   if (changeButton) {
    //       changeHTML += `{{{changeButton}}}`
    //   }
    //   if (avatarForm) {
    //       avatarHTML += `{{{avatarForm}}}`
    //   }
    return `
            <main id="app">
                <div>
                    <div class="{{ attrs.profileContainerClass }}">
                        {{{ profileBack }}}
                        {{{ mainProfile }}}
                    </div>
                </div>     
            </main>                     
            `
  }
}
