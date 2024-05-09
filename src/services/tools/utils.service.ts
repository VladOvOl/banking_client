import * as CryptoJS from 'crypto-js';

export const utilsService = {

    decrypt(data:string,key:string){
        if(data.length !== 0){
            const decryptedMessage: string = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
            return decryptedMessage
        }
        return "Error Utils"

    }
}