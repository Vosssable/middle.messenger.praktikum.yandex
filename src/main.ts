import './components/buttons/button/button.pcss'
import './components/form/formMain/form.pcss'
import './components/form/formInput/formInput.pcss'
import './components/chat/chat.pcss'
import './components/input/profileInput.pcss'
import './pages/chatPage/chatPage.pcss'
import './pages/profilePage/profilePage.pcss'
import './pages/errorPage/errorPage.pcss'
import './style.pcss'
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.onRenderFunc();
});