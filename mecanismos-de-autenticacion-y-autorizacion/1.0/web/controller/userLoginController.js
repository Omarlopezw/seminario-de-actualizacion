
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

        if(response.message[0] == true)
        {
            alert('user logged');

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

}

export { UserLoginController }