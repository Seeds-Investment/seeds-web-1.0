import AuthLayout from '@/components/layouts/AuthLayout';
import CreateNewPassword from '@/containers/auth/CreateNewPassword';
import MethodCard from '@/containers/auth/MethodCard';
import OTPCard from '@/containers/auth/OTPCard';
import SuccessCard from '@/containers/auth/SuccessCard';
import { useSlick } from '@/hooks/useSlick';
import { postForgotPasswordByEmail } from '@/repository/email.repository';
import { patchChangePassword } from '@/repository/user.repository';
import type {
  ICreateNewPassword,
  IFormMethod,
  IOTPHandler
} from '@/utils/interfaces/form.interfaces';
import type { IUseSlick } from '@/utils/interfaces/slick.interface';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Slider from 'react-slick';

export default function ForgotPassword(): React.ReactElement {
  const router = useRouter();
  const { changeStep, settings, slickRef }: IUseSlick = useSlick();

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selectedCode, setSelectedCode] = useState<string>('+62');
  const [email, setEmail] = useState<any>('');
  const [errorResponse, setErrorResponse] = useState<string>('');

  const methodHandler = async (payload: IFormMethod): Promise<void> => {
    if (payload.method === 'email') {
      setEmail(payload.email);
      const response = await postForgotPasswordByEmail(payload.email);
      if (response.status !== 200) {
        setErrorResponse(response.data.message);
      }
      return;
    }

    setPhoneNumber(payload.phoneNumber ?? '');
    changeStep(1);
  };

  const otpHandler = (value: IOTPHandler): void => {
    if (value?.status === false) return;
    changeStep(2);
  };

  const createNewPasswordHandler = async (
    payload: ICreateNewPassword
  ): Promise<void> => {
    await patchChangePassword({
      password: payload.password,
      phoneNumber: `${String(selectedCode).replace('+', '')}${String(
        phoneNumber
      )}`,
      email
    });
    changeStep(3);
  };

  // const successHandler = (value: IOTPMethod): void => {
  //   changeStep(2);
  // };

  return (
    <div className="flex justify-center">
      <Slider
        ref={slickRef}
        className="w-3/4 flex justify-center"
        {...settings}
      >
        <MethodCard
          onSubmit={methodHandler}
          selectedCode={selectedCode}
          setSelectedCode={setSelectedCode}
          errorResponse={errorResponse}
        />
        <OTPCard
          onSubmit={otpHandler}
          phoneNumber={`${selectedCode.replace('+', '')}${phoneNumber.replace(
            /\s/g,
            ''
          )}`}
        />
        <CreateNewPassword onSubmit={createNewPasswordHandler} />
        <SuccessCard
          onSubmit={() => {
            router
              .push('/auth/login')
              .then()
              .catch(() => {});
          }}
        />
      </Slider>
    </div>
  );
}

ForgotPassword.getLayout = function getLayout(page: JSX.Element) {
  return <AuthLayout title="Forgot Password">{page}</AuthLayout>;
};
