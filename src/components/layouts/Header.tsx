import BurgerMenu from '@/assets/landing-page/header/BurgerMenu.svg';
import ChevronDown from '@/assets/landing-page/header/ChevronDown.svg';
import SeedLogo from '@/assets/landing-page/header/SeedsLogo.svg';
import { getUserInfo } from '@/repository/profile.repository';
import LanguageContext from '@/store/language/language-context';
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography
} from '@material-tailwind/react';
import { trackEvent } from '@phntms/next-gtm';
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
  const [userInfo, setUserInfo] = useState<any>([]);
  const languageCtx = useContext(LanguageContext);
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'ID'>('EN');

  const handleLanguageChange = (language: 'EN' | 'ID'): void => {
    setSelectedLanguage(language);
    languageCtx.languageHandler(language);
  };

  const logout = (): void => {
    clearLocalStorageAndRefreshPage();
  };

  const [token, setToken] = useState(null);
  console.log(token);
  useEffect(() => {
    const storedToken: any = localStorage.getItem('accessToken');
    setToken(storedToken);
    const user = navigator.userAgent;
    console.log(user);
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
    <nav>
      {/* TODO: NEW HEADER */}
      <section className="xl:flex hidden justify-evenly h-20 items-center">
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
                onClick={() => {
                  trackEvent({
                    event: `Seeds_view_${item.name.toLowerCase()}_page_web`,
                    data: {
                      user_id: userInfo?.id,
                      page_name: item.name,
                      created_at: new Date().toString()
                    }
                  });
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </section>
        <section className="flex items-center gap-8">
          {token === null ? (
            <Link
              href="/auth/login"
              className=" flex justify-center items-center cursor-pointer text-base font-semibold font-poppins text-white w-[108px] h-[42px] bg-[#3AC4A0] rounded-full"
            >
              Login
            </Link>
          ) : (
            <div
              onClick={logout}
              className=" flex justify-center items-center cursor-pointer text-base font-semibold font-poppins text-white w-[108px] h-[42px] bg-[#DD2525] rounded-full"
            >
              Logout
            </div>
          )}

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
                      <Button
                        ripple={false}
                        className="flex items-center justify-center gap-1.5 rounded-full bg-[#E9E9E9] w-[110px] h-11 hover:shadow-none shadow-none"
                      >
                        <Typography className="text-lg text-black font-semibold font-poppins">
                          {item.language}
                        </Typography>
                        <Image
                          src={item.flag}
                          width={19}
                          alt={`${item.language} flag`}
                        />
                      </Button>
                    </MenuItem>
                  );
                })}
            </MenuList>
          </Menu>
        </section>
      </section>
      {/* TODO: END NEW HEADER */}
      <section className="flex xl:hidden justify-between mx-4 items-center h-20">
        <Link href="https://seeds.finance">
          <Image alt="SeedsLogo" src={SeedLogo} height={46} />
        </Link>
        <Menu
          placement="left-start"
          offset={-24}
          dismiss={{ ancestorScroll: true }}
        >
          <MenuHandler>
            <Image
              src={BurgerMenu}
              alt="BurgerMenu"
              className="cursor-pointer z-20"
            />
          </MenuHandler>
          <MenuList className="pb-12 shadow-none border-none lg:hidden flex flex-col">
            {pathUrl.map((item, index) => {
              return (
                <MenuItem
                  key={item.id}
                  className="hover:bg-transparent focus:bg-transparent"
                >
                  <Link
                    href={item.url}
                    className={` font-poppins font-normal text-base ${
                      router.pathname === item.url
                        ? 'text-[#3AC4A0]'
                        : 'text-[#7C7C7C]'
                    }`}
                    onClick={() => {
                      trackEvent({
                        event: `Seeds_view_${item.name.toLowerCase()}_page_web`,
                        data: {
                          user_id: userInfo?.id,
                          page_name: item.name,
                          created_at: new Date().toString()
                        }
                      });
                    }}
                  >
                    {item.name}
                  </Link>
                </MenuItem>
              );
            })}
            <MenuItem className="flex justify-center hover:bg-transparent focus:bg-transparent">
              {token !== null ? (
                <div
                  onClick={logout}
                  className=" flex justify-center items-center cursor-pointer text-base font-semibold font-poppins text-white w-[108px] h-[42px] bg-[#DD2525] rounded-full"
                >
                  Logout
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className=" flex justify-center items-center cursor-pointer text-base font-semibold font-poppins text-white w-[108px] h-[42px] bg-[#3AC4A0] rounded-full"
                >
                  Login
                </Link>
              )}
            </MenuItem>
            <MenuItem className="flex justify-center hover:bg-transparent focus:bg-transparent">
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
                          <Button
                            ripple={false}
                            className="flex items-center justify-center gap-1.5 rounded-full bg-[#E9E9E9] w-[110px] h-11 hover:shadow-none shadow-none"
                          >
                            <Typography className="text-lg text-black font-semibold font-poppins">
                              {item.language}
                            </Typography>
                            <Image
                              src={item.flag}
                              width={19}
                              alt={`${item.language} flag`}
                            />
                          </Button>
                        </MenuItem>
                      );
                    })}
                </MenuList>
              </Menu>
            </MenuItem>
          </MenuList>
        </Menu>
      </section>
    </nav>
  );
};

export default Header;
