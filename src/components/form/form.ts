import Block from "../../framework/Block"
import { Button } from "../buttons/button/button"
import { FormInput } from "../inputs/formInput/formInput"
import inputsValidation from "../../utils/helpers/inputsValidation"
import { FormLabelsInterface, FormsInterface } from "../../utils/interfaces/attrsInterfaces"
import { doSignIn } from "../../utils/controllers/auth/doSignIn"
import { doSignUp } from "../../utils/controllers/auth/doSignUp"
import { SignUpBodyInterface } from "../../utils/interfaces/apiInterfaces"
import { doChangeAvatar } from "../../utils/controllers/user/doChangeAvatar"
import { doCreateChat } from "../../utils/controllers/chats/doCreateChat"
import { doAddUsersToChat } from "../../utils/controllers/chats/doAddUsersToChat"
import store from "../../framework/Store/Store"
import { doDeleteUsersFromChat } from "../../utils/controllers/chats/doDeleteUsersFromChat"


interface FormDataInterface {
  [key: string]: unknown;

  first_name?: string
  second_name?: string
  login?: string
  email?: string
  password?: string
  second_password?: string
  phone?: string
  message?: string
}

export class Form extends Block {
  constructor(props: FormsInterface) {
    const inputs = [],
      buttons = []

    if (props.labels) {
      for (const label of props.labels) {
        if (label["input"]) {
          props[label["id"]] = new FormInput({
            id: label["id"],
            type: label["type"],
            value: label["value"],
            placeholder: label["placeholder"]
          })
          inputs.push(label["id"])
        } else if (label["button"]) {
          props[label["id"]] = new Button({
            id: label["id"],
            class: label["class"],
            text: label["text"],
            type: label["type"]
          })
          buttons.push(label["id"])
        } else if (label["upload"]) {
          props[label["id"]] = `
                        <label class="${label["class"]}" id="${label["id"]}">
                            <span>${label["text"]}</span>
                            <input type="file" id="upload_button__upload_form" hidden="hidden" name="${label["value"]}">
                        </label>
                    `
        }
      }
      props.inputs = inputs
      props.buttons = buttons
    }


    super({
      ...props,
      events: {
        change: (event: InputEvent) => {
          const target = event.target as HTMLInputElement,
            files = target.files
          // if (target.id !== 'upload_file') return

          if (!files) {
            return
          }

          const label = target.parentElement as HTMLElement,
            text = label.children[0] as HTMLElement
          text.innerText = files[0].name
          label.classList.add("gray")
          label.classList.remove("upload_file")

          const validationText = document.getElementById("validate_file")

          if (validationText) {
            validationText.parentElement?.removeChild(validationText)
            document.getElementById("change_file")?.classList.remove("margin-20")
          }
        },
        submit: (event: SubmitEvent) => {
          event.preventDefault()

          if (event.submitter?.classList.contains("special-button")) {
            if (document.location.pathname !== "/sign-up") {
              this.Router.go("/sign-up")
            } else {
              this.Router.go("/")
            }
          } else if (event.submitter?.id === "change_file") {
            const target = event.target as HTMLFormElement,
              formData = new FormData(target),
              file = formData.get("avatar") as File

            if (!file.name) {
              if (document.getElementById("validate_file")) return
              const validateText = document.createElement("span")
              validateText.innerText = "Нужно выбрать файл"
              validateText.classList.add("danger")
              validateText.classList.add("text")
              validateText.classList.add("validate__file-text")
              validateText.id = "validate_file"
              document.getElementById("change_file")?.classList.add("margin-20")
              document.getElementById("form")?.appendChild(validateText)
              return
            }

            doChangeAvatar(formData)

          } else {
            if (props.labels) {
              const formData: FormDataInterface = {}
              for (const label of props.labels.filter(item => item.id !== "second_password")) {
                if (label["input"]) {
                  const tempElement: HTMLInputElement = <HTMLInputElement>document.getElementById(label["id"])
                  if (tempElement && tempElement["value"]) {
                    if (inputsValidation(label["id"], tempElement["value"])) {
                      formData[label["id"]] = tempElement["value"]
                    }
                  } else {
                    alert(`Не заполнено поле ${label["placeholder"]}`)
                    return
                  }
                }
              }
              switch (window.location.pathname) {
                case "/":
                  doSignIn(formData.login as string, formData.password as string)
                  break
                case "/sign-up":
                  doSignUp(formData as SignUpBodyInterface)
                  break
                case "/messenger":
                  const labels = props.labels as FormLabelsInterface[]
                  if (labels.filter((label: FormLabelsInterface | {}) => {
                    return label.hasOwnProperty("input")
                  }).length === 1) {
                    const formAttr = props.labels[0]
                    console.log("here", formAttr)
                    if (formAttr.id === "chat_name") {
                      doCreateChat(formData["chat_name"] as string)
                    } else if (formAttr.id === "add_user_input") {
                      const users = [formData.add_user_input] as unknown as []
                      doAddUsersToChat(users, store.getInstance().getState().currentChat)
                    } else if (formAttr.id === "delete_user_input") {
                      const users = [formData.delete_user_input] as unknown as []
                      doDeleteUsersFromChat(users, store.getInstance().getState().currentChat)
                    }
                  } else alert("Что-то не так, такого не должно было случиться")
              }
            }
          }
        }
      },
      attrs: {
        formClass: "container__form",
        headerClass: "title__form"
      }
    })
  }

  override render() {
    const inputList: string[] = <string[]>this.lists.inputs,
      labelList: FormLabelsInterface[] = <FormLabelsInterface[]>this.lists.labels
    const inputsHTML = inputList.length > 0 ? inputList.map((input) => {
        const currentInput: FormLabelsInterface = <FormLabelsInterface>labelList.find((field: FormLabelsInterface) => field.id === input),
          placeholder = currentInput.placeholder,
          validateText = currentInput.validateText
        return `
                    <div class="form__field">
                        {{{ ${input} }}}                
                        <div class="form__label"> ${placeholder} </div>
                        <span class="form__input-validate"> ${validateText} </span>
                    </div>`
      }).join("") : this.props["upload_file"],
      buttonsHTML = this.lists.buttons.map((button) => {
        return `{{{ ${button} }}}`
      }).join("")
    return `
            <form id="form" class="{{ attrs.formClass }} {{ formClass }} {{ class }}">
                <h1 class="{{ attrs.headerClass }}">
                    {{ title }}
                </h1>
                ${inputsHTML}
                ${buttonsHTML}
            </form>
        `
  }
}
