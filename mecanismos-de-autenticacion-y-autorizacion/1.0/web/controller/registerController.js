
class RegisterController
{
    constructor(view,model)
    {
        this.viewReference = view;
        this.ModelReference = model;
    }

    async onSigninButtonClick()
    {
        const registerData = this.viewReference.getRegistrationData();
        const response = await this.ModelReference.signIn(registerData);

        if(response.message[0] == true)
        {
            alert('registration successful ')
            this.viewReference.dispatchEvent(new CustomEvent('signIn', { detail:response }))
        }
        else
        {
            alert('error: registration failed')
        }
    }

}

export { RegisterController }