import ChangePhoneNumberEdit from '@/assets/my-profile/editProfile/ChangePhoneNumberEdit.svg';
import DropdownPhone from '@/assets/my-profile/editProfile/DropdownPhone.svg';
import countriesRepository from '@/constants/countries.json';
import {
  checkPhoneNumber,
  editVerifyOtp,
  getOtp
} from '@/repository/auth.repository';
import { editUserInfo } from '@/repository/profile.repository';
import {
  Button,
  Card,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import otpSms from 'public/assets/otpSms.png';
import otpWhatsapp from 'public/assets/otpWhatsapp.png';
import { ArrowBackwardIcon } from 'public/assets/vector';
import { useEffect, useRef, useState } from 'react';
interface Form {
  form: any;
  setForm: any;
  select: any;
  setSelect: any;
}

const ChangePhoneNumber: React.FC<Form> = ({
  form,
  setForm,
  select,
  setSelect
}: Form) => {
  const router = useRouter();
  // TODO: Number Page System

  const [number, setNumber] = useState('');
  const [country, setCountry] = useState(0);
  const { name, code } = countriesRepository[country];

  const changeData = (e: any): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setNumber(e.target.value);
  };
  const handleSubmitNumber = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      let updatedForm: any = { ...form };
      updatedForm = {
        ...form,
        phone: form.phone
      };
      await checkPhoneNumber(form.phone);
      await editUserInfo(updatedForm);
      await getOtp(getOTP);
      setSelect(2);
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  // TODO: OTP System
  const [input, setInput] = useState(['', '', '', '']);
  const [method, setMethod] = useState('whatsapp');
  const [seconds, setSeconds] = useState(10);
  const inputRefs = useRef<any[]>([]);
  const OTP = input.join('');
  const verifyOTP = {
    method,
    msisdn: number,
    otp: OTP
  };
  const getOTP = {
    method,
    phoneNumber: number
  };

  const handleChangeOTP = (index: number, value: string): void => {
    const newInput = [...input];
    newInput[index] = value;
    setInput(newInput);

    if (newInput[index] !== '') {
      inputRefs.current[index + 1]?.focus();
    } else if (newInput[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmitOTP = async (event: any): Promise<void> => {
    event.preventDefault();
    try {
      await editVerifyOtp(verifyOTP);
      await router.push('/my-profile/edit-profile');
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        await getOtp(getOTP);
      } catch (error) {
        console.error('Error fetching OTP:', error);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, [method]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <>
      <div className={`${select === 1 ? 'flex' : 'hidden'} justify-center`}>
        <Card className="flex items-center w-[947px] h-[721px] py-5">
          <form
            onSubmit={handleSubmitNumber}
            className="flex flex-col justify-between items-center w-[600px] h-full p-4"
          >
            <Link
              href="/my-profile/edit-profile"
              className="absolute left-8 cursor-pointer"
            >
              <Image src={ArrowBackwardIcon} alt="arrow-backward-icon" />
            </Link>
            <div className="flex flex-col items-center gap-8 w-full">
              <Typography className="font-poppins font-semibold text-[#262626] text-base text-center">
                Change Phone Number
                <br />
                <span className="font-poppins font-normal text-sm text-[#7C7C7C] text-center">
                  Please enter the new phone number you will use on Seeds.
                </span>
              </Typography>
              <Image src={ChangePhoneNumberEdit} alt="ChangePhoneNumberEdit" />
              <div className="relative flex w-full">
                <Menu placement="top-start">
                  <MenuHandler>
                    <Button
                      ripple={false}
                      variant="text"
                      className="absolute z-10 flex p-0 gap-[19px] items-center pr-[18px] pb-[7px] pt-4 rounded-none hover:bg-transparent"
                    >
                      <img
                        src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
                        alt={name}
                        className="h-4 w-7 object-cover"
                      />
                      <Image src={DropdownPhone} alt="DropdownPhone" />
                    </Button>
                  </MenuHandler>
                  <MenuList className="max-h-[20rem] max-w-[18rem]">
                    {countriesRepository
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map(({ name, code, dialCode }, index) => {
                        return (
                          <MenuItem
                            key={name}
                            value={name}
                            className="flex items-center gap-2"
                            onClick={() => {
                              setCountry(index);
                            }}
                          >
                            <img
                              src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
                              alt={name}
                              className="h-5 w-5 object-cover"
                            />
                            {name} <span className="ml-auto">{code}</span>
                          </MenuItem>
                        );
                      })}
                  </MenuList>
                </Menu>
                <Input
                  label="Your New Phone Number"
                  name="phone"
                  type="number"
                  value={form?.phone}
                  onChange={changeData}
                  variant="static"
                  labelProps={{
                    className:
                      'text-base text-[#262626] font-semibold font-poppins'
                  }}
                  className="text-[#7C7C7C] text-base font-poppins font-normal [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pl-[72px]"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="capitalize w-full rounded-full font-poppins font-semibold text-sm bg-[#3AC4A0]"
            >
              Change
            </Button>
          </form>
        </Card>
      </div>
      <div className={`${select === 2 ? 'flex' : 'hidden'} justify-center`}>
        <Card className="flex items-center w-[947px] h-fit py-5">
          <form
            onSubmit={handleSubmitOTP}
            className="flex flex-col justify-between items-center w-[600px] h-full p-4"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col gap-2">
                <Typography className="font-poppins font-semibold text-2xl text-[#262626] text-center">
                  Verification Code
                </Typography>
                <Typography className="font-poppins font-light text-sm text-[#262626] text-center">
                  Enter the OTP code we sent to your WhatsApp.
                </Typography>
              </div>
              <Image
                src={method === 'whatsapp' ? otpWhatsapp : otpSms}
                alt="methodOTP"
              />
              <div className="flex flex-col gap-[60px]">
                <div className="flex flex-col gap-8">
                  <Typography className="font-poppins font-semibold text-base text-[#262626] text-center">
                    OTP Code
                  </Typography>
                  <div className="flex gap-8">
                    {input.map((value, index) => (
                      <input
                        type="number"
                        key={index}
                        ref={el => (inputRefs.current[index] = el)}
                        value={value}
                        maxLength={1}
                        onChange={e => {
                          handleChangeOTP(index, e.target.value);
                        }}
                        className="focus:outline-none border-b border-[#CCCCCC] w-1/4 text-center text-[#262626] text-base font-semibold font-poppins pb-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <Typography>{`${seconds} second${
                      seconds >= 1 ? 's' : ''
                    }`}</Typography>
                    <Button
                      onClick={async () => {
                        await getOtp(getOTP);
                        setSeconds(10);
                      }}
                      disabled={seconds > 0}
                      className="capitalize bg-transparent shadow-none hover:shadow-none p-0 text-sm text-[#3AC4A0] font-normal font-poppins"
                    >
                      Resend OTP
                    </Button>
                  </div>
                </div>
                <Button
                  className="capitalize bg-transparent shadow-none hover:shadow-none p-0 text-sm text-[#3AC4A0] font-normal font-poppins"
                  onClick={() => {
                    setMethod(prev =>
                      prev === 'whatsapp' ? 'sms' : 'whatsapp'
                    );
                    setSeconds(10);
                  }}
                  disabled={seconds > 0}
                >
                  Another way? Send via
                  {`${method === 'whatsapp' ? ' SMS' : ' Whatsapp'}`}
                </Button>
                <Button
                  className="w-full rounded-full bg-[#3AC4A0]"
                  type="submit"
                >
                  Continue
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangePhoneNumber;
