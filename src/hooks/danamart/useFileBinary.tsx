import { useEffect, useState } from 'react';

const useFileBinary = (fileName: string): [Blob | null, boolean, string | null] => {
  const [file, setFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFile = async (): Promise<void> => {
      if (fileName?.length === 0) return;

      setLoading(true);
      setError(null);

      const fileUrl = `https://dev.danamart.id/development/dm-scf-api/writable/uploads/${fileName}`;

      try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch file');
        }
        const blob = await response.blob();
        setFile(blob);
      } catch (error) {
        setError('Error fetching the file');
      } finally {
        setLoading(false);
      }
    };

    void fetchFile();
  }, [fileName]);

  return [file, loading, error];
};

export default useFileBinary;
