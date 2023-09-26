
class DefaultController
{
    constructor(view,model)
    {
        this.viewReference = view;
        this.ModelReference = model;
    }

    async onLogoutButtonClick()
    {
        const response = await this.ModelReference.logout('a');

        if(response)
        {
            this.viewReference.dispatchEvent(new CustomEvent('logout', { detail:response }))
        }
        else
        {
            alert('error: incorrect logout')
        }
    }

}

export { DefaultController }