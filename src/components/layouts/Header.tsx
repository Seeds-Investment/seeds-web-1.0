import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { getUserInfo } from '@/repository/profile.repository';
import LanguageContext from '@/store/language/language-context';
import { IconButton } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ID from 'public/assets/images/flags/ID.png';
import US from 'public/assets/images/flags/US.png';
import { useContext, useEffect, useState } from 'react';
import Button from '../ui/button/Button';
import Logo from '../ui/vector/Logo';

interface UserData {
  name: string;
  seedsTag: string;
  email: string;
  pin: string;
  avatar: string;
  bio: string;
  birthDate: string;
  phone: string;
  _pin: string;
}

const Header: React.FC = () => {
  const languageCtx = useContext(LanguageContext);
  const router = useRouter();

  const width = useWindowInnerWidth();
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', (): void => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    });
  }, []);

  const _handleRedirectJoinUs = (): any => {
    return router.push('/auth/register');
  };
  const accessToken =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'ID'>('EN');

  const handleLanguageChange = (language: 'EN' | 'ID'): void => {
    setSelectedLanguage(language);
    languageCtx.languageHandler(language);
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await getUserInfo();
        setUserInfo(response);
      } catch (error) {
        console.log(error);
      }
    };

    void fetchData();
  }, []);

  const navList = (
    <ul className="flex flex-col gap-3 text-center w-full">
      <li>
        <Link
          className={`${
            router.pathname === '/' ? 'text-[#261679]' : 'text-white'
          }`}
          href="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className={`${
            router.pathname === '/product' ? 'text-[#261679]' : 'text-white'
          }`}
          href="/product"
        >
          Product
        </Link>
      </li>
      <li>
        <Link
          className={`${
            router.pathname === '/article' ? 'text-[#261679]' : 'text-white'
          }`}
          href="/article"
        >
          Article
        </Link>
      </li>
      <li>
        <Link
          className={`${
            router.pathname === '/about-us' ? 'text-[#261679]' : 'text-white'
          }`}
          href="/about-us"
        >
          About Us
        </Link>
      </li>
      <li>
        <Link href="/auth/login" className="cursor-pointer text-white">
          Login
        </Link>
      </li>
      <li>
        {accessToken !== null && userInfo !== null ? (
          <div className="flex">
            <div className="mt-2 mx-2 font-bold hidden lg:block">
              Hi, {userInfo.name}
            </div>
            <Image
              alt="image"
              width={17}
              height={17}
              className="rounded-full w-10"
              src={userInfo.avatar}
            />
          </div>
        ) : (
          <Button
            variant="purple"
            label="Join Us"
            containerClasses="w-full p-3 sm:h-11 rounded-full"
            onClick={() => _handleRedirectJoinUs()}
          />
        )}
      </li>
      <li>
        <div className="relative inline-flex">
          <select
            className="block appearance-none bg-transparent border border-transparent text-white text-base font-semibold py-2 rounded leading-tight focus:outline-none focus:shadow-outline"
            value={selectedLanguage}
            onChange={(e): void => {
              handleLanguageChange(e.target.value as 'EN' | 'ID');
            }}
          >
            <option value="EN">EN</option>
            <option value="ID">ID</option>
          </select>
          <div className="flex items-center ml-2">
            {languageCtx.language === 'EN' ? (
              <Image src={US} width={16} alt="US-flag" />
            ) : (
              <Image src={ID} width={16} alt="ID-flag" />
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke="#FFFFFF"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </li>
    </ul>
  );

  return (
    <header className="">
      <div className="document-header xl:pt-0 pt-5 xl:px-[30px] xl:py-0 py-5 px-5 bg-[#9A76FE80]/50">
        <section className="flex flex-col xl:-ml-[300px] xl:w-auto w-full">
          <section className="xl:hidden flex flex-row w-full">
            <Link href="https://seeds.finance">
              <Logo
                width={
                  width !== undefined && width <= 640 ? '62.22' : undefined
                }
                height={
                  width !== undefined && width <= 640 ? '23.58' : undefined
                }
              />
            </Link>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={(): void => {
                setOpenNav(!openNav);
              }}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </section>
          {openNav ? (
            <section className="xl:hidden flex flex-col w-full mx-auto mt-4 mb-5 text-center text-base font-semibold">
              {navList}
            </section>
          ) : (
            <></>
          )}
        </section>
        <section className="xl:flex hidden flex-row">
          <Link href="https://seeds.finance">
            <Logo
              width={width !== undefined && width <= 640 ? '62.22' : undefined}
              height={width !== undefined && width <= 640 ? '23.58' : undefined}
            />
          </Link>
          <section className="flex flex-row text-base font-semibold xl:ml-8 gap-4 items-center">
            <Link
              className={`${
                router.pathname === '/'
                  ? 'text-[#261679] underline-offset-8 underline'
                  : 'text-white'
              }`}
              href="/"
            >
              Home
            </Link>
            <Link
              className={`${
                router.pathname === '/product'
                  ? 'text-[#261679] underline-offset-8 underline'
                  : 'text-white'
              }`}
              href="/product"
            >
              Product
            </Link>
            <Link
              className={`${
                router.pathname === '/article'
                  ? 'text-[#261679] underline-offset-8 underline'
                  : 'text-white'
              }`}
              href="/article"
            >
              Article
            </Link>
            <Link
              className={`${
                router.pathname === '/about-us'
                  ? 'text-[#261679] underline-offset-8 underline'
                  : 'text-white'
              }`}
              href="/about-us"
            >
              About Us
            </Link>
          </section>
        </section>
        <div className="xl:flex hidden items-center gap-4">
          <Link
            href="/auth/login"
            className="cursor-pointer text-base font-semibold text-white mr-3"
          >
            Login
          </Link>
          {accessToken !== null && userInfo !== null ? (
            <div className="flex">
              <div className="mt-2 mx-2 font-bold hidden lg:block">
                Hi, {userInfo.name}
              </div>
              <Image
                alt="image"
                width={17}
                height={17}
                className="rounded-full w-10"
                src={userInfo.avatar}
              />
            </div>
          ) : (
            <Button
              variant="purple"
              label="Join Us"
              containerClasses="sm:w-[5.7rem] w-[4.5rem] h-7 sm:h-11 rounded-full"
              onClick={() => _handleRedirectJoinUs()}
            />
          )}
          <div className="relative inline-flex">
            <button className="block bg-transparent border border-transparent text-white px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"></button>
            <select
              className="block appearance-none bg-transparent border border-transparent text-white text-base font-semibold py-2 rounded leading-tight focus:outline-none focus:shadow-outline"
              value={selectedLanguage}
              onChange={(e): void => {
                handleLanguageChange(e.target.value as 'EN' | 'ID');
              }}
            >
              <option value="EN">EN</option>
              <option value="ID">ID</option>
            </select>
            <div className="flex items-center ml-2">
              {languageCtx.language === 'EN' ? (
                <Image src={US} width={16} alt="US-flag" />
              ) : (
                <Image src={ID} width={16} alt="ID-flag" />
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="#FFFFFF"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
