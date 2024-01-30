import AuthFacebook2 from '@/assets/auth/AuthFacebook2.png';
import AuthGoogle from '@/assets/auth/AuthGoogle.png';
import DropdownPhone from '@/assets/my-profile/editProfile/DropdownPhone.svg';
import AssociatedAccountButton from '@/components/setting/accountSecurityCenter/AssociatedAccountButton';
import FormModalMail from '@/components/setting/accountSecurityCenter/FormModalMail';
import FormModalNumber from '@/components/setting/accountSecurityCenter/FormModalNumber';
import SecuritySettingForm from '@/components/setting/accountSecurityCenter/SecuritySettingForm';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import countries from '@/constants/countries.json';
import { useAppSelector } from '@/store/redux/store';
import { Button, Card, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface CountryCodeInfo {
  name: string;
  flag: string;
  code: string;
  dialCode: string;
}

const AccountSecurityCenter: React.FC = () => {
  const router = useRouter();
  const { dataUser } = useAppSelector(state => state.user);
  console.log(dataUser);
  const [countryInfo, setCountryInfo] = useState<CountryCodeInfo | undefined>();
  const [country, setCountry] = useState(101);
  const [openMail, setOpenMail] = useState(false);
  const [openNumber, setOpenNumber] = useState(false);
  const getCountry = (phone: string): CountryCodeInfo | undefined =>
    countries.find(code => {
      const dialCode = code?.dialCode.replace('+', '');
      return phone?.replace('+', '').slice(0, dialCode?.length) === dialCode;
    });

  const handleOpenMail = (): void => {
    setOpenMail(!openMail);
  };
  const handleOpenNumber = (): void => {
    setOpenNumber(!openNumber);
  };
  useEffect(() => {
    setCountryInfo(getCountry(dataUser.phoneNumber));
  }, []);
  return (
    <PageGradient
      defaultGradient
      className="w-full flex flex-col justify-center gap-4"
    >
      <FormModalMail
        open={openMail}
        handleOpen={handleOpenMail}
        emailData={dataUser.email}
      />
      <FormModalNumber
        open={openNumber}
        handleOpen={handleOpenNumber}
        phoneData={dataUser.phoneNumber}
        country={country}
        setCountry={setCountry}
      />
      <Card className="flex flex-col justify-center items-center gap-6 w-full shadow-none sm:shadow-md md:shadow-none p-4 md:py-10 md:px-32">
        <Typography className="font-poppins font-semibold text-base text-[#262626] self-start">
          Security Setting
        </Typography>
        <SecuritySettingForm
          onClick={handleOpenMail}
          form={dataUser.email}
          textBlank="add your email"
          label="Email"
          extraChildren={<></>}
        />
        <SecuritySettingForm
          onClick={handleOpenNumber}
          form={dataUser.phoneNumber}
          textBlank="add your phone number"
          label="Phone Number"
          extraChildren={
            <>
              <img
                src={`https://flagcdn.com/${
                  countryInfo?.code.toLowerCase() as string
                }.svg`}
                alt={countryInfo?.name}
                className="h-4 w-7 object-cover"
              />
              <Typography className="text-[#7C7C7C] text-base font-poppins font-normal">
                {countryInfo?.dialCode}
              </Typography>
              <Image src={DropdownPhone} alt="DropdownPhone" />
            </>
          }
        />

        <SecuritySettingForm
          onClick={async () => {
            dataUser.isPasswordExists
              ? await router.push('/auth2/change-password')
              : await router.push('/auth2/create-password');
          }}
          form={
            dataUser.isPasswordExists ? (
              <div className="flex gap-2 pt-2">
                <div className="w-2 h-2 rounded-full bg-[#262626]"></div>
                <div className="w-2 h-2 rounded-full bg-[#262626]"></div>
                <div className="w-2 h-2 rounded-full bg-[#262626]"></div>
                <div className="w-2 h-2 rounded-full bg-[#262626]"></div>
                <div className="w-2 h-2 rounded-full bg-[#262626]"></div>
              </div>
            ) : (
              ''
            )
          }
          textBlank="Create a new password"
          label="Password"
          extraChildren={<></>}
        />
      </Card>
      <Card className="flex flex-col justify-center items-center gap-6 w-full shadow-none sm:shadow-md md:shadow-none p-4 md:py-10 md:px-32">
        <Typography className="font-poppins font-semibold text-base text-[#262626] self-start">
          Associated Account
        </Typography>
        <AssociatedAccountButton
          image={AuthGoogle}
          imageClassName="w-12"
          alternative="Google Account"
          text="Google Account"
        />
        <AssociatedAccountButton
          image={AuthFacebook2}
          imageClassName="w-12"
          alternative="Facebook Account"
          text="Facebook Account"
        />
      </Card>
      <Card className="flex flex-col gap-6 w-full shadow-none sm:shadow-md md:shadow-none p-4 md:py-10 md:px-32">
        <div className="flex flex-col gap-2">
          <Typography className="font-poppins font-semibold text-base text-[#262626]">
            Delete Account
          </Typography>
          <Typography className="font-poppins font-normal text-sm text-[#7C7C7C]">
            Deleting your account will delete all of your information.
          </Typography>
        </div>
        <Button className="w-fit py-2.5 px-5 capitalize font-poppins font-semibold text-sm text-[#DD2525] rounded-full bg-transparent border border-[#DD2525]">
          Delete Account
        </Button>
      </Card>
    </PageGradient>
  );
};

export default AccountSecurityCenter;
