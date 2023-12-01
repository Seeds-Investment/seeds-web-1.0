import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Section1 from '@/containers/partner/Section1';

const Partner: React.FC = () => {
  return (
    <PageGradient defaultGradient className="absolute overflow-hidden w-full">
      <Section1 />
    </PageGradient>
  );
};

export default Partner;
