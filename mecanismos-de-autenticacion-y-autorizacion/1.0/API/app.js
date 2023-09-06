const { User } =  require("./User.js")
const { UserHandler } = require("./UserHandler.js") 
const { Group } = require("./Group.js") 
const { GroupHandler } = require("./GroupHandler.js") 
const { userData } = require("./userData.js") 
const { userLoginData } = require("./userLoginData.js") 
const { groupData } = require("./groupData.js") 
const { groupLoginData } = require("./groupLoginData.js") 
const { ResourceHandler } = require("./resourceHandler.js") 
const { resourceData } = require("./resourceData.js") 
const { accessData } = require("./accessData.js") 
const { AccessHandler } = require("./accessHandler.js") 
const { SessionHandler } = require("./sessionHandler.js") 


const { DataBaseHandler } = require("../Database/database.js")
const file =  require("../Database/Config.js")


//Create database connection----------------------------------------------------------
let db = new DataBaseHandler(file);

// let datauser = ['00998877','miguelito']
// db.connect()
// db.callStoredProcedure('selectAllData','user')
// db.callStoredProcedure('addUser',datauser)

//UserLoginData----------------------------------------------------------
userLoginData.username = 'Joaquin012'
userLoginData.password = 'Verano2023'

//UserData----------------------------------------------------------

userData.namee = 'Joaquin';
userData.surname = 'Iriarte';
userData.dni = '321321321';
userData.phone = '132435345';
userData.gender = 'Masculino';
userData.address = 'San luis 135';
userData.email = 'Joaquin012@gmail.com';
userData.userMembership = 'estudiante';


// db.callStoredProcedure('addUserData',Object.values(userData))

//User----------------------------------------------------------
// let userHandler = new UserHandler(db);

// userHandler.create(userLoginData,userData);

// userHandler.update('namee','Franco',4)

// userHandler.create(userData);
// let response = userHandler.read(18);
// response.then(response => {console.log(response['surname'])});


// // userHandler.remove('1')
// userHandler.getGoupMembership('2')


//groupLoginData----------------------------------------------------------

// groupLoginData.username = 'students'
// groupLoginData.password = 'educar_2018'


//groupData----------------------------------------------------------

// groupData.name = 'students';
// groupData.isActive = 1;

// let groupHandler = new GroupHandler(db);
// groupHandler.create(groupLoginData,groupData);

// groupHandler.read(8)

//Agrego el usuario 1 al grupo 2
// groupHandler.addUser('1','2')

// groupHandler.removeUser('1','2')

//ResourceData----------------------------------------------------------

resourceData.name = 'Pautas de convivencia';
resourceData.resourceData = 'Pautas de convivencia 2023.pdf';
resourceData.isActive = 1;

//Resource----------------------------------------------------------

// let resoruceHandler = new ResourceHandler(db);

// resoruceHandler.create(resourceData)

// resoruceHandler.read('1')

// resoruceHandler.update('resourceData','PlanInstitucionalDeEvaluación2023.pdf',1)


//AccessData----------------------------------------------------------

// accessData.managmentLevel = '3';
// accessData.name = 'High level reading';

//Access----------------------------------------------------------

// let accessHandler = new AccessHandler(db);

// accessHandler.create(accessData)

// pResponseValue = accessHandler.read('1');

// pResponseValue.then(response =>{console.log(response)});


// accessHandler.update('managmentLevel','1',1)

// accessHandler.authorizeAccessToResource(2,3);

// accessHandler.getGroupAccessByResource(1);

// accessHandler.getResourceAccessByGroup(3);


//SessionHandler----------------------------------------------------------

let sessionHandler = new SessionHandler(db);

let response = sessionHandler.logIn('Joaquin012','Verano2023');
response.then(response => 
{
    let isActive = response['@p_response'];
    isActive? console.log('success log in') : console.log('incorrect authentication');
})





