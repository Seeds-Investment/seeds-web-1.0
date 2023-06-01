import type { IRegisterPaging } from '@/pages/circle/auth/register';
import { Button, Typography } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';

const ValidateOTPPage = ({
  page,
  setPage,
  formdata,
  setFormdata
}: IRegisterPaging): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <div className="mt-5">
        <Typography variant="h5" color="black">
          Enter OTP Code
        </Typography>
      </div>
      <div className="mt-8">
        <Button
          fullWidth
          className="border bg-[#3AC4A0] rounded-full border-[#3AC4A0]"
          onClick={() => {
            setPage(3);
          }}
        >
          {t('registerPage.nextButton')}
        </Button>
      </div>
    </>
  );
};

export default ValidateOTPPage;
