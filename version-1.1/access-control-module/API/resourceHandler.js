const { Resource } = require("./resource.js") 
// const { listOfGroups } = require("../common/lists.js")

class ResourceHandler
{
    constructor( databaseHandler )
    {
        this.databaseHandler = databaseHandler;
        this.databaseHandler.connect();
    }
    create( resourceData )
    {
        let resource = new Resource(resourceData);
        let state = false;

        if (typeof(resource) == 'object') 
        {
            state = true;

            //Object.values devuelve array con los valores de las propiedades del objeto
            this.databaseHandler.callStoredProcedure('addResource',Object.values(resourceData));
            // listOfGroups.push(group);
        }
        return state;
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
