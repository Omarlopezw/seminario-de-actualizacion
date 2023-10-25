// En sharedKey.js
module.exports = async function generateCryptoKey() {
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256, // 256 bits (32 bytes)
    },
    true, // La clave es para cifrado y descifrado
    ['encrypt', 'decrypt']
  );
  return key;
}
