import GoogleAnalyticsScript from '@/components/GoogleAnaliticsScript';
import AuthLayout from '@/components/layouts/AuthLayout';
import ChooseAvatarPage from '@/containers/register/ChooseAvatarPage';
import ConfigureSeedsUserPage from '@/containers/register/ConfigureSeedsUserPage';
import CreatePasswordPage from '@/containers/register/CreatePasswordPage';
import PersonalInfoPage from '@/containers/register/PersonalInfoPage';
import SuccessRegisterPage from '@/containers/register/SuccessRegisterPage';
import ValidateOTPPage from '@/containers/register/ValidateOTPPage';
import type { IRegisterFormdata } from '@/utils/interfaces/form.interfaces';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

export interface IRegisterPaging {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  formdata: IRegisterFormdata;
  setFormdata: Dispatch<SetStateAction<IRegisterFormdata>>;
}

const RegisterPage = (): JSX.Element => {
  const [page, setPage] = useState<number>(0);
  const [formdata, setFormdata] = useState<IRegisterFormdata>({
    countryCode: '62',
    phoneNumber: '',
    email: '',
    birthdate: '',
    name: '',
    seedsTag: '',
    referralCode: '',
    otp: '',
    password: '',
    rePassword: '',
    avatar: '',
    providers: {
      provider: '',
      identifier: ''
    }
  });

  return (
    <>
      <GoogleAnalyticsScript />
      <div className="md:px-8 px-4 mt-2 md:mt-4">
        {(() => {
          switch (page) {
            case 0:
              return (
                <PersonalInfoPage
                  page={page}
                  setPage={setPage}
                  formdata={formdata}
                  setFormdata={setFormdata}
                />
              );
            case 1:
              return (
                <ConfigureSeedsUserPage
                  page={page}
                  setPage={setPage}
                  formdata={formdata}
                  setFormdata={setFormdata}
                />
              );
            case 2:
              return (
                <ValidateOTPPage
                  page={page}
                  setPage={setPage}
                  formdata={formdata}
                  setFormdata={setFormdata}
                />
              );
            case 3:
              return (
                <CreatePasswordPage
                  page={page}
                  setPage={setPage}
                  formdata={formdata}
                  setFormdata={setFormdata}
                />
              );
            case 4:
              return (
                <ChooseAvatarPage
                  page={page}
                  setPage={setPage}
                  formdata={formdata}
                  setFormdata={setFormdata}
                />
              );
            case 5:
              return (
                <SuccessRegisterPage
                  page={page}
                  setPage={setPage}
                  formdata={formdata}
                  setFormdata={setFormdata}
                />
              );
          }
        })()}
      </div>
    </>
  );
};

RegisterPage.getLayout = function getLayout(page: JSX.Element) {
  return (
    <AuthLayout titleKey="registerPage.title.personalInfo">{page}</AuthLayout>
  );
};

export default RegisterPage;
