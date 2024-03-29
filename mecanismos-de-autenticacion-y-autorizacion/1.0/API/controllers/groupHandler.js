
class GroupHandler
{
    constructor( databaseHandler )
    {
        this.databaseHandler = databaseHandler;
        this.databaseHandler.connect();
    }
    create(groupLoginData,groupData)
    {
            //Object.values devuelve array con los valores de las propiedades del objeto
            this.databaseHandler.callStoredProcedure('addGroup',Object.values(groupLoginData),Object.values(groupData));
            // this.databaseHandler.callStoredProcedure('addGroupData',Object.values(groupData));
    }
    remove(groupID)
    {
        this.databaseHandler.callStoredProcedure('deleteGroup',groupID);
        
    }
    update(updatedColumn,newData,id)
    {
        this.databaseHandler.callStoredProcedure('updateGroupdata',updatedColumn,newData,id);
    }
    read(groupID)
    {
        this.databaseHandler.callStoredProcedure('selectGrouphasGroupdata',groupID);
    }
    addUser(userID,groupID)
    {
        this.databaseHandler.callStoredProcedure('addUSerHasGroup',userID,groupID);
    }
    removeUser(userID,groupID)
    {
        this.databaseHandler.callStoredProcedure('deleteUserHasGroup',userID,groupID);
    }
}

module.exports =  { GroupHandler }
