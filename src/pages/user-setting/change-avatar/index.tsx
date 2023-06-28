import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';

import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { Button, Card, Typography } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import { type ChangeEvent, useEffect, useState } from 'react';

import Image from 'next/image';
import {
  XIcon,
  ArrowRight,
  ArrowDownCollapse
} from '../../../../public/assets/vector';
import { getAvatars } from '@/repository/avatar.repository';

const UserSetting: React.FC = () => {
  const width = useWindowInnerWidth();
  const { t } = useTranslation();
  const [selectedGender, setSelected] = useState<number>(2);
  const [selectedAvatar, setAvatar] = useState<number>(0);
  const [maleAvatars, setMaleAvatars] = useState<string[]>();
  const [femaleAvatars, setFemaleAvatars] = useState<string[]>();
  let avatars: string[];
  if (selectedGender === 1) avatars = maleAvatars ?? [];
  else avatars = femaleAvatars ?? [];

  const selected: string =
    'text-base font-poppins font-semibold text-[#FFFFFF] bg-[#3AC4A0] py-1 px-3 rounded-2xl shadow-none capitalize';
  const unselected: string =
    'text-base font-poppins font-semibold text-[#7C7C7C] bg-[#FFFFFF] py-1 px-3 rounded-2xl shadow-none capitalize';

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    // Handle selected files
    console.log(files);
  };

  useEffect(() => {
    const fetchAvatars = async (gender: 'male' | 'female'): Promise<void> => {
      try {
        const response = await getAvatars(gender);
        if (gender === 'male') setMaleAvatars(response.avatars);
        else setFemaleAvatars(response.avatars);
      } catch (error: any) {
        console.error('Error fetching exp data:', error.message);
      }
    };

    Promise.all([fetchAvatars('male'), fetchAvatars('female')])
      .then()
      .catch(() => {});
  }, []);

  return (
    <PageGradient
      defaultGradient
      className="z-0 sm:relative sm:pb-20 absolute overflow-hidden flex flex-col items-center w-full bottom-0"
    >
      <CardGradient
        defaultGradient
        className={`relative overflow-hidden flex flex-col items-center py-4 w-full sm:w-[90%] sm:rounded-[1.125rem] sm:min-h-[36rem] ${
          width !== undefined && width < 370
            ? 'h-[38rem]'
            : width !== undefined && width < 400
            ? 'h-[45rem]'
            : width !== undefined && width < 415
            ? 'h-[48rem]'
            : ''
        } bg-white`}
      >
        <div className="flex w-full max-w-[37.5rem] justify-between">
          <Image
            src={XIcon}
            alt="Exit"
            width={24}
            height={24}
            className="hover:scale-100 hover:bg-gray-200 rounded-lg transition ease-out cursor-pointer"
          />
          <div className="flex hover:scale-100 hover:bg-gray-200 rounded-lg transition ease-out cursor-pointer">
            <Typography
              variant="h6"
              color="black"
              className="text-center text-lg font-poppins font-semibold"
            >
              {t('setting.changeAvatar.title')}
            </Typography>
            <Image
              src={ArrowDownCollapse}
              alt="Select"
              width={24}
              height={24}
            />
          </div>
          <Image
            src={ArrowRight}
            alt="Next"
            width={24}
            height={24}
            className="hover:scale-100 hover:bg-gray-200 rounded-lg transition ease-out cursor-pointer"
          />
        </div>

        <Card
          shadow={false}
          className="relative h-[23rem] w-full max-w-[23rem] overflow-hidden rounded-[1.25rem] mt-4"
        >
          <Image
            fill={true}
            src={avatars[selectedAvatar]}
            alt=""
            className="absolute h-full"
          />
          <div className="spotlight" />
        </Card>

        <Card
          shadow={false}
          className="relative w-full max-w-[37.5rem] mt-4 mb-8 rounded-none"
        >
          <div className="flex flex-col justify-center items-center">
            <Typography className="font-poppins text-sm text-[#DD2525] mt-4 max-w-[22rem] text-center">
              {t('setting.changeAvatar.content.hint')}
            </Typography>
            <Typography
              color="black"
              className="font-poppins font-semibold mt-4 text-2xl "
            >
              {t('setting.changeAvatar.content.title')}
            </Typography>
            <Typography className="font-poppins text-sm text-[#7C7C7C] mt-3">
              {t('setting.changeAvatar.content.subTitle')}
            </Typography>
            <div className="flex flex-start gap-3 mt-12">
              <Button
                className={selectedGender === 1 ? selected : unselected}
                onClick={() => {
                  setSelected(1);
                }}
              >
                {t('setting.changeAvatar.content.male')}
              </Button>
              <Button
                className={selectedGender === 2 ? selected : unselected}
                onClick={() => {
                  setSelected(2);
                }}
              >
                {t('setting.changeAvatar.content.female')}
              </Button>
            </div>
            <div className="grid overflow-scroll h-[9.25rem] mt-6 px-5">
              <div className="grid grid-cols-4 gap-5">
                {avatars.map((value, index: number) => {
                  let border = '';
                  if (selectedAvatar === index)
                    border = 'border-2 border-[#3AC4A0]';
                  return (
                    <div
                      key={index}
                      className={`relative w-14 h-14 rounded-[1.75rem] overflow-hidden bg-[#DCFCE4]`}
                    >
                      <Image
                        src={value}
                        alt=""
                        width={56}
                        height={56}
                        className="absolute w-14 h-14"
                      />
                      <div
                        className={`absolute w-14 h-14 rounded-[1.75rem] ${border}`}
                        onClick={() => {
                          setAvatar(index);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <Typography className="font-poppins text-sm text-[#7C7C7C] mt-5">
              {t('setting.changeAvatar.content.or')}
            </Typography>
            <input
              type="file"
              className="hidden"
              id="fileInput"
              onChange={handleFileChange}
            />
            <Button className="min-w-[21.4375rem] mt-5 mb-4 text-base font-poppins font-semibold text-[#FFFFFF] bg-[#3AC4A0] rounded-2xl shadow-none capitalize">
              {t('setting.changeAvatar.content.upload')}
            </Button>
          </div>
        </Card>
      </CardGradient>
    </PageGradient>
  );
};

export default UserSetting;
