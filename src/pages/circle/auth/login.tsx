import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Eye, EyeSlash, Loader } from '@/assets/vector';
import CButton from '@/components/CButton';
import PhoneInput from '@/components/PhoneInput';
import AuthLayout from '@/components/layouts/AuthLayout';
import {
  AppleBrand,
  FacebookBrand,
  GoogleBrand
} from '@/constants/assets/logo';
import { loginPhoneNumber, loginProvider } from '@/repository/auth.repository';
import { Checkbox, Input, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';

import { signIn, useSession } from 'next-auth/react';

import { useTranslation } from 'react-i18next';
interface FormData {
  phoneNumber: string;
  password: string;
  keepMeLoggedIn: boolean;
}

const LoginPage = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session }: any = useSession();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorPhone, setErrorPhone] = useState<any>('');
  // const [accessToken,setAccessToken] = useState('');
  const [selectedCode, setSelectedCode] = useState<string>('+62');
  const [errorResponse, setErrorResponse] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<any>('');

  const [formData, setFormData] = useState<FormData>({
    phoneNumber: '',
    password: '',
    keepMeLoggedIn: false
  });

  const handleChangePhoneNumber = (value: string): void => {
    const onlyNumber = value.replace(/[^0-9]/g, '');
    setFormData((prevFormData: FormData) => {
      return {
        ...prevFormData,
        phoneNumber: onlyNumber
      };
    });
  };
  const submitData = async (): Promise<void> => {
    setLoading(true);
    if (formData.phoneNumber === '') {
      setErrorPhone(t('validation.phoneNumberEmpty'));
    } else {
      setErrorPhone('');
    }
    if (formData.password === '') {
      setErrorPassword(t('validation.passwordEmpty'));
    } else {
      setErrorPassword('');
    }

    if (formData.phoneNumber !== '' && formData.password !== '') {
      const formattedPhone = selectedCode.concat(formData.phoneNumber);

      const response = await loginPhoneNumber({
        phoneNumber: formattedPhone,
        password: formData.password
      });

      if (response.status === 200) {
        window.localStorage.setItem('accessToken', response.accessToken);
        window.localStorage.setItem('refreshToken', response.refreshToken);
        window.localStorage.setItem('expiresAt', response.expiresAt);
        window.localStorage.setItem(
          'keepMeLoggedIn',
          String(formData.keepMeLoggedIn)
        );
        setFormData({
          phoneNumber: '',
          password: '',
          keepMeLoggedIn: false
        });
        await router.push('/').then().catch();
      } else {
        setErrorResponse('Invalid Phone Number or Password');
      }
    }
    setLoading(false);
  };

  const handleLoginProvider = (provider: string): void => {
    signIn(provider)
      .then(result => {
        if (result?.error != null) {
          console.log(result.error);
        } else if (provider !== '') {
          localStorage.setItem('provider', provider);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    const fetchAccessToken = async (): Promise<void> => {
      const provider = localStorage.getItem('provider');
      if (session?.access_token != null && provider != null) {
        const response = await loginProvider(session.access_token, provider);
        // setAccessToken(response);
        console.log(response);
      }
    };

    fetchAccessToken().catch(error => {
      console.error(error);
    });
  }, [session?.access_token]);

  const thirdParty = [
    {
      name: 'Apple',
      img: AppleBrand
    },
    {
      name: 'Google',
      img: GoogleBrand
    },
    {
      name: 'Facebook',
      img: FacebookBrand
    }
  ];

  return (
    <div className="px-8 pb-8 mt-4">
      <form>
        <p className="font-bold text-xl">{t('authPage.phoneNumber')}</p>
        <PhoneInput
          selectedCode={selectedCode}
          setSelectedCode={setSelectedCode}
          onChangePhoneNumber={handleChangePhoneNumber}
          phoneValue={formData.phoneNumber}
          error={errorPhone === ''}
        />
        {errorPhone !== '' && (
          <small className="text-[#ff515d] font-bold">{errorPhone}</small>
        )}
        <p className="font-bold text-xl mt-5">{t('authPage.password')}</p>
        <Input
          className="text-xl"
          type={showPassword ? 'text' : 'password'}
          variant="standard"
          color="gray"
          onChange={e => {
            setFormData({ ...formData, password: e.target.value });
          }}
          icon={
            <Image
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              src={showPassword ? Eye : EyeSlash}
              alt=""
            />
          }
          value={formData.password}
          error={errorPassword}
        />
        {errorPassword !== '' && (
          <small className="text-[#ff515d] font-bold">{errorPassword}</small>
        )}
        {errorResponse !== '' && (
          <small className="text-[#ff515d] font-bold">{errorResponse}</small>
        )}
        <div className="flex flex-row justify-between gap-5 items-center mt-2">
          <Checkbox
            checked={formData.keepMeLoggedIn}
            onChange={e => {
              setFormData({
                ...formData,
                keepMeLoggedIn: e.target.checked
              });
            }}
            label={
              <Typography variant="small" className=" text-black lg:font-small">
                {t('authPage.keepMeLoggedIn')}
              </Typography>
            }
            color="green"
          />
          <Link
            href={''}
            className="mt-2 hover:underline text-sm text-[#3AC4A0] font-bold"
          >
            {t('authPage.forgotPassword')}?
          </Link>
        </div>
        <CButton
          onClick={() => submitData}
          disabled={loading}
          className={`mx-auto w-full rounded-full ${
            formData.password === '' || formData.phoneNumber === '' || loading
              ? 'bg-[#BDBDBD]'
              : 'bg-[#3AC4A0]'
          } mt-5`}
        >
          {loading ? (
            <Image
              src={Loader}
              alt="loader"
              className="mx-auto animate-spin object-contain object-[center_center]"
              width={25}
              height={25}
            />
          ) : (
            t('authPage.login')
          )}
        </CButton>
        <small className="flex justify-center mt-5 text-opacity-50">
          {t('or')}
        </small>
        <div className="flex lg:flex-row flex-col gap-2 lg:justify-evenly lg:mt-4">
          {thirdParty.map((el, i) => {
            return (
              <CButton
                onClick={() => {
                  handleLoginProvider(el.name.toLowerCase());
                }}
                key={i}
                className="bg-white rounded-full flex items-center"
              >
                <Image
                  width={30}
                  height={30}
                  src={el.img.src}
                  alt={el.img.alt}
                  className="w-auto h-auto object-contain object-[center_center]"
                />
                <Typography
                  variant="small"
                  className="text-black mx-auto lg:hidden font-bold flex justify-center items-center"
                >
                  Login with {el.name}
                </Typography>
              </CButton>
            );
          })}
        </div>
      </form>
    </div>
  );
};

LoginPage.getLayout = function getLayout(page: JSX.Element) {
  return <AuthLayout title="Login">{page}</AuthLayout>;
};

export default LoginPage;
