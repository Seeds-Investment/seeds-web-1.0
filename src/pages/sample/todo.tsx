import { Input, Typography } from '@material-tailwind/react';
import { useMemo, useState } from 'react';

import SampleLayout from '@/components/layouts/SampleLayout';
import useService from '@/hooks/useService';
import { getTodos } from '@/repository/todo';

const TodoPage = (): JSX.Element => {
  const [number, setNumber] = useState('1');
  const { data, error, loaded } = useService(getTodos, number, 500);

  const stringifiedData = useMemo(() => {
    if (typeof data === 'undefined' || data === null || data === '')
      return '{}';
    return JSON.stringify(data);
  }, [data]);

  const renderData = (): JSX.Element => {
    if (!loaded) return <span>Loading ...</span>;
    if (error !== null && error !== '') return <span>Error</span>;
    return <span>{stringifiedData}</span>;
  };

  return (
    <form className="mt-8 mb-2">
      <div className="mb-4 flex flex-col gap-6">
        <Input
          label="Todo Number"
          size="lg"
          type="number"
          min={1}
          readOnly={!loaded}
          disabled={!loaded}
          value={number}
          onChange={e => {
            setNumber(e.target.value);
          }}
          icon={<span>☁</span>}
        />
      </div>
      <Typography color="gray" className="mt-4 text-center font-normal">
        {renderData()}
      </Typography>
    </form>
  );
};

TodoPage.getLayout = function getLayout(page: JSX.Element) {
  return <SampleLayout>{page}</SampleLayout>;
};

export default TodoPage;
