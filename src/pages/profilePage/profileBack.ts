import Block from "../../framework/Block"

export default class ProfileBack extends Block {
  constructor() {
    super({
      attrs: {
        profileBackClass: "profile-back"
      },
      events: {
        click: (event: MouseEvent) => {
          if (document.getElementById('profile_back')?.parentElement?.classList.contains('overlay')) return
          event.preventDefault()
          if (document.getElementById("profile_change")) {
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