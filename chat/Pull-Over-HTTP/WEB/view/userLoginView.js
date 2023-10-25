import { UserLoginController } from '../controller/userLoginController.js'
import { CSSLogin } from './style/cssLogin.js'

class UserLoginView extends HTMLElement
{
    constructor(model)
    {
        super();
        // this.attachShadow({ mode: "open" });

        this.loginBox = document.createElement('div');
        this.loginBox.classList.add('login-box')

        this.mainTitle = document.createElement('h2');
        this.mainTitle.innerText = 'Login';
        
        this.userBox = document.createElement('div');
        this.userBox.classList.add('user-box')

        this.usernameInput = document.createElement('input');
        this.usernameInput.type = 'text';
        this.usernameInput.value = '';
        
        this.labelUsername = document.createElement('label');
        this.labelUsername.innerText = 'Username'

        this.passwordBox = document.createElement('div');
        this.passwordBox.classList.add('user-box')

        this.passwordInput = document.createElement('input');
        this.passwordInput.type = 'password';
        this.passwordInput.value = '';
    

        this.labelPassword = document.createElement('label');
        this.labelPassword.innerText = 'Password'

        this.submitButton = document.createElement('button');
        this.submitButton.innerText = 'Login';

        this.registrationButton = document.createElement('button');
        this.registrationButton.innerText = 'Registration';

        this.spanButton1 = document.createElement('span');
        this.spanButton2 = document.createElement('span');
        this.spanButton3 = document.createElement('span');
        this.spanButton4 = document.createElement('span');
        this.spanButton5 = document.createElement('span');
        this.spanButton6 = document.createElement('span');
        this.spanButton7 = document.createElement('span');
        this.spanButton8 = document.createElement('span');


        let style = document.createElement('style');
        style.innerText = CSSLogin();
        this.appendChild(style);

        this.innerController = new UserLoginController(this,model);
        

    }

    connectedCallback()
    {
        this.appendChild(this.loginBox);
        this.loginBox.appendChild(this.mainTitle);
        this.loginBox.appendChild(this.userBox);
        this.userBox.appendChild(this.usernameInput);
        this.userBox.appendChild(this.labelUsername);
        this.loginBox.appendChild(this.passwordBox);
        this.passwordBox.appendChild(this.passwordInput);
        this.passwordBox.appendChild(this.labelPassword);
        this.loginBox.appendChild(this.submitButton);
        this.submitButton.appendChild(this.spanButton1);
        this.submitButton.appendChild(this.spanButton2);
        this.submitButton.appendChild(this.spanButton3);
        this.submitButton.appendChild(this.spanButton4);
        this.loginBox.appendChild(this.registrationButton);
        this.registrationButton.appendChild(this.spanButton5);
        this.registrationButton.appendChild(this.spanButton6);
        this.registrationButton.appendChild(this.spanButton7);
        this.registrationButton.appendChild(this.spanButton8);
        

        this.submitButton.onclick = (event)=>{this.innerController.onLoginButtonClick()}
        this.registrationButton.onclick = (event)=>{this.innerController.onRegisterButtonClick()}
    }
    disconnectedCallback()
    {

    }

    getFormData()
    {
        let obj = 
        {
            username : this.usernameInput.value, 
            password : this.passwordInput.value
        }
        return obj;
    }

}

customElements.define('x-user-login-view', UserLoginView );

export { UserLoginView };