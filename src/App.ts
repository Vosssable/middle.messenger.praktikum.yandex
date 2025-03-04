import './style.pcss'
import ProfilePage from "./pages/profilePage/profilePage";
import LoginPage from "./pages/loginPage/loginPage";
import RegisterPage from "./pages/registerPage/registerPage";
import ChatPage from "./pages/chatPage/chatPage";
import Router from "./framework/Router"
import Error404Page from "./pages/Error404Page"
import Error500Page from "./pages/Error500Page"

export default class App {
    public currentPage: string;
    public mainApp: HTMLElement | null;
    public Router = Router

    onRenderFunc() {
            this.Router.use('/', LoginPage)
            this.Router.use('/auth', RegisterPage)
            this.Router.use('/profile', ProfilePage)
            this.Router.use('/nothing', Error404Page)
            this.Router.use('/error', Error500Page)
            this.Router.use('/chat', ChatPage)
            this.Router.go(window.location.pathname)
            // if (this.currentPage === 'loginPage') {
            //     const loginPage = new LoginPage();
            //     this.mainApp.replaceWith(loginPage.getContent())
            //     this.reloadPage()
            // }
        //         else if (this.currentPage === 'profilePage') {
        //         const profilePage = new ProfilePage({
        //             name: ProfileAttrs.name, inputs: ProfileAttrs.inputs, buttons: ProfileBtns, disabled: true,
        //             onClick: (event: Event, action: string): void => {
        //                 event.preventDefault()
        //                 this.profilePageEvent(action)
        //             }
        //         })
        //         this.mainApp.replaceWith(profilePage.getContent())
        //         this.reloadPage()
        //     } else if (this.currentPage === 'profileChangeUserData') {
        //         const profilePage = new ProfilePage({
        //             inputs: ProfileAttrs.inputs, change: ProfileEditBtn
        //         })
        //         this.mainApp.replaceWith(profilePage.getContent())
        //         document.getElementsByClassName('profile-avatar__change')[0].classList.add('display-none')
        //         this.reloadPage()
        //     } else if (this.currentPage === 'profileChangeAvatar') {
        //         const profilePage = new ProfilePage({
        //             name: ProfileAttrs.name,
        //             inputs: ProfileAttrs.inputs,
        //             buttons: ProfileBtns,
        //             disabled: true,
        //             avatar: true,
        //             title: loadFileForm.title,
        //             labels: loadFileForm.labels
        //         })
        //         this.mainApp.replaceWith(profilePage.getContent())
        //         document.getElementsByClassName('profile-container')[0].classList.add('no-cursor')
        //         document.getElementById('profile')?.classList.add('overlay')
        //         this.reloadPage()
        //     } else if (this.currentPage === 'profileChangePassword') {
        //         const profilePage = new ProfilePage({
        //             inputs: ProfileEditPasswordAttrs, change: ProfileEditBtn, password: true
        //         })
        //         this.mainApp.replaceWith(profilePage.getContent())
        //         document.getElementsByClassName('profile-avatar__change')[0].classList.add('display-none')
        //         this.reloadPage()
        //     } else if (this.currentPage === 'registerPage') {
        //         const registerPage = new RegisterPage()
        //         this.mainApp.replaceWith(registerPage.getContent())
        //         this.reloadPage()
        //     } else if (this.currentPage === 'error404Page') {
        //         const errorPage = new ErrorPage(Error404Attrs)
        //         this.mainApp.replaceWith(errorPage.getContent())
        //         this.reloadPage()
        //     } else if (this.currentPage === 'error500Page') {
        //         const errorPage = new ErrorPage(Error500Attrs)
        //         this.mainApp.replaceWith(errorPage.getContent())
        //         this.reloadPage()
        //     } else if (this.currentPage === 'chatPage') {
        //         const chatPage = new ChatPage({
        //             chats: ChatPageAttrs.chats, currentAvatar: ChatPageAttrs.currentAvatar,
        //             currentChatName: ChatPageAttrs.currentChatName
        //         })
        //         this.mainApp.replaceWith(chatPage.getContent())
        //         this.reloadPage()
        //     }
        // this.routesEventListeners()
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
        // this.mainApp = document.getElementById('app')
        // const tmpl = document.createElement('template')
        // tmpl.innerHTML = <string>this.routeTmpl
        // this.mainApp?.children[0].after(tmpl.content)
    }
    // profilePageEvent(action: string) {
    //     this.currentPage = action
    //     this.onRenderFunc()
    // }
}
