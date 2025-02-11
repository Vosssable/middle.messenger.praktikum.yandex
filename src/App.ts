import './style.pcss'
import {ProfilePage} from "./pages";
import {ProfileAttrs, ProfileBtns} from "./utils/ProfileAttrs";
import {LoginPage} from "./pages";
import * as HandleBars from "handlebars";
import {CustomRoute, routes} from "./components/customRoute/customRoute";
import {RegisterPage} from "./pages";
import {ErrorPage} from "./pages";
import {Error404Attrs, Error500Attrs} from "./utils/ErrorPageAttrs";
import {ChatPage} from "./pages/chatPage/chatPage";
import {ChatPageAttrs} from "./utils/ChatPageAttrs";

export default class App {
    public currentPage: string;
    public mainApp: HTMLElement | null;
    public routeTmpl: string|HTMLElement = '';

    constructor() {
        this.currentPage = 'loginPage'
        this.mainApp = document.getElementById('app')
        this.routeTmpl = HandleBars.compile(CustomRoute)({
            routes: routes,
        })
    }

    onRenderFunc() {
        if (this.mainApp) {
            if (this.currentPage === 'loginPage') {
                const loginPage = new LoginPage();
                this.mainApp.replaceWith(loginPage.getContent())
                this.reloadPage()
            } else if (this.currentPage === 'profilePage') {
                const profilePage = new ProfilePage({
                    name: ProfileAttrs.name, inputs: ProfileAttrs.inputs, buttons: ProfileBtns, disabled: 'true'
                })
                this.mainApp.replaceWith(profilePage.getContent())
                this.reloadPage()
            } else if (this.currentPage === 'registerPage') {
                const registerPage = new RegisterPage()
                this.mainApp.replaceWith(registerPage.getContent())
                this.reloadPage()
            } else if (this.currentPage === 'error404Page') {
                const errorPage = new ErrorPage(Error404Attrs)
                this.mainApp.replaceWith(errorPage.getContent())
                this.reloadPage()
            } else if (this.currentPage === 'error500Page') {
                const errorPage = new ErrorPage(Error500Attrs)
                this.mainApp.replaceWith(errorPage.getContent())
                this.reloadPage()
            } else if (this.currentPage === 'chatPage') {
                const chatPage = new ChatPage({
                    chats: ChatPageAttrs.chats, currentAvatar: ChatPageAttrs.currentAvatar,
                    currentChatName: ChatPageAttrs.currentChatName
                })
                this.mainApp.replaceWith(chatPage.getContent())
                this.reloadPage()
            }
        this.routesEventListeners()
        }
    }
    routesEventListeners() {
        const login = document.getElementById('go_to_login_page'),
            register = document.getElementById('go_to_registration_page'),
            chat = document.getElementById('go_to_chat_page'),
            profile = document.getElementById('go_to_profile_page'),
            error404 = document.getElementById('go_to_404_page'),
            error500 = document.getElementById('go_to_500_page')
        if (login && register && chat && profile && error404 && error500) {
            login.addEventListener('click', (event) => {
                event.preventDefault()
                this.currentPage = 'loginPage'
                this.onRenderFunc()
            })
            register.addEventListener('click', (event) => {
                event.preventDefault()
                this.currentPage = 'registerPage'
                this.onRenderFunc()
            })
            chat.addEventListener('click', (event) => {
                event.preventDefault()
                this.currentPage = 'chatPage'
                this.onRenderFunc()
            })
            profile.addEventListener('click', (event) => {
                event.preventDefault()
                this.currentPage = 'profilePage'
                this.onRenderFunc()
            })
            error404.addEventListener('click', (event) => {
                event.preventDefault()
                this.currentPage = 'error404Page'
                this.onRenderFunc()
            })
            error500.addEventListener('click', (event) => {
                event.preventDefault()
                this.currentPage = 'error500Page'
                this.onRenderFunc()
            })
        }
    }
    reloadPage() {
        this.mainApp = document.getElementById('app')
        const tmpl = document.createElement('template')
        tmpl.innerHTML = <string>this.routeTmpl
        this.mainApp?.children[0].after(tmpl.content)
    }
}



