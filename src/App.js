import './style.pcss'
import HandleBars from 'handlebars'
import * as Pages from './pages/index.js';

import FormInput from "./components/formInput.js";
import Button from "./components/button.js";
import Chat from "./components/chat.js";
import Form from "./components/form.js";
import IconButton from "./components/iconButton.js";
import Dropdown from "./components/dropdown.js";
import PropertyButton from "./components/propertyButton.js";
import ProfileInput from "./components/profileInput.js";
import {CustomRoute} from "./components/customRoute.js";

import {createUserForm, loadFileForm, loginForm} from "./utils/FormsAttrs.js";
import {ChatPageAttrs, FooterButtons, HeaderButtons} from "./utils/ChatPageAttrs.js";
import {profilePage} from "./pages/index.js";
import {ProfileAttrs, ProfileBtns, ProfileEditBtn, ProfileEditPasswordAttrs} from "./utils/ProfileAttrs.js";
import {routes} from "./components/customRoute.js";
import {Error404Attrs, Error500Attrs} from "./utils/ErrorPageAttrs.js";

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
    constructor() {
        this.currentPage = 'loginPage'
        this.mainApp = document.getElementById('app')
        this.routeTmpl = HandleBars.compile(CustomRoute)({
            routes: routes,
        })
    }

    onRenderFunc() {
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
        this.addEventListeners()
        this.routesEventListeners()
    }

    addEventListeners() {
        if (this.currentPage === 'loginPage') {
            const noAccBtn = document.getElementById('no_account_button')
            noAccBtn.addEventListener('click', (event) => {
                event.preventDefault()
                this.currentPage = 'registerPage'
                this.onRenderFunc()
            })
        } else if (this.currentPage === 'registerPage') {
            const loginBtn = document.getElementById('sign_in')
            loginBtn.addEventListener('click', (event) => {
                event.preventDefault()
                this.currentPage = 'loginPage'
                this.onRenderFunc()
            })
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
            changeProfile.addEventListener('click', (event) => {
                event.preventDefault()
                this.mainApp.innerHTML = tmplProfile({
                    inputs: ProfileAttrs.inputs, change: ProfileEditBtn
                }) + this.routeTmpl
                this.routesEventListeners()
                changeAvatar.removeEventListener('click', (event) => {})
                document.getElementsByClassName('profile-avatar__change')[0].classList.add('display-none')
            })
            changePassword.addEventListener('click', (event) => {
                event.preventDefault()
                this.mainApp.innerHTML = tmplProfile({
                    inputs: ProfileEditPasswordAttrs.inputs, change: ProfileEditBtn, password: true
                }) + this.routeTmpl
                this.routesEventListeners()
                changeAvatar.removeEventListener('click', (event) => {})
                document.getElementsByClassName('profile-avatar__change')[0].classList.add('display-none')
            })
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
                let profile = document.getElementById('profile')
                document.getElementsByClassName('profile-container')[0].classList.add('no-cursor')
                profile.classList.add('overlay')
                profile.addEventListener('click', (event) => {
                    event.preventDefault()
                    this.currentPage = 'profilePage'
                    this.onRenderFunc()
                })
            })
        } else if (this.currentPage === 'error404Page' || this.currentPage === 'error500Page') {
            const goBackBtn = document.getElementById('error_back')
            goBackBtn.addEventListener('click', (event) => {
                event.preventDefault()
                this.currentPage = 'chatPage'
                this.onRenderFunc()
            })
        }
    }

    routesEventListeners() {
        const login = document.getElementById('go_to_login_page')
        login.addEventListener('click', (event) => {
            event.preventDefault()
            this.currentPage = 'loginPage'
            this.onRenderFunc()
        })
        document.getElementById('go_to_registration_page').addEventListener('click', (event) => {
            event.preventDefault()
            this.currentPage = 'registerPage'
            this.onRenderFunc()
        })
        document.getElementById('go_to_chat_page').addEventListener('click', (event) => {
            event.preventDefault()
            this.currentPage = 'chatPage'
            this.onRenderFunc()
        })
        document.getElementById('go_to_profile_page').addEventListener('click', (event) => {
            event.preventDefault()
            this.currentPage = 'profilePage'
            this.onRenderFunc()
        })
        document.getElementById('go_to_404_page').addEventListener('click', (event) => {
            event.preventDefault()
            this.currentPage = 'error404Page'
            this.onRenderFunc()
        })
        document.getElementById('go_to_500_page').addEventListener('click', (event) => {
            event.preventDefault()
            this.currentPage = 'error500Page'
            this.onRenderFunc()
        })
    }
}



