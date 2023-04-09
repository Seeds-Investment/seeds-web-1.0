import type { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

import useDebounce from '@/hooks/useDebaunce';

// reference: https://blog.openreplay.com/integrating-axios-with-react-hooks/

const useAxios = (
  callback: (payload: any) => Promise<any>,
  payload: any,
  debounceTimeout: number = 0
): { data: any; error: string; loaded: boolean } => {
  // states
  const [data, setData] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);
  // debouncer
  const debouncerPayload = useDebounce(payload, debounceTimeout);

  useEffect(() => {
    setLoaded(false);
    setError('');
    setData(null);

    callback(debouncerPayload)
      .then((res: AxiosResponse) => {
        setData(res);
      })
      .catch((error: AxiosError) => {
        setError(error.message);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [debouncerPayload, callback]);

  return { data, error, loaded };
};

export default useAxios;
