const { listOfUsers } = require("../common/lists.js")
const { User } =  require("./User.js")

class UserHandler
{
    constructor( databaseHandler )
    {
        this.databaseHandler = databaseHandler;
        this.databaseHandler.connect();
    }
    create(userLoginData,userData)
    {
        let user = new User(userData);
        let state = false;
        
        if (typeof(user) == 'object') 
        {
            state = true;

            //Object.values devuelve array con los valores de las propiedades del objeto
            this.databaseHandler.callStoredProcedure('addUser',Object.values(userLoginData),Object.values(userData));
            listOfUsers.push(user);
        }
        console.log(listOfUsers)
        return state;
        
    }
    remove(userID)
    {
        // let index = listOfUsers.findIndex(user => user.id === id);
        // listOfUsers.splice(index, 1);
        this.databaseHandler.callStoredProcedure('deleteUser',userID);

    }
    update(updatedColumn,newData,id)
    {
        this.databaseHandler.callStoredProcedure('updateUserdata',updatedColumn,newData,id);
    }
    read(userID)
    {
        this.databaseHandler.callStoredProcedure('selectUserhasUserdata',userID);
    }
    getGoupMembership(id)
    {
        let index = listOfUsers.findIndex(user => user.id === id);

        console.log(listOfUsers[index].userMembership)
    }
}

module.exports = { UserHandler }