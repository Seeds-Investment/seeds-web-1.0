import Image from 'next/image';
import { ArrowBackwardIcon } from 'public/assets/vector';

import ChangeTelephone from '@/components/ChangeTelephone';
import PageGradient from '@/components/ui/page-gradient/PageGradient';

const customGradient = (
  <>
    <span className="z-0 fixed bottom-10 -left-10 w-60 h-48 bg-seeds-green blur-[90px] rotate-45" />
    <span className="z-0 fixed bottom-0 left-0 w-24 h-24 bg-seeds-green blur-[90px]" />
    <span className="z-0 fixed -bottom-28 left-16 w-48 h-32 bg-seeds-purple-2 blur-[90px] rotate-45" />
    <span className="z-0 fixed top-64 -right-4 w-60 h-48 bg-seeds-green blur-[90px] rotate-45 rounded-full" />
    <span className="z-0 fixed bottom-36 right-0 w-32 h-32 bg-seeds-purple-2 blur-[90px] rotate-90 rounded-full" />
  </>
);

const ChangeTelephonePage: React.FC = () => {
  const cancelHandler = (): void => {};

  return (
    <PageGradient
      customGradient={customGradient}
      className="z-0 relative overflow-hidden flex flex-col items-center"
    >
      <button
        onClick={cancelHandler}
        className="sm:hidden mr-auto ml-6 mb-2 pr-4 rounded-md hover:bg-gray-200 active:bg-gray-300 focus:outline-0 focus:bg-gray-200 transition-colors duration-300"
      >
        <Image src={ArrowBackwardIcon} alt="arrow-backward-icon" />
      </button>
      <ChangeTelephone />
    </PageGradient>
  );
};

export default ChangeTelephonePage;
