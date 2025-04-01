import Block from "../../framework/Block"

export default class ProfileBack extends Block {
  constructor() {
    super({
      attrs: {
        profileBackClass: "profile-back"
      },
      events: {
        click: (event: MouseEvent) => {
          event.preventDefault()
          if (document.getElementById("profile_change")) {
            this.Router.go("/settings")
            return
          }
          this.Router.go("/messenger")
        }
      }
    })
  }

  override render() {
    return `
      <div class="{{ attrs.profileBackClass }}" id="profile_back">
        <img src="/arrowLeft.svg" alt="Назад">
      </div>
    `
  }
}