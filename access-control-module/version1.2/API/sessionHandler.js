class SessionHandler
{
    constructor(databaseHandler)
    {
        this.databaseHandler = databaseHandler;
        this.databaseHandler.connect();
    };
    logIn(username,password)
    {
        let response;
        response = this.databaseHandler.callStoredProcedure('authenticate',username,password);

        return response;
    };
    logOUT()
    {
        return 'finished session';
    };
}

module.exports =  { SessionHandler }
