const { EncryptionHandler } = require("./encryptionHandler.js") 

class SessionHandler
{
    constructor(databaseHandler)
    {
        this.databaseHandler = databaseHandler;
        this.databaseHandler.connect();
    };
    async logIn(username,password)
    {
        let response;
        let encryptionHandler = new EncryptionHandler();
        
        let encryptedPassword = await encryptionHandler.encryptHashSHA256(password);

        response = this.databaseHandler.callStoredProcedure('authenticate',username,encryptedPassword);

        return response;
    };
    logOUT()
    {
        return 'finished session';
    };
}

module.exports =  { SessionHandler }
