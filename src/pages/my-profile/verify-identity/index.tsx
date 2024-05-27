'use client';
import verify from '@/assets/verify-page/verify.svg';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
// import { useTranslation } from 'react-i18next';

export default function VerifyIdentity(): any {
  // const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="bg-white flex flex-col text-center pb-[3rem] items-center justify-center px-[6rem]">
      <Image alt="" src={verify} className="mt-10 w-auto h-auto" />
      <Typography className="text-xl font-semibold my-5 lg:text-2xl text-[#262626]">
        Verify Your Identitiy!
      </Typography>
      <Typography className="text-base font-normal text-[#7C7C7C] mb-12">
        To ensure the security of your account and comply with regulatory
        requirements, we need to verify your identity.
        <span className="text-base font-semibold text-[#262626]">
          You will be done in 5mins!
        </span>
      </Typography>
      <div className="flex flex-col gap-5">
        <Button
          className="text-sm px-[6rem] font-semibold bg-[#3AC4A0] rounded-full text-[#FFFFFF]"
          onClick={() => {
            void router.push('/my-profile/verify-identity/IdCard');
          }}
        >
          Start Verification
        </Button>
        <Button className="text-sm px-[6rem] font-semibold text-[#3AC4A0] border border-[#3AC4A0] bg-white rounded-full">
          Skip For Now
        </Button>
      </div>
    </div>
  );
}
