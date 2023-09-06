const crypto = require('crypto');

class EncryptionHandler
{
    constructor()
    {

    }
    async encryptHashSHA256(password)// Función para calcular el hash SHA-256 de una password
    {
        const hash = crypto.createHash('sha256');
        hash.update(password);
        return hash.digest('hex');
    }

}

module.exports = { EncryptionHandler };