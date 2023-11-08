import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import connect from 'public/assets/social/connect.svg';
import homepage from 'public/assets/social/discover.svg';
import play from 'public/assets/social/play.svg';
import setting from 'public/assets/social/setting.svg';
import social from 'public/assets/social/social.svg';
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
  const isLinkActive = (href: string): string => {
    return router.asPath.startsWith(href) ? 'active' : '';
  };

  const handleLogout = (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('keepMeLoggedIn');

    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center gap-3 h-full">
      <Link href="https://seeds.finance" className="mb-[30px] px-[60px]">
        <Logo
          width={width !== undefined && width <= 640 ? '62.22' : undefined}
          height={width !== undefined && width <= 640 ? '23.58' : undefined}
        />
      </Link>
      <ul className="flex flex-col items-start w-full social-sidebar-list flex-grow">
        {menu.map((data, idx) => (
          <Link className={isLinkActive(data.url)} href={data.url} key={idx}>
            <Image width={20} height={20} src={data.image} alt="" />
            <h1>{data.title}</h1>
          </Link>
        ))}
      </ul>
      <div className="mx-auto">
        <button
          className="bg-red-500 text-white font-semibold rounded-2xl py-2 px-11 w-full"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SidebarLogin;
