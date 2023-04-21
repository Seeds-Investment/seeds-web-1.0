import forgot from '@/assets/forgot.png';
import AuthLayout from '@/components/layouts/AuthLayout';
import SliderCard from '@/components/SlideCard';
import type { ISlider } from '@/utils/interfaces/components.interfaces';
import type { IForgotPassword } from '@/utils/interfaces/form.interfaces';
import { forgotPasswordSchema } from '@/utils/validations/forgotPassword.schema';
import { Button, Input } from '@material-tailwind/react';
import { useFormik } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ForgotPassword(): React.ReactElement {
  const { t } = useTranslation();

  const [payload, setPayload] = useState<IForgotPassword>({
    email: '',
    phoneNumber: '',
    method: 'phoneNumber'
  });

  const methodHandler = useCallback((): void => {
    const updatePayload: IForgotPassword = { ...payload };

    delete updatePayload.email;
    delete updatePayload.phoneNumber;

    if (payload.method === 'phoneNumber') {
      updatePayload.method = 'email';
    }
    if (payload.method === 'email') {
      updatePayload.method = 'phoneNumber';
    }
    setPayload(updatePayload);
  }, [payload, t]);

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.target as HTMLInputElement;

    setPayload(c => ({ ...c, [name]: value }));
  };

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

  const formik = useFormik({
    initialValues: payload,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit: values => {},
    validationSchema: forgotPasswordSchema
  });

  const errorMessage = formik.errors[payload.method];
  const error = typeof errorMessage === 'string';

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="w-3/4 flex flex-col items-center justify-center"
      >
        <SliderCard slide={sliderData} />
        <br />
        <br />
        <br />
        <br />
        <Input
          error={error}
          onChange={onChangeHandler}
          name={payload.method}
          // type={inputProperties.type}
          color="green"
          variant="static"
          label={errorMessage ?? inputProperties.inputLabel}
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
          type="submit"
          color="green"
          className="bg-seeds-button-green w-full rounded-full"
        >
          {t('button.next')}
        </Button>
      </form>
    </div>
  );
}

ForgotPassword.getLayout = (page: any) => (
  <AuthLayout className="bg-opacity-70">{page}</AuthLayout>
);
