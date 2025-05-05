/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';

export const decryptResponse = (token: string): string | null => {
  const secretKey = '08Dana5714M81adMart79salji90';

  const CryptoJSAesJson = {
    stringify: function (cipherParams: CryptoJS.lib.CipherParams): string {
      const j: any = {
        ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
      };
      if (cipherParams.iv) j.iv = cipherParams.iv.toString();
      if (cipherParams.salt) j.s = cipherParams.salt.toString();
      return JSON.stringify(j);
    },
    parse: function (jsonStr: string): CryptoJS.lib.CipherParams {
      const j = JSON.parse(jsonStr);
      const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(j.ct)
      });
      if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
      if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
      return cipherParams;
    }
  };

  if (token === null) {
    toast.error('Token is missing!');
    return null;
  }

  // Decode base64 encoded encrypted data
  const decodedEncryptedData = atob(token);

  // Decrypt the data using the secret key
  const decrypted = CryptoJS.AES.decrypt(decodedEncryptedData, secretKey, {
    format: CryptoJSAesJson
  }).toString(CryptoJS.enc.Utf8);

  // Return the decrypted response as JSON
  try {
    return typeof decrypted === 'string' ? JSON.parse(decrypted) : decrypted;
  } catch {
    return null;
  }
};
