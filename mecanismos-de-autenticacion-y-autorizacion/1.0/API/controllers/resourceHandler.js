
class ResourceHandler
{
    constructor( databaseHandler )
    {
        this.databaseHandler = databaseHandler;
        this.databaseHandler.connect();
    }
    create( resourceData )
    {
            //Object.values devuelve array con los valores de las propiedades del objeto
            this.databaseHandler.callStoredProcedure('addResource',Object.values(resourceData));
    }
    read(resourceID)
    {
        this.databaseHandler.callStoredProcedure('selectResource',resourceID);
    }
    update(updatedColumn,newData,resourceID)
    {
        this.databaseHandler.callStoredProcedure('updateResource',updatedColumn,newData,resourceID);
    }
    remove(resourceID)
    {
        this.databaseHandler.callStoredProcedure('deleteResource',resourceID);
    }
}

module.exports =  { ResourceHandler }
