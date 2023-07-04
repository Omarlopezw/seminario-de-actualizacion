const { Access } = require("./access.js") 
// const { listOfGroups } = require("../common/lists.js")

class AccessHandler
{
    constructor(databaseHandler)
    {
        this.databaseHandler = databaseHandler;
        this.databaseHandler.connect();
    }
    create( accessData )
    {
        let access = new Access(accessData);
        let state = false;

        if (typeof(access) == 'object') 
        {
            state = true;
            //Object.values devuelve array con los valores de las propiedades del objeto
            this.databaseHandler.callStoredProcedure('addAccess',Object.values(accessData));
            // listOfGroups.push(group);
        }
        return state;
    }
    read(accessID)
    {
        this.databaseHandler.callStoredProcedure('selectAccess',accessID);
    }
    update(updatedColumn,newData,accessID)
    {
        this.databaseHandler.callStoredProcedure('updateaccess',updatedColumn,newData,accessID);
    }
    remove(accessID)
    {
        this.databaseHandler.callStoredProcedure('deleteAccess',accessID);
    }

    authorizeAccessToResource(ResourceID,groupID)
    {
        /*asociariamos el grupo a un determinado acceso 
        para si pueda 'acceder' al ResourceID que necesite,
        porque ese acceso esta asociado al recurso que necsita el grupo,
        podriamos administrar un mismo acceso mediante 
        distintos niveles de accesso 'ManagamentLevel*/

        // this.databaseHandler.callStoredProcedure('addGroup_has_access',groupID);
        this.databaseHandler.callStoredProcedure('linkGroupToResource',groupID,ResourceID);
        //grupo relacionarlo con el acceso que tenga ese recurso


    }
    removeAccessToResource(ResourceID,groupID)
    {
        /*Si sigo la misma linea de authorizeAccessToResource entonces al quitar el
        acceso al grupo tambien le estaria quitando el acceso a otros recursos que
        tengan ese mismo acceso, porque lo que hago es, ver que acceso tiene el recurso y 
        luego ese mismo acceso se lo agrego al grupo asi esten asociados mediante
        el 'acceso' 
        
        alternativa en to do.txt*/
    }
    getGroupAccessByResource(ResourceID)
    {
        /*obtengo el acceso que tiene ese recurso,luego voy a grouphasaccess y veo que 
        grupos tienen ese acceso y devuelvo*/
        this.databaseHandler.callStoredProcedure('getGroupAccessByResource',ResourceID);
    }
    getResourceAccessByGroup(groupID)
    {
        this.databaseHandler.callStoredProcedure('getResourceAccessByGroup',groupID);
    }
}

module.exports =  { AccessHandler }