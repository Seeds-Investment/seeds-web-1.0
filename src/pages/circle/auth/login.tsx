import Hello from '@/assets/images/Hello.png';
import Apple from '@/assets/images/apple.png';
import Facebook from '@/assets/images/facebook.png';
import Google from '@/assets/images/google.png';
import ArrowLeft from '@/assets/vector/arrow-left.svg';
import Line from '@/assets/vector/line.png';
import CButton from '@/components/CButton';
import CCard from '@/components/CCard';
import FormCard from '@/containers/auth/FormCard';
import PhoneInput from '@/containers/auth/PhoneInput';
import { Checkbox, Input, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface FormData {
  phoneNumber: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    phoneNumber: '',
    password: ''
  });

  const [phoneCountry, setPhoneCountry] = React.useState<string>(
    '/assets/images/indo.png'
  );
  const [phoneCode, setPhoneCode] = React.useState<string>('+62');
  const [displayPhoneCountry, setDisplayPhoneCountry] =
    React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData: FormData) => {
      return {
        ...prevFormData,
        [name]: value
      };
    });
  };

  const changePhoneNumber = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const value: string = e.currentTarget.getAttribute('data-value') ?? '';
    const img: string = e.currentTarget.getAttribute('data-img') ?? '';
    setPhoneCode(value);
    setPhoneCountry(img);
    setDisplayPhoneCountry((prev: boolean) => !prev);
  };

  const thirdParty = [
    {
      name: 'Apple',
      img: Apple
    },
    {
      name: 'Google',
      img: Google
    },
    {
      name: 'Facebook',
      img: Facebook
    }
  ];

  return (
    <>
      <div className="relative">
        <div className="bg-gradient-to-bl from-[#7856E1] absolute top-0 left-0 z-10 to-[#44FFBB] h-screen w-full lg:w-1/2 lg:flex justify-center items-center bg-gray-500">
          <Image
            src={Line}
            alt="line"
            className="absolute bottom-0 ml-10 md:shrink-0 hidden lg:flex"
          />
        </div>
        <div className="absolute top-0 left-0 z-0 h-full w-full">
          <div className="flex justify-center lg:justify-around">
            <div className="bg-[#7856E1] rounded-full h-72 w-72 blur-2xl hidden lg:flex"></div>
            <div className="bg-[#44FFBB] rounded-full h-72 w-72 blur-3xl object-cover"></div>
          </div>

          <div className="flex justify-between items-end">
            <div className="bg-[#7856E1] rounded-full h- w-48 rounded-r-none blur-xl hidden lg:flex"></div>
            <div className="bg-[#44FFBB] rounded-full h-80 w-48 lg:ml-40 rounded-l-none blur-3xl"></div>
            <div className="bg-[#7856E1] rounded-full h-80 w-48 rounded-r-none blur-3xl"></div>
          </div>
        </div>
        <div className="flex justify-evenly lg:justify-around gap-8 items-center h-screen">
          <CCard className=" w-[26rem] ml-10 hidden lg:block z-20 border-x-white-500 h-[40rem]  border-2 border-x-transparent p-4  bg-blue-100 rounded-md backdrop-filter backdrop-blur-2xl bg-opacity-20 rounded-[60px]">
            <div className="flex py-5  flex-col justify-center items-center">
              <p className="text-4xl font-bold text-white mt-20 mr-5">
                Welcome to Seeds
              </p>
              <p className="mt-5 mx-5 text-xl text-white">
                Start and expand your investment journey with friends!
              </p>
            </div>
            <Image
              src={Hello}
              className="object-cover absolute  bottom-0 right-0"
              alt="hello"
              height={480}
            />
          </CCard>
          <div className="flex flex-col min-w-20">
            <div className="z-20 lg:hidden flex">
              <Image src={ArrowLeft} alt="arrow-left" className=" mb-5 " />{' '}
              <p className="font-bold text-white text-2xl mx-auto">Login</p>
            </div>
            <div>
              <FormCard className=" md:shrink-0  lg:w-[35rem] z-20 ">
                <div className="flex flex-col lg:p-8 px-5 lg:px-10 mt-5">
                  <p className="font-bold text-xl">Phone Number</p>
                  <PhoneInput
                    handleChange={handleChange}
                    formData={formData}
                    displayPhoneCountry={displayPhoneCountry}
                    setDisplayPhoneCountry={setDisplayPhoneCountry}
                    changePhoneNumber={changePhoneNumber}
                    phoneCountry={phoneCountry}
                    setPhoneCountry={setPhoneCountry}
                    phoneCode={phoneCode}
                  />
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
        </div>
      </div>
    </>
  );
};

export default Login;
