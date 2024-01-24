import AuthFacebook2 from '@/assets/auth/AuthFacebook2.png';
import AuthGoogle from '@/assets/auth/AuthGoogle.png';
import DropdownPhone from '@/assets/my-profile/editProfile/DropdownPhone.svg';
import ModalEmail from '@/components/profile/editProfile/ModalEmail';
import AssociatedAccountButton from '@/components/setting/AssociatedAccountButton';
import SecuritySettingForm from '@/components/setting/SecuritySettingForm';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import countries from '@/constants/countries.json';
import { getUserInfo } from '@/repository/profile.repository';
import { Button, Card, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface CountryCodeInfo {
  name: string;
  flag: string;
  code: string;
  dialCode: string;
}

const EditProfile: React.FC = () => {
  const [country, setCountry] = useState<CountryCodeInfo | undefined>();
  const [form, setForm] = useState<any>({
    name: '',
    seedsTag: '',
    email: '',
    avatar: '',
    bio: '',
    birthDate: '',
    phone: ''
  });
  const getCountry = (phone: string): CountryCodeInfo | undefined =>
    countries.find(code => {
      const dialCode = code?.dialCode.replace('+', '');
      return phone?.replace('+', '').slice(0, dialCode?.length) === dialCode;
    });

  const [open, setOpen] = useState(false);
  const handleOpen = (): void => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const dataInfo = await getUserInfo();
        setForm({
          name: dataInfo.name,
          seedsTag: dataInfo.seedsTag,
          email: dataInfo.email,
          avatar: dataInfo.avatar,
          bio: dataInfo.bio,
          birthDate: dataInfo.birthDate,
          phone: dataInfo.phoneNumber
        });
        setCountry(getCountry(dataInfo.phoneNumber));
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);
  return (
    <PageGradient
      defaultGradient
      className="w-full flex flex-col justify-center gap-4"
    >
      <Card className="flex flex-col justify-center items-center gap-6 w-full shadow-none sm:shadow-md md:shadow-none p-4 md:py-10 md:px-32">
        <Typography className="font-poppins font-semibold text-base text-[#262626] self-start">
          Security Setting
        </Typography>
        <SecuritySettingForm
          form={form.phone}
          textBlank="add your phone number"
          label="Phone Number"
          extraChildren={
            <>
              <img
                src={`https://flagcdn.com/${
                  country?.code.toLowerCase() as string
                }.svg`}
                alt={country?.name}
                className="h-4 w-7 object-cover"
              />
              <Typography className="text-[#7C7C7C] text-base font-poppins font-normal">
                {country?.dialCode}
              </Typography>
              <Image src={DropdownPhone} alt="DropdownPhone" />
            </>
          }
        />
        <SecuritySettingForm
          form={form.email}
          textBlank="add your email"
          label="Email"
          extraChildren={<></>}
        />
        <SecuritySettingForm
          form={form.email}
          textBlank="Create a new password"
          label="Password"
          extraChildren={<></>}
        />
        <ModalEmail open={open} handleOpen={handleOpen} email={form.email} />
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

export default EditProfile;
