import AvatarList from '@/components/profile/editProfile/AvatarList';
import BirthDateCalender from '@/components/profile/editProfile/BirthDateCalender';
import ModalCrop from '@/components/profile/editProfile/ModalCrop';
import ModalImage from '@/components/profile/editProfile/ModalImage';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { postCloud } from '@/repository/cloud.repository';
import { editUserInfo, getUserInfo } from '@/repository/profile.repository';
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowBackwardIcon } from 'public/assets/vector';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IForm {
  name: string;
  seedsTag: string;
  email: string;
  avatar: string;
  bio: string;
  birthDate: string;
  phone: string;
}

const AccountInformation: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const maxLengthBio = 50;
  const [select, setSelect] = useState(0);
  const [updateAvatar, setAvatar] = useState<File | null>(null);
  const [birthDate, setBirthDate] = useState(new Date());
  const [error, setError] = useState(false);
  const [form, setForm] = useState<IForm>({
    name: '',
    seedsTag: '',
    email: '',
    avatar: '',
    bio: '',
    birthDate: '',
    phone: ''
  });

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
    setAvatar(file);
    if (file !== null && file !== undefined) {
      setForm({ ...form, avatar: URL.createObjectURL(file) });
    }
    setOpenImage(!openImage);
  };
  const handleAvatar = (selectedAvatar: any): void => {
    setForm({ ...form, avatar: selectedAvatar });
    setSelect(0);
  };

  const changeData = (e: any): void => {
    const updatedForm = { ...form, [e.target.name]: e.target.value };
    setForm(updatedForm);
    const regex = /[^a-zA-Z0-9]/g;
    setError(regex.test(updatedForm.seedsTag));
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
          ...updatedForm,
          avatar: cloudResponse
        };
      }
      updatedForm = {
        ...updatedForm,
        birthDate: new Date(birthDate).toISOString()
      };
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
    <PageGradient defaultGradient className="w-full flex justify-center">
      <Card
        className={`${
          select === 0 ? 'flex' : 'hidden'
        } w-[947px] p-5 bg-transparent shadow-none md:bg-white md:shadow-md`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <Image
              src={ArrowBackwardIcon}
              alt="arrow-backward-icon"
              className="mr-[18px]"
            />
            <Typography className="font-montserrat font-bold text-[#262626] text-base">
              {t('editProfile.title')}
            </Typography>
            <Button
              type="submit"
              className="font-poppins font-semibold text-[#3AC4A0] text-base bg-transparent shadow-none hover:shadow-none capitalize p-0 disabled:text-[#7C7C7C]"
              disabled={error}
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
              setSelect={setSelect}
            />
            {updateAvatar !== undefined && (
              <ModalCrop
                openCrop={openCrop}
                handleOpenCrop={handleOpenCrop}
                updateAvatar={updateAvatar}
              />
            )}
          </div>
          <Card className="flex flex-col justify-center items-center gap-4 w-full shadow-none sm:shadow-md md:shadow-none p-4 md:p-0 ">
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
            />
            <div className="relative flex flex-col w-full">
              <Typography
                className={`${
                  error ? 'text-red-600' : 'text-[#7C7C7C]'
                } absolute  p-0 pb-[7px] pt-[15px] text-base font-poppins font-normal cursor-default`}
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
              wrapperClassName="w-full"
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
                maxLength={maxLengthBio}
              />
              <Typography className="font-light font-poppins text-base text-[#3C49D6]">
                {form.bio.length}/{maxLengthBio}
              </Typography>
            </div>
          </Card>
        </form>
      </Card>
      <AvatarList
        setSelect={setSelect}
        className={select === 2 ? 'flex' : 'hidden'}
        handleAvatar={handleAvatar}
      />
    </PageGradient>
  );
};

export default AccountInformation;
