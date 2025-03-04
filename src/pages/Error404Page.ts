import Block from "../framework/Block"
import ErrorPage from "./errorPage/errorPage"
import { Error404Attrs } from "../utils/ErrorPageAttrs"

export default class Error404Page extends Block {
  constructor() {
    super({
      ErrorPage: new ErrorPage(Error404Attrs)
    })
  }
  override render() {
    return `
      {{{ ErrorPage }}}
    `
  }
}