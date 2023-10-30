import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuth from '@/helpers/withAuth';

const Homepage: React.FC = () => {
  return (
    <PageGradient defaultGradient className="w-full">
      <h1 className="text-xl text-center font-semibold">Coming Soon....</h1>
    </PageGradient>
  );
};

export default withAuth(Homepage);
