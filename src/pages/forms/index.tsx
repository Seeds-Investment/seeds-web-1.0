import Dev from '@/components/forms-ads/dev.component';
import { Card } from '@material-tailwind/react';
import React from 'react';

const Index = (): React.ReactElement => {

  return (
    <div className="bg-userInfoBackground bg-repeat-x flex justify-center">
      <div className="bg-[#8acdbc]/5 backdrop-blur-sm h-32 w-full absolute top-1/2 -translate-y-1/2" />
      <div className="bg-white/30 backdrop-blur-sm h-20 w-full absolute top-1/2" />
      <Card className="md:w-2/3 w-full bg-white rounded-lg m-2 md:m-8 px-4 py-8">
      <Dev/>
      </Card>
    </div>
  );
};

export default Index;
