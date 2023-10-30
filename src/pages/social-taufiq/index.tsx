import { verifiedUser } from '@/repository/people.repository';
import { getUserInfo } from '@/repository/profile.repository';
import {
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import ID from 'public/assets/social/flag/ID.png';
import EN from 'public/assets/social/flag/US.png';
import seeds from 'public/assets/social/seeds.svg';
import verified from 'public/assets/social/verified.svg';
import { useEffect, useState } from 'react';
import type { Settings } from 'react-slick';
import Slider from 'react-slick';

interface UserData {
  name: string;
  seedsTag: string;
  email: string;
  pin: string;
  avatar: string;
  bio: string;
  birthDate: string;
  phone: string;
  preferredLanguage: string;
  _pin: string;
}

interface VerifiedData {
  id: string;
  name: string;
  seeds_tag: string;
  avatar: string;
  followers: string;
}

export default function Social(): React.ReactElement {
  const settings: Settings = {
    slidesToShow: 4,
    speed: 500,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('circle');

  const accessToken =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [verifiedData, setVerifiedData] = useState<VerifiedData[]>();
  const [isLoadingVerified, setLoadingVerified] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await getUserInfo();
        setUserInfo(response);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchVerifiedUser = async (): Promise<void> => {
      setLoadingVerified(true);
      try {
        const response = await verifiedUser();
        setVerifiedData(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoadingVerified(false);
    };

    void fetchData();
    void fetchVerifiedUser();
  }, []);

  const handleSectionClick = (sectionName: string): void => {
    setSelectedFilter(sectionName);
  };
  const data = [
    {
      label: 'Following',
      value: 'following',
      desc: 'Following'
    },
    {
      label: 'For You',
      value: 'foryou',
      desc: 'For You'
    },
    {
      label: 'Space',
      value: 'space',
      desc: 'Space'
    }
  ];
  const toggleShowFilter = (): void => {
    setShowFilter(!showFilter);
  };
  return (
    <>
      <div className="bg-[#FFF] flex flex-col rounded-xl gap-y-5 mt-6 p-5">
        <section className="flex flex-row w-full justify-center gap-5">
          <input
            type="text"
            className="border-[#E9E9E9] border border-solid bg-[#FFF] p-1 px-6 rounded-[10px] w-[40%]"
            name=""
            id=""
            placeholder="Search"
          />
          <div className="flex flex-row py-1 px-3 border border-solid border-[#E9E9E9] bg-[#FFF] rounded-md text-[#7C7C7C] text-xs font-normal gap-1">
            <section
              className="cursor-pointer flex flex-row gap-3"
              onClick={toggleShowFilter}
            >
              <section className="self-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <g clip-path="url(#clip0_1486_7982)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.41663 2.33333C6.41663 2.6555 6.15546 2.91667 5.83329 2.91667L1.74996 2.91667C1.42779 2.91667 1.16663 2.6555 1.16663 2.33333C1.16663 2.01117 1.42779 1.75 1.74996 1.75L5.83329 1.75C6.15546 1.75 6.41663 2.01117 6.41663 2.33333Z"
                      fill="#7C7C7C"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.8334 2.33333C12.8334 2.6555 12.5722 2.91667 12.25 2.91667L8.16671 2.91667C7.84454 2.91667 7.58337 2.6555 7.58337 2.33333C7.58337 2.01117 7.84454 1.75 8.16671 1.75L12.25 1.75C12.5722 1.75 12.8334 2.01117 12.8334 2.33333Z"
                      fill="#7C7C7C"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.58337 6.99999C7.58337 7.32216 7.32221 7.58332 7.00004 7.58332L1.75004 7.58332C1.42787 7.58332 1.16671 7.32216 1.16671 6.99999C1.16671 6.67782 1.42787 6.41666 1.75004 6.41666L7.00004 6.41666C7.32221 6.41666 7.58337 6.67782 7.58337 6.99999Z"
                      fill="#7C7C7C"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.8334 6.99999C12.8334 7.32216 12.5722 7.58332 12.25 7.58332L9.33337 7.58332C9.01121 7.58332 8.75004 7.32216 8.75004 6.99999C8.75004 6.67782 9.01121 6.41666 9.33337 6.41666L12.25 6.41666C12.5722 6.41666 12.8334 6.67782 12.8334 6.99999Z"
                      fill="#7C7C7C"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.25 11.6667C5.25 11.9888 4.98883 12.25 4.66667 12.25L1.75 12.25C1.42783 12.25 1.16667 11.9888 1.16667 11.6667C1.16667 11.3445 1.42783 11.0833 1.75 11.0833L4.66667 11.0833C4.98883 11.0833 5.25 11.3445 5.25 11.6667Z"
                      fill="#7C7C7C"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.8334 11.6667C12.8334 11.9888 12.5722 12.25 12.25 12.25L7.00004 12.25C6.67787 12.25 6.41671 11.9888 6.41671 11.6667C6.41671 11.3445 6.67787 11.0833 7.00004 11.0833L12.25 11.0833C12.5722 11.0833 12.8334 11.3445 12.8334 11.6667Z"
                      fill="#7C7C7C"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.83329 -2.54983e-08C6.15546 -1.1416e-08 6.41663 0.261167 6.41663 0.583333L6.41663 4.08333C6.41663 4.4055 6.15546 4.66667 5.83329 4.66667C5.51113 4.66667 5.24996 4.4055 5.24996 4.08333L5.24996 0.583333C5.24996 0.261167 5.51113 -3.95806e-08 5.83329 -2.54983e-08Z"
                      fill="#7C7C7C"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.33329 4.66666C9.65546 4.66666 9.91663 4.92782 9.91663 5.24999L9.91663 8.74999C9.91663 9.07216 9.65546 9.33332 9.33329 9.33332C9.01113 9.33332 8.74996 9.07216 8.74996 8.74999L8.74996 5.24999C8.74996 4.92782 9.01113 4.66666 9.33329 4.66666Z"
                      fill="#7C7C7C"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.66667 9.33334C4.98883 9.33334 5.25 9.59451 5.25 9.91668L5.25 13.4167C5.25 13.7388 4.98883 14 4.66667 14C4.3445 14 4.08333 13.7388 4.08333 13.4167L4.08333 9.91668C4.08333 9.59451 4.3445 9.33334 4.66667 9.33334Z"
                      fill="#7C7C7C"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1486_7982">
                      <rect
                        width="14"
                        height="14"
                        fill="white"
                        transform="translate(14) rotate(90)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </section>
              <p className="self-center">Filter</p>
            </section>
            {showFilter && (
              <div className="bg-[#FFF] rounded-[15px] py-2 px-4 z-40 gap-[10px] absolute mt-10">
                <section className="flex flex-col text-[#262626] text-xs">
                  <section
                    className={`flex flex-col gap-1 py-2 px-4 rounded-lg w-[20vw] cursor-pointer ${
                      selectedFilter === 'All' ? 'bg-[#DCFCE4]' : ''
                    }`}
                    onClick={() => {
                      handleSectionClick('All');
                    }}
                  >
                    <h1 className="font-semibold">All</h1>
                    <p className="font-normal">Everyone</p>
                  </section>
                  <section
                    className={`flex flex-col gap-1 py-2 px-4 rounded-lg cursor-pointer ${
                      selectedFilter === 'Personal User' ? 'bg-[#DCFCE4]' : ''
                    }`}
                    onClick={() => {
                      handleSectionClick('Personal User');
                    }}
                  >
                    <h1 className="font-semibold">Personal User</h1>
                    <p className="font-normal">Your only friend</p>
                  </section>
                  <section
                    className={`flex flex-col gap-1 py-2 px-4 rounded-lg cursor-pointer ${
                      selectedFilter === 'Post by Circle' ? 'bg-[#DCFCE4]' : ''
                    }`}
                    onClick={() => {
                      handleSectionClick('Post by Circle');
                    }}
                  >
                    <h1 className="font-semibold">Post by Circle</h1>
                    <p className="font-normal">Create a post in circle</p>
                  </section>
                </section>
              </div>
            )}
          </div>
        </section>
        <Tabs value={activeTab}>
          <TabsHeader
            className="rounded-none border-b border-[#BDBDBD] bg-transparent p-0"
            indicatorProps={{
              className:
                'bg-transparent border-b-4 mx-auto border-[#3AC4A0] shadow-none rounded-none'
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => {
                  setActiveTab(value);
                }}
                className={
                  activeTab === value
                    ? 'text-base font-semibold text-[#27A590] pb-2'
                    : 'text-base font-semibold text-[#BDBDBD] pb-2'
                }
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel
                className={` ${
                  activeTab === 'following'
                    ? 'xl:grid xl:grid-cols-4 xl:gap-4'
                    : ''
                }`}
                key={value}
                value={value}
              >
                {value === 'following' ? '' : ''}
                {value === 'foryou' ? '' : ''}
                {value === 'space' ? '' : ''}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
      <div className="bg-[#FFF] flex flex-row rounded-xl mt-6 p-5">
        <section className="flex">
          {accessToken !== null && userInfo !== null ? (
            <Image
              alt="image"
              width={48}
              height={48}
              className="rounded-full w-12 h-12 mr-2"
              src={userInfo.avatar}
            />
          ) : (
            <></>
          )}
        </section>
        <section className="flex flex-col w-full">
          <section className="flex flex-row items-center gap-2">
            <h1 className="text-[#262626] text-base font-semibold">
              {userInfo?.name}
            </h1>
            <Image alt="verified" src={verified} />
            <Image src={seeds} width={16} alt="seeds" />
            <section className="bg-[#DCFCE4] text-[#1A857D] rounded-2xl py-1 px-2 gap-1 flex justify-center">
              Investor
            </section>
            {userInfo?.preferredLanguage === 'en' ? (
              <Image
                src={EN}
                className="w-[25px] h-[16px] self-center"
                alt="EN-flag"
              />
            ) : (
              <Image
                src={ID}
                className="w-[25px] h-[16px] self-center"
                alt="ID-flag"
              />
            )}
          </section>
          <p className="text-[#7C7C7C] text-base font-light">
            @{userInfo?.seedsTag}
          </p>
          <textarea
            name=""
            id=""
            cols={30}
            rows={3}
            className="mt-2 p-4 rounded-2xl border-[#BDBDBD] border"
            placeholder="What do you want to discuss? Start a post"
          ></textarea>
        </section>
      </div>
      <div className="bg-[#FFF] flex flex-col rounded-xl mt-6 p-5">
        <h1 className="text-[#262626] text-base font-semibold">
          Trending Profile
        </h1>
        <p className="text-[#7C7C7C] text-sm font-light">
          Discover the most trending profiles.
        </p>
        {verifiedData !== undefined && (
          <>
            <div className="my-5">
              {isLoadingVerified ? (
                <Typography className="w-full text-base font-semibold text-center">
                  Loading....
                </Typography>
              ) : verifiedData.length !== 0 ? (
                <Slider {...settings}>
                  {verifiedData.map((data, idx) => {
                    return (
                      <div className="relative overflow-hidden mr-2" key={idx}>
                        <div className="p-2">
                          <div className="bg-[#F9F9F9] border border-[#E9E9E9] rounded-xl">
                            <section className="flex flex-col items-center justify-center p-4 gap-2">
                              <Image
                                src={data?.avatar}
                                alt="people"
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <h1 className="text-[#262626] text-sm text-center font-semibold">
                                {data?.name}
                              </h1>
                              <p className="text-[#7C7C7C] text-sm font-light">
                                @{data?.seeds_tag}
                              </p>
                              <p className="text-[#262626] text-xs font-normal">
                                {data?.followers} Followers
                              </p>
                              <Button className="bg-[#3AC4A0] rounded-full">
                                Follow
                              </Button>
                            </section>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              ) : (
                <p>Not found</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
