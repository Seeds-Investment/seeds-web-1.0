import type { IRegisterPaging } from '@/pages/circle/auth/register';
import { Button, Input, Typography } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';

const ReferralCodePage = ({
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
          {t('registerPage.title')}
        </Typography>
        <Typography variant="small" color="black">
          Please enter the name and Seeds Tag that will be used on your account
        </Typography>
      </div>
      <div className="mt-10">
        <Typography variant="h5" color="black">
          Name
        </Typography>
        <Input
          className="text-lg"
          type="text"
          size="md"
          variant="standard"
          color="gray"
          placeholder="Your Name"
          onChange={e => {
            console.log(e.target.value);
          }}
        />
      </div>
      <div className="mt-5">
        <Typography variant="h5" color="black">
          Seeds Tag
        </Typography>
        <Input
          className="text-lg"
          type="text"
          size="md"
          variant="standard"
          color="gray"
          placeholder="@seedstag"
          onChange={e => {
            console.log(e.target.value);
          }}
        />
      </div>
      <div className="mt-5">
        <Typography variant="h5" color="black">
          Referral Code
        </Typography>
        <Input
          className="text-lg"
          type="text"
          size="md"
          variant="standard"
          color="gray"
          placeholder="Referral Code"
          onChange={e => {
            console.log(e.target.value);
          }}
        />
      </div>
      <div className="mt-8">
        <Button
          fullWidth
          className="border bg-[#3AC4A0] rounded-full border-[#3AC4A0]"
          onClick={() => {
            setPage(2);
          }}
        >
          {t('registerPage.nextButton')}
        </Button>
      </div>
    </>
  );
};

export default ReferralCodePage;
