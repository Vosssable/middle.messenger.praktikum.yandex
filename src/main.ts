import "./components/buttons/button/button.pcss"
import "./components/form/form.pcss"
import "./components/inputs/formInput/formInput.pcss"
import "./components/chat/chat.pcss"
import "./components/inputs/profileInput/profileInput.pcss"
import "./pages/chatPage/chatPage.pcss"
import "./pages/profilePage/profilePage.pcss"
import "./pages/errorPage/errorPage.pcss"
import "./style.pcss"
import App from "./App"

document.addEventListener("DOMContentLoaded", () => {
  const app = new App()
  app.onRenderFunc()
})
