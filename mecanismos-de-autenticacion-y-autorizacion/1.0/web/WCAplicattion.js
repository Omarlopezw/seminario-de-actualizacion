import { UserLoginView } from './view/userLoginView.js'
import { RegistrationView } from './view/registrationView.js'
import { DefaultView } from './view/defaultView.js'
import { UserLoginModel } from './model/userLoginModel.js'

class WCAplicattion extends HTMLElement
{
    constructor()
    {
        super();
        this.loginModel = new UserLoginModel();

        this.loginViewScreen = new UserLoginView(this.loginModel);
        this.RegistrationViewScreen = new RegistrationView(this.loginModel);
        this.DefaultViewScreen = new DefaultView(this.loginModel);

        //login state
        this.CurrentViewScreen = this.loginViewScreen;

        this.loginModel.addEventListener('logout',() => { this.login() })
        this.loginViewScreen.addEventListener('login',() => { this.default() })
        this.loginViewScreen.addEventListener('register',() => { this.register() })
        this.RegistrationViewScreen.addEventListener('signIn',() => { this.login() })

        //routes
        this.routes = [];
        this.asocciateRoute('/register',this.RegistrationViewScreen);


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
        let path = '/register';

    }
    default()
    {
        this.removeChild(this.CurrentViewScreen);
        this.CurrentViewScreen = this.DefaultViewScreen;
        this.appendChild(this.CurrentViewScreen)
    }
    connectedCallback()
    {
        this.appendChild(this.CurrentViewScreen);
    }
    disconnectedCallback()
    {

    }
    asocciateRoute(route,WCView)
    {
        this.routes[route] = WCView;
    }

    navigateTo(path) 
    {
        if (this.routes[path]) 
        {
            this.removeChild(this.CurrentViewScreen);

            this.CurrentViewScreen = this.routes[path];
            
            this.appendChild(this.CurrentViewScreen)
        } 
        else 
        {
            console.error(`No se encontró una vista para la ruta ${path}`);
        }
    }
}

customElements.define('x-wc-app', WCAplicattion );

export { WCAplicattion };