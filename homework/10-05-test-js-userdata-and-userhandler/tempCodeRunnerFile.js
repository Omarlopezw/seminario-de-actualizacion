
    }
    update(id,newData)
    {
        let index = listOfUser.findIndex(user => user.id === id);
        for (const key in newData) 
        { 
            console.log(key);
        }
        // listOfUser[index]
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

let newData = {name : 'valen',surname : 'perez polo'}

userHandler.update('1',newData)
