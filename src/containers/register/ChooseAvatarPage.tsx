import CSwitchSelect from '@/components/CSwitchSelect';
import CSwitchSelectItem from '@/components/CSwitchSelectItem';
import type { IRegisterPaging } from '@/pages/circle/auth/register';
import { avatarList } from '@/repository/auth.repository';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IAvatarResponse {
  avatars: string[];
}

const ChooseAvatarPage = ({
  page,
  setPage,
  formdata,
  setFormdata
}: IRegisterPaging): JSX.Element => {
  const { t } = useTranslation();
  const [avatars, setAvatars] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>('male');
  const [selectedAvatar, setSelectedAvatar] = useState<number>(0);

  const genderList = ['male', 'female'];

  useEffect(() => {
    avatarList({ gender: selectedGender })
      .then((res: IAvatarResponse) => {
        if (res.avatars !== null && res.avatars.length > 0) {
          setAvatars(res.avatars);
        }
      })
      .catch(() => {
        setAvatars([]);
      });
  }, [selectedGender]);

  return (
    <>
      <div>
        <Typography variant="h3" color="black">
          Choose Your Avatar
        </Typography>
        <Typography variant="small" color="black">
          Create an avatar that describes yourself
        </Typography>
      </div>
      <div className="flex flex-col justify-center items-center mt-4 gap-4">
        <div className="rounded-full bg-[#DCFCE4] w-[7rem] relative">
          <Image
            src={avatars[selectedAvatar]}
            className="object-cover object-[bottom_center] rounded-full w-full h-auto"
            quality={60}
            width="0"
            height="0"
            sizes="100vw"
            alt="img-avatar"
          />
        </div>
        <CSwitchSelect className="w-3/4">
          {genderList.map((gender: string, index: number) => {
            return (
              <CSwitchSelectItem
                className="font-bold"
                key={`switch-select-item-${index}`}
                isActive={selectedGender === gender}
                onClick={() => {
                  setSelectedAvatar(0);
                  setSelectedGender(gender);
                }}
              >
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </CSwitchSelectItem>
            );
          })}
        </CSwitchSelect>
        <div className="grid grid-cols-4 gap-2 px-1 w-3/4 h-[8.5rem] overflow-y-auto">
          {avatars.map((avatar: string, index: number) => {
            return (
              <div
                key={index}
                className={`rounded-full cursor-pointer bg-[#DCFCE4] w-full relative border-[#3AC4A0] ${
                  selectedAvatar === index ? 'border-2' : ''
                }`}
                onClick={() => {
                  setSelectedAvatar(index);
                }}
              >
                <Image
                  src={avatar}
                  className="object-cover object-[bottom_center]  rounded-full w-full h-auto"
                  quality={60}
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt="img-avatar"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-8">
        <Button
          fullWidth
          className="border bg-[#3AC4A0] rounded-full border-[#3AC4A0]"
          onClick={() => {
            setPage(5);
          }}
        >
          {t('registerPage.nextButton')}
        </Button>
      </div>
    </>
  );
};

export default ChooseAvatarPage;
