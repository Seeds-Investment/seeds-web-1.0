import AuthLayout from '@/components/layouts/AuthLayout';
import CreateNewPassword from '@/containers/auth/CreateNewPassword';
import MethodCard from '@/containers/auth/MethodCard';
import OTPCard from '@/containers/auth/OTPCard';
import SuccessCard from '@/containers/auth/SuccessCard';
import { useSlick } from '@/hooks/useSlick';
import type {
  IFormMethod,
  IOTPMethod
} from '@/utils/interfaces/form.interfaces';
import type { IUseSlick } from '@/utils/interfaces/slick.interface';
import React, { useState } from 'react';
import Slider from 'react-slick';

export default function ForgotPassword(): React.ReactElement {
  const { changeStep, settings, slickRef }: IUseSlick = useSlick();

  const [phoneNumber, setPhoneNumber] = useState<any>('');

  const methodHandler = (payload: IFormMethod): void => {
    setPhoneNumber(payload.phoneNumber);

    changeStep(1);
  };

  const otpHandler = (value: IOTPMethod): void => {
    console.log(value);

    // changeStep(2);
  };

  const createNewPasswordHandler = (): void => {};

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
        <SuccessCard onSubmit={methodHandler} />
      </Slider>
    </div>
  );
}

ForgotPassword.getLayout = (page: any) => (
  <AuthLayout className="bg-opacity-70">{page}</AuthLayout>
);
