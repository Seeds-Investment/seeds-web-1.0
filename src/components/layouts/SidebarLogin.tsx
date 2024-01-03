import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import TrackerEvent from '@/repository/GTM.repository';
import { getUserInfo } from '@/repository/profile.repository';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import connect from 'public/assets/social/connect.svg';
import homepage from 'public/assets/social/discover.svg';
import play from 'public/assets/social/play.svg';
import setting from 'public/assets/social/setting.svg';
import social from 'public/assets/social/social.svg';
import { useEffect, useState } from 'react';
import ModalLogout from '../popup/ModalLogout';
import Logo from '../ui/vector/Logo';

const menu = [
  { title: 'Social', url: '/social', image: social },
  { title: 'Homepage', url: '/homepage', image: homepage },
  { title: 'Connect', url: '/connect', image: connect },
  { title: 'Play', url: '/play', image: play },
  { title: 'Setting', url: '/user-setting', image: setting }
  // { title: 'Notification', url : '/setting', image: notification},
  // { title: 'Chat', url : '/setting', image: chat},
  // { title: 'Profile', url : '/setting', image: setting},
];

const SidebarLogin: React.FC = () => {
  const width = useWindowInnerWidth();
  const router = useRouter();
  const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>([]);
  const isLinkActive = (href: string): string => {
    return router.asPath.startsWith(href) ? 'active' : '';
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const dataInfo = await getUserInfo();
        setUserInfo(dataInfo);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 h-full bg-white bg-opacity-50">
      {isLogoutModal && (
        <ModalLogout
          onClose={() => {
            setIsLogoutModal(prev => !prev);
          }}
          userInfo={userInfo}
        />
      )}

      <div className="mb-[30px] px-[60px]">
        <Logo
          width={width !== undefined && width <= 640 ? '62.22' : undefined}
          height={width !== undefined && width <= 640 ? '23.58' : undefined}
        />
      </div>
      <ul className="flex flex-col items-start w-full social-sidebar-list flex-grow">
        {menu.map((data, idx) => (
          <Link
            onClick={() => {
              TrackerEvent({
                event: `Seeds_view_${data.title.toLowerCase()}_page_web`,
                userId: userInfo?.id,
                pageName: data.title
              });
            }}
            className={isLinkActive(data.url)}
            href={data.url}
            key={idx}
          >
            <Image width={20} height={20} src={data.image} alt="" />
            <h1>{data.title}</h1>
          </Link>
        ))}
      </ul>
      <div className="mx-auto">
        <button
          className="bg-red-500 text-white font-semibold rounded-2xl py-2 px-11 w-full"
          onClick={() => {
            setIsLogoutModal(true);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SidebarLogin;
