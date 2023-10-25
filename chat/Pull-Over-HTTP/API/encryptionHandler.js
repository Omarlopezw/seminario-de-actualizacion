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
    
    // Función para generar una clave AES
    generateAESKey() 
    {
        return crypto.randomBytes(32); // Generar una clave de 256 bits (32 bytes)
    }
    // Función para cifrar datos utilizando AES
    encryptAES(key, data) 
    {
        const iv = crypto.randomBytes(16); // Generar un IV (Vector de Inicialización) de 128 bits (16 bytes)
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

        let encryptedData = cipher.update(data, 'utf8', 'hex');
        encryptedData += cipher.final('hex');

        // Combinar IV y datos cifrados en una cadena
        const combinedData = iv.toString('hex') + encryptedData;

        return combinedData;
    }
    // Función para descifrar datos utilizando AES
    decryptAES(key, combinedData) 
    {
        // Separar el IV y los datos cifrados de la cadena combinada
        const ivHex = combinedData.slice(0, 32); // IV de 32 caracteres hexadecimales
        const encryptedData = combinedData.slice(32);

        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

        let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
        decryptedData += decipher.final('utf8');

        return decryptedData;
    }

}

module.exports = { EncryptionHandler };
