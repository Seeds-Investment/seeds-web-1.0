import SliderCard from '@/components/SlideCard';
import type { ISlider } from '@/utils/interfaces/components.interfaces';
import type { IFormMethod } from '@/utils/interfaces/form.interfaces';
import { formMethodSchema } from '@/utils/validations/forgotPassword.schema';
import { Button, Input } from '@material-tailwind/react';
import { useFormik } from 'formik';
import forgot from 'public/assets/forgot.png';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const MethodCard = ({
  onSubmit
}: {
  onSubmit: (props: any) => void;
}): React.ReactElement => {
  const { t } = useTranslation();

  const [payload, setPayload] = useState<IFormMethod>({
    email: '',
    phoneNumber: '',
    method: 'phoneNumber'
  });

  const methodHandler = useCallback((): void => {
    const updatePayload: IFormMethod = { ...payload };

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
  const forgotScreen: ISlider = {
    image: forgot,
    text: t(`forgot.${payload.method}`),
    title: ''
  };
  const inputProperties = useMemo(() => {
    if (payload.method === 'email')
      return {
        type: 'email',
        methodText: t('forgot.method.phoneNumber'),
        inputPlaceholder: t('input.placeholder.email'),
        inputLabel: 'input.type.email'
      };
    return {
      type: 'number',
      methodText: t('forgot.method.email'),
      inputPlaceholder: t('input.placeholder.phoneNumber'),
      inputLabel: t('input.type.phoneNumber')
    };
  }, [payload, t]);
  const formik = useFormik({
    initialValues: payload,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit: values => {
      onSubmit(values);
    },
    validationSchema: formMethodSchema
  });

  const errorMessage = t(formik.errors?.[payload.method] ?? '');
  const error = errorMessage?.length > 0;
  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" flex flex-col items-center justify-center"
    >
      <SliderCard slide={forgotScreen} />
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
        label={error ? errorMessage : inputProperties.inputLabel}
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
  );
};

export default MethodCard;
