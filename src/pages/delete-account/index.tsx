import InputPin from '@/components/InputPin';
import PageGradient from '@/components/ui/page-gradient/PageGradient';

const DeleteAccountPage: React.FC = () => {
  const cancelHandler = (): void => {};

  const continueHandler = (pin: string): void => {
    // API...
  };

  return (
    <PageGradient
      defaultGradient
      className="z-0 sm:relative absolute overflow-hidden flex flex-col items-center w-full bottom-0"
    >
      <InputPin onCancel={cancelHandler} onContinue={continueHandler} />
    </PageGradient>
  );
};

export default DeleteAccountPage;
