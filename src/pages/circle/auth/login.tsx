import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { AppleBrand, FacebookBrand, GoogleBrand } from '@/assets/images';
import { ArrowLeft } from '@/assets/vector';
import CButton from '@/components/CButton';
import PhoneInput from '@/components/PhoneInput';
import AuthLayout from '@/components/layouts/AuthLayout';
import FormCard from '@/containers/auth/FormCard';
import { Checkbox, Input, Typography } from '@material-tailwind/react';

interface FormData {
  phoneNumber: string;
  password: string;
}

const LoginPage = (): JSX.Element => {
  const [, setFormData] = useState<FormData>({
    phoneNumber: '',
    password: ''
  });

  const handleChangePhoneNumber = (value: string): void => {
    setFormData((prevFormData: FormData) => {
      return {
        ...prevFormData,
        phoneNumber: value
      };
    });
  };

  const thirdParty = [
    {
      name: 'Apple',
      img: AppleBrand
    },
    {
      name: 'Google',
      img: GoogleBrand
    },
    {
      name: 'Facebook',
      img: FacebookBrand
    }
  ];

  return (
    <div className="flex flex-col min-w-20">
      <div className="z-20 lg:hidden flex">
        <Image src={ArrowLeft} alt="arrow-left" className=" mb-5 " />{' '}
        <p className="font-bold text-white text-2xl mx-auto">Login</p>
      </div>
      <div>
        <FormCard className=" md:shrink-0  lg:w-[35rem] z-20 ">
          <div className="flex flex-col lg:p-8 px-5 lg:px-10 mt-5">
            <p className="font-bold text-xl">Phone Number</p>
            <PhoneInput onChangePhoneNumber={handleChangePhoneNumber} />
            <p className="font-bold text-xl mt-5">Password</p>
            <Input
              className="w-3/5 text-xl"
              type="password"
              variant="standard"
              color="gray"
              icon={''}
            />
            <div className="flex flex-row justify-between gap-5 items-center mt-2">
              <Checkbox
                label={
                  <Typography
                    variant="small"
                    className=" text-black lg:font-small"
                  >
                    Keep me logged in
                  </Typography>
                }
                color="green"
              />
              <Link
                href={''}
                className="mt-2 hover:underline text-sm text-[#3AC4A0] font-bold"
              >
                Forgot Password?
              </Link>
            </div>
            <CButton className="mx-auto w-full rounded-full bg-[#3AC4A0] mt-5">
              Login
            </CButton>
            <small className="mx-auto mt-5 text-opacity-50">Or</small>
            <div className="flex lg:flex-row flex-col gap-2 lg:justify-evenly mb-5 lg:mt-4">
              {thirdParty.map((el, i) => {
                return (
                  <CButton
                    key={i}
                    className="bg-white rounded-full flex items-center"
                  >
                    <Image src={el.img} alt="third-party" />
                    <Typography
                      variant="small"
                      className="text-black mx-auto lg:hidden font-bold flex justify-center items-center"
                    >
                      Login with {el.name}
                    </Typography>
                  </CButton>
                );
              })}
            </div>
          </div>
        </FormCard>
      </div>
    </div>
  );
};

LoginPage.getLayout = function getLayout(page: JSX.Element) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default LoginPage;
