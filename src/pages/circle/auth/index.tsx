import Image from 'next/image';
import Link from 'next/link';

import CongratsOnBoarding from '@/assets/images/Congrat-Onboarding.png';
import CButton from '@/components/CButton';
import AuthLayout from '@/components/layouts/AuthLayout';
import FormCard from '@/containers/auth/FormCard';

const AuthIndex = (): JSX.Element => {
  return (
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
  );
};

AuthIndex.getLayout = function getLayout(page: JSX.Element) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default AuthIndex;
