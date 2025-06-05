import { useCallback, useState } from 'react';

const useBase64ToFileList = (): [
  FileList | null,
  (base64String: string, fileName?: string) => void
] => {
  const [fileList, setFileList] = useState<FileList | null>(null);

  const base64ToFileList = useCallback(
    (base64String: string, fileName: string = 'image.png') => {
      // Check if the base64 string has a valid format
      const base64Regex = /^data:image\/[a-zA-Z]*;base64,/;
      if (!base64Regex.test(base64String)) {
        return;
      }

      try {
        // Remove "data:image/...;base64," prefix and decode
        const byteString = atob(base64String.split(',')[1]);
        const mimeType =
          base64String.match(/data:(.*?);base64/)?.[1] ?? 'image/png';

        // Create an array of 8-bit unsigned integers
        const byteArray = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          byteArray[i] = byteString.charCodeAt(i);
        }

        // Create a File from the binary data
        const file = new File([byteArray], fileName, { type: mimeType });

        // Create a FileList using a DataTransfer object
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        // Update state with the FileList
        setFileList(dataTransfer.files);
      } catch (error) {
        console.error('Error decoding base64 string:', error);
      }
    },
    []
  );

  return [fileList, base64ToFileList];
};

export default useBase64ToFileList;
