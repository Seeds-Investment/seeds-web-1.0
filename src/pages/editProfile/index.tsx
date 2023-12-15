import BirthDateCalender from '@/components/profile/editProfile/BirthDateCalender';
import countriesRepository from '@/repository/countries.repository';
import { getUserInfo } from '@/repository/profile.repository';
import {
  Avatar,
  Button,
  Card,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';

const EditProfile: React.FC = () => {
  const maxLengthBio = 50;
  const [country, setCountry] = useState(0);
  const [form, setForm] = useState<any>({
    name: '',
    seedsTag: '',
    email: '',
    avatar: '',
    bio: '',
    birthDate: '',
    phone: ''
  });
  const { name, flags, countryCallingCode } = countriesRepository[country];
  const changeData = (e: any): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const dataInfo = await getUserInfo();
        console.log(dataInfo);
        setForm({
          name: dataInfo.name,
          seedsTag: dataInfo.seedsTag,
          email: dataInfo.email,
          avatar: dataInfo.avatar,
          bio: dataInfo.bio,
          birthDate: dataInfo.birthDate,
          phone: dataInfo.phoneNumber
        });
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);
  return (
    <Card className="flex flex-col justify-center items-center gap-4 w-[600px]">
      <div className="flex flex-col justify-center items-center">
        <Avatar className="bg-black" />
        <Input
          type="file"
          className="text-[#3AC4A0] text-xs font-semibold font-poppins border-b border-[#3AC4A0]"
        />
      </div>
      <Input
        label="Name"
        name="name"
        value={form?.name}
        onChange={changeData}
        variant="static"
        labelProps={{
          className: 'text-base text-[#262626] font-semibold font-poppins'
        }}
        className="text-[#7C7C7C] text-base font-poppins font-normal"
        required
      />
      <Input
        label="SeedsTag"
        name="seedsTag"
        value={form?.seedsTag}
        onChange={changeData}
        variant="static"
        labelProps={{
          className: 'text-base text-[#262626] font-semibold font-poppins'
        }}
        className="text-[#7C7C7C] text-base font-poppins font-normal"
        required
      />

      <BirthDateCalender wrapperClassName={`w-full`} className={``} />

      <div className="w-full">
        <Input
          label="Bio"
          name="bio"
          value={form?.bio}
          onChange={changeData}
          variant="static"
          labelProps={{
            className: 'text-base text-[#262626] font-semibold font-poppins'
          }}
          className="text-[#7C7C7C] text-base font-poppins font-normal"
          required
          maxLength={maxLengthBio}
        />
        <Typography>
          {form.bio.length}/{maxLengthBio}
        </Typography>
      </div>

      <Input
        label="Phone Number"
        name="phone"
        value={form?.phone}
        onChange={changeData}
        variant="static"
        labelProps={{
          className: 'text-base text-[#262626] font-semibold font-poppins'
        }}
        className="text-[#7C7C7C] text-base font-poppins font-normal"
        required
      />
      <div className="relative flex w-full max-w-[24rem]">
        <Menu placement="bottom-start">
          <MenuHandler>
            <Button
              ripple={false}
              variant="text"
              color="blue-gray"
              className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
            >
              <img
                src={flags.svg}
                alt={name}
                className="h-4 w-7 object-cover"
              />
              {countryCallingCode}
            </Button>
          </MenuHandler>
          <MenuList className="max-h-[20rem] max-w-[18rem]">
            {countriesRepository.map(
              ({ name, flags, countryCallingCode }, index) => {
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
                    {name} <span className="ml-auto">{countryCallingCode}</span>
                  </MenuItem>
                );
              }
            )}
          </MenuList>
        </Menu>
        <Input
          type="tel"
          placeholder="Mobile Number"
          className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: 'before:content-none after:content-none'
          }}
          containerProps={{
            className: 'min-w-0'
          }}
        />
      </div>
      <Input
        label="Email"
        name="email"
        value={form?.email}
        onChange={changeData}
        variant="static"
        labelProps={{
          className: 'text-base text-[#262626] font-semibold font-poppins'
        }}
        className="text-[#7C7C7C] text-base font-poppins font-normal"
        required
      />
      <Input
        label="Linked Account"
        variant="static"
        labelProps={{
          className: 'text-base text-[#262626] font-semibold font-poppins'
        }}
        className="text-[#7C7C7C] text-base font-poppins font-normal"
        style={{ backgroundColor: 'transparent' }}
      />
    </Card>
  );
};

export default EditProfile;
