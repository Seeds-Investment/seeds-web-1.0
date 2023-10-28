import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuth from '@/helpers/withAuth';

const Homepage: React.FC = () => {
  const customGradient = (
    <>
      <span className="-z-10 absolute bottom-10 -left-10 w-60 h-48 bg-seeds-green-2 blur-[90px] rotate-45" />
      <span className="-z-10 absolute bottom-0 left-0 w-24 h-24 bg-seeds-green-2 blur-[90px]" />
      <span className="-z-10 absolute -bottom-28 left-16 w-48 h-32 bg-seeds-purple-2 blur-[90px] rotate-45" />
      <span className="-z-10 absolute top-64 -right-4 w-60 h-48 bg-seeds-green-2 blur-[90px] rotate-45 rounded-full" />
      <span className="-z-10 absolute bottom-36 right-0 w-32 h-32 bg-seeds-purple-2 blur-[90px] rotate-90 rounded-full" />
    </>
  );

  return (
    <PageGradient customGradient={customGradient} className="w-full">
      <h1 className="text-xl text-center font-semibold">Coming Soon....</h1>
    </PageGradient>
  );
};

export default withAuth(Homepage);
