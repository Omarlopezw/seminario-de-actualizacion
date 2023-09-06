const { listOfUsers } = require("../common/lists.js")
const { User } =  require("./User.js")
const { EncryptionHandler } = require("./encryptionHandler.js") 


class UserHandler
{
    constructor( databaseHandler )
    {
        this.databaseHandler = databaseHandler;
        this.databaseHandler.connect();
    }
    async create(userLoginData,userData)
    {
        let user = new User(userData);
        let state = false;
        let encryptionHandler = new EncryptionHandler();
        
        if (typeof(user) == 'object') 
        {
            state = true;
            let encryptedPassword = await encryptionHandler.encryptHashSHA256(userLoginData.password);
            userLoginData.password = encryptedPassword;

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
        let response;
        response = this.databaseHandler.callStoredProcedure('selectUserhasUserdata',userID);
        return response;
    }
    getGoupMembership(id)
    {
        let index = listOfUsers.findIndex(user => user.id === id);

        console.log(listOfUsers[index].userMembership)
    }
}

module.exports = { UserHandler }