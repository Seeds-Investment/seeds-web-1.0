import ChangePhoneNumberEdit from '@/assets/my-profile/editProfile/ChangePhoneNumberEdit.svg';
import DropdownPhone from '@/assets/my-profile/editProfile/DropdownPhone.svg';
import countriesRepository from '@/constants/countries.json';
import { getOtp, verifyOtp } from '@/repository/auth.repository';
import { editUserInfo, getUserInfo } from '@/repository/profile.repository';
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
import { useState } from 'react';

interface Form {
  form: any;
  setForm: any;
}

const getOTP = {
  method: 'sms',
  phoneNumber: '6281318099457'
};

const ChangePhoneNumber: React.FC<Form> = ({ form, setForm }: Form) => {
  const [OTP, setOTP] = useState('');
  console.log(OTP);
  const verifyOTP = {
    method: 'sms',
    msisdn: '6281318099457',
    otp: OTP
  };
  const [country, setCountry] = useState(0);
  const { name, code } = countriesRepository[country];
  const changeData = (e: any): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const changeOTP = (e: any): void => {
    setOTP(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      let updatedForm: any = { ...form };

      updatedForm = {
        ...form,
        phone: form.phone
      };
      console.log(updatedForm);
      const edit = await editUserInfo(updatedForm);
      console.log(edit);
      await getOtp(getOTP);

      console.log('a');
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };
  const handleOTP = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const respone = await verifyOtp(verifyOTP);
      const user = await getUserInfo();
      console.log(user);
      console.log(respone);
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };
  return (
    <div className="flex justify-center">
      <Card className="flex items-center w-[947px] h-[721px] py-5">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between items-center w-[600px] h-full p-4"
        >
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
        <form onSubmit={handleOTP}>
          <Input type="text" value={OTP} onChange={changeOTP} />{' '}
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePhoneNumber;
