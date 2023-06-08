import PhoneInput from '@/components/PhoneInput';
import type { IRegisterPaging } from '@/pages/circle/auth/register';
import { fieldValidity } from '@/utils/common/utils';
import { Button, Input, Typography } from '@material-tailwind/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import CErrorMessage from '@/components/CErrorMessage';
import { formRegisterPersonalInfoSchema } from '@/utils/validations/register.schema';
import { useFormik } from 'formik';

const PersonalInfoPage = ({
  setPage,
  formdata,
  setFormdata
}: IRegisterPaging): JSX.Element => {
  const { t } = useTranslation();

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
          {t('input.phone')}
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
      <div className="my-8">
        <Button
          type="submit"
          disabled={!isValid}
          fullWidth
          className="border bg-[#3AC4A0] rounded-full border-[#3AC4A0]"
        >
          {t('registerPage.nextButton')}
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoPage;
