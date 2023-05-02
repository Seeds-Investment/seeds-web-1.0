import CCard from '@/components/CCard';
import Image from 'next/image';
import { Hello } from 'public/assets/images';
import { LineChart } from 'public/assets/vector';
import { useTranslation } from 'react-i18next';

export interface IAuthLayout {
  children: JSX.Element;
}

const AuthLayout = ({ children }: IAuthLayout): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <div className="bg-gradient-to-bl from-[#7856E1] absolute top-0 left-0 z-10 to-[#44FFBB] h-screen w-full lg:w-1/2 lg:flex justify-center items-center bg-gray-500">
        <Image
          src={LineChart}
          className="absolute bottom-0 ml-10 md:shrink-0 hidden lg:flex w-auto h-auto"
          alt="line"
        />
      </div>
      <div className="absolute top-0 left-0 z-0 h-full w-full">
        <div className="flex justify-center lg:justify-around">
          <div className="bg-[#7856E1] rounded-full h-72 w-72 blur-2xl hidden lg:flex"></div>
          <div className="bg-[#44FFBB] rounded-full h-72 w-72 blur-3xl object-cover"></div>
        </div>

        <div className="flex justify-between items-end">
          <div className="bg-[#7856E1] rounded-full h- w-48 rounded-r-none blur-xl hidden lg:flex"></div>
          <div className="bg-[#44FFBB] rounded-full h-80 w-48 lg:ml-40 rounded-l-none blur-3xl"></div>
          <div className="bg-[#7856E1] rounded-full h-80 w-48 rounded-r-none blur-3xl"></div>
        </div>
      </div>
      <div className="flex justify-evenly lg:justify-around gap-8 items-center h-screen">
        <CCard className=" w-[26rem] ml-10 hidden lg:block z-20 border-y-white h-[40rem]  border-2 border-x-teal-200 p-4  bg-blue-100 backdrop-filter backdrop-blur-2xl bg-opacity-25 rounded-[60px]">
          <div className="flex py-5  flex-col justify-center items-center">
            <p className="text-4xl font-bold text-white mt-20 ml-5">
              {t('authPage.welcoming')}
            </p>
            <p className="mt-5 mx-5 text-xl text-white">
              {t('authPage.description')}
            </p>
          </div>
          <Image
            src={Hello}
            className="object-cover absolute bottom-0 right-0"
            height={480}
            alt="hello"
          />
        </CCard>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
