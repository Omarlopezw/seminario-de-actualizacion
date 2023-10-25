
class UserLoginController
{
    constructor(view,model)
    {
        this.viewReference = view;
        this.ModelReference = model;
    }
    enable()
    {
        this.viewReference.submitButton.addEventListener('click',()=>{this.oncreatebuttonclick()})
    }

    disable()
    {
        this.viewReference.submitButton.removeEventListener('click',()=>{this.oncreatebuttonclick()})
    }

    async onLoginButtonClick()
    {
        const formData = this.viewReference.getFormData();

        let response = await this.ModelReference.login(formData);

        if(response.message.userID !== undefined)
        {
            alert('user logged');
            this.saveSessionData(response.message);
            let data = this.getSessionData();
            alert(data.userID + '' + data.sessionKey);
            this.viewReference.dispatchEvent(new CustomEvent('login', { detail:response }))
        }
        else
        {
            alert('error: incorrect credentials')
        }
    }

    onRegisterButtonClick()
    {
        this.viewReference.dispatchEvent( new CustomEvent('register') );
    }
    saveSessionData(sessionData)
    {
        localStorage.setItem("sessionData", JSON.stringify(sessionData));
    }
    getSessionData()
    {
        // Para recuperar el objeto del localStorage
        const sessionData = localStorage.getItem('sessionData');

        // Convierte la cadena JSON de nuevo a un objeto JavaScript
        const data = JSON.parse(sessionData);

        return data;
    }

}

export { UserLoginController }