import { useEffect } from 'react';

interface UseCloseProps {
  ref: React.MutableRefObject<HTMLElement | null>;
  fn: () => void;
}

const useClose = ({ ref, fn }: UseCloseProps) => {
  useEffect(() => {
    if (!ref) return;

    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        fn();
      }
    }
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [ref]); // eslint-disable-line
};

export default useClose;
