import ChevronDown from '@/assets/landing-page/header/ChevronDown.svg';
import SeedLogo from '@/assets/landing-page/header/SeedsLogo.svg';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { getUserInfo } from '@/repository/profile.repository';
import LanguageContext from '@/store/language/language-context';
import {
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ID from 'public/assets/images/flags/ID.png';
import US from 'public/assets/images/flags/US.png';
import { useContext, useEffect, useState } from 'react';

const pathUrl = [
  { id: 1, name: 'Home', url: '/' },
  { id: 2, name: 'Product', url: '/product' },
  { id: 3, name: 'Seedspedia', url: '/seedspedia' },
  { id: 4, name: 'Market', url: '/market' },
  { id: 5, name: 'Partner', url: '/partner' },
  { id: 6, name: 'About Us', url: '/about-us' }
];

const languageList = [
  { id: 1, language: 'ID', flag: ID },
  { id: 2, language: 'EN', flag: US }
];

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

function clearLocalStorageAndRefreshPage(): void {
  // Remove specific items from local storage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expiresAt');
  localStorage.removeItem('keepMeLoggedIn');

  // Refresh the page
  window.location.reload();
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

  const logout = (): void => {
    clearLocalStorageAndRefreshPage();
  };

  const navList = (
    <ul className="flex flex-col gap-3 text-center w-full">
      <li>
        <Link
          className={`${
            router.pathname === '/' ? 'text-[#3AC4A0]' : 'text-[#7C7C7C]'
          }`}
          href="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className={`${
            router.pathname === '/product' ? 'text-[#3AC4A0]' : 'text-[#7C7C7C]'
          }`}
          href="/product"
        >
          Products
        </Link>
      </li>
      <li>
        <Link
          className={`${
            router.pathname === '/seedspedia'
              ? 'text-[#3AC4A0]'
              : 'text-[#7C7C7C]'
          }`}
          href="/seedspedia"
        >
          Seedspedia
        </Link>
      </li>
      <li>
        <Link
          className={`${
            router.pathname === '/about-us'
              ? 'text-[#3AC4A0]'
              : 'text-[#7C7C7C]'
          }`}
          href="/about-us"
        >
          About Us
        </Link>
      </li>
      {accessToken !== null && userInfo !== null ? (
        <></>
      ) : (
        <li>
          <Link href="/auth/login" className="cursor-pointer text-white">
            Login
          </Link>
        </li>
      )}
      <li>
        {accessToken !== null && userInfo !== null ? (
          <>
            <div className="flex justify-center gap-4">
              <div className="mt-2 font-bold text-center justify-center">
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
            <button
              className="block bg-[#DD2525] mx-auto my-4 border border-transparent text-white text-base font-semibold py-2 px-8 xl:mx-8 rounded-full leading-tight focus:outline-none focus:shadow-outline"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : null}
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
              strokeWidth="3"
              stroke="#FFFFFF"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </li>
    </ul>
  );

  return (
    <nav>
      {/* TODO: NEW HEADER */}
      <section className="flex justify-evenly h-20 items-center">
        <Link href="https://seeds.finance">
          <Image alt="SeedsLogo" src={SeedLogo} width={133} height={46} />
        </Link>
        <section className="flex flex-row font-poppins text-xl font-semibold gap-4 items-center">
          {pathUrl.map((item, index) => {
            return (
              <Link
                className={`${
                  router.pathname === `${item.url}`
                    ? 'text-[#3AC4A0] underline-offset-8 underline'
                    : 'text-[#7C7C7C]'
                } px-3`}
                href={`${item.url}`}
                key={item.id}
              >
                {item.name}
              </Link>
            );
          })}
        </section>
        <section className="flex items-center gap-8">
          <Link
            href="/auth/login"
            className=" flex justify-center items-center cursor-pointer text-base font-semibold font-poppins text-white w-[108px] h-[42px] bg-[#3AC4A0] rounded-full"
          >
            Login
          </Link>
          <Menu>
            <MenuHandler>
              <Button
                ripple={false}
                className="flex items-center justify-center gap-1.5 rounded-full bg-[#E9E9E9] w-[110px] h-11 hover:shadow-none shadow-none"
              >
                <Typography className="text-lg text-black font-semibold font-poppins">
                  {selectedLanguage}
                </Typography>
                {selectedLanguage === 'EN' ? (
                  <Image src={US} width={30} alt="US-flag" />
                ) : (
                  <Image src={ID} width={30} alt="ID-flag" />
                )}
                <Image src={ChevronDown} alt="ChevronDown" />
              </Button>
            </MenuHandler>
            <MenuList className="flex flex-col items-center p-0 bg-transparent border-none shadow-none">
              {languageList
                .filter(item => item.language !== selectedLanguage)
                .map((item, index) => {
                  return (
                    <MenuItem
                      className="p-0 w-[110px] bg-white rounded-full"
                      onClick={() => {
                        handleLanguageChange(item.language as 'EN' | 'ID');
                      }}
                      key={item.id}
                    >
                      {item.language}
                    </MenuItem>
                  );
                })}
            </MenuList>
          </Menu>
        </section>
      </section>
      {/* TODO: END NEW HEADER */}
      <section className="flex xl:hidden  flex-col xl:w-auto w-full">
        <section className="flex flex-row w-full">
          <Link href="https://seeds.finance">
            <Image
              alt="SeedsLogo"
              src={SeedLogo}
              width={width !== undefined && width <= 640 ? '62.22' : undefined}
              height={width !== undefined && width <= 640 ? '23.58' : undefined}
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
    </nav>
  );
};

export default Header;
