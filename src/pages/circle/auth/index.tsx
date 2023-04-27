import Image from 'next/image';
import Link from 'next/link';

import CongratsOnBoarding from '@/assets/images/Congrat-Onboarding.png';
import CButton from '@/components/CButton';
import AuthLayout from '@/components/layouts/AuthLayout';
import FormCard from '@/containers/auth/FormCard';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const AuthIndex = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <FormCard className="h-[625px] lg:w-[30rem] xl:w-[35rem] m-5 z-20 ">
      <div className="flex flex-col lg:w-[30rem] mx-auto justify-center md:shrink-0">
        <Image
          alt="congrats-onboarding"
          className="md:shrink-10 lg:w-45 mx-auto mb-5"
          src={CongratsOnBoarding}
        />
        <p className="text-center font-bold text-xl lg:text-2xl text-black rounded-lg">
          {t('authPage.welcoming')}
        </p>
        <p className="lg:text-xl text-l text-[#7C7C7C] p-5 text-center">
          {t('authPage.description')}
        </p>
        <CButton className="bg-[#7555DA] mx-auto rounded-full lg:w-[20rem]  p-5">
          {t('authPage.guest')}
        </CButton>
        <small className="text-center lg:mt-5 mt-2 text-black">
          {t('authPage.agreement')}
          <Link href={''} className="font-bold text-[#3AC4A0]">
            {t('authPage.tnC')}
          </Link>
        </small>
        <div className="flex justify-around py-5 gap-5 px-5">
          <CButton
            onClick={() => {
              router.push('/circle/auth/login').catch(error => {
                console.log(error);
              });
            }}
            className="border bg-transparent w-1/2 text-[#3AC4A0] hover:bg-[#3AC4A0] hover:text-white border-[#3AC4A0] rounded-full"
          >
            {t('authPage.login')}
          </CButton>
          <CButton
            onClick={() => {
              router.push('/circle/auth/register').catch(error => {
                console.log(error);
              });
            }}
            className="border bg-[#3AC4A0] rounded-full border-[#3AC4A0] w-1/2"
          >
            {t('authPage.register')}
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
