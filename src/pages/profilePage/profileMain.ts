import { ProfilePagePropsInterface } from "../../utils/interfaces/propsInterfaces"
import Block from "../../framework/Block"
import { ProfileAttrs, ProfileEditBtn, ProfileEditPasswordAttrs } from "../../utils/ProfileAttrs"
import { ProfileInputLabel } from "../../components/inputs/profileInput/profileInputLabel"
import inputsValidation from "../../utils/helpers/inputsValidation"
import { ProfileFormDataInterface } from "./profilePage"
import { ButtonsInterface, InputsInterface, ProfileBtnsInterface } from "../../utils/interfaces/attrsInterfaces"
import { Button } from "../../components/buttons/button/button"
import doLogOut from "../../utils/controllers/auth/doLogOut"
import { doChangeProfile } from "../../utils/controllers/user/doChangeProfile"
import { ProfileInfoInterface } from "../../utils/interfaces/apiInterfaces"

export default class ProfileMain extends Block {
  constructor(props: ProfilePagePropsInterface) {
    super({
      ...props,
      attrs: {
        profileClass: "profile",
        profileContainerClass: "profile-container",
        profileBackClass: "profile-back",
        profileAvatarClass: "profile-avatar",
        profileAvatarChangeClass: "profile-avatar__change",
        profileNameClass: "profile-name"
      },
      events: {
        click: (event: MouseEvent) => {
          const target = event.target as HTMLElement
          if (target.id === 'profile_change') {
            return
          }
          if (target) {
            event.preventDefault()
            switch (target.id) {
              case "change_avatar":

                break
              case "change_user_data":
                this.setProps({
                  name: props.name, inputs: ProfileAttrs.inputs, change: ProfileEditBtn, disabled: false, action: 'change_user_data'
                })
                setInputs()
                break
              case "change_password":
                this.setProps({
                  name: '', inputs: ProfileEditPasswordAttrs, change: ProfileEditBtn, disabled: false, action: 'change_user_password'
                })
                setInputs()
                break
              case "log_out":
                doLogOut()
                break
            }
          }
        },
        submit: (event: SubmitEvent) => {
          event.preventDefault()
          if (this.props.action === 'change_user_data') {
            if (props.inputs) {
              const formData: ProfileFormDataInterface = {}
              for (const input of props.inputs) {
                const tempElement = document.getElementById(input["id"]) as HTMLInputElement
                if (tempElement && tempElement["value"]) {
                  if (inputsValidation(input["id"], tempElement["value"])) {
                    formData[input["id"]] = tempElement["value"]
                    if (document.getElementById(input["id"])?.classList.contains("profile-validation-error")) {
                      document.getElementById(input["id"])?.classList.remove("profile-validation-error")
                    }
                  } else {
                    if (!document.getElementById(input["id"])?.classList.contains("profile-validation-error")) {
                      document.getElementById(input["id"])?.classList.add("profile-validation-error")
                    }
                  }
                } else {
                  if (!document.getElementById(input["id"])?.classList.contains("profile-validation-error")) {
                    document.getElementById(input["id"])?.classList.add("profile-validation-error")
                  }
                  alert(`Не заполнено поле ${input["id"]}`)
                  return
                }
              }
              doChangeProfile(<ProfileInfoInterface><unknown>formData)
            }
          } else if (this.props.action === 'change_user_password') {
            console.log("change_password", props.inputs)
          }

        }
      }
    })
    const setInputs = () => {
      const inputs = <InputsInterface[]>this.lists.inputs,
        buttons = <ProfileBtnsInterface[]>this.lists.buttons,
        change = <ButtonsInterface>this.props.change

      this.setProps({
        ProfileInputs: inputs ? inputs.map(input => new ProfileInputLabel({
          value: input["value"],
          label: input["label"],
          placeholder: this.lists["password"] ? input["placeholder"] : "",
          disabled: !!this.props["disabled"],
          id: input["id"]
        })) : [],
        ProfileButtons: buttons ? buttons.map(button => new ProfileInputLabel({
          inputClass: button["inputClass"],
          idButton: button["id"],
          labelClass: button["labelClass"],
          label: button["label"]
        })) : [],
        ProfileChange: change ? new Button({
          class: 'primary_button',
          id: change.id,
          text: change.text
        }) : ''
      })
    }
    setInputs()
  }

  override render() {
    return `
       <div class="{{ attrs.profileClass }}">
            
                <div class="{{ attrs.profileAvatarClass }}" >
                    <img src="/avatarNoPhoto.svg" alt="Безаватарочный">
                    <label class="{{ attrs.profileAvatarChangeClass }}" id="change_avatar">Поменять аватар</label>
                </div>
                
                <h2 class="{{ attrs.profileNameClass }}">{{ name }}</h2>
            <form id="profile" class="center">
                {{{ ProfileInputs }}}
                {{{ ProfileButtons }}}
                {{{ ProfileChange }}}
            </form>
       </div>
    `
  }
}