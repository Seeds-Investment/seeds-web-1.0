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
import React, { useState } from 'react';
import Slider from 'react-slick';

export default function ForgotPassword(): React.ReactElement {
  const { changeStep, settings, slickRef }: IUseSlick = useSlick();

  const [phoneNumber, setPhoneNumber] = useState<any>('');
  const [email, setEmail] = useState<any>('');

  const methodHandler = async (payload: IFormMethod): Promise<void> => {
    if (payload.method === 'email') {
      setEmail(payload.email);
      await postForgotPasswordByEmail(payload.email);
      return;
    }

    setPhoneNumber(payload.phoneNumber);
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
      phoneNumber,
      email
    });
  };

  // const successHandler = (value: IOTPMethod): void => {
  //   changeStep(2);
  // };

  return (
    <div className="w-full flex justify-center">
      <Slider
        ref={slickRef}
        className="w-3/4 flex justify-center"
        {...settings}
      >
        <MethodCard onSubmit={methodHandler} />
        <OTPCard onSubmit={otpHandler} phoneNumber={phoneNumber} />
        <CreateNewPassword onSubmit={createNewPasswordHandler} />
        <SuccessCard
          onSubmit={() => {
            alert('berhasil');
          }}
        />
      </Slider>
    </div>
  );
}

ForgotPassword.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;
