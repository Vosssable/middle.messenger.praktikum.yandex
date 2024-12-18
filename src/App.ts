import './style.pcss'
import HandleBars from 'handlebars'
import * as Pages from './pages';

import FormInput from "./components/formInput";
import Button from "./components/button";
import Chat from "./components/chat";
import Form from "./components/form";
import IconButton from "./components/iconButton";
import Dropdown from "./components/dropdown";
import PropertyButton from "./components/propertyButton";
import ProfileInput from "./components/profileInput";
import {CustomRoute} from "./components/customRoute";

import {createUserForm, loadFileForm, loginForm} from "./utils/FormsAttrs";
import {ChatPageAttrs, FooterButtons, HeaderButtons} from "./utils/ChatPageAttrs";
import {ProfileAttrs, ProfileBtns, ProfileEditBtn, ProfileEditPasswordAttrs} from "./utils/ProfileAttrs";
import {routes} from "./components/customRoute";
import {Error404Attrs, Error500Attrs} from "./utils/ErrorPageAttrs";

HandleBars.registerPartial('FormInput', FormInput);
HandleBars.registerPartial('Button', Button);
HandleBars.registerPartial('Chat', Chat);
HandleBars.registerPartial('Form', Form);
HandleBars.registerPartial('IconButton', IconButton);
HandleBars.registerPartial('Dropdown', Dropdown);
HandleBars.registerPartial('PropertyButton', PropertyButton);
HandleBars.registerPartial('ProfileInput', ProfileInput);
HandleBars.registerPartial('CustomRoute', CustomRoute);


export default class App {
    public currentPage: string;
    public mainApp: HTMLElement;
    public routeTmpl = HTMLElement

    constructor() {
        this.currentPage = 'loginPage'
        this.mainApp = <HTMLElement>document.getElementById('app')
        this.routeTmpl = HandleBars.compile(CustomRoute)({
            routes: routes,
        })
    }

    onRenderFunc() {
        if (this.mainApp) {
            if (this.currentPage === 'loginPage') {
                let tmplLogin = HandleBars.compile(Pages.loginPage)
                this.mainApp.innerHTML = tmplLogin({
                    title: loginForm.title, labels: loginForm.labels,
                }) + this.routeTmpl
            } else if (this.currentPage === 'registerPage') {
                let tmplCreateUser = HandleBars.compile(Pages.createUserPage)
                this.mainApp.innerHTML = tmplCreateUser({
                    title: createUserForm.title, labels: createUserForm.labels,
                }) + this.routeTmpl
            } else if (this.currentPage === 'chatPage') {
                let tmplChat = HandleBars.compile(Pages.chatPage)
                this.mainApp.innerHTML = tmplChat({
                    chats: ChatPageAttrs.chats,
                    currentAvatar: ChatPageAttrs.currentAvatar,
                    currentChatName: ChatPageAttrs.currentChatName,
                    headerButtons: HeaderButtons,
                    footerButtons: FooterButtons,
                }) + this.routeTmpl
            } else if (this.currentPage === 'profilePage') {
                let tmplProfile = HandleBars.compile(Pages.profilePage)
                this.mainApp.innerHTML = tmplProfile({
                    name: ProfileAttrs.name, inputs: ProfileAttrs.inputs, buttons: ProfileBtns, disabled: 'true'
                }) + this.routeTmpl
            } else if (this.currentPage === 'error404Page') {
                let tmplError = HandleBars.compile(Pages.errorPage)
                this.mainApp.innerHTML = tmplError({
                    code: Error404Attrs.code, text: Error404Attrs.text, label: 'Назад к чатам'
                }) + this.routeTmpl
            } else if (this.currentPage === 'error500Page') {
                let tmplError = HandleBars.compile(Pages.errorPage)
                this.mainApp.innerHTML = tmplError({
                    code: Error500Attrs.code, text: Error500Attrs.text, label: 'Назад к чатам'
                }) + this.routeTmpl
            }
        } else alert('Что-то пошло не так :(')

        this.addEventListeners()
        this.routesEventListeners()
    }

    addEventListeners() {
        if (this.currentPage === 'loginPage') {
            const noAccBtn = document.getElementById('no_account_button')
            if (noAccBtn) {
                noAccBtn.addEventListener('click', (event) => {
                    event.preventDefault()
                    this.currentPage = 'registerPage'
                    this.onRenderFunc()
                })
            }
        } else if (this.currentPage === 'registerPage') {
            const loginBtn = document.getElementById('sign_in')
            if (loginBtn) {
                loginBtn.addEventListener('click', (event) => {
                    event.preventDefault()
                    this.currentPage = 'loginPage'
                    this.onRenderFunc()
                })
            }
        } else if (this.currentPage === 'profilePage') {
            let tmplProfile = HandleBars.compile(Pages.profilePage)
            const goBackBtn = document.getElementsByClassName('profile-back')[0],
                changeProfile = document.getElementById('change_user_data'),
                changePassword = document.getElementById('change_password'),
                changeAvatar = document.getElementById('change_avatar')
            goBackBtn.addEventListener('click', (event) => {
                event.preventDefault()
                this.currentPage = 'chatPage'
                this.onRenderFunc()
            })
            if (changeProfile && changeAvatar) {
                changeProfile.addEventListener('click', (event) => {
                    event.preventDefault()
                    this.mainApp.innerHTML = tmplProfile({
                        inputs: ProfileAttrs.inputs, change: ProfileEditBtn
                    }) + this.routeTmpl
                    this.routesEventListeners()
                    changeAvatar.removeEventListener('click', () => {
                    })
                    document.getElementsByClassName('profile-avatar__change')[0].classList.add('display-none')
                })
            }
            if (changePassword && changeAvatar) {
                changePassword.addEventListener('click', (event) => {
                    event.preventDefault()
                    this.mainApp.innerHTML = tmplProfile({
                        inputs: ProfileEditPasswordAttrs.inputs, change: ProfileEditBtn, password: true
                    }) + this.routeTmpl
                    this.routesEventListeners()
                    changeAvatar.removeEventListener('click', () => {})
                    document.getElementsByClassName('profile-avatar__change')[0].classList.add('display-none')
                })
            }
            if (changeAvatar) {
                changeAvatar.addEventListener('click', (event) => {
                    event.preventDefault()
                    this.mainApp.innerHTML = tmplProfile({
                        name: ProfileAttrs.name,
                        inputs: ProfileAttrs.inputs,
                        buttons: ProfileBtns,
                        disabled: 'true',
                        avatar: true,
                        title: loadFileForm.title,
                        labels: loadFileForm.labels
                    }) + this.routeTmpl
                    let profile = <HTMLElement>document.getElementById('profile')
                    document.getElementsByClassName('profile-container')[0].classList.add('no-cursor')
                    profile.classList.add('overlay')
                    profile.addEventListener('click', (event) => {
                        event.preventDefault()
                        this.currentPage = 'profilePage'
                        this.onRenderFunc()
                    })
                })
            }

        } else if (this.currentPage === 'error404Page' || this.currentPage === 'error500Page') {
            const goBackBtn = document.getElementById('error_back')
            if (goBackBtn) {
                goBackBtn.addEventListener('click', (event) => {
                    event.preventDefault()
                    this.currentPage = 'chatPage'
                    this.onRenderFunc()
                })
            }
        }
    }

    routesEventListeners() {
        const login = document.getElementById('go_to_login_page'),
            register = document.getElementById('go_to_register_page'),
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
}



