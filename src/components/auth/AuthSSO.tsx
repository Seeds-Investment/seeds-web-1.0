import AuthFacebook from '@/assets/auth/AuthFacebook.png';
import AuthGoogle from '@/assets/auth/AuthGoogle.png';
import { loginSSO } from '@/repository/auth.repository';
import { Typography } from '@material-tailwind/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';

const AuthSSO: React.FC = () => {
  const { data } = useSession();
  console.log(data?.accessToken);
  console.log(data?.provider);
  const handleLoginSSO = async (): Promise<void> => {
    try {
      if (data !== null) {
        const response = await loginSSO({
          identifier: data?.accessToken,
          provider: data?.provider
        });
        console.log(response);
      }
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };
  useEffect(() => {
    handleLoginSSO()
      .then()
      .catch(() => {});
  }, [data]);
  return (
    <>
      <div className="flex justify-center border-t w-full border-[#E9E9E9]">
        <Typography className="font-poppins font-light text-sm text-[#BDBDBD] -mt-2.5 bg-white w-fit px-3">
          Or
        </Typography>
      </div>
      <div className="flex gap-6">
        <Image
          src={AuthGoogle}
          alt="AuthGoogle"
          className="w-9 cursor-pointer"
          onClick={async () => {
            await signIn('google');
          }}
        />
        <Image
          src={AuthFacebook}
          alt="AuthFacebook"
          className="w-9"
          onClick={async () => {
            await signOut();
          }}
        />
      </div>
    </>
  );
};

export default AuthSSO;
