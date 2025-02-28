import { isGuest } from '@/helpers/guest';
import { setTranslationToLocalStorage } from '@/helpers/translation';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import LanguageContext from '@/store/language/language-context';
import { getLocalStorage } from '@/utils/common/localStorage';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import chat from 'public/assets/social/chat.svg';
import connect from 'public/assets/social/connect.svg';
import danamart from 'public/assets/social/danamart.svg';
import homepage from 'public/assets/social/discover.svg';
import ID from 'public/assets/social/flag/ID.png';
import US from 'public/assets/social/flag/US.png';
import notification from 'public/assets/social/notification.svg';
import profile from 'public/assets/social/people.svg';
import play from 'public/assets/social/play.svg';
import setting from 'public/assets/social/setting.svg';
import social from 'public/assets/social/social.svg';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { toast } from 'react-toastify';
import market from 'src/assets/market/market.svg';
import Logo from '../ui/vector/Logo';

interface props {
  open: boolean;
  handleOpen: () => void;
  handleLogout: () => void;
}

const SidebarLoginResponsive: React.FC<props> = ({
  open,
  handleOpen,
  handleLogout
}) => {
  const width = useWindowInnerWidth();
  const [accessToken, setAccessToken] = useState('');
  const router = useRouter();
  const languageCtx = useContext(LanguageContext);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDanamartOpen, setIsDanamartOpen] = useState<boolean>(false);

  const { t } = useTranslation();
  const menu = isGuest()
    ? [
        { title: 'Social', url: '/social', image: social },
        { title: 'Homepage', url: '/homepage', image: homepage },
        { title: 'Connect', url: '/connect', image: connect },
        { title: 'Play', url: '/play', image: play }
      ]
    : [
        { title: 'Social', url: '/social', image: social },
        { title: 'Homepage', url: '/homepage', image: homepage },
        { title: 'Market', url: '/market', image: market },
        { title: 'Connect', url: '/connect', image: connect },
        { title: 'Play', url: '/play', image: play },
        {
          title: 'Danamart',
          url: '/danamart',
          image: danamart,
          hasSubmenu: true,
          submenu: [
            { title: 'Dashboard', url: '/danamart/dashboard' },
            { title: t('danamart.offers.sidebar.text1'), url: '/danamart/offer' },
            { title: t('danamart.portfolio.sidebar.text1'), url: '/danamart/portfolio' },
            { title: t('danamart.purchaseHistory.sidebar.text1'), url: '/danamart/purchase-history' },
            { title: t('danamart.incomingFunds.sidebar.text1'), url: '/danamart/incoming-funds' },
            { title: t('danamart.outgoingFunds.sidebar.text1'), url: '/danamart/outgoing-funds' },
            { title: t('danamart.userLog.sidebar.text1'), url: '/danamart/user-log' },
          ]
        },
        { title: 'Setting', url: '/user-setting', image: setting },
        {
          title: 'Notification',
          url: '/social/notification',
          image: notification
        },
        { title: 'Chat', url: '/chat', image: chat },
        { title: 'Profile', url: '/my-profile', image: profile }
      ];

  const isLinkActive = (href: string): string => {
    return router.asPath.startsWith(href) ? 'active' : '';
  };

  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken') ?? '');
  }, []);

  useEffect(() => {
    const getLastTranslation = async (): Promise<void> => {
      try {
        if (typeof window !== 'undefined') {
          const translation = getLocalStorage('translation', 'EN');
          languageCtx.languageHandler(translation as 'EN' | 'ID');
        }
      } catch (error) {
        toast.error(`${error as string}`);
      }
    };
    getLastTranslation().catch(err => {
      toast.error(`${err as string}`);
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        menuRef.current != null &&
        !menuRef.current.contains(event.target as Node)
      ) {
        handleOpen();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleOpen]);

  return (
    <aside
      ref={menuRef}
      className="absolute z-40 right-0 w-2/3 h-fit py-6 bg-white"
    >
      <div className="absolute -left-4 bg-white border-[#E9E9E9] border-2 w-fit px-2 py-1 rounded-xl cursor-pointer">
        <ChevronDoubleRightIcon width={20} height={20} onClick={handleOpen} />
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col items-center gap-">
          <Link href={`/homepage`} className="mb-[30px] px-[60px]">
            <Logo
              width={width !== undefined && width <= 640 ? '62.22' : undefined}
              height={width !== undefined && width <= 640 ? '23.58' : undefined}
            />
          </Link>
          <ul className="flex flex-col items-start w-full social-sidebar-list">
            {menu
              .filter(value => {
                if (accessToken === '') {
                  return !value.title.includes('Profile');
                } else {
                  return true;
                }
              })
              .map((data, idx) => (
                <>
                  {data.title === 'Danamart' &&
                  localStorage.getItem('accessToken-danamart') !== null ? (
                    <div key={idx} className="w-full flex flex-col gap-2">
                      <Link
                        onClick={() => {
                          if (
                            data.hasSubmenu !== undefined &&
                            data.hasSubmenu !== null
                          ) {
                            setIsDanamartOpen(prev => !prev);
                          }
                        }}
                        className={`flex justify-between items-center ${isLinkActive(
                          data.url
                        )}`}
                        href={
                          localStorage.getItem('accessToken-danamart') !== null
                            ? '#'
                            : data.url
                        }
                        key={idx}
                      >
                        <div className="flex items-center gap-2">
                          <Image width={20} height={20} src={data.image} alt="" />
                          <h1>{data.title}</h1>
                        </div>
                        {localStorage.getItem('accessToken-danamart') !== null &&
                          (isDanamartOpen ? (
                            <FaChevronUp size={14} />
                          ) : (
                            <FaChevronDown size={14} />
                          ))}
                      </Link>
                      {data.hasSubmenu !== undefined && isDanamartOpen && (
                        <ul>
                          {data.submenu?.map((sub, subIdx) => (
                            <Link
                              key={subIdx}
                              className={`flex items-center ${isLinkActive(sub.url)}`}
                              href={sub.url}
                            >
                              <GoDotFill size={20} />
                              <h1>{sub.title}</h1>
                            </Link>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      className={isLinkActive(data.url)}
                      href={data.url}
                      key={idx}
                    >
                      <Image width={20} height={20} src={data.image} alt="" />
                      <h1>{data.title}</h1>
                    </Link>
                  )}
                </>
            ))}
            <div className="flex flex-row">
              <section className="flex flex-row gap-2 rounded-full backdrop-blur-[10px] py-2 px-4">
                <button
                  className={`transition-all duration-300 flex sm:justify-evenly py-3 px-3 items-center rounded-full bg-gray-100  ${
                    width !== undefined && width <= 375 ? 'space-x-1' : ''
                  } ${
                    languageCtx.language === 'ID'
                      ? 'border border-seeds-purple'
                      : ''
                  }`}
                  onClick={() => {
                    languageCtx.languageHandler('ID');
                    setTranslationToLocalStorage('ID').catch(err => {
                      toast.error(`${err as string}`);
                    });
                  }}
                >
                  <span
                    className={`font-poppins mr-2 text-sm ${
                      languageCtx.language === 'ID'
                        ? 'sm:font-semibold text-seeds-purple'
                        : 'text-black'
                    }`}
                  >
                    ID
                  </span>

                  <Image
                    src={ID}
                    alt="ID-flag"
                    className="w-[30px] h-[20px] self-center"
                  />
                </button>
              </section>
              <section className="border-r h-4 border-black my-3"></section>
              <section className="flex flex-row gap-2 rounded-full backdrop-blur-[10px] py-2 px-4">
                <button
                  className={`transition-all duration-300 flex sm:justify-evenly py-3 px-3 items-center rounded-full bg-gray-100 ${
                    width !== undefined && width <= 375 ? 'space-x-1' : ''
                  } ${
                    languageCtx.language === 'EN'
                      ? 'border border-seeds-purple'
                      : ''
                  }`}
                  onClick={() => {
                    languageCtx.languageHandler('EN');
                    setTranslationToLocalStorage('EN').catch(err => {
                      toast.error(`${err as string}`);
                    });
                  }}
                >
                  <span
                    className={`font-poppins mr-1 text-sm ${
                      languageCtx.language === 'EN'
                        ? 'sm:font-semibold text-seeds-purple'
                        : 'text-black'
                    }`}
                  >
                    EN
                  </span>
                  <Image
                    src={US}
                    alt="US-flag"
                    className="w-[30px] h-[20px] self-center"
                  />
                </button>
              </section>
            </div>
            {isGuest() ? (
              <Link href="/" className="flex mx-auto">
                <button className="flex justify-center items-center bg-red-500 text-white text-center font-semibold rounded-2xl py-2 px-11 w-full">
                  <div>Logout</div>
                </button>
              </Link>
            ) : (
              <div
                className={`${accessToken === '' ? 'hidden' : 'flex'} mx-auto`}
              >
                <button
                  className="bg-red-500 text-white font-semibold rounded-2xl py-2 px-11 w-full"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SidebarLoginResponsive;
