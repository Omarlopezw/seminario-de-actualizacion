;

let userData =
{
    id : ' ',
    surname : ' ',
    gender : ' ',
    email : ' ',
    phone : ' ',
    dni : ' ',
    userMembership : [],
    name : ' ', 
    address:
    {
        country : '',
        province : '',
        postalcode: '',
        city : '',
        nameOfStreet : '',
        numberOfStreet: ''
    }
}
let groupData =
{
    id : ' ',
    name : ' '
}

let listOfUsers = [];
let listOfGroups = [];

class User
{   
    isActive = false;

    constructor(userData)
    {
        for (const key in userData) 
        { 
            this[key] = userData[key]
        }
    }
    getID()
    {
        return this.id;
    }
    getIsActive()
    {
        return this.isActive;
    }
}

class UserHandler
{
    constructor()
    {

    }
    create(data)
    {
        let user = new User(data);
        let state = false;

        if (typeof(user) == 'object') 
        {
            state = true;
            listOfUsers.push(user);
        }
        console.log(listOfUsers)
        return state;
        
    }
    remove(id)
    {
        let index = listOfUsers.findIndex(user => user.id === id);

        listOfUsers.splice(index, 1);
        console.log(`Usuario ${id} eliminado correctamente`);
        console.log(listOfUsers)

    }
    update(id,newData)
    {
        let index = listOfUsers.findIndex(user => user.id === id);
        for (const key in newData)//tambien se puede usar spread operator...
        { 
            listOfUsers[index][key] = newData[key];
        }
        // console.log(listOfUsers[index])
    }
    read(id)
    {
        let index = listOfUsers.findIndex(user => user.id === id);

        // console.log(listOfUsers[index])
    }
    getGoupMembership(id)
    {
        let index = listOfUsers.findIndex(user => user.id === id);

        console.log(listOfUsers[index].userMembership)
    }
}

class Group
{
    constructor(groupData)
    {
        this.isActive = false;
        this.amount = 0;
        this.usersInGroup = []
        for (const key in groupData) 
        { 
            this[key] = groupData[key]
        }
        this.isActive = true;
    }
    getID()
    {
        return this.id;
    }
    getIsActive()
    {
        return this.isActive;
    }
    getAmountOfUsers()
    {
        return this.amount;
    }
}
class GroupHandler
{
    constructor()
    {
    }
    create(data)
    {
        let group = new Group(data);
        let state = false;

        if (typeof(group) == 'object') 
        {
            state = true;
            listOfGroups.push(group);
        }
        // console.log(group)
        return state;
    }
    remove(id)
    {
        let index = listOfGroups.findIndex(group => group.id === id);

        listOfGroups.splice(index, 1);
        console.log(`Grupo ${id} eliminado correctamente`);
        console.log(listOfGroups)
    }
    update(id,newData)
    {
        let index = listOfGroups.findIndex(group => group.id === id);

        for (const key in newData)//tambien se puede usar spread operator...
        { 
            listOfGroups[index][key] = newData[key];
        }
        console.log(listOfGroups[index])
    }
    read(id)
    {
        let index = listOfGroups.findIndex(group => group.id === id);
    
        console.log(listOfGroups[index])
    }
    addUser(userID,groupID)
    {
        let indexOfGroup = listOfGroups.findIndex(group => group.id === groupID);
        listOfGroups[indexOfGroup].usersInGroup.push(userID)

        console.log('Usuarios en el grupo: ',listOfGroups[indexOfGroup].usersInGroup)

    }
    removeUser(userID,groupID)
    {
        let indexOfGroup = listOfGroups.findIndex(group => group.id === groupID);
        let indexOfUser = listOfGroups[indexOfGroup].usersInGroup.findIndex(id => id === userID);
        listOfGroups[indexOfGroup].usersInGroup.splice(indexOfUser,1)

        console.log(listOfGroups[indexOfGroup].usersInGroup)
    }
}

//UserData----------------------------------------------------------

userData.id = '1';
userData.email = 'omarlopezxs@gmail.com';
userData.dni = '44315672';
userData.gender = 'Masculino';
userData.name = 'Omar';
userData.surname = 'López';
userData.phone = '2236954863';
userData.userMembership = ['estudiante','CAI'];
userData.address.country = 'Argentina';
userData.address.province = 'Buenos Aires';
userData.address.postalcode = '7600';
userData.address.city = 'Mar del Plata';
userData.address.nameOfStreet = 'Beruti';
userData.address.numberOfStreet = '8490';



//User----------------------------------------------------------
let userHandler = new UserHandler();
// userHandler.create(userData);

// userData.id = '2';

// let newData = {name : 'valen',surname : 'perez polo',gender : 'femenino',userMembership : ['profesor','regente']}

// userHandler.update('1',newData)

// userHandler.create(userData);
// // userHandler.read('1')

// // userHandler.remove('1')
// userHandler.getGoupMembership('2')

//Group----------------------------------------------------------
let groupHandler = new GroupHandler();

groupData.id = '1';
groupData.name = 'profesores';

groupHandler.create(groupData);

// groupHandler.read('1')

// let newDataGroup = {name : 'teachers'}
// groupHandler.update('1',newDataGroup)

// groupHandler.remove('1');

groupData.id = '2';
groupData.name = 'estudiantes';

groupHandler.create(groupData);

//Agrego el usuario 1 al grupo 2
groupHandler.addUser('1','2')

// groupHandler.removeUser('1','2')
