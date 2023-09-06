
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

module.exports = { Group }