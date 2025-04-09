import ChangeBankAccount from '@/components/danamart/setting-account/ChangeBankAccount';
import ChangeEmail from '@/components/danamart/setting-account/ChangeEmail';
import ChangePassword from '@/components/danamart/setting-account/ChangePassword';
import ChangePhoneNumber from '@/components/danamart/setting-account/ChangePhoneNumber';
import DeleteAccount from '@/components/danamart/setting-account/delete-account/DeleteAccount';
import VerifyPhoneEmail from '@/components/danamart/setting-account/verify-phone-email/VerifyPhoneEmail';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { decryptResponse } from '@/helpers/cryptoDecrypt';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import { getProfileUser } from '@/repository/danamart/danamart.repository';
import { type UserProfile } from '@/utils/interfaces/danamart.interface';
import { Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegCreditCard, FaRegTrashAlt } from 'react-icons/fa';
import { IoLockOpenOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { RiSmartphoneLine, RiUser3Line } from 'react-icons/ri';
import { toast } from 'react-toastify';

const SettingAccount = (): React.ReactElement => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.setting';
  const [activeNavbar, setActiveNavbar] = useState<number>(1);
  const [userProfileData, setUserProfileData] = useState<UserProfile>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refetchProfile, setRefetchProfile] = useState<boolean>(false);

  const navigation = [
    {
      id: 1,
      title: t(`${pathTranslation}.text1`),
      iconActive: IoLockOpenOutline,
    },
    {
      id: 2,
      title: t(`${pathTranslation}.text2`),
      iconActive: MdOutlineEmail,
    },
    {
      id: 3,
      title: t(`${pathTranslation}.text3`),
      iconActive: RiSmartphoneLine,
    },
    {
      id: 4,
      title: t(`${pathTranslation}.text4`),
      iconActive: FaRegCreditCard,
    },
    {
      id: 5,
      title: t(`${pathTranslation}.text5`),
      iconActive: RiUser3Line,
    },
    {
      id: 6,
      title: t(`${pathTranslation}.text6`),
      iconActive: FaRegTrashAlt,
    },
  ]
  
  const fetchUserProfile = async (): Promise<void> => {
    try {
      const profile = await getProfileUser();
      if (profile?.status === 200) {
        const decryptedProfile = JSON.parse(
          decryptResponse(profile.data) !== null
            ? decryptResponse(profile.data)
            : profile.data
        );
        setUserProfileData(decryptedProfile);
      }
    } catch (error) {
      toast.error(t('danamart.dashboard.errorGetUserProfile'));
    }
  };
  
  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchUserProfile()]).finally(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (refetchProfile) {
      void fetchUserProfile()
    }
  }, [refetchProfile])

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="w-full bg-white flex flex-col px-5 py-6 rounded-lg">
        <Typography className="font-poppins md:text-2xl text-lg font-semibold text-[#262626] mb-4">
          {t(`${pathTranslation}.title`)}
        </Typography>

        <div className='flex justify-start items-center gap-2 flex-wrap'>
          {
            navigation?.map((nav, index) => {
              const IconComponent = nav.iconActive;
              return (
                <div
                  key={index}
                  className={`
                    flex justify-center items-center gap-2 px-3 py-2 rounded-lg cursor-pointer
                    ${activeNavbar === nav?.id ? 'bg-seeds-button-green hover:bg-[#34AF90] duration-200' : 'hover:bg-[#7BE1C3] duration-200'}
                  `}
                  onClick={() => { setActiveNavbar(nav?.id); }}
                >
                  <div className='flex justify-center items-center'>
                    {
                      IconComponent !== undefined &&
                        <IconComponent className={`${activeNavbar === nav?.id ? 'text-white' : 'text-[#262626]'}`} />
                    }
                  </div>
                  <Typography
                    className={`
                      font-poppins text-md font-normal
                      ${activeNavbar === nav?.id ? 'text-white' : 'text-[#262626]'}
                    `}
                  >
                    {nav?.title}
                  </Typography>
                </div>
              )
            })
          }
        </div>
      </div>
      {
        isLoading || userProfileData !== undefined &&
          <div className="w-full bg-white flex flex-col px-5 py-6 rounded-lg mt-5">
            <div>
              {
                activeNavbar === 1
                  ? <ChangePassword />
                  : activeNavbar === 2
                    ? <ChangeEmail />
                    : activeNavbar === 3
                      ? <ChangePhoneNumber />
                      : activeNavbar === 4
                        ? <ChangeBankAccount />
                        : activeNavbar === 5
                          ? <VerifyPhoneEmail
                              userProfileData={userProfileData}
                              setRefetchProfile={setRefetchProfile}
                            />
                          : <DeleteAccount />
              }
            </div>
        </div>
      }
    </PageGradient>
  );
};

export default withAuthDanamart(SettingAccount);
