import AuthGoogle from '@/assets/auth/AuthGoogle.png';
import { loginSSO } from '@/repository/auth.repository';
import { fetchExpData } from '@/store/redux/features/exp';
import { fetchUserData } from '@/store/redux/features/user';
import { useAppDispatch } from '@/store/redux/store';
import { Typography } from '@material-tailwind/react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface IAuthSSO {
  setSelect: (value: number) => void;
}

const AuthSSO: React.FC<IAuthSSO> = ({ setSelect }: IAuthSSO) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data } = useSession();

  const handleLoginSSO = async (): Promise<void> => {
    try {
      if (data !== null) {
        const response = await loginSSO({
          identifier: data.accessToken,
          provider: data.provider
        });
        if (response.status === 200) {
          window.localStorage.setItem('accessToken', response.accessToken);
          window.localStorage.setItem('refreshToken', response.refreshToken);
          window.localStorage.setItem('expiresAt', response.expiresAt);

          await dispatch(fetchUserData());
          await dispatch(fetchExpData());
          if (window.location.pathname === '/auth/register') {
            await router.push('/homepage');
            toast(t('authLogin.SSO'), { type: 'error' });
          } else {
            await router.push('/homepage');
          }
        }
        if (response.data.message === 'link-account/not-found') {
          setSelect(2);
          await router.push('register');
        }
      }
    } catch (error: any) {
      toast(error.response.data.message, { type: 'error' });
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
      </div>
    </>
  );
};

export default AuthSSO;
