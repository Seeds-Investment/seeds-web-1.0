import ChangeBankAccount from '@/components/danamart/setting-account/ChangeBankAccount';
import ChangeEmail from '@/components/danamart/setting-account/ChangeEmail';
import ChangePassword from '@/components/danamart/setting-account/ChangePassword';
import ChangePhoneNumber from '@/components/danamart/setting-account/ChangePhoneNumber';
import DeleteAccount from '@/components/danamart/setting-account/DeleteAccount';
import VerifyPhoneEmail from '@/components/danamart/setting-account/VerifyPhoneEmail';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import { Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegCreditCard, FaRegTrashAlt } from 'react-icons/fa';
import { IoLockOpenOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { RiSmartphoneLine, RiUser3Line } from 'react-icons/ri';

const SettingAccount = (): React.ReactElement => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.setting';
  const [activeNavbar, setActiveNavbar] = useState<number>(1);

  const navigation = [
    {
      id: 1,
      title: 'Ubah Password',
      iconActive: IoLockOpenOutline,
    },
    {
      id: 2,
      title: 'Ubah Email',
      iconActive: MdOutlineEmail,
    },
    {
      id: 3,
      title: 'Ubah No Handphone',
      iconActive: RiSmartphoneLine,
    },
    {
      id: 4,
      title: 'Ubah Rekening',
      iconActive: FaRegCreditCard,
    },
    {
      id: 5,
      title: 'Verifikasi',
      iconActive: RiUser3Line,
    },
    {
      id: 6,
      title: 'Hapus Akun',
      iconActive: FaRegTrashAlt,
    },
  ]

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
                      ? <VerifyPhoneEmail />
                      : <DeleteAccount />
          }
        </div>
      </div>
    </PageGradient>
  );
};

export default withAuthDanamart(SettingAccount);
