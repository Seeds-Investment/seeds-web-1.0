import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { AppleBrand, FacebookBrand, GoogleBrand } from '@/assets/images';
import { ArrowLeft, Eye, EyeSlash, Loader } from '@/assets/vector';
import CButton from '@/components/CButton';
import PhoneInput from '@/components/PhoneInput';
import AuthLayout from '@/components/layouts/AuthLayout';
import FormCard from '@/containers/auth/FormCard';
// import { loginPhoneNumber } from '@/repository/auth.repository';
import { Checkbox, Input, Typography } from '@material-tailwind/react';
// import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

interface FormData {
  phoneNumber: string;
  password: string;
  keepMeLoggedIn: boolean;
}

const LoginPage = (): JSX.Element => {
  const { t } = useTranslation();
  // const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading] = useState<boolean>(false);
  const [errorPhone] = useState<any>('');
  const [errorResponse] = useState<string>('');
  const [errorPassword] = useState<any>('');
  const [selectedFlag, setSelectedFlag] = useState('ID');
  const [selectedCode, setSelectedCode] = useState('+62');

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

  // const submitData = async (): Promise<void> => {
  //   setLoading(true);
  //   if (formData.phoneNumber === '') {
  //     setErrorPhone(t('validation.phoneNumberEmpty'));
  //   } else {
  //     setErrorPhone('');
  //   }
  //   if (formData.password === '') {
  //     setErrorPassword(t('validation.passwordEmpty'));
  //   } else {
  //     setErrorPassword('');
  //   }

  //   if (formData.phoneNumber !== '' && formData.password !== '') {
  //     const formattedPhone = selectedCode.concat(formData.phoneNumber);

  //     const response = await loginPhoneNumber({
  //       phoneNumber: formattedPhone,
  //       password: formData.password
  //     });

  //     if (response.status === 200) {
  //       window.localStorage.setItem('accessToken', response.accessToken);
  //       window.localStorage.setItem('refreshToken', response.refreshToken);
  //       window.localStorage.setItem('expiresAt', response.expiresAt);
  //       window.localStorage.setItem(
  //         'keepMeLoggedIn',
  //         String(formData.keepMeLoggedIn)
  //       );
  //       setFormData({
  //         phoneNumber: '',
  //         password: '',
  //         keepMeLoggedIn: false
  //       });
  //       await router.push('/').then().catch();
  //     } else {
  //       setErrorResponse('Invalid Phone Number or Password');
  //     }
  //   }
  //   setLoading(false);
  // };

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
    <div className="flex flex-col min-w-20">
      <div className="z-20 lg:hidden flex">
        <Image src={ArrowLeft} alt="arrow-left" className=" mb-5 " />{' '}
        <p className="font-bold text-white text-2xl mx-auto">
          {t('authPage.login')}
        </p>
      </div>
      <div>
        <FormCard className=" md:shrink-0  lg:w-[30rem] xl:w-[35rem] z-20 ">
          <div className="flex flex-col lg:p-8 px-5 lg:px-10 mt-5">
            <form>
              <p className="font-bold text-xl">{t('authPage.phoneNumber')}</p>
              <PhoneInput
                selectedCode={selectedCode}
                setSelectedCode={setSelectedCode}
                selectedFlag={selectedFlag}
                setSelectedFlag={setSelectedFlag}
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
                <small className="text-[#ff515d] font-bold">
                  {errorPassword}
                </small>
              )}
              {errorResponse !== '' && (
                <small className="text-[#ff515d] font-bold">
                  {errorResponse}
                </small>
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
                  href={''}
                  className="mt-2 hover:underline text-sm text-[#3AC4A0] font-bold"
                >
                  {t('authPage.forgotPassword')}?
                </Link>
              </div>
              <CButton
                // onClick={() => submitData}
                disabled={loading}
                className={`mx-auto w-full rounded-full ${
                  formData.password === '' ||
                  formData.phoneNumber === '' ||
                  loading
                    ? 'bg-[#BDBDBD]'
                    : 'bg-[#3AC4A0]'
                } mt-5`}
              >
                {loading ? (
                  <Image
                    src={Loader}
                    alt="loader"
                    className="mx-auto animate-spin"
                    width={25}
                  />
                ) : (
                  t('authPage.login')
                )}
              </CButton>
              <small className="flex  justify-center mt-5 text-opacity-50">
                {t('or')}
              </small>
              <div className="flex lg:flex-row flex-col gap-2 lg:justify-evenly mb-5 lg:mt-4">
                {thirdParty.map((el, i) => {
                  return (
                    <CButton
                      key={i}
                      className="bg-white rounded-full flex items-center"
                    >
                      <Image src={el.img} alt="third-party" />
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
        </FormCard>
      </div>
    </div>
  );
};

LoginPage.getLayout = function getLayout(page: JSX.Element) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default LoginPage;
