import forgot from '@/assets/forgot.png';
import AuthLayout from '@/components/layouts/AuthLayout';
import SliderCard from '@/components/SlideCard';
import type { ISlider } from '@/utils/interfaces/components.interfaces';
import { Button, Input } from '@material-tailwind/react';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ForgotPassword(): React.ReactElement {
  const { t } = useTranslation();

  interface IPayload {
    email?: string;
    phoneNumber?: string;
    method: 'email' | 'phoneNumber';
  }

  const [payload, setPayload] = useState<IPayload>({
    email: '',
    phoneNumber: '',
    method: 'email'
  });

  const methodHandler = useCallback((): void => {
    const updatePayload: IPayload = { ...payload };
    if (payload.method === 'phoneNumber') {
      updatePayload.method = 'email';
    }
    if (payload.method === 'email') {
      updatePayload.method = 'phoneNumber';
    }
    setPayload(updatePayload);
  }, [payload, t]);

  const sliderData: ISlider = {
    image: forgot,
    text: t(`forgot.${payload.method}`),
    title: ''
  };

  const inputProperties = useMemo(() => {
    if (payload.method === 'email')
      return {
        type: 'email',
        methodText: t('forgot.methodTextPhoneNumber'),
        inputPlaceholder: t('input.placeholder.email'),
        inputLabel: t('input.type.email')
      };
    return {
      type: 'number',
      methodText: t('forgot.methodTextEmail'),
      inputPlaceholder: t('input.placeholder.phoneNumber'),
      inputLabel: t('input.type.phoneNumber')
    };
  }, [payload, t]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-3/4 flex flex-col items-center justify-center">
        <SliderCard slide={sliderData} />
        <br />
        <br />
        <br />
        <br />
        <Input
          type={inputProperties.type}
          color="green"
          variant="static"
          label={inputProperties.inputLabel}
          placeholder={inputProperties.inputPlaceholder ?? ''}
        />
        <div
          onClick={methodHandler}
          className="text-sm text-seeds-button-green cursor-pointer w-full text-left mt-2"
        >
          {inputProperties.methodText}
        </div>

        <br />
        <br />
        <Button
          color="green"
          className="bg-seeds-button-green w-full rounded-full"
        >
          {t('button.next')}
        </Button>
      </div>
    </div>
  );
}

ForgotPassword.getLayout = (page: any) => (
  <AuthLayout className="bg-opacity-70">{page}</AuthLayout>
);
