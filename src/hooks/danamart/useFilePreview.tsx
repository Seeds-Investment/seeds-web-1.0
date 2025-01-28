import { useEffect, useState } from "react";

const useFilePreview = (file?: FileList): [string | undefined] => {
  const [imgSrc, setImgSrc] = useState<string>();

  useEffect(() => {
    if ((file?.[0]) != null) {
      const newUrl = URL.createObjectURL(file[0]);

      if (newUrl !== imgSrc) {
        setImgSrc(newUrl);
      }
    }
  }, [file, imgSrc]);

  return [imgSrc];
}

export default useFilePreview;
