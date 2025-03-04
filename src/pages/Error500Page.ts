import Block from "../framework/Block"
import ErrorPage from "./errorPage/errorPage"
import { Error500Attrs } from "../utils/ErrorPageAttrs"

export default class Error500Page extends Block {
  constructor() {
    super({
      ErrorPage: new ErrorPage(Error500Attrs)
    })
  }
  override render() {
    return `
      {{{ ErrorPage }}}
    `
  }
}