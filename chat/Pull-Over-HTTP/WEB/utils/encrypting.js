

export async function encryptMessage(message, key) {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    "AES-GCM",
    true,
    ["encrypt"]
  );

  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    cryptoKey,
    data
  );

  return {
    iv: iv,
    data: new Uint8Array(encryptedData),
  };
}

export async function decryptMessage(encryptedMessage, key) {
  const iv = encryptedMessage.iv;
  const data = encryptedMessage.data;
  try {
    const encoder = new TextEncoder();

    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(key),
      "AES-GCM",
      true,
      ["decrypt"]
    );

    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      cryptoKey,
      data
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  } catch (error) {
    console.error("Decryption error - Key: " + key, "IV: " + iv, "Data: " + data, error);
    return null; // Handle the error appropriately, e.g., return null or an error message.
  }
}
