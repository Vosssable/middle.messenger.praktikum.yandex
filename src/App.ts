import "./style.pcss"
import LoginPage from "./pages/loginPage/loginPage"
import RegisterPage from "./pages/registerPage/registerPage"
import ChatPage from "./pages/chatPage/chatPage"
import Error404Page from "./pages/Error404Page"
import Error500Page from "./pages/Error500Page"
import ProfilePage from "./pages/profilePage/profilePage"
import router from "./framework/Router"

export default class App {
  private Router = router


  public onRenderFunc() {
    this.Router.use("/", LoginPage)
    this.Router.use("/sign-up", RegisterPage)
    this.Router.use("/settings", ProfilePage)
    this.Router.use("/nothing", Error404Page)
    this.Router.use("/error", Error500Page)
    this.Router.use("/messenger", ChatPage)
    this.Router.start()
  }
}
