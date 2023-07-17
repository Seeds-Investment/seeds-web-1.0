import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Section1 from '@/containers/temporary/Section1';
import Footer from '@/containers/landing/Section6';

export default function Home(): React.ReactElement {
  return (
    <>
      <PageGradient className="absolute overflow-hidden w-full">
        <Section1 />
        <Footer />
      </PageGradient>
    </>
  );
}
