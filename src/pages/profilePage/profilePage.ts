import Block from "../../framework/Block"
import { ProfilePagePropsInterface } from "../../utils/interfaces/propsInterfaces"
import { ProfileBtns } from "../../utils/ProfileAttrs"
import ProfileMain from "./profileMain"
import ProfileBack from "./profileBack"
import { Form } from "../../components/form/form"
import { loadFileForm } from "../../utils/FormsAttrs"
import changeClassList from "../../utils/helpers/changeClassList"
import Store from "../../framework/Store/Store"

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
  const store = Store.getInstance()

    super({
      ...props,
      attrs: {
        profileContainerClass: "profile-container"
      },
      events: {
        click: (event: MouseEvent) => {
          if (document.getElementById("form")?.classList.contains("display-none")) return

          const target = event.target as HTMLElement
          if (target.parentElement?.id === "app") {
            changeClassList("remove", document.getElementsByClassName("change-avatar")[0].parentElement as HTMLElement, true)
          }
        }
      }
    })

    this.setProps({
      mainProfile: new ProfileMain({
        buttons: ProfileBtns, disabled: true
      }),
      profileBack: new ProfileBack(),
      AvatarChangeForm: new Form({
        title: loadFileForm.title,
        labels: loadFileForm.labels,
        formClass: "change-avatar display-none"
      })
    })

    if (props?.avatar) {
      changeClassList("add", document.getElementsByClassName("change-avatar")[0].parentElement as HTMLElement, true)
    }

    store.on('getBack', () => {
      if (store.getState().getBack) {
        this.setProps({
          mainProfile: new ProfileMain({
            buttons: ProfileBtns, disabled: true
          }),
          profileBack: new ProfileBack(),
          AvatarChangeForm: new Form({
            title: loadFileForm.title,
            labels: loadFileForm.labels,
            formClass: "change-avatar display-none"
          })
        })
      }
      store.set('getBack', undefined)
    })
  }

  override render() {
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
