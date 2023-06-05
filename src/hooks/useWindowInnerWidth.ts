import { useEffect, useState } from 'react';

const useWindowInnerWidth = (): number => {
  const [width, setWidth] = useState(640);

  useEffect(() => {
    const handleResize = (): void => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
};

export default useWindowInnerWidth;
