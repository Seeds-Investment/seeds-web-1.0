import type { IRegisterPaging } from '@/pages/circle/auth/register';
import { Button, Typography } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';

const SuccessRegisterPage = ({
  page,
  setPage,
  formdata,
  setFormdata
}: IRegisterPaging): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <Typography variant="h3" color="black">
          Success
        </Typography>
        <Typography variant="small" color="black">
          Congratulations, your account has been success fully created
        </Typography>
      </div>
      <div className="mt-8">
        <Button
          fullWidth
          className="border bg-[#3AC4A0] rounded-full border-[#3AC4A0]"
        >
          {t('registerPage.nextButton')}
        </Button>
      </div>
    </>
  );
};

export default SuccessRegisterPage;
