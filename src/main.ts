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
import { getUser, logOut, signIn, signUp } from "./utils/api/auth"
import doGetUser from "./utils/controllers/auth/doGetUser"

document.addEventListener("DOMContentLoaded", () => {
  doGetUser()
  const app = new App()
  app.onRenderFunc()
  window.test = signIn
  window.test1 = signUp
  window.test2 = getUser
  window.test3 = logOut
  window.test4 = doGetUser
})
