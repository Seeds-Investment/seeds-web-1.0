import PhoneInput from '@/components/PhoneInput';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Button, Input, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AuthIndex = (): JSX.Element => {
  const { t } = useTranslation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCode, setSelectedCode] = useState('+62');

  return (
    <div className="px-8 mt-4">
      <div>
        <Typography variant="h3" color="black">
          {t('registerPage.title')}
        </Typography>
        <Typography variant="small" color="black">
          {t('registerPage.description')}
        </Typography>
      </div>
      <div className="mt-10">
        <Typography variant="h5" color="black">
          {t('input.phone')}
        </Typography>
        <PhoneInput
          selectedCode={selectedCode}
          setSelectedCode={setSelectedCode}
          onChangePhoneNumber={(e: any) => {
            setPhoneNumber(e);
          }}
          phoneValue={phoneNumber}
          error={false}
        />
      </div>
      <div className="mt-5">
        <Typography variant="h5" color="black">
          {t('input.email')}
        </Typography>
        <Input
          className="text-lg"
          type="email"
          size="md"
          variant="standard"
          color="gray"
          placeholder="example@mail.com"
          onChange={e => {
            console.log(e.target.value);
          }}
        />
      </div>
      <div className="mt-5">
        <Typography variant="h5" color="black">
          {t('input.birthDate')}
        </Typography>
        <Input
          className="text-lg"
          type="date"
          size="md"
          variant="standard"
          color="gray"
          placeholder="DD/MM/YYYY"
          onChange={e => {
            console.log(e.target.value);
          }}
        />
      </div>
      <div className="mt-8">
        <Button
          fullWidth
          className="border bg-[#3AC4A0] rounded-full border-[#3AC4A0]"
        >
          {t('registerPage.nextButton')}
        </Button>
      </div>
    </div>
  );
};

AuthIndex.getLayout = function getLayout(page: JSX.Element) {
  return <AuthLayout titleKey="registerPage.title">{page}</AuthLayout>;
};

export default AuthIndex;
