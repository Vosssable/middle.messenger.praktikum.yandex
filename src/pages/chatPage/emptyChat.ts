import Block from "../../framework/Block"

export default class EmptyChat extends Block {
  constructor() {
    super({})
  }
  override render() {
    return `
      
    `
  }
}