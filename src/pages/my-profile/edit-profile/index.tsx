import DropdownPhone from '@/assets/my-profile/editProfile/DropdownPhone.svg';
import BirthDateCalender from '@/components/profile/editProfile/BirthDateCalender';
import ModalCrop from '@/components/profile/editProfile/ModalCrop';
import ModalEmail from '@/components/profile/editProfile/ModalEmail';
import ModalImage from '@/components/profile/editProfile/ModalImage';
import countries from '@/constants/countries.json';
import { postCloud } from '@/repository/cloud.repository';
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
import { useRouter } from 'next/router';
import { ArrowBackwardIcon } from 'public/assets/vector';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const EditProfile: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const maxLengthBio = 50;
  const [country, setCountry] = useState(0);
  const { name, code } = countries[country];
  const [updateAvatar, setAvatar] = useState();
  const [birthDate, setBirthDate] = useState(new Date());
  const [error, setError] = useState(false);
  const [form, setForm] = useState<any>({
    name: '',
    seedsTag: '',
    email: '',
    avatar: '',
    bio: '',
    birthDate: '',
    phone: ''
  });
  console.log(form);
  const getCountryCodeFromNumber = (text: string): string | undefined =>
    countries.find(code => {
      const dialCode = code?.dialCode.replace('+', '');
      return text.replace('+', '').slice(0, dialCode.length) === dialCode;
    })?.dialCode;
  console.log(getCountryCodeFromNumber('6282180881420'));

  const [open, setOpen] = useState(false);
  const handleOpen = (): void => {
    setOpen(!open);
  };

  const [openImage, setOpenImage] = useState(false);
  const handleOpenImage = (): void => {
    setOpenImage(!openImage);
  };
  const [openCrop, setOpenCrop] = useState(false);
  const handleOpenCrop = (): void => {
    setOpenCrop(!openCrop);
  };

  const handleFileChange = (e: any): void => {
    const file = e.target.files[0];
    console.log(URL.createObjectURL(file));
    setAvatar(file);
    if (file !== null && file !== undefined) {
      setForm({ ...form, avatar: URL.createObjectURL(file) });
    }
    setOpenImage(!openImage);
  };

  const changeData = (e: any): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
    const regex = /[^a-zA-Z0-9]/g;
    setError(regex.test(form.seedsTag));
  };
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      let updatedForm: any = { ...form };
      if (updateAvatar !== undefined && updateAvatar !== null) {
        const { path: cloudResponse } = await postCloud({
          file: updateAvatar,
          type: 'OTHER_URL'
        });
        updatedForm = {
          ...form,
          avatar: cloudResponse
        };
      }
      updatedForm = {
        ...form,
        birthDate: new Date(birthDate).toISOString()
      };
      console.log(updatedForm);
      await editUserInfo(updatedForm);
      await router.push('/my-profile');
    } catch (error: any) {
      console.error(error.response.data.message);
    }
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
        setBirthDate(dataInfo.birthDate);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);
  return (
    <div className="w-full flex justify-center">
      <Card className="w-[947px] p-5 ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <Image src={ArrowBackwardIcon} alt="arrow-backward-icon" />
            <Typography className="font-montserrat font-bold text-[#262626] text-base">
              {t('editProfile.title')}
            </Typography>
            <Button
              type="submit"
              className="font-poppins font-semibold text-[#3AC4A0] text-base bg-transparent shadow-none hover:shadow-none capitalize"
            >
              {t('button.label.done')}
            </Button>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            {updateAvatar !== undefined && updateAvatar !== null ? (
              <img
                src={URL.createObjectURL(updateAvatar)}
                alt="avatar"
                className="w-[108px] h-[108px] rounded-full"
              />
            ) : (
              <img
                src={form?.avatar}
                alt="avatar"
                className="w-[108px] h-[108px] rounded-full"
              />
            )}
            <Button
              onClick={handleOpenImage}
              className="text-[#3AC4A0] text-xs font-semibold font-poppins cursor-pointer bg-transparent hover:shadow-none shadow-none capitalize"
            >
              Edit Image
            </Button>
            <ModalImage
              openImage={openImage}
              handleOpenImage={handleOpenImage}
              handleFileChange={handleFileChange}
            />
            {updateAvatar !== undefined && (
              <ModalCrop
                openCrop={openCrop}
                handleOpenCrop={handleOpenCrop}
                updateAvatar={updateAvatar}
              />
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-4 w-full ">
            <Input
              label="Name"
              name="name"
              value={form?.name}
              onChange={changeData}
              variant="static"
              labelProps={{
                className:
                  '!text-base !text-[#262626] !font-semibold !font-poppins'
              }}
              className="!text-[#7C7C7C] !text-base !font-poppins !font-normal"
              required
            />
            <div className="relative flex flex-col w-full">
              <Typography
                className={`${
                  error ? 'text-red-600' : 'text-[#7C7C7C]'
                } absolute z-10  p-0 pb-[7px] pt-[15px] text-base font-poppins font-normal cursor-default`}
              >
                @
              </Typography>
              <Input
                label="SeedsTag"
                name="seedsTag"
                value={form?.seedsTag}
                onChange={changeData}
                variant="static"
                labelProps={{
                  className:
                    '!text-base !text-[#262626] !font-semibold !font-poppins'
                }}
                className={`${
                  error ? 'text-red-600' : '!text-[#7C7C7C]'
                } !text-base !font-poppins !font-normal pl-[20px]`}
                required
                error={error}
              />
              <Typography
                className={`${
                  error ? 'flex' : 'hidden'
                } text-xs font-poppins font-normal text-red-600`}
              >
                SeedsTag cannot contain spaces or symbols, please delete!
              </Typography>
            </div>
            <BirthDateCalender
              wrapperClassName={`w-full`}
              birthDate={birthDate}
              setBirthDate={setBirthDate}
            />

            <div className="w-full">
              <Input
                label="Bio"
                name="bio"
                value={form?.bio}
                onChange={changeData}
                variant="static"
                labelProps={{
                  className:
                    '!text-base !text-[#262626] !font-semibold !font-poppins'
                }}
                className="!text-[#7C7C7C] !text-base !font-poppins !font-normal"
                required
                maxLength={maxLengthBio}
              />
              <Typography className="font-light font-poppins text-base text-[#3C49D6]">
                {form.bio.length}/{maxLengthBio}
              </Typography>
            </div>
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
                  {countries
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
                          {name} <span className="ml-auto">{dialCode}</span>
                        </MenuItem>
                      );
                    })}
                </MenuList>
              </Menu>
              <Input
                label="Phone Number"
                name="phone"
                type="number"
                value={form?.phone}
                onClick={async () => {
                  await router.push('edit-profile/change-phone-number');
                }}
                variant="static"
                labelProps={{
                  className:
                    '!text-base !text-[#262626] !font-semibold !font-poppins'
                }}
                className="!text-[#7C7C7C] !text-base !font-poppins !font-normal [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pl-[72px] cursor-pointer"
                required
                readOnly
              />
            </div>
            <Input
              label="Email"
              name="email"
              value={form?.email}
              onClick={handleOpen}
              variant="static"
              labelProps={{
                className:
                  '!text-base !text-[#262626] !font-semibold !font-poppins'
              }}
              className="!text-[#7C7C7C] !text-base !font-poppins !font-normal cursor-pointer"
              required
              readOnly
            />
            <ModalEmail
              open={open}
              handleOpen={handleOpen}
              email={form.email}
            />

            <Input
              label="Linked Account"
              variant="static"
              labelProps={{
                className:
                  '!text-base !text-[#262626] !font-semibold !font-poppins'
              }}
              className="!text-[#7C7C7C] !text-base !font-poppins !font-normal"
              style={{ backgroundColor: 'transparent' }}
              disabled
            />
            <Button className=" bg-white font-poppins font-semibold text-[#DD2525] text-sm border border-[#DD2525] rounded-full w-full mx-[153.5px]">
              Delete Account
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditProfile;
