
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

module.exports = { User }