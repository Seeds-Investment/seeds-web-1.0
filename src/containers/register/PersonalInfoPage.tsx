import PhoneInput from '@/components/PhoneInput';
import type { IRegisterPaging } from '@/pages/circle/auth/register';
import { fieldValidity } from '@/utils/common/utils';
import { Button, Input, Typography } from '@material-tailwind/react';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import CErrorMessage from '@/components/CErrorMessage';
import {
  AppleBrand,
  FacebookBrand,
  GoogleBrand
} from '@/constants/assets/logo';
import { loginProvider } from '@/repository/auth.repository';
import { formRegisterPersonalInfoSchema } from '@/utils/validations/register.schema';
import { useFormik } from 'formik';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const PersonalInfoPage = ({
  setPage,
  formdata,
  setFormdata
}: IRegisterPaging): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session }: any = useSession();

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

  const formik = useFormik({
    initialValues: formdata,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit: () => {
      setPage(1);
    },
    validationSchema: formRegisterPersonalInfoSchema
  });

  const errorCountryCode = useMemo(
    () => fieldValidity(formik.errors?.countryCode),
    [formik]
  );

  const errorPhoneNumber = useMemo(
    () => fieldValidity(formik.errors?.phoneNumber),
    [formik]
  );

  const errorEmail = useMemo(
    () => fieldValidity(formik.errors?.email),
    [formik]
  );

  const errorBirthDate = useMemo(
    () => fieldValidity(formik.errors?.birthdate),
    [formik]
  );

  const isValid = useMemo(() => {
    return (
      fieldValidity(formdata.countryCode) &&
      fieldValidity(formdata.phoneNumber) &&
      fieldValidity(formdata.email) &&
      fieldValidity(formdata.birthdate) &&
      !errorCountryCode &&
      !errorPhoneNumber &&
      !errorEmail &&
      !errorBirthDate
    );
  }, [
    formdata,
    errorCountryCode,
    errorPhoneNumber,
    errorEmail,
    errorBirthDate
  ]);

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
      if (provider != null && session.access_token !== undefined) {
        const response = await loginProvider(session.access_token, provider);
        if (response.status === 404) {
          router.push('/circle/auth/register').catch(error => {
            console.log(error);
          });
          signOut().catch(error => {
            console.log(error);
          });
        } else if (response.status === 200) {
          window.localStorage.setItem('accessToken', response.accessToken);
          window.localStorage.setItem('refreshToken', response.refreshToken);
          window.localStorage.setItem('expiresAt', response.expiresAt);
        }
      }
    };
    fetchAccessToken().catch(error => {
      console.error(error);
    });
  }, [session?.access_token, router]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <Typography variant="h3" color="black">
          {t('registerPage.title.personalInfo')}
        </Typography>
        <Typography variant="small" color="black">
          {t('registerPage.description.personalInfo')}
        </Typography>
      </div>
      <div className="mt-10">
        <Typography variant="h5" color="black">
          {t('input.phone')} <span className="text-red-500">*</span>
        </Typography>
        <PhoneInput
          selectedCode={formdata.countryCode}
          setSelectedCode={e => {
            setFormdata(prevState => ({
              ...prevState,
              countryCode: e
            }));
          }}
          onChangePhoneNumber={e => {
            setFormdata(prevState => ({
              ...prevState,
              phoneNumber: e
            }));
          }}
          phoneValue={formdata.phoneNumber}
          error={errorCountryCode && errorPhoneNumber}
        />
        <CErrorMessage>
          {formik.errors?.countryCode ?? formik.errors?.phoneNumber}
        </CErrorMessage>
      </div>
      <div className="mt-5">
        <Typography variant="h5" color="black">
          {t('input.email')}
          <span className="text-red-500">*</span>
        </Typography>
        <Input
          className="text-lg"
          type="email"
          size="md"
          variant="standard"
          color="gray"
          placeholder="example@mail.com"
          value={formdata.email}
          onChange={e => {
            setFormdata(prevState => ({
              ...prevState,
              email: e.target.value
            }));
          }}
          error={errorEmail}
        />
        <CErrorMessage>{formik.errors?.email}</CErrorMessage>
      </div>
      <div className="mt-5">
        <Typography variant="h5" color="black">
          {t('input.birthDate')}
          <span className="text-red-500">*</span>
        </Typography>
        <Input
          className="text-lg"
          type="date"
          size="md"
          variant="standard"
          color="gray"
          placeholder="DD/MM/YYYY"
          value={formdata.birthdate}
          onChange={e => {
            setFormdata(prevState => ({
              ...prevState,
              birthdate: e.target.value
            }));
          }}
          error={errorBirthDate}
        />
        <CErrorMessage>{formik.errors?.birthdate}</CErrorMessage>
      </div>
      <div className="mt-4">
        <Button
          type="submit"
          disabled={!isValid}
          fullWidth
          className="border bg-[#3AC4A0] rounded-full border-[#3AC4A0]"
        >
          {t('registerPage.nextButton')}
        </Button>
      </div>
      <div className="flex lg:flex-row flex-col mt-5 mb-5 md:mb-0 md:pb-5 gap-2 lg:justify-evenly lg:mt-5">
        {thirdParty.map((el, i) => {
          return (
            <Button
              onClick={() => {
                handleLoginProvider(el.name.toLowerCase());
              }}
              key={i}
              className="bg-white rounded-full flex items-center"
            >
              <Image
                width={45}
                height={45}
                src={el.img.src}
                alt={el.img.alt}
                className="md:w-6 md:h-6 w-4 h-4 object-contain object-[center_center]"
              />
              <Typography
                variant="small"
                className="text-black mx-auto lg:hidden font-bold flex justify-center items-center"
              >
                Login with {el.name}
              </Typography>
            </Button>
          );
        })}
      </div>
    </form>
  );
};

export default PersonalInfoPage;
