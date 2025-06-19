import { useCallback } from 'react';

interface UseBase64ToFile {
  base64ToFile: (base64String: string, filename: string) => File;
}

export const useBase64ToFile = (): UseBase64ToFile => {
  const base64ToFile = useCallback(
    (base64String: string, filename: string): File => {
      const arr = base64String.split(',');
      const mimeMatch = arr[0].match(/:(.*?);/);
      const mime = mimeMatch !== null ? mimeMatch[1] : 'image/jpeg';

      const bstr = atob(arr[1]);
      const length = bstr.length;
      const u8arr = new Uint8Array(length);

      for (let i = 0; i < length; i++) {
        u8arr[i] = bstr.charCodeAt(i);
      }

      return new File([u8arr], filename, { type: mime });
    },
    []
  );

  return { base64ToFile };
};
