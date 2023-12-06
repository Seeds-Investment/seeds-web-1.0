import section11 from '@/assets/landing-page/section11.svg';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Section11(): React.ReactElement {
  const router = useRouter();

  return (
    <div className="w-full lg:m-12 h-auto cursor-default ">
      <div className="flex flex-col md:flex-row">
        <div className="hidden lg:block w-1/3">
          <Image
            src={section11}
            alt={`Event`}
            width={300}
            height={300}
            className="w-[350px] h-[350px] mx-5"
          />
        </div>
        <div className="w-full lg:w-2/3 lg:text-left text-center lg:me-20">
          <h1 className="font-poppins mx-8 lg:mx-0 text-3xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
            Want to Collaborate with Seeds?
          </h1>
          <h1 className="mt-3 mx-5 lg:mx-0 font-poppins text-base lg:text-2xl font-normal text-[#262626]">
            Calling on all communities, brands, and KOL looking to be part of
            our mission to make finance enjoyable and accessible for Indonesia
            young and vibrant market.
          </h1>
          <h1 className="mt-3 mx-5 lg:mx-0 font-poppins text-base lg:text-2xl font-normal text-[#262626]">
            Join us, get involved, and together lets shape the future of
            investing!
          </h1>
          <Button
            className="text-xs mt-5 px-20 font-semibold capitalize text-md bg-[#3AC4A0] rounded-full"
            onClick={() => {
              void router.push('/auth/register');
            }}
          >
            Contact us
          </Button>
        </div>
        <div className="lg:hidden w-full mx-5">
          <Image
            src={section11}
            alt={`Event`}
            width={300}
            height={300}
            className="w-[350px] h-[350px] mx-5"
          />
        </div>
      </div>
    </div>
  );
}
