import AuthFacebook from '@/assets/auth/AuthFacebook.png';
import AuthGoogle from '@/assets/auth/AuthGoogle.png';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';

const AuthSSO: React.FC = () => {
  return (
    <>
      <div className="flex justify-center border-t w-full border-[#E9E9E9]">
        <Typography className="font-poppins font-light text-sm text-[#BDBDBD] -mt-2.5 bg-white w-fit px-3">
          Or
        </Typography>
      </div>
      <div className="flex gap-6">
        <Image src={AuthGoogle} alt="AuthGoogle" className="w-9" />
        <Image src={AuthFacebook} alt="AuthFacebook" className="w-9" />
      </div>
    </>
  );
};

export default AuthSSO;
