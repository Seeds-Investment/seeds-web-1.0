/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import CryptoJS from 'crypto-js';

export const encryptRequest = (data: any): string | null => {
  const secretKey = "08Dana5714M81adMart79salji90";

  const CryptoJSAesJson = {
    stringify: function (cipherParams: CryptoJS.lib.CipherParams): string {
      const j: any = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
      if (cipherParams.iv) j.iv = cipherParams.iv.toString();
      if (cipherParams.salt) j.s = cipherParams.salt.toString();
      return JSON.stringify(j);
    },
    parse: function (jsonStr: string): CryptoJS.lib.CipherParams {
      const j = JSON.parse(jsonStr);
      const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(j.ct),
      });
      if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
      if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
      return cipherParams;
    },
  };

  if (!data) {
    return null;
  }

  // Convert data to string
  const jsonData = JSON.stringify(data);

  // Encrypt the data using the secret key
  const encrypted = CryptoJS.AES.encrypt(jsonData, secretKey, {
    format: CryptoJSAesJson,
  }).toString();

  // Encode the encrypted data to base64
  return btoa(encrypted);
};
