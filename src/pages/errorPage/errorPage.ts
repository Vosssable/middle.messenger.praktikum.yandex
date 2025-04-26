import Block from "../../framework/Block"
import { ProfileInputLabel } from "../../components/inputs/profileInput/profileInputLabel"
import { ErrorsInterface } from "../../utils/interfaces/attrsInterfaces"

export default class ErrorPage extends Block {
  constructor(props: ErrorsInterface) {
    super({
      ...props,
      errorMessage: new ProfileInputLabel({
        label: props["label"],
        inputClass: "width-auto display-block",
        labelClass: "primary",
        idButton: "error_back"
      }),
      attrs: {
        errorContainerClass: "error-container",
        errorCodeClass: "error__code",
        errorMessageClass: "error__message"
      }
    })
  }

  override render() {
    return `
        <main id="app">
            <div>
                <div class="{{ attrs.errorContainerClass }}">
                    <h1 class="{{ attrs.errorCodeClass }}">{{ code }}</h1>
                    <h2 class="{{ attrs.errorMessageClass }}">{{ text }}</h2>
                    <a href="/messenger">{{{ errorMessage }}}</a>
                </div>
            </div>
        </main>
        `
  }
}
