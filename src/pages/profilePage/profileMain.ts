import { ProfilePagePropsInterface } from "../../utils/interfaces/propsInterfaces"
import { ProfileAttrs, ProfileBtns, ProfileEditBtn, ProfileEditPasswordAttrs } from "../../utils/ProfileAttrs"
import { ProfileInputLabel } from "../../components/inputs/profileInput/profileInputLabel"
import { ButtonsInterface, InputsInterface, ProfileBtnsInterface } from "../../utils/interfaces/attrsInterfaces"
import { Button } from "../../components/buttons/button/button"
import { doChangeProfile } from "../../utils/controllers/user/doChangeProfile"
import { validateForms } from "../../utils/helpers/validateForms"
import { doChangePass } from "../../utils/controllers/user/doChangePass"
import { isEmpty } from "../../utils/mydash/isEmpty"
import Block from "../../framework/Block"
import Store from "../../framework/Store/Store"
import ProfilePage from "./profilePage"
import doLogOut from "../../utils/controllers/auth/doLogOut"
import uploadResources from "../../utils/helpers/uploadResources"

export default class ProfileMain extends Block {
  constructor(props: ProfilePagePropsInterface) {
    const store = Store.getInstance(),
      userInfo = store.getState().user as {[key: string]: string}

    function changeInputsValue() {
      ProfileAttrs.name = userInfo.first_name
      for (const input of ProfileAttrs.inputs) {
        if (userInfo[input.id]) {
          input.value = userInfo[input.id].length > 0 ? userInfo[input.id] : "-"
        }
      }
    }

    changeInputsValue()
    props.name = ProfileAttrs.name
    props.inputs = ProfileAttrs.inputs

    super({
      ...props,
      attrs: {
        profileClass: "profile",
        profileAvatarClass: "profile-avatar",
        profileAvatarChangeClass: "profile-avatar__change",
        profileNameClass: "profile-name"
      },
      events: {
        click: (event: MouseEvent) => {
          if (document.getElementById("profile-main")?.parentElement?.classList.contains("overlay")) return
          const target = event.target as HTMLElement
          if (target.id === "profile_change") {
            return
          }
          if (target) {
            event.preventDefault()
            switch (target.id) {
              case "change_avatar":
                this.Router.use("/settings", new ProfilePage({ avatar: true }) as unknown as typeof Block)
                break
              case "change_user_data":
                this.setProps({
                  name: ProfileAttrs.name,
                  inputs: ProfileAttrs.inputs,
                  change: ProfileEditBtn,
                  disabled: false,
                  action: "change_user_data"
                })
                setInputs()
                break
              case "change_password":
                this.setProps({
                  name: "",
                  inputs: ProfileEditPasswordAttrs,
                  change: ProfileEditBtn,
                  disabled: false,
                  action: "change_user_password"
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
          if (document.getElementById("profile-main")?.parentElement?.classList.contains("overlay")) return
          event.preventDefault()
          if (this.props.action === "change_user_data") {
            if (props.inputs) {
              const newForm = validateForms(props.inputs)
              if (!newForm) {
                return
              }
              doChangeProfile(newForm)
            }
          } else if (this.props.action === "change_user_password") {
            const newForm = validateForms(ProfileEditPasswordAttrs)
            if (!newForm) {
              return
            }
            doChangePass(newForm.old_password as string, newForm.new_password as string)
          }
        }
      }
    })

    if (!isEmpty(userInfo.avatar)) {
      this.props.avatarSrc = uploadResources(userInfo.avatar)
      this.props.profileAvatarImgClass = "profile-avatar"
    } else {
      this.props.avatarSrc = "/avatarNoPhoto.svg"
    }

    store.on("updated", () => {
      changeInputsValue()
      this.setProps({
        name: ProfileAttrs.name,
        inputs: ProfileAttrs.inputs,
        buttons: ProfileBtns,
        disabled: true,
        action: undefined,
        avatarSrc: uploadResources(userInfo.avatar)
      })
      setInputs()
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
        ProfileChange: change && this.props.action ? new Button({
          class: "primary-button",
          id: change.id,
          text: change.text
        }) : ""
      })
    }
    setInputs()
  }

  override render() {

    return `
       <div id="profile-main" class="{{ attrs.profileClass }}">
                <div class="{{ attrs.profileAvatarClass }}" >
                    <img src="{{ avatarSrc }}" class="{{ profileAvatarImgClass }}" alt="Безаватарочный">
                    {{#unless action}}
                      <label class="{{ attrs.profileAvatarChangeClass }}" id="change_avatar">Поменять аватар</label>
                    {{/unless}}
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
