import Verified from '@/assets/setting/Verified.svg';
import ChooselanguagePopup from '@/components/popup/ChooseLanguage';
import MenuCard from '@/components/setting/MenuCard';
import { useAppSelector } from '@/store/redux/store';
import { Card, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CurrencySVG } from 'public/assets/images';

import {
  CloseCircleIcon,
  CreatePinIcon,
  EarphoneIcon,
  FileTextIcon,
  GlobalIcon,
  HelpCircleIcon,
  LogoutIcon,
  StarIcon,
  UserIcon
} from 'public/assets/vector';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const UserSetting: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const { dataUser } = useAppSelector(state => state.user);
  const { dataExp } = useAppSelector(state => state.exp);
  console.log(dataUser);
  const handleOpen = (): void => {
    setOpen(!open);
  };
  const accountMenu = [
    {
      name: t('setting.setting.accountInfo.title'),
      src: UserIcon,
      extra: '',
      link: async () => {
        await router.push('user-setting/account-information');
      }
    },
    {
      name: t('setting.setting.accountSecure.title'),
      src: CreatePinIcon,
      extra: '',
      link: async () => {
        await router.push('user-setting/account-security-center');
      }
    },
    {
      name: t('setting.setting.createPin.title'),
      src: CreatePinIcon,
      extra: '',
      link: async () => {
        await router.push('user-setting/create-pin');
      }
    },
    {
      name: t('setting.setting.changePin.title'),
      src: CreatePinIcon,
      extra: '',
      link: async () => {
        await router.push('user-setting/change-pin');
      }
    }
  ];
  const languageCurrencyMenu = [
    {
      name: t('setting.setting.language.title'),
      src: GlobalIcon,
      extra: '',
      link: handleOpen
    },
    {
      name: t('setting.setting.currency.title'),
      src: CurrencySVG,
      extra: `${dataUser.preferredCurrency}`,
      link: async () => {
        await router.push('user-setting/change-currency');
      }
    }
  ];
  const otherMenu = [
    {
      name: t('setting.setting.block.title'),
      src: CloseCircleIcon,
      extra: '',
      link: async () => {
        await router.push('user-setting/block-list');
      }
    },
    {
      name: t('setting.setting.legal.title'),
      src: FileTextIcon,
      extra: '',
      link: async () => {
        await router.push('/faq-submenu/terms-condition');
      }
    },
    {
      name: t('setting.setting.faq.title'),
      src: HelpCircleIcon,
      extra: '',
      link: async () => {
        await router.push('/faq');
      }
    },
    {
      name: t('setting.setting.rate.title'),
      src: StarIcon,
      extra: '',
      link: () => {
        window.open(
          'https://play.google.com/store/apps/details?id=com.seeds.investment&hl=en-ID',
          '_blank'
        );
      }
    },
    {
      name: t('setting.setting.chat.title'),
      src: EarphoneIcon,
      extra: '',
      link: async () => {
        await router.push('');
      }
    },
    {
      name: t('setting.setting.logout.title'),
      src: LogoutIcon,
      extra: '',
      link: async () => {
        await router.push('');
      }
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <ChooselanguagePopup open={open} handleOpen={handleOpen} />
      <Card
        className="flex items-center px-4 py-6 md:p-10 gap-7 md:gap-10 rounded-xl"
        shadow={false}
      >
        <Typography className="font-poppins font-semibold text-lg text-[#201B1C]">
          {t('setting.setting.title')}
        </Typography>
        <div className="flex md:flex-col flex-row gap-4 md:items-center self-start md:self-auto">
          <Image
            src={dataUser.avatar}
            alt="avatar"
            width={60}
            height={60}
            className="object-cover w-[60px] h-[60px] rounded-full"
          />
          <div className="flex flex-col gap-2 md:items-center">
            <div className="flex flex-col gap-1 md:items-center">
              <div className="flex gap-2">
                <Typography className="font-poppins font-semibold text-sm text-[#222222]">
                  {dataUser.name}
                </Typography>
                <Image src={Verified} alt="Verified" />
              </div>
              <Typography className="font-poppins font-normal text-xs text-[#262626]">
                @{dataUser.seedsTag}
              </Typography>
            </div>
            {dataExp.tierList
              .filter(state => state.name === dataExp.currentTier)
              .map((value, index) => {
                return (
                  <div
                    key={index}
                    className="flex bg-[#4FE6AF] p-1 items-center gap-0.5 rounded-full"
                  >
                    <Image
                      src={value.image}
                      alt={value.name}
                      width={12}
                      height={12}
                      className="bg-[#BAFBD0] p-1 rounded-full w-5 h-5"
                    />
                    <Typography className="font-poppins font-semibold text-xs text-white">
                      {value.name}
                    </Typography>
                  </div>
                );
              })}
          </div>
        </div>
      </Card>

      <MenuCard menuList={accountMenu} />
      <MenuCard menuList={languageCurrencyMenu} />
      <MenuCard menuList={otherMenu} />
    </div>
  );
};

export default UserSetting;
