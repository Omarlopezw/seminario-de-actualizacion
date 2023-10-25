class Authorizer
{
    constructor(databaseHandler)
    {
        this.databaseHandler = databaseHandler;
        this.databaseHandler.connect();
    }
    async authorize(userID,accessID)
    {
        //if userID belong to authorized group to the resource
        let response = await this.databaseHandler.callStoredProcedure('checkUserAccess',23,1);

        return response['@p_response'];
    }
}

module.exports = { Authorizer };