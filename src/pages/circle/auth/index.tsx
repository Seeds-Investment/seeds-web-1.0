import CButton from '@/components/CButton';
import CCard from '@/components/CCard';
import FormCard from '@/containers/auth/FormCard';
import Image from 'next/image';
import Link from 'next/link';
import CongratsOnBoarding from '../../../assets/images/Congrat-Onboarding.png';
import Hello from '../../../assets/images/Hello.png';
import Line from '../../../assets/vector/line.png';

const AuthIndex: React.FC = () => {
  return (
    <>
      <div className="relative">
        <div className="bg-gradient-to-bl from-[#7856E1] absolute top-0 left-0 z-10 to-[#44FFBB] h-screen w-full lg:w-1/2 lg:flex justify-center items-center bg-gray-500">
          <Image
            src={Line}
            alt="line"
            className="absolute bottom-0 ml-10 md:shrink-0 hidden lg:flex"
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
          <CCard className=" w-[26rem] ml-10 hidden lg:block z-20 border-x-white-500 h-[40rem]  border-2 border-x-transparent p-4  bg-blue-100 rounded-md backdrop-filter backdrop-blur-2xl bg-opacity-20 rounded-[60px]">
            <div className="flex py-5  flex-col justify-center items-center">
              <p className="text-4xl font-bold text-white mt-20 mr-5">
                Welcome to Seeds
              </p>
              <p className="mt-5 mx-5 text-xl text-white">
                {' '}
                Start and expand your investment journey with friends!
              </p>
            </div>
            <Image
              src={Hello}
              className="object-cover absolute  bottom-0 right-0"
              alt="hello"
              height={480}
            />
          </CCard>
          <div>
            <FormCard className="h-[625px] lg:w-[30rem] xl:w-[35rem] m-5 z-20 ">
              <div className="flex flex-col lg:w-[30rem] mx-auto justify-center md:shrink-0">
                <Image
                  alt="congrats-onboarding"
                  className="md:shrink-10 lg:w-45 mx-auto mb-5"
                  src={CongratsOnBoarding}
                />
                <p className="text-center font-bold text-xl lg:text-2xl text-black rounded-lg">
                  Welcome to Seeds
                </p>
                <p className="lg:text-xl text-l text-[#7C7C7C] p-5 text-center">
                  Start and expand your investment journey with friends!
                </p>
                <CButton className="bg-[#7555DA] mx-auto rounded-full lg:w-[20rem]  p-5">
                  Enter as a guest
                </CButton>
                <small className="text-center lg:mt-5 mt-2 text-black">
                  By clicking Register, you agree with Seeds{' '}
                  <Link href={''} className="font-bold text-[#3AC4A0]">
                    Terms & Conditions
                  </Link>
                </small>
                <div className="flex justify-around py-5 gap-5 px-5">
                  <CButton className="border bg-transparent w-1/2 text-[#3AC4A0] hover:bg-[#3AC4A0] hover:text-white border-[#3AC4A0] rounded-full">
                    Login
                  </CButton>
                  <CButton className="border bg-[#3AC4A0] rounded-full border-[#3AC4A0] w-1/2">
                    Register
                  </CButton>
                </div>
              </div>
            </FormCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthIndex;
