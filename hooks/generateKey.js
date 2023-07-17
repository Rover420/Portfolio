export async function generateKey() {
    const { v4: uuidv4 } = (await import('uuid'));
    const userId = uuidv4();
    const { generateKey } = (await import('openpgp'));
    const { privateKey, publicKey } = await generateKey({
        type: 'ecc', // Type of the key, defaults to ECC
        curve: 'curve25519', // ECC curve name, defaults to curve25519
        userIDs: [{ name: userId, email: userId+'@example.com' }], // you can pass multiple user IDs
        format: 'armored' // output key format, defaults to 'armored' (other options: 'binary' or 'object')
    });

    console.log('Private Key: ', privateKey + '\n');
    console.log('Public Key: ', publicKey + '\n');
  
    return { privateKey, publicKey };
}