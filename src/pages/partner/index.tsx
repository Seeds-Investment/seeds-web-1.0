import Footer from '@/components/layouts/Footer';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Section1 from '@/containers/partner/Section1';
import Section2 from '@/containers/partner/Section2';
import Section3 from '@/containers/partner/Section3';
import Section4 from '@/containers/partner/Section4';
import Section5 from '@/containers/partner/Section5';
import Section6 from '@/containers/partner/Section6';

const Partner: React.FC = () => {
  return (
    <PageGradient defaultGradient className="absolute overflow-hidden w-full">
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Footer />
    </PageGradient>
  );
};

export default Partner;
