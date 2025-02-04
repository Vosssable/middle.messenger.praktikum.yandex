import inputsValidation from "./inputsValidation";
import {KeyValueReactiveInterface} from "../interfaces/formsInterfaces";

export default function inputAttrsEvents(attrs: KeyValueReactiveInterface) {
    for (let el in attrs) {
        let element = document.getElementById(el) as HTMLInputElement | null
        element ? element.onblur = (event) => {
            event.preventDefault()
            if (inputsValidation(el, element.value)) {
                element.parentElement?.querySelector('span')?.classList.remove('display-block')
                attrs[el].set(element.value)
            } else {
                if (element.value.length === 0) {
                    return
                } else element.parentElement?.querySelector('span')?.classList.add('display-block')
            }
        } : ''
    }
}