import { UserLoginView } from './view/userLoginView.js';
import { RegistrationView } from './view/registrationView.js';
import { UserLoginModel } from './model/userLoginModel.js';
import { ChatView } from './view/chatView.js';
import { ChatModel } from './model/chatModel.js';


class WCAplicattion extends HTMLElement
{
    constructor()
    {
        super();
        this.loginModel = new UserLoginModel();
        this.chatModel = new ChatModel();

        this.chatView = new ChatView(this.chatModel);
        this.loginViewScreen = new UserLoginView(this.loginModel);
        this.RegistrationViewScreen = new RegistrationView(this.loginModel);

        //login state
        this.CurrentViewScreen = this.loginViewScreen;

        this.loginModel.addEventListener('logout',() => { this.login() })
        this.chatView.addEventListener('logout',() => { this.login() })
        this.loginViewScreen.addEventListener('login',() => { this.initChatView() })
        this.loginViewScreen.addEventListener('register',() => { this.register() })
        this.RegistrationViewScreen.addEventListener('signIn',() => { this.login() })


    }
    login()
    {
        this.removeChild(this.CurrentViewScreen);
        this.CurrentViewScreen = this.loginViewScreen;
        this.appendChild(this.CurrentViewScreen)
    }
    logout()
    {
        this.removeChild(this.CurrentViewScreen);
        this.CurrentViewScreen = this.loginViewScreen;
        this.appendChild(this.CurrentViewScreen)
    }
    register()
    {
        this.removeChild(this.CurrentViewScreen);
        this.CurrentViewScreen = this.RegistrationViewScreen;
        this.appendChild(this.CurrentViewScreen)
    }
    initChatView()
    {
        this.removeChild(this.CurrentViewScreen);
        this.CurrentViewScreen = this.chatView;
        this.appendChild(this.CurrentViewScreen)
    }
    connectedCallback()
    {
        this.appendChild(this.CurrentViewScreen);
    }
    disconnectedCallback()
    {

    }
}

customElements.define('x-wc-app', WCAplicattion );

export { WCAplicattion };