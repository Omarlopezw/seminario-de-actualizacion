import { UserLoginController } from '../controller/userLoginController.js'

class UserLoginView extends HTMLElement
{
    constructor(model)
    {
        super();

        this.mainTitle = document.createElement('h1');
        this.mainTitle.innerText = 'LoginView Screen';

        this.usernameInput = document.createElement('input');
        this.usernameInput.type = 'text';
        this.usernameInput.value = '';
        this.usernameInput.placeholder = 'username';

        this.passwordInput = document.createElement('input');
        this.passwordInput.type = 'password';
        this.passwordInput.value = '';
        this.passwordInput.placeholder = 'password';

        this.nameInput = document.createElement('input');
        this.nameInput.type = 'text';
        this.nameInput.value = '';
        this.nameInput.placeholder = 'name';

        this.surnameInput = document.createElement('input');
        this.surnameInput.type = 'surname';
        this.surnameInput.value = '';
        this.surnameInput.placeholder = 'surname';

        this.submitButton = document.createElement('button');
        this.submitButton.innerText = 'Login';

        this.registrationButton = document.createElement('button');
        this.registrationButton.innerText = 'Registration';

        this.innerController = new UserLoginController(this,model);
        

    }

    connectedCallback()
    {
        this.appendChild(this.mainTitle);
        this.appendChild(this.usernameInput);
        this.appendChild(this.passwordInput);
        this.appendChild(this.submitButton);
        this.appendChild(this.registrationButton);

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