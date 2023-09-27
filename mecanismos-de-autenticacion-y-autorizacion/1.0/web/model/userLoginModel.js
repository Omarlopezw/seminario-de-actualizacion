class UserLoginModel extends EventTarget //Hacer modelo observable desde la app
{
    constructor()
    {
        super();
    }
    async login( loginData )
    {
        let fetchData = 
        { 
            method: 'POST', 
            body: JSON.stringify( loginData ) 
        }

        let request = await fetch( 'http://localhost:8080/login',fetchData );

        let response = await request.json();

        return response;
    }
    logout(credentials)
    {
        this.dispatchEvent( new CustomEvent('logout') );

        return Promise.resolve(true);

    }
    async signIn(registerData)
    {
        let fetchData = 
        { 
            method: 'POST', 
            body: JSON.stringify( registerData ) 
        }

        let request = await fetch( 'http://localhost:8080/signIn',fetchData );

        let response = await request.json();

        return response;
    }
    async getUserData()
    {
        let userAccess = {id: 23,access: 1};

        let fetchData = 
        { 
            method: 'POST', 
            body: JSON.stringify( userAccess ) 
        }

        let request = await fetch( 'http://localhost:8080/getUserData',fetchData );

        let response = await request.json();

        return response;
    }
}

export { UserLoginModel };