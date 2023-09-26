import { RegisterController } from '../controller/registerController.js'

class RegistrationView extends HTMLElement
{
constructor(model)
{
    super();

    this.mainTitle = document.createElement('h1');
    this.mainTitle.innerText = 'Registration Screen';

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

    this.dniInput = document.createElement('input');
    this.dniInput.type = 'dni';
    this.dniInput.value = '';
    this.dniInput.placeholder = 'dni';

    this.telephoneInput = document.createElement('input');
    this.telephoneInput.type = 'telephone';
    this.telephoneInput.value = '';
    this.telephoneInput.placeholder = 'telephone';

    this.genderInput = document.createElement('input');
    this.genderInput.type = 'gender';
    this.genderInput.value = '';
    this.genderInput.placeholder = 'gender';

    this.addressInput = document.createElement('input');
    this.addressInput.type = 'address';
    this.addressInput.value = '';
    this.addressInput.placeholder = 'address';

    this.mailInput = document.createElement('input');
    this.mailInput.type = 'mail';
    this.mailInput.value = '';
    this.mailInput.placeholder = 'mail';

    this.roleInput = document.createElement('input');
    this.roleInput.type = 'role';
    this.roleInput.value = '';
    this.roleInput.placeholder = 'role';

    this.submitButton = document.createElement('button');
    this.submitButton.innerText = 'Sign in';

    this.backButton = document.createElement('button');
    this.backButton.innerText = 'Return...';

    this.innerController = new RegisterController(this,model);
    

}

connectedCallback()
{
    this.appendChild(this.mainTitle);
    this.appendChild(this.usernameInput);
    this.appendChild(this.passwordInput);
    this.appendChild(this.dniInput);
    this.appendChild(this.telephoneInput);
    this.appendChild(this.genderInput);
    this.appendChild(this.addressInput);
    this.appendChild(this.mailInput);
    this.appendChild(this.roleInput);
    this.appendChild(this.submitButton);
    this.appendChild(this.backButton);

    this.submitButton.onclick = (event)=>{this.innerController.onSigninButtonClick()}

}

disconnectedCallback()
{

}

getRegistrationData()
{
    let obj = 
    {
        username : this.usernameInput.value, 
        password : this.passwordInput.value,
        dni : this.dniInput.value,
        telephone : this.telephoneInput.value,
        address : this.addressInput.value,
        mail : this.mailInput.value,
        role : this.roleInput.value
    }
    return obj;
}


}

customElements.define('x-registration-view', RegistrationView );

export { RegistrationView };