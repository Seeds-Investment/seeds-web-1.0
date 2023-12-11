// eslint-disable-next-line react-hooks/exhaustive-deps
'use client';
import CButton from '@/components/CButton';
import GoogleAnalyticsScript from '@/components/GoogleAnaliticsScript';
import PhoneInput from '@/components/PhoneInput';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Eye, EyeSlash, Loader } from '@/constants/assets/icons';
import {
  AppleBrand,
  FacebookBrand,
  GoogleBrand
} from '@/constants/assets/logo';
import { loginPhoneNumber, loginProvider } from '@/repository/auth.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { Button, Checkbox, Input, Typography } from '@material-tailwind/react';
import { trackEvent } from '@phntms/react-gtm';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
  const [disable, setDisable] = useState<boolean>(false);
  const [errorPhone, setErrorPhone] = useState<any>('');
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
    try {
      setLoading(true);
      setDisable(true);
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
        const formattedPhone = selectedCode
          .substring(1)
          .concat(formData.phoneNumber);

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
          const responseUser = await getUserInfo();
          console.log(responseUser);
          trackEvent({
            event: 'login_web',
            data: {
              user_id: responseUser.id
            }
          });
          await router.push('/homepage'); // Added await keyword here
          trackEvent({
            event: `Seeds_view_login_homepage_web`,
            data: {
              user_id: responseUser.id,
              page_name: 'Homepage',
              created_at: new Date().toString()
            }
          });
        } else {
          setErrorResponse('Invalid Phone Number or Password');
        }
      }
    } catch (error: any) {
      // Handle the error appropriately
    } finally {
      setLoading(false);
      setDisable(false);
    }
  };

  const handleSubmit = (): void => {
    submitData().catch(() => {});
  };

  const handleLoginProvider = (provider: string): void => {
    signIn(provider)
      .then(result => {
        if (result?.error != null) {
          console.error(result.error);
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
      if (provider != null && session.access_token !== undefined) {
        const response = await loginProvider(session.access_token, provider);
        if (response.status === 404) {
          router.push('/auth/register').catch(error => {
            console.log(error);
          });
          signOut().catch(error => {
            console.log(error);
          });
        } else if (response.status === 200) {
          window.localStorage.setItem('accessToken', response.accessToken);
          window.localStorage.setItem('keepMeLoggedIn', 'true');
          window.localStorage.setItem('refreshToken', response.refreshToken);
          window.localStorage.setItem('expiresAt', response.expiresAt);
        }
      }
    };
    fetchAccessToken().catch(error => {
      console.error(error);
    });
  }, [session?.access_token, router]);

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
    <>
      <GoogleAnalyticsScript />
      <div className="px-4">
        <form>
          <p className="font-bold text-xl">{t('authPage.phoneNumber')}</p>
          <PhoneInput
            selectedCode={selectedCode}
            setSelectedCode={setSelectedCode}
            onChangePhoneNumber={handleChangePhoneNumber}
            phoneValue={formData.phoneNumber}
            error={errorPhone}
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
                src={showPassword ? Eye.src : EyeSlash.src}
                alt={showPassword ? Eye.alt : EyeSlash.alt}
                width={24}
                height={24}
              />
            }
            value={formData.password}
            error={errorPassword !== ''}
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
                <Typography
                  variant="small"
                  className=" text-black lg:font-small"
                >
                  {t('authPage.keepMeLoggedIn')}
                </Typography>
              }
              color="green"
            />
            <Link
              href={'/auth/forgot-password'}
              className="mt-2 hover:underline text-sm text-[#3AC4A0] font-bold"
            >
              {t('authPage.forgotPassword')}?
            </Link>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className={`mx-auto w-full rounded-full ${
              formData.password === '' || formData.phoneNumber === '' || loading
                ? 'bg-[#BDBDBD]'
                : 'bg-[#3AC4A0]'
            } mt-5`}
          >
            {loading ? (
              <Image
                src={Loader.src}
                alt={Loader.alt}
                className="mx-auto animate-spin object-contain object-[center_center]"
                width={25}
                height={25}
              />
            ) : (
              t('authPage.login')
            )}
          </Button>
          <Button
            disabled={disable}
            onClick={async () => {
              try {
                await router.push('/auth/register');
              } catch (error) {
                console.error('An error occurred during navigation:', error);
              }
            }}
            className={`mx-auto w-full rounded-full border border-[#3AC4A0] mt-5 text-[#3AC4A0] bg-transparent hover:bg-[#3AC4A0] hover:text-white transition-colors`}
          >
            {t('authPage.register')}
          </Button>
          <small className="flex justify-center md:mt-5 my-5 text-opacity-50">
            {t('or')}
          </small>
          <div className="flex lg:flex-row flex-col gap-2 lg:justify-evenly md:mb-0 mb-5 lg:mt-10">
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
                    width={20}
                    height={20}
                    src={el.img.src}
                    alt={el.img.alt}
                    className="md:w-8 w-4 h-4 md:h-8 object-contain object-[center_center]"
                  />
                  <Typography
                    variant="small"
                    className="text-black mx-auto text-xs  lg:hidden font-bold flex justify-center items-center"
                  >
                    Login with {el.name}
                  </Typography>
                </CButton>
              );
            })}
          </div>
        </form>
      </div>
    </>
  );
};

LoginPage.getLayout = function getLayout(page: JSX.Element) {
  return <AuthLayout title="Login">{page}</AuthLayout>;
};

export default LoginPage;
