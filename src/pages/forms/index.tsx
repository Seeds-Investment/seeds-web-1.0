import Dev from '@/components/forms-ads/dev.component';
import React from 'react';

const Index = (): React.ReactElement => {
  return (
    <div className="bg-userInfoBackground bg-repeat-x flex justify-center">
      <div className="bg-[#8acdbc]/5 backdrop-blur-sm h-32 w-full absolute top-1/2 -translate-y-1/2" />
      <div className="bg-white/30 backdrop-blur-sm h-20 w-full absolute top-1/2" />
      <Dev />
    </div>
  );
};

export default Index;
