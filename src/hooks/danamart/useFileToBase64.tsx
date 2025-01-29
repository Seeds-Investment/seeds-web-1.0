import { useCallback } from "react";

const useFileToBase64 = (): { convertFileToBase64: (file: File) => Promise<string> } => {
  const convertFileToBase64 = useCallback(async (file: File): Promise<string> => {
    return await new Promise((resolve, reject) => {
      if (!(file instanceof Blob)) {
        reject(new Error("Input is not a valid Blob or File"));
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => { resolve(reader.result as string); };
      reader.onerror = (error) => { reject(error); };
    });
  }, []);

  return { convertFileToBase64 };
};

export default useFileToBase64;
