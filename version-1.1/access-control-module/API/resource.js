class Resource
{
    constructor(resourceData) 
    {
        this.resourceData = resourceData;
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

module.exports = { Resource }