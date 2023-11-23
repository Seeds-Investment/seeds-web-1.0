import CCard from '@/components/CCard';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Section1 from '@/containers/homepage/Section1';
import Section2 from '@/containers/homepage/Section2';
import Section3 from '@/containers/homepage/Section3';
import Section4 from '@/containers/homepage/Section4';
import Section5 from '@/containers/homepage/Section5';
import TrendingSection from '@/containers/homepage/TrendingSection';
import withAuth from '@/helpers/withAuth';

const Homepage: React.FC = () => {
  return (
    <PageGradient defaultGradient className="w-full">
      <CCard className="p-3 mb-5">
        <Section1 />
      </CCard>
      <CCard className="p-3 mb-5">
        <Section2 />
      </CCard>
      <CCard className="px-3 py-5 mb-5">
        <Section3 />
      </CCard>
      <CCard className="p-3 mb-5">
        <Section4 />
      </CCard>
      <CCard className="p-3 mb-5">
        <TrendingSection />
      </CCard>
      <CCard className="p-3 mb-5">
        <Section5 />
      </CCard>
    </PageGradient>
  );
};

export default withAuth(Homepage);
