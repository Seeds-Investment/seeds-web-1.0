import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Section1 from '@/containers/partner/Section1';
import Section2 from '@/containers/partner/Section2';

const Partner: React.FC = () => {
  return (
    <PageGradient defaultGradient className="absolute overflow-hidden w-full">
      <Section1 />
      <Section2 />
    </PageGradient>
  );
};

export default Partner;
