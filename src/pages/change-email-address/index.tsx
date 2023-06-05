import ChangeEmail from '@/components/ChangeEmail';

import PageGradient from '@/components/ui/page-gradient/PageGradient';

const customGradient = (
  <>
    <span className="z-0 fixed bottom-10 -left-10 w-60 h-48 bg-[#4FE6AF] blur-[90px] rotate-45" />
    <span className="z-0 fixed bottom-0 left-0 w-24 h-24 bg-[#4FE6AF] blur-[90px]" />
    <span className="z-0 fixed -bottom-28 left-16 w-48 h-32 bg-[#9A76FE] blur-[90px] rotate-45" />
    <span className="z-0 fixed top-64 -right-4 w-60 h-48 bg-[#4FE6AF] blur-[90px] rotate-45 rounded-full" />
    <span className="z-0 fixed bottom-36 right-0 w-32 h-32 bg-[#9A76FE] blur-[90px] rotate-90 rounded-full" />
  </>
);

const ChangeEmailPage: React.FC = () => {
  return (
    <PageGradient customGradient={customGradient} padding="sm:p-6">
      <ChangeEmail />
    </PageGradient>
  );
};

export default ChangeEmailPage;
