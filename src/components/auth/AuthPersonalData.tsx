import SeedyAuthLogin from '@/assets/auth/SeedyAuthLogin.png';
import { checkSeedsTag } from '@/repository/auth.repository';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useState } from 'react';
import AuthBoD from './AuthBoD';
import AuthCommonInput from './AuthCommonInput';
import AuthRef from './AuthRef';

interface IAuthPersonalData {
  className: string;
  setFormData: any;
  formData: any;
}

const AuthPersonalData: React.FC<IAuthPersonalData> = ({
  className,
  setFormData,
  formData
}: IAuthPersonalData) => {
  const [open, setOpen] = useState(false);
  const [errorTag, setErrorTag] = useState(false);
  const [blank, setBlank] = useState(false);
  const [blankTag, setBlankTag] = useState(false);
  const [day, setDay] = useState<number>(new Date().getDate());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear() - 17);
  const timezoneOffset = new Date().getTimezoneOffset();
  const utcDate = new Date(year, month, day);
  const handleOpen = (): void => {
    setOpen(!open);
  };
  const handleNext = async (): Promise<void> => {
    try {
      if (formData.name.length === 0 || formData.seedsTag.length === 0) {
        if (formData.name.length === 0) {
          setBlank(true);
        }
        if (formData.seedsTag.length === 0) {
          setErrorTag(true);
          setBlankTag(true);
        }
        throw new Error('something error');
      }
      await checkSeedsTag(formData.seedsTag);
      handleOpen();
    } catch (error: any) {
      console.log(error);
      if (
        error.response?.data?.message === 'requested seeds tag already exists'
      ) {
        setErrorTag(true);
      }
    }
  };

  const handleChange = (e: any): void => {
    setBlank(false);
    const date = new Date(
      utcDate.getTime() - (timezoneOffset - 20) * 60 * 1000
    ).toISOString();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      birthDate: date
    });
  };
  const handleChangeTag = (e: any): void => {
    setErrorTag(false);
    setBlankTag(false);
    const date = new Date(
      utcDate.getTime() - (timezoneOffset - 20) * 60 * 1000
    ).toISOString();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      birthDate: date
    });
  };

  return (
    <div
      className={`${className} flex-col md:w-[78%] w-full items-center md:gap-8 gap-6 md:p-8 p-4`}
    >
      <Image
        src={SeedyAuthLogin}
        alt="SeedyAuthLogin"
        className="w-[141.8px] md:flex hidden"
      />
      <Typography className="w-full font-poppins font-semibold md:text-2xl text-base text-[#050522]">
        <span className="font-poppins font-normal md:text-xl text-sm text-[#7C7C7C]">
          Let’s Input!
        </span>
        <br />
        Your Personal Data
      </Typography>
      <div className="w-full">
        <AuthCommonInput
          handleChange={handleChange}
          name="name"
          formData={formData.name}
          placeholder="Enter your name"
          label="Your Name"
          error={blank}
          required={true}
        />
        <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start">
          {blank ? 'You must fill in this field' : <br />}
        </Typography>
      </div>
      <div className="w-full">
        <AuthCommonInput
          handleChange={handleChangeTag}
          name="seedsTag"
          formData={formData.seedsTag}
          placeholder="Ex: Seeds123"
          label="Seeds Tag"
          error={errorTag}
          required={true}
        />
        <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start">
          {blankTag && errorTag ? (
            'You must fill in this field'
          ) : errorTag ? (
            'Requested Seeds Tag already exists'
          ) : (
            <br />
          )}
        </Typography>
      </div>

      <AuthBoD
        error={false}
        day={day}
        setDay={setDay}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
      />
      <AuthRef
        open={open}
        handleOpen={handleOpen}
        setFormData={setFormData}
        formData={formData}
      />

      <Button
        onClick={handleNext}
        className="flex justify-center font-semibold font-poppins text-base text-white capitalize bg-[#3AC4A0] rounded-full w-full"
      >
        Next
      </Button>
    </div>
  );
};

export default AuthPersonalData;
