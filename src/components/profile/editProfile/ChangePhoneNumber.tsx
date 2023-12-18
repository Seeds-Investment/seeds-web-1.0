import ChangePhoneNumberEdit from '@/assets/my-profile/editProfile/ChangePhoneNumberEdit.svg';
import DropdownPhone from '@/assets/my-profile/editProfile/DropdownPhone.svg';
import countriesRepository from '@/repository/countries.repository';
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

const ChangePhoneNumber: React.FC<Form> = ({ form, setForm }: Form) => {
  const [country, setCountry] = useState(0);
  const { name, flags } = countriesRepository[country];
  const changeData = (e: any): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex justify-center">
      <Card className="flex items-center w-[947px] h-[721px] py-5">
        <div className="flex flex-col justify-between items-center w-[600px] h-full p-4">
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
                      src={flags.svg}
                      alt={name}
                      className="h-4 w-7 object-cover"
                    />
                    <Image src={DropdownPhone} alt="DropdownPhone" />
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-[20rem] max-w-[18rem]">
                  {countriesRepository
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(({ name, flags, countryCallingCode }, index) => {
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
                            src={flags.svg}
                            alt={name}
                            className="h-5 w-5 object-cover"
                          />
                          {name}{' '}
                          <span className="ml-auto">{countryCallingCode}</span>
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
          <Button className="capitalize w-full rounded-full font-poppins font-semibold text-sm bg-[#3AC4A0]">
            Change
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ChangePhoneNumber;
