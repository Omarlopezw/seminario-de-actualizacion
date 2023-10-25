
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
    async getUserData()
    {
        const response = await this.ModelReference.getUserData();

        if(response.message[0])
        {
            console.dir('user data: ' + response.message[1].namee);
            console.dir('user data: ' + response.message[1].surname);
            console.dir('user data: ' + response.message[1].dni);
            console.dir('user data: ' + response.message[1].gender);
            console.dir('user data: ' + response.message[1].address);
            console.dir('user data: ' + response.message[1].mail);
        }
        else
        {
            alert('error: incorrect logout')
        }
    }

}

export { DefaultController }