import { ProfileFormDataInterface } from "../../pages/profilePage/profilePage"
import inputsValidation from "./inputsValidation"
import { InputsInterface } from "../interfaces/attrsInterfaces"

export function validateForms(inputs: InputsInterface[]) {
  let formData: ProfileFormDataInterface | undefined = {}
  for (const input of inputs) {
    const tempElement = document.getElementById(input.id) as HTMLInputElement

    if (input.id === 'new_password') {
      const confirmPass = document.getElementById('new_password_confirm') as HTMLInputElement
      if (confirmPass.value !== tempElement.value) {
        alert(`Не правильно подтвердили новый пароль`)
        if (!confirmPass.classList.contains("profile-validation-error")) {
          confirmPass.classList.add("profile-validation-error")
        }
        formData = undefined
        return
      }
    }

    if (tempElement && tempElement.value) {
      if (inputsValidation(input.id, tempElement.value)) {
        formData[input.id] = tempElement.value
        if (tempElement.classList.contains("profile-validation-error")) {
          tempElement.classList.remove("profile-validation-error")
        }
      } else {
        if (!tempElement.classList.contains("profile-validation-error")) {
          tempElement.classList.add("profile-validation-error")
        }
      }
    } else {
      if (!tempElement.classList.contains("profile-validation-error")) {
        tempElement.classList.add("profile-validation-error")
      }
      alert(`Не заполнено поле ${input.label}`)
      formData = undefined
      return
    }
  }
  return formData
}
