const { User } =  require("./User.js")
const { UserHandler } = require("./UserHandler.js") 
const { Group } = require("./Group.js") 
const { GroupHandler } = require("./GroupHandler.js") 
const { userData } = require("./userData.js") 
const { userLoginData } = require("./userLoginData.js") 
const { groupData } = require("./groupData.js") 
const { groupLoginData } = require("./groupLoginData.js") 
const { DataBaseHandler } = require("../Database/database.js")
const file =  require("../Database/Config.js")


//Create database connection----------------------------------------------------------
let db = new DataBaseHandler(file);

// let datauser = ['00998877','miguelito']
// db.connect()
// db.callStoredProcedure('selectAllData','user')
// db.callStoredProcedure('addUser',datauser)

//UserLoginData----------------------------------------------------------
userLoginData.username = 'Maxi'
userLoginData.password = '10101010'

//UserData----------------------------------------------------------

userData.namee = 'Maximiliano';
userData.surname = 'Rodriguez';
userData.dni = '7676767';
userData.phone = '46456546';
userData.gender = 'Masculino';
userData.address = 'San benito 9010';
userData.email = 'Maxi@gmail.com';
userData.userMembership = 'estudiante';


// db.callStoredProcedure('addUserData',Object.values(userData))

//User----------------------------------------------------------
let userHandler = new UserHandler(db);

// userHandler.create(userLoginData,userData);

// userHandler.update('namee','Franco',4)

// userHandler.create(userData);
// userHandler.read(18)

// // userHandler.remove('1')
// userHandler.getGoupMembership('2')


//groupLoginData----------------------------------------------------------

// groupLoginData.username = 'students'
// groupLoginData.password = 'educar_2018'


//groupData----------------------------------------------------------

// groupData.name = 'students';
// groupData.isActive = 1;

let groupHandler = new GroupHandler(db);
// groupHandler.create(groupLoginData,groupData);

groupHandler.read(8)

//Agrego el usuario 1 al grupo 2
// groupHandler.addUser('1','2')

// groupHandler.removeUser('1','2')
