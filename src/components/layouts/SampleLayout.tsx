import { Card, Typography } from '@material-tailwind/react';

export interface ISampleLayout {
  children: React.ReactNode;
}

const SampleLayout = ({ children }: ISampleLayout): React.ReactElement => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <Card className="w-96 p-4 text-center" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Local Storage
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter anything
        </Typography>
        <div>{children}</div>
      </Card>
    </div>
  );
};

export default SampleLayout;
