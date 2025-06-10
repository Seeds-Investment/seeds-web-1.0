import TrackerEvent from '@/helpers/GTM';
import { isGuest } from '@/helpers/guest';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { useAppSelector } from '@/store/redux/store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import nft from 'public/assets/nft/nft-logo.svg';
import connect from 'public/assets/social/connect.svg';
// import danamart from 'public/assets/social/danamart.svg';
import homepage from 'public/assets/social/discover.svg';
import play from 'public/assets/social/play.svg';
import setting from 'public/assets/social/setting.svg';
import social from 'public/assets/social/social.svg';
import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import { GoDotFill } from 'react-icons/go';
import { toast } from 'react-toastify';
import market from 'src/assets/market/market.svg';
import ModalLogoutDanamart from '../danamart/auth/ModalLogoutDanamart';
import ModalLogout from '../popup/ModalLogout';
import Logo from '../ui/vector/Logo';

const SidebarLogin: React.FC = () => {
  // const { t } = useTranslation();
  // const [isDanamartOpen, setIsDanamartOpen] = useState<boolean>(false);
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
        // {
        //   title: 'Danamart',
        //   url: '/danamart',
        //   image: danamart,
        //   hasSubmenu: true,
        //   submenu: [
        //     { title: 'Dashboard', url: '/danamart/dashboard' },
        //     {
        //       title: t('danamart.offers.sidebar.text1'),
        //       url: '/danamart/offer'
        //     },
        //     {
        //       title: t('danamart.portfolio.sidebar.text1'),
        //       url: '/danamart/portfolio'
        //     },
        //     {
        //       title: t('danamart.purchaseHistory.sidebar.text1'),
        //       url: '/danamart/purchase-history'
        //     },
        //     {
        //       title: t('danamart.incomingFunds.sidebar.text1'),
        //       url: '/danamart/incoming-funds'
        //     },
        //     {
        //       title: t('danamart.outgoingFunds.sidebar.text1'),
        //       url: '/danamart/outgoing-funds'
        //     },
        //     {
        //       title: t('danamart.promotion.sidebar.text1'),
        //       url: '/danamart/promotion'
        //     },
        //     {
        //       title: t('danamart.userLog.sidebar.text1'),
        //       url: '/danamart/user-log'
        //     },
        //     {
        //       title: t('danamart.setting.sidebar.text1'),
        //       url: '/danamart/setting-account'
        //     },
        //     { title: t('danamart.logout.text1'), url: '#', isLogout: true }
        //   ]
        // },
        { title: 'NFT', url: '/nft', image: nft },
        { title: 'Setting', url: '/user-setting', image: setting }
      ];

  const [accessToken, setAccessToken] = useState('');
  const { dataUser } = useAppSelector(state => state.user);
  const width = useWindowInnerWidth();
  const router = useRouter();
  // const [isDanamartOpen, setIsDanamartOpen] = useState(false);
  const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);
  const [isLogoutModalDanamart, setIsLogoutModalDanamart] =
    useState<boolean>(false);
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const isLinkActive = (href: string): string => {
    return router.asPath.startsWith(href) ? 'active' : '';
  };

  useEffect(() => {
    if (!isGuest()) {
      setAccessToken(localStorage.getItem('accessToken') ?? '');
      const fetchData = async (): Promise<void> => {
        try {
          setShowLogoutButton(true);
        } catch (error: any) {
          if (error.response.status !== 401) {
            toast(error.message, { type: 'error' });
          }
        }
      };

      fetchData()
        .then()
        .catch(() => {});
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 py-6 bg-opacity-50 h-[100vh] overflow-y-scroll scrollbar-hide">
      {isLogoutModal && (
        <ModalLogout
          onClose={() => {
            setIsLogoutModal(prev => !prev);
          }}
          userInfo={dataUser}
        />
      )}
      {isLogoutModalDanamart && (
        <ModalLogoutDanamart
          onClose={() => {
            setIsLogoutModalDanamart(prev => !prev);
          }}
        />
      )}

      <Link href={`/homepage`} className="mb-[30px] px-[60px]">
        <Logo
          width={width !== undefined && width <= 640 ? '62.22' : undefined}
          height={width !== undefined && width <= 640 ? '23.58' : undefined}
        />
      </Link>
      <ul className="flex flex-col items-start w-full social-sidebar-list flex-grow">
        {menu?.map((data, idx) => (
          <>
            {data.title === 'Danamart' &&
            localStorage.getItem('accessToken-danamart') !== null ? (
              // <div key={idx} className="w-full flex flex-col gap-2">
              //   <Link
              //     onClick={() => {
              //       TrackerEvent({
              //         event: `SW_${data.title.toLowerCase()}_page`,
              //         userData: dataUser
              //       });
              //       if (
              //         data.hasSubmenu !== undefined &&
              //         data.hasSubmenu !== null
              //       ) {
              //         setIsDanamartOpen(prev => !prev);
              //       }
              //     }}
              //     className={`flex justify-between items-center ${isLinkActive(
              //       data.url
              //     )}`}
              //     href={
              //       localStorage.getItem('accessToken-danamart') !== null
              //         ? '#'
              //         : data.url
              //     }
              //     key={idx}
              //   >
              //     <div className="flex items-center gap-2">
              //       <Image width={20} height={20} src={data.image} alt="" />
              //       <h1>{data.title}</h1>
              //     </div>
              //     {localStorage.getItem('accessToken-danamart') !== null &&
              //       (isDanamartOpen ? (
              //         <FaChevronUp size={14} />
              //       ) : (
              //         <FaChevronDown size={14} />
              //       ))}
              //   </Link>
              //   {data.hasSubmenu !== undefined && isDanamartOpen && (
              //     <ul>
              //       {data.submenu?.map((sub, subIdx) =>
              //         sub.isLogout ?? false ? (
              //           <Link
              //             key={subIdx}
              //             className={`flex items-center ${isLinkActive(
              //               sub.url
              //             )}`}
              //             onClick={() => {
              //               setIsLogoutModalDanamart(true);
              //             }}
              //             href="#"
              //           >
              //             <GoDotFill size={20} />
              //             <h1>{sub.title}</h1>
              //           </Link>
              //         ) : (
              //           <Link
              //             key={subIdx}
              //             className={`flex items-center ${isLinkActive(
              //               sub.url
              //             )}`}
              //             href={sub.url}
              //           >
              //             <GoDotFill size={20} />
              //             <h1>{sub.title}</h1>
              //           </Link>
              //         )
              //       )}
              //     </ul>
              //   )}
              // </div>
              <></>
            ) : (
              <Link
                onClick={() => {
                  TrackerEvent({
                    event: `SW_${data.title.toLowerCase()}_page`,
                    userData: dataUser
                  });
                }}
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
      </ul>
      {isGuest() ? (
        <Link href="/" className="flex mx-auto">
          <button className="flex bg-red-500 text-white font-semibold rounded-2xl py-2 px-11 w-full">
            Logout
          </button>
        </Link>
      ) : (
        showLogoutButton && (
          <div className={`${accessToken !== '' ? 'flex' : 'hidden'} mx-auto`}>
            <button
              className={`${
                accessToken !== '' ? 'flex' : 'hidden'
              } bg-red-500 text-white font-semibold rounded-2xl py-2 px-11 w-full`}
              onClick={() => {
                setIsLogoutModal(true);
              }}
            >
              Logout
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default SidebarLogin;
