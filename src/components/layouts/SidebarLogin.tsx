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

const SidebarLogin: React.FC = () => {
  const width = useWindowInnerWidth();
  const router = useRouter();
  const isLinkActive = (href: string): string => {
    return router.asPath === href ? 'active' : '';
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Link href="https://seeds.finance" className="mb-[30px] px-[60px]">
        <Logo
          width={width !== undefined && width <= 640 ? '62.22' : undefined}
          height={width !== undefined && width <= 640 ? '23.58' : undefined}
        />
      </Link>
      <ul className="flex flex-col items-start w-full social-sidebar-list">
        <Link className={isLinkActive('/social')} href="/social">
          <Image width={20} height={20} src={social} alt="" />
          <h1>Social</h1>
        </Link>
        <Link className={isLinkActive('/homepage')} href="/homepage">
          <Image width={20} height={20} src={homepage} alt="" />
          <h1>Homepage</h1>
        </Link>
        <Link href="/connect" className={isLinkActive('/connect')}>
          <Image width={20} height={20} src={connect} alt="" />
          <h1>Connect</h1>
        </Link>
        <Link className={isLinkActive('/play')} href="/play">
          <Image width={20} height={20} src={play} alt="" />
          <h1>Play</h1>
        </Link>
        <Link className={isLinkActive('/setting')} href="/setting">
          <Image width={20} height={20} src={setting} alt="" />
          <h1>Setting</h1>
        </Link>
      </ul>
    </div>
  );
};

export default SidebarLogin;
