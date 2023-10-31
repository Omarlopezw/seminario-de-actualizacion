import { RegisterController } from '../controller/registerController.js'
import { CSSLogin } from './style/cssLogin.js'

class RegistrationView extends HTMLElement
{
constructor(model)
{
    super();

    this.loginBox = document.createElement('div');
    this.loginBox.classList.add('signin-box')

    this.userBoxContainer = document.createElement('div');
    this.userBoxContainer.classList.add('user-box-container')

    this.mainTitle = document.createElement('h2');
    this.mainTitle.innerText = 'Registration';
    
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

    this.nameBox = document.createElement('div');
    this.nameBox.classList.add('user-box')

    this.nameInput = document.createElement('input');
    this.nameInput.type = 'text';
    this.nameInput.value = '';
    
    this.labelName = document.createElement('label');
    this.labelName.innerText = 'Name'

    this.surnameBox = document.createElement('div');
    this.surnameBox.classList.add('user-box')

    this.surnameInput = document.createElement('input');
    this.surnameInput.type = 'text';
    this.surnameInput.value = '';
    
    this.labelSurname = document.createElement('label');
    this.labelSurname.innerText = 'Surname';

    this.dniBox = document.createElement('div');
    this.dniBox.classList.add('user-box')

    this.dniInput = document.createElement('input');
    this.dniInput.type = 'text';
    this.dniInput.value = '';

    this.labelDni = document.createElement('label');
    this.labelDni.innerText = 'Dni';

    this.telephoneBox = document.createElement('div');
    this.telephoneBox.classList.add('user-box')

    this.telephoneInput = document.createElement('input');
    this.telephoneInput.type = 'text';
    this.telephoneInput.value = '';
    
    this.labelTelephone = document.createElement('label');
    this.labelTelephone.innerText = 'Telephone'

    this.genderBox = document.createElement('div');
    this.genderBox.classList.add('user-box')

    this.genderInput = document.createElement('input');
    this.genderInput.type = 'text';
    this.genderInput.value = '';
    
    this.labelGender = document.createElement('label');
    this.labelGender.innerText = 'Gender'

    this.addressBox = document.createElement('div');
    this.addressBox.classList.add('user-box')

    this.addressInput = document.createElement('input');
    this.addressInput.type = 'text';
    this.addressInput.value = '';
    
    this.labelAddress = document.createElement('label');
    this.labelAddress.innerText = 'Address';

    this.mailBox = document.createElement('div');
    this.mailBox.classList.add('user-box');

    this.mailInput = document.createElement('input');
    this.mailInput.type = 'text';
    this.mailInput.value = '';
    
    this.labelMail = document.createElement('label');
    this.labelMail.innerText = 'Mail'

    this.submitButton = document.createElement('button');
    this.submitButton.innerText = 'Sign in';

    this.backButton = document.createElement('button');
    this.backButton.innerText = 'Return...';

    let style = document.createElement('style');
    style.innerText = CSSLogin();
    this.appendChild(style);

    this.innerController = new RegisterController(this,model);
    

}

connectedCallback()
{
    this.appendChild(this.loginBox);
    this.loginBox.appendChild(this.userBoxContainer);
    this.userBoxContainer.appendChild(this.mainTitle);
    this.userBoxContainer.appendChild(this.userBox);
    this.userBoxContainer.appendChild(this.passwordBox);
    this.userBoxContainer.appendChild(this.nameBox);
    this.userBoxContainer.appendChild(this.surnameBox);
    this.userBoxContainer.appendChild(this.dniBox);
    this.userBoxContainer.appendChild(this.telephoneBox);
    this.userBoxContainer.appendChild(this.genderBox);
    this.userBoxContainer.appendChild(this.addressBox);
    this.userBoxContainer.appendChild(this.mailBox);
    this.userBoxContainer.appendChild(this.submitButton);
    this.userBoxContainer.appendChild(this.backButton);

    this.userBox.appendChild(this.usernameInput);
    this.userBox.appendChild(this.labelUsername);
    this.passwordBox.appendChild(this.passwordInput);
    this.passwordBox.appendChild(this.labelPassword);
    this.nameBox.appendChild(this.nameInput);
    this.nameBox.appendChild(this.labelName);
    this.surnameBox.appendChild(this.surnameInput);
    this.surnameBox.appendChild(this.labelSurname);
    this.dniBox.appendChild(this.dniInput);
    this.dniBox.appendChild(this.labelDni);
    this.telephoneBox.appendChild(this.telephoneInput);
    this.telephoneBox.appendChild(this.labelTelephone);
    this.genderBox.appendChild(this.genderInput);
    this.genderBox.appendChild(this.labelGender);
    this.addressBox.appendChild(this.addressInput);
    this.addressBox.appendChild(this.labelAddress);
    this.mailBox.appendChild(this.mailInput);
    this.mailBox.appendChild(this.labelMail);


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
        name : this.nameInput.value, 
        surname : this.surnameInput.value,
        dni : this.dniInput.value,
        gender : this.genderInput.value,
        telephone : this.telephoneInput.value,
        address : this.addressInput.value,
        mail : this.mailInput.value
    }
    return obj;
}


}

customElements.define('x-registration-view', RegistrationView );

export { RegistrationView };