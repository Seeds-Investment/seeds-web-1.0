import Image from 'next/image';

import LevelButton from '@/components/ui/button/LevelButton';
import SubmenuButton from '@/components/ui/button/SubmenuButton';
import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';

import ChooseBadgePopUp from '@/components/popup/ChooseBadge';
import { DummyAvatar } from 'public/assets/images';
import {
  ArrowRightCollapseIcon,
  BronzeMedalIcon,
  CloseCircleIcon,
  FileTextIcon,
  GlobalIcon,
  GoldMedalIcon,
  HelpCircleIcon,
  LogOutIcon,
  SilverMedalIcon,
  StarIcon,
  UserIcon
} from 'public/assets/vector';
import { useState } from 'react';

const UserSetting: React.FC = () => {
  const [chooseBadgeModalShown, setChooseBadgeModalShown] =
    useState<boolean>(false);

  const [selectedMedal, setSelectedMedal] = useState<string>('gold');
  const menus = [
    {
      label: 'Edit Profile',
      altStartAdornment: 'edit profile',
      startAdornment: UserIcon,
      onClick: () => {},
      extraClasses: 'lg:w-1/2 md:w-2/3 sm:w-[80%] w-full h-12 py-4 px-6 mb-4'
    },
    {
      label: 'Language',
      altStartAdornment: 'language',
      startAdornment: GlobalIcon,
      onClick: () => {},
      extraClasses: 'lg:w-1/2 md:w-2/3 sm:w-[80%] w-full h-12 py-4 px-6 mb-4'
    },
    {
      label: 'Block List',
      altStartAdornment: 'block list',
      startAdornment: CloseCircleIcon,
      onClick: () => {}
    },
    {
      label: 'Legal',
      altStartAdornment: 'legal',
      startAdornment: FileTextIcon,
      onClick: () => {}
    },
    {
      label: 'FAQ & Help',
      altStartAdornment: 'faq & help',
      startAdornment: HelpCircleIcon,
      onClick: () => {}
    },
    {
      label: 'Rate Apps',
      altStartAdornment: 'rate apps',
      startAdornment: StarIcon,
      onClick: () => {}
    },
    {
      label: 'Log Out',
      altStartAdornment: 'log out',
      startAdornment: LogOutIcon,
      onClick: () => {}
    }
  ];

  return (
    <PageGradient
      defaultGradient
      extraClasses="flex flex-col justify-end items-center bg-[#F9F9F9] sm:pb-20"
    >
      <CardGradient
        defaultGradient
        className="relative overflow-hidden flex flex-col items-center pt-4 w-full sm:w-[90%] sm:rounded-[18px] sm:min-h-[36rem] h-[44rem] bg-white"
      >
        {/* -----Title----- */}
        <h6 className="mb-4 text-center text-lg font-semibold">Settings</h6>

        {/* -----Header----- */}
        <div className="z-10 lg:w-1/2 md:w-2/3 sm:w-[80%] w-full h-52 sm:px-0 px-6 mb-4">
          <div className="flex flex-col justify-center items-center w-full h-full bg-white">
            {/* -----Image Container----- */}
            <div className="overflow-hidden h-16 w-16 mb-3 rounded-full">
              <Image
                alt="avatar"
                src={DummyAvatar}
                className="w-full h-full object-center object-cover"
              />
            </div>

            {/* -----User Data----- */}
            <div className="flex items-center gap-2">
              <h6 className="text-lg font-semibold text-neutral-500">
                Prabu Firgantoro
              </h6>
              <Image
                src={
                  selectedMedal === 'gold'
                    ? GoldMedalIcon
                    : selectedMedal === 'silver'
                    ? SilverMedalIcon
                    : BronzeMedalIcon
                }
                alt="medal-icon"
                width={20}
                onClick={() => {
                  setChooseBadgeModalShown(prev => !prev);
                }}
                height={20}
                className="hover:bg-gray-200 cursor-pointer hover:scale-150 transition ease-in-out rounded-full"
              />
              {chooseBadgeModalShown && (
                <ChooseBadgePopUp
                  onChangeMedalHandle={medal => {
                    setSelectedMedal(medal);
                  }}
                  onClose={() => {
                    setChooseBadgeModalShown(prev => !prev);
                  }}
                  selectedMedal={selectedMedal}
                />
              )}
            </div>
            <span className="mb-1 text-xs text-neutral-500">@prabufirgan</span>
            <span className="mb-2 text-xs text-neutral-500">+62815489799</span>
            <LevelButton type="Sprout" />
          </div>
        </div>

        {/* -----Submenus----- */}
        <div className="z-10 flex flex-col items-center w-full sm:px-0 px-6">
          {menus.map(menu => (
            <SubmenuButton
              key={menu.label}
              onClick={menu.onClick}
              startAdornment={menu.startAdornment}
              endAdornment={ArrowRightCollapseIcon}
              label={menu.label}
              altStartAdornment={menu.altStartAdornment}
              extraClasses={menu.extraClasses}
            />
          ))}
        </div>
      </CardGradient>
    </PageGradient>
  );
};

export default UserSetting;
