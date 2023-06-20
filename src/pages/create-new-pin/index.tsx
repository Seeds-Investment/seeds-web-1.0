import { withRouter, type NextRouter } from 'next/router';
import { useContext } from 'react';

import InputPin from '@/components/InputPin';
import PageGradient from '@/components/ui/page-gradient/PageGradient';

import LanguageContext from '@/store/language/language-context';

interface CreateNewPinProps {
  router: NextRouter;
}

const CreateNewPinPage: React.FC<CreateNewPinProps> = ({ router }) => {
  const languageCtx = useContext(LanguageContext);

  const cancelHandler = (): void => {
    router.back();
  };

  return (
    <PageGradient
      defaultGradient
      className="z-0 sm:relative absolute overflow-hidden flex flex-col items-center w-full bottom-0"
    >
      <InputPin
        onCancel={cancelHandler}
        action={router.query.action as string}
        title={
          languageCtx.language === 'EN' ? 'Create New PIN' : 'Buat PIN Baru'
        }
      />
    </PageGradient>
  );
};

export default withRouter(CreateNewPinPage);
