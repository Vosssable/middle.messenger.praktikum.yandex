import Block from "../../framework/Block"
import { ProfilePagePropsInterface } from "../../utils/interfaces/propsInterfaces"
import { ProfileAttrs, ProfileBtns } from "../../utils/ProfileAttrs"
// import Store from "../../framework/Store/Store"
import ProfileMain from "./profileMain"
import Store from "../../framework/Store/Store"
import ProfileBack from "./profileBack"
import { Form } from "../../components/form/form"
import { loadFileForm } from "../../utils/FormsAttrs"
import changeClassList from "../../utils/helpers/changeClassList"
import { BlockProps } from "../../utils/interfaces/frameworkInterfaces"

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
    ProfileAttrs.name = userInfo.first_name

    for (const input of ProfileAttrs.inputs) {
      if (userInfo[input.id]) {
        input.value = userInfo[input.id].length > 0 ? userInfo[input.id] : '-'
      }
    }

    super({
      ...props,
      mainProfile: new ProfileMain({
        name: ProfileAttrs.name, inputs: ProfileAttrs.inputs, buttons: ProfileBtns, disabled: true
      }),
      profileBack: new ProfileBack(),
      AvatarChangeForm: new Form({
        title: loadFileForm.title,
        labels: loadFileForm.labels,
        formClass: 'change-avatar display-none'
      }),
      attrs: {
        profileContainerClass: "profile-container"
      },
      events: {
        click: (event: MouseEvent) => {
          if (document.getElementById('form')?.classList.contains('display-none')) return

          const target = event.target as HTMLElement
          if (target.parentElement?.id === 'app') {
            changeClassList('remove', document.getElementsByClassName('change-avatar')[0].parentElement as HTMLElement, true)
          }
        }
      }
    })

    if (props?.avatar) {
      changeClassList('add', document.getElementsByClassName('change-avatar')[0].parentElement as HTMLElement, true)
    }
  }

  override render() {
    console.log('RENDER PROFILE PAGE')

    return `
            <main id="app">
                <div>
                    {{{ AvatarChangeForm }}}
                    <div class="{{ attrs.profileContainerClass }}" id="profile">
                        {{{ profileBack }}}
                        {{{ mainProfile }}}
                    </div>
                </div>     
            </main>                     
            `
  }
}
