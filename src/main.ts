import './components/button.pcss'
import './components/form.pcss'
import './components/formInput.pcss'
import './components/chat.pcss'
import './components/profileInput.pcss'
import './pages/chatPage/chatPage.pcss'
import './pages/profilePage/profilePage.pcss'
import './pages/errorPage/errorPage.pcss'
import './style.pcss'
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.onRenderFunc();
});