import InputPin from '@/components/InputPin';
import PageGradient from '@/components/ui/page-gradient/PageGradient';

const DeleteAccountPage: React.FC = () => {
  const cancelHandler = (): void => {};

  const continueHandler = (pin: string): void => {
    // API...
  };

  return (
    <PageGradient defaultGradient>
      <InputPin
        onCancel={cancelHandler}
        onContinue={continueHandler}
        withPageGradient
      />
    </PageGradient>
  );
};

export default DeleteAccountPage;
