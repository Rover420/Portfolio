
const armoredKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

xjMEZLMqHxYJKwYBBAHaRw8BAQdANL+fruLqBCNx/bUOH9vVN8UvRwmzTeMw
PuihyTTw0L3NVzc4MjQyNjQzLTcyZGMtNDg2Yy1hMGI4LWVkYmE3YTEyOWVi
NyA8NzgyNDI2NDMtNzJkYy00ODZjLWEwYjgtZWRiYTdhMTI5ZWI3QGV4YW1w
bGUuY29tPsKMBBAWCgA+BYJksyofBAsJBwgJkGgAw5eXH+WgAxUICgQWAAIB
AhkBApsDAh4BFiEEx2ZM6tzlJbqeAaQtaADDl5cf5aAAACSrAQDyCMmo7RXU
K9Hn+tJA+bQ4YIXWaUMDHHms7vCS86J+DAD6ApIaZMq/En3pbOWqIbw2vuHg
anLGQqra45SundOJyAnOOARksyofEgorBgEEAZdVAQUBAQdAwV38qWSgxxeL
5oCsePbWpESEWUCJhwDgZHjPYOqXBgwDAQgHwngEGBYIACoFgmSzKh8JkGgA
w5eXH+WgApsMFiEEx2ZM6tzlJbqeAaQtaADDl5cf5aAAAIgfAQCtZ8ezCiEY
0wJ9Q5p35kNuDHHgSRVxGclq+iR1XnDjyQD9F/EbXMjGrm4dONZ+dP1BAU/v
DbR23CFYSP0fVmRcxAE=
=Iogf
-----END PGP PUBLIC KEY BLOCK-----`


export async function encryptData(data) {
    const { encrypt, createMessage, readKey } = (await import('openpgp'));
    const publicKey = await readKey({ armoredKey: armoredKey });

    const encryptedData = await encrypt({
        message: await createMessage({ text: data }),
        encryptionKeys: publicKey,
    });
  
    return encryptedData;
  }