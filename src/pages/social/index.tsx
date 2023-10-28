import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Card1 from '@/containers/socialV2/main/Card1';
import Card2 from '@/containers/socialV2/main/Card2';
import { useState } from 'react';

const Social: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('following');

  return (
    <PageGradient defaultGradient className="w-full">
      <Card1 activeTab={activeTab} setActiveTab={setActiveTab} />

      <Card2 />
    </PageGradient>
  );
};

export default Social;
