const crypto = require('crypto');

class EncryptionHandler
{
    constructor()
    {

    }
    async encryptHashSHA256(...data)// Función para calcular el hash SHA-256 de una password
    {
        const hash = crypto.createHash('sha256');
        let processedData = data.reduce((AcummulateData,CurrentData) => AcummulateData + CurrentData)
        hash.update(processedData);
        return hash.digest('hex');
    }

}

module.exports = { EncryptionHandler };