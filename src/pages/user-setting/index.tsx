import ChooseBadgePopUp from '@/components/popup/ChooseBadge';
import ModalLogout from '@/components/popup/ModalLogout';
import LevelButton from '@/components/ui/button/LevelButton';
import SubmenuButton from '@/components/ui/button/SubmenuButton';
import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { getUserInfo } from '@/repository/profile.repository';
import LanguageContext from '@/store/language/language-context';
import Image from 'next/image';
import router from 'next/router';
import {
  ArrowRightCollapseIcon,
  BronzeMedalIcon,
  CloseCircleIcon,
  CreatePinIcon,
  FileTextIcon,
  GlobalIcon,
  GoldMedalIcon,
  HelpCircleIcon,
  LogOutIcon,
  SilverMedalIcon,
  StarIcon,
  UserIcon
} from 'public/assets/vector';
import { useContext, useEffect, useState } from 'react';

const UserSetting: React.FC = () => {
  const width = useWindowInnerWidth();
  const languageCtx = useContext(LanguageContext);

  const [chooseBadgeModalShown, setChooseBadgeModalShown] =
    useState<boolean>(false);

  const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);

  const submenuClasses = `lg:w-1/2 md:w-2/3 sm:w-[80%] w-full h-12 ${
    width !== undefined && width < 370 ? 'h-9' : ''
  } px-6 bg-white`;
  const [userData, setUserData] = useState<Record<string, any>>();

  useEffect(() => {
    const fetchUserProfile = async (): Promise<void> => {
      try {
        const userInfo = await getUserInfo();
        console.log(userInfo, 'ASFSAF');

        setUserData(userInfo);
      } catch (error: any) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    Promise.all([fetchUserProfile()])
      .then()
      .catch(() => {});
  }, []);

  const [selectedMedal, setSelectedMedal] = useState<string>('gold');
  const menus = [
    {
      label: 'Edit Profile',
      altStartAdornment: 'edit profile',
      startAdornment: UserIcon,
      onClick: async () => {
        try {
          await router.push('/edit-profile');
        } catch (error) {
          console.error('Error navigating to Edit Profile:', error);
        }
      },
      extraClasses: `lg:w-1/2 md:w-2/3 sm:w-[80%] w-full h-12 px-6 ${
        width !== undefined && width < 370 ? 'h-9' : ''
      } bg-white`
    },
    {
      label: languageCtx.language === 'EN' ? 'Language' : 'Bahasa',
      altStartAdornment: 'language',
      startAdornment: GlobalIcon,
      onClick: () => {},
      extraClasses: `lg:w-1/2 md:w-2/3 sm:w-[80%] w-full h-12 px-6 mb-4 ${
        width !== undefined && width < 370 ? 'h-9' : ''
      } bg-white`
    },
    {
      label: languageCtx.language === 'EN' ? 'Create Pin' : 'Buat Pin',
      altStartAdornment: 'create pin',
      startAdornment: CreatePinIcon,
      onClick: async () => {
        try {
          await router.push('/user-setting/create-pin');
        } catch (error) {
          console.error('Error navigating to Create Pin:', error);
        }
      },
      extraClasses: submenuClasses
    },
    {
      label: languageCtx.language === 'EN' ? 'Block List' : 'Daftar Blokir',
      altStartAdornment: 'block list',
      startAdornment: CloseCircleIcon,
      onClick: () => {},
      extraClasses: submenuClasses
    },
    {
      label: languageCtx.language === 'EN' ? 'Legal' : 'Hukum',
      altStartAdornment: 'legal',
      startAdornment: FileTextIcon,
      onClick: async () => {
        try {
          await router.push('/faq-submenu/terms-condition');
        } catch (error) {
          console.error('Error navigating to FAQ:', error);
        }
      },
      extraClasses: submenuClasses
    },
    {
      label: languageCtx.language === 'EN' ? 'FAQ & Help' : 'FAQ & Bantuan',
      altStartAdornment: 'faq & help',
      startAdornment: HelpCircleIcon,
      onClick: async () => {
        try {
          await router.push('/faq');
        } catch (error) {
          console.error('Error navigating to FAQ:', error);
        }
      },
      extraClasses: submenuClasses
    },
    {
      label: languageCtx.language === 'EN' ? 'Rate Apps' : 'Nilai Aplikasi',
      altStartAdornment: 'rate apps',
      startAdornment: StarIcon,
      onClick: () => {},
      extraClasses: submenuClasses
    },
    {
      label: languageCtx.language === 'EN' ? 'Log Out' : 'Keluar',
      altStartAdornment: 'log out',
      startAdornment: LogOutIcon,
      onClick: () => {
        setIsLogoutModal(true);
      },
      extraClasses: submenuClasses
    }
  ];

  return (
    <PageGradient
      defaultGradient
      className={`z-0 sm:relative sm:pb-20 overflow-hidden flex flex-col items-center w-full bottom-0  ${
        width !== undefined && width < 370
          ? 'w-full'
          : width !== undefined && width < 500
          ? 'w-[90%]'
          : width !== undefined && width < 400
          ? 'w-[40%]'
          : width !== undefined && width > 600
          ? 'w-[600px]'
          : ''
      } ${
        width !== undefined && width < 370
          ? 'h-[50rem]'
          : width !== undefined && width < 400
          ? 'h-[50rem]'
          : width !== undefined && width < 415
          ? 'h-[48rem]'
          : ''
      } bg-white`}
    >
      <CardGradient
        defaultGradient
        className={`relative flex flex-col items-center py-4 w-full sm:w-[90%] sm:rounded-[18px] sm:min-h-[36rem] ${
          width !== undefined && width < 370
            ? 'h-full'
            : width !== undefined && width < 400
            ? 'h-[45rem]'
            : width !== undefined && width < 415
            ? 'h-[48rem]'
            : ''
        } bg-white`}
      >
        {/* -----Title----- */}
        <h6 className="mb-4 text-center text-lg font-poppins font-semibold">
          {languageCtx.language === 'EN' ? 'Settings' : 'Pengaturan'}
        </h6>

        {/* -----Header----- */}
        <div className="z-10 lg:w-1/2 md:w-2/3 sm:w-[80%] w-full h-52 sm:px-0 px-6 mb-4">
          <div
            className={`flex flex-col  justify-center items-center ${
              width !== undefined && width < 370 ? 'py-4' : ''
            } w-full h-full bg-white`}
          >
            {/* -----Image Container----- */}
            <div
              className={`overflow-hidden mb-3 rounded-full ${
                width !== undefined && width < 370 ? 'h-12 w-12' : 'h-16 w-16'
              }`}
            >
              <Image
                alt="avatar"
                src={userData?.avatar}
                width={100}
                height={100}
                className="w-full h-full object-center object-cover"
              />
            </div>

            {/* -----User Data----- */}
            <div className="flex items-center gap-2">
              <h6 className="text-lg font-montserrat font-semibold text-neutral-500">
                {userData?.name}
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
            <span className="mb-1 font-poppins text-xs text-neutral-500">
              @{userData?.seedsTag}
            </span>
            <span className="mb-2 font-poppins text-xs text-neutral-500">
              +{userData?.phoneNumber}
            </span>
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

          {isLogoutModal && (
            <ModalLogout
              onClose={() => {
                setIsLogoutModal(prev => !prev);
              }}
            />
          )}
        </div>
      </CardGradient>
    </PageGradient>
  );
};

export default UserSetting;
