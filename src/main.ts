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
import { getUser, logOut, signUp } from "./utils/api/auth"
import doGetUser from "./utils/controllers/auth/doGetUser"
import { openWebSocket } from "./utils/helpers/webSocket"

document.addEventListener("DOMContentLoaded", () => {
  const app = new App()
  app.onRenderFunc()
  window.test = openWebSocket
  window.test1 = signUp
  window.test2 = getUser
  window.test3 = logOut
  window.test4 = doGetUser
})
