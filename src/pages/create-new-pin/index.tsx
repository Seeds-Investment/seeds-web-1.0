import { useContext } from 'react';

import InputPin from '@/components/InputPin';
import PageGradient from '@/components/ui/page-gradient/PageGradient';

import LanguageContext from '@/store/language/language-context';

const CreateNewPinPage: React.FC = () => {
  const languageCtx = useContext(LanguageContext);

  const cancelHandler = (): void => {};

  const continueHandler = (pin: string): void => {
    // API...
  };

  return (
    <PageGradient
      defaultGradient
      className="z-0 sm:relative absolute overflow-hidden flex flex-col items-center w-full bottom-0"
    >
      <InputPin
        onCancel={cancelHandler}
        onContinue={continueHandler}
        title={
          languageCtx.language === 'EN' ? 'Create New PIN' : 'Buat PIN Baru'
        }
      />
    </PageGradient>
  );
};

export default CreateNewPinPage;
