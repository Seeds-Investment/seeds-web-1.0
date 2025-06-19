import LoginApple from '@/assets/onboarding/login-apple.png';
import LoginEmail from '@/assets/onboarding/login-email.png';
import LoginGoogle from '@/assets/onboarding/login-google.png';
import LoginPhone from '@/assets/onboarding/login-phone.png';
import SeedyLogin from '@/assets/onboarding/seedy-login.png';
import {
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MdArrowBack } from 'react-icons/md';

const Signup: React.FC = () => {
  const router = useRouter();

  // const responses = useSelector((state: RootState) => state.onboarding.responses);

  return (
    <div className="flex flex-col items-center mt-8">
      <div className='w-full flex justify-start'>
        <MdArrowBack
          size={30}
          className='cursor-pointer hover:scale-110 duration-200 md:hidden'
          onClick={async() => { await router.push('/onboarding') }}
        />
      </div>
      <Typography className="font-poppins font-semibold bg-gradient-to-b text-center from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent text-2xl md:text-3xl mt-4">
        Welcome to Seeds!
      </Typography>
      <Typography className="font-poppins text-neutral-medium font-medium text-sm md:text-md text-center mt-2">
        Take your first step with Seeds. Start growing your investment skills today.
      </Typography>
      <Image
        src={SeedyLogin}
        alt="SeedyLogin"
        className="w-[300px]"
      />
      <div className='w-full md:w-[60%] max-w-[400px] flex justify-center items-center py-3 px-4 gap-2 bg-[#D7D7D7] hover:bg-[#c9c9c9] duration-200 border-2 border-[#FFFFFFC2] cursor-pointer rounded-lg'>
        <Image
          src={LoginGoogle}
          alt="LoginGoogle"
          className="w-[25px]"
        />
        <Typography className="font-poppins text-neutral-medium font-medium text-md text-center">
          Sign up with Google
        </Typography>
      </div>
      <div className='w-full md:w-[60%] max-w-[400px] flex justify-center items-center py-3 px-4 gap-4 bg-[#D7D7D7] hover:bg-[#c9c9c9] duration-200 border-2 border-[#FFFFFFC2] cursor-pointer rounded-lg mt-2'>
        <Image
          src={LoginApple}
          alt="LoginApple"
          className="w-[20px]"
        />
        <Typography className="font-poppins text-neutral-medium font-medium text-md text-center">
          Sign up with Apple
        </Typography>
      </div>
      <Typography className="font-poppins text-neutral-soft font-medium text-md text-center my-4">
        OR
      </Typography>
      <div className='flex justify-center items-center gap-2'>
        <div className='bg-[#E9E9E9] hover:bg-[#e2e2e2] duration-200 rounded-full w-[50px] h-[50px] flex justify-center items-center cursor-pointer'>
          <Image
            src={LoginEmail}
            alt="LoginEmail"
            className="w-[20px]"
          />
        </div>
        <div className='bg-[#E9E9E9] hover:bg-[#e2e2e2] duration-200 rounded-full w-[50px] h-[50px] flex justify-center items-center cursor-pointer'>
          <Image
            src={LoginPhone}
            alt="LoginPhone"
            className="w-[20px]"
          />
        </div>
      </div>
      <div className='flex gap-1 justify-center items-center mt-4'>
        <Typography className="font-poppins text-neutral-soft text-md text-center my-2">
          Already have an account?
        </Typography>
        <Typography className="font-medium font-poppins bg-gradient-to-b text-center from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent my-2 cursor-pointer">
          Login
        </Typography>
      </div>
    </div>
  )
};

export default Signup;
