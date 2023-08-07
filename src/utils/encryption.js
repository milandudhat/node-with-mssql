const { randomBytes } = require('crypto');
const CryptoJS = require('crypto-js');
const saltedMd5 = require('salted-md5');

const _doEncrypt = (id) => {
     let _key = CryptoJS.SHA256(process.env.SECRET_KEY);
     let _iv = CryptoJS.enc.Base64.parse(" ");

     let _encrypted = CryptoJS.AES.encrypt(id, _key, {
            keySize: 32,
            iv: _iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
     }).toString();

     // replace the / in the encrypted string with a _ to avoid url encoding issues

     _encrypted = _encrypted.replace(/\//g, "_");
     _encrypted = _encrypted.replace(/\+/g, "-");


    return _encrypted;
};

const _doDecrypt = (id) => {
    let _key = CryptoJS.SHA256(process.env.SECRET_KEY);
    let _iv = CryptoJS.enc.Base64.parse(" ");

    // replace the _ in the encrypted string with a / to avoid url encoding issues

    id = id.replace(/_/g, "/");
    id = id.replace(/-/g, "+");

    let _decrypted = CryptoJS.AES.decrypt(id, _key, {
            keySize: 32,
            iv: _iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);

    return _decrypted;
};

const encryptPassword = ( password  ) => {
    const originalSalt = randomBytes(16).toString('hex');

    // encrypt password with salt
    const hashedPassword = saltedMd5(password, originalSalt);

    // encypt salt to store in database 
    const salt = _doEncrypt(originalSalt);

    return {
        hashedPassword,
        salt
    }
}

const verifyPassword = async( password, salt, hashedPassword ) => {
    // decrypt salt
    const originalSalt = _doDecrypt(salt);

    // encrypt password with salt
    const hashedPasswordToVerify = saltedMd5(password, originalSalt);

    return hashedPassword === hashedPasswordToVerify;
}

module.exports = {
     _doEncrypt,
     _doDecrypt,
    encryptPassword,
    verifyPassword
};