import { Card, Input, Typography } from '@material-tailwind/react';

import useLocalStorage from '@/hooks/useLocalStorage';

const StoragePage = (): JSX.Element => {
  const [data, setData] = useLocalStorage('accessToken', '');

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <Card className="w-96 p-4 text-center" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Local Storage
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter anything
        </Typography>
        <form className="mt-8 mb-2">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              label="Value"
              size="lg"
              value={data}
              onChange={e => setData(e.target.value)}
              icon={<i className="mdi mdi-cube" />}
            />
          </div>
          <Typography color="gray" className="mt-4 text-center font-normal">
            {data}
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default StoragePage;
