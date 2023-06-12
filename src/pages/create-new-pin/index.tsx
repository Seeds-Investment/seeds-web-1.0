import InputPin from '@/components/InputPin';
import PageGradient from '@/components/ui/page-gradient/PageGradient';

const CreateNewPinPage: React.FC = () => {
  const cancelHandler = (): void => {};

  const continueHandler = (pin: string): void => {
    // API...
  };

  return (
    <PageGradient defaultGradient>
      <InputPin
        onCancel={cancelHandler}
        onContinue={continueHandler}
        title="Create New PIN"
      />
    </PageGradient>
  );
};

export default CreateNewPinPage;
