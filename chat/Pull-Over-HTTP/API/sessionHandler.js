const { EncryptionHandler } = require("./encryptionHandler.js") 

class SessionHandler
{
    constructor(databaseHandler)
    {
        this.databaseHandler = databaseHandler;
        this.encryptionHandler = new EncryptionHandler();

        // this.databaseHandler.connect();
    };
    async logIn(username,password)
    {
        let response; 
        let token; 
        let userLoginData = {};
        let encryptedPassword = await this.encryptionHandler.encryptHashSHA256(password);

        // response = await this.databaseHandler.callStoredProcedure('authenticate',username,encryptedPassword);
        response = await this.authenticate(username,encryptedPassword);
        
        if (response['@p_response'] != null) 
        {
            let userID = response['@p_response'];
            token = await this.encryptionHandler.encryptHashSHA256(username,password,userID)

            userLoginData.userID = userID;
            userLoginData.sessionKey = token;
        }
        else
        {
            userLoginData.userID = undefined;
            userLoginData.sessionKey = undefined;
        }
        return userLoginData;
    };
    logOUT()
    {
        return true;
    };
    authenticate(username,encryptedPassword)
    {
        let response;
        response = this.databaseHandler.callStoredProcedure('authenticate',username,encryptedPassword);
        return response;
    }
}

module.exports =  { SessionHandler }
