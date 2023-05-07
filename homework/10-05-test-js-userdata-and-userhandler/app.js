let userData =
{
    id : ' ',
    surname : ' ',
    gender : ' ',
    email : ' ',
    phone : ' ',
    dni : ' ',
    userMembership : [],
    name : false,
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

let listOfUser = [];

class User
{
    constructor(userData)
    {
        for (const key in userData) 
        { 
            this[key] = userData[key]
        }
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
            listOfUser.push(user);
        }
        console.log(listOfUser)
        return state;
        
    }
    remove(id)
    {
        let index = listOfUser.findIndex(user => user.id === id);

        listOfUser.splice(index, 1);
        console.log(`Usuario ${id} eliminado correctamente`);

    }
    update(id,newData)
    {

    }
    read(id)
    {

    }
    getGoupMembership(id)
    {

    }
}

let userHandler = new UserHandler();

userData.id = '1';
userData.email = 'omarlopezxs@gmail.com';
userData.dni = '44315672';
userData.gender = 'Masculino';
userData.name = 'Omar';
userData.surname = 'López';
userData.phone = '2236954863';
userData.userMembership = '2236954863';
userData.address.country = 'Argentina';
userData.address.province = 'Buenos Aires';
userData.address.postalcode = '7600';
userData.address.city = 'Mar del Plata';
userData.address.nameOfStreet = 'Beruti';
userData.address.numberOfStreet = '8490';

userHandler.create(userData);

userData.id = 2;

userHandler.create(userData);

