import CInputPassword from '@/components/CInputPassword';
import type { IRegisterPaging } from '@/pages/circle/auth/register';
import { Button, Typography } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';

const CreatePasswordPage = ({
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
          Create Your Password
        </Typography>
        <Typography variant="small" color="black">
          Please create a secure password that include the following criteria
          below
        </Typography>
      </div>
      <div className="mt-10">
        <Typography variant="h5" color="black">
          Enter Password
        </Typography>
        <CInputPassword
          onChange={v => {
            console.log(v);
          }}
          className="text-lg"
          placeholder="Please enter your password"
        />
      </div>
      <div className="mt-5">
        <Typography variant="h5" color="black">
          Confirm Password
        </Typography>
        <CInputPassword
          onChange={v => {
            console.log(v);
          }}
          className="text-lg"
          placeholder="Please enter your password"
        />
      </div>
      <div className="mt-5">
        <Typography variant="h5" color="black">
          Password Must Contain:
        </Typography>
      </div>
      <div className="mt-8">
        <Button
          fullWidth
          className="border bg-[#3AC4A0] rounded-full border-[#3AC4A0]"
          onClick={() => {
            setPage(4);
          }}
        >
          {t('registerPage.nextButton')}
        </Button>
      </div>
    </>
  );
};

export default CreatePasswordPage;
