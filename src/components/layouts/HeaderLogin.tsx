import { getUserInfo } from '@/repository/profile.repository';
import Image from 'next/image';
import ID from 'public/assets/social/flag/ID.png';
import US from 'public/assets/social/flag/US.png';
import { useEffect, useState } from 'react';
import ChatIcon from '../svgs/chatIcon';
import NotificationIcon from '../svgs/notificationIcon';

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

const HeaderLogin: React.FC = () => {
  const accessToken =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const [userInfo, setUserInfo] = useState<UserData | null>(null);

  const handleGetUserInfo = async (): Promise<void> => {
    try {
      const response = await getUserInfo();
      setUserInfo(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void handleGetUserInfo();
  }, []);

  return (
    <section className="flex flex-row items-center gap-5">
      <section className="bg-[#0000001A] flex flex-row gap-2 rounded-full backdrop-blur-[10px] py-2 px-4">
        <h1 className="text-lg font-semibold">ID</h1>
        <Image
          src={ID}
          className="w-[30px] h-[20px] self-center"
          alt="ID-flag"
        />
      </section>
      <section className="border-r h-4 border-black mx-4 my-3"></section>
      <section className="bg-[#0000001A] flex flex-row gap-2 rounded-full backdrop-blur-[10px] py-2 px-4">
        <h1 className="text-lg font-semibold">EN</h1>
        <Image
          src={US}
          className="w-[30px] h-[20px] self-center"
          alt="ID-flag"
        />
      </section>
      <section>
        <NotificationIcon />
      </section>
      <section>
        <ChatIcon />
      </section>
      {accessToken !== null && userInfo !== null ? (
        <Image
          alt="image"
          width={17}
          height={17}
          className="rounded-full w-10"
          src={userInfo.avatar}
        />
      ) : (
        <></>
      )}
    </section>
  );
};

export default HeaderLogin;
