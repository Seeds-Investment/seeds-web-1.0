'use client';
import CInputPassword from '@/components/CInputPassword';
import type { IRegisterPaging } from '@/pages/auth/register';
import { fieldValidity } from '@/utils/common/utils';
import { formCreatePasswordSchema } from '@/utils/validations/register.schema';
import { Button, Typography } from '@material-tailwind/react';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const CreatePasswordPage = ({
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
      setPage(4);
    },
    validationSchema: formCreatePasswordSchema
  });

  const errorPassword = useMemo(
    () => fieldValidity(formik.errors?.password),
    [formik]
  );

  const errorRePassword = useMemo(
    () => fieldValidity(formik.errors?.rePassword),
    [formik]
  );

  const isValid = useMemo(() => {
    return (
      fieldValidity(formdata.password) &&
      fieldValidity(formdata.rePassword) &&
      !errorPassword &&
      !errorRePassword &&
      formdata.password === formdata.rePassword
    );
  }, [formdata, errorPassword, errorRePassword]);

  const passwordRules = [
    'Special Characters',
    'Uppercase and lowercase',
    'Numbers',
    'Minimum length 8 Characters'
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <Typography variant="h3" color="black">
          {t('registerPage.title.createPass')}
        </Typography>
        <Typography variant="small" color="black">
          {t('registerPage.description.createPass')}
        </Typography>
      </div>
      <div className="mt-10">
        <Typography variant="h5" color="black">
          {t('input.type.password')} <span className="text-red-900">*</span>
        </Typography>
        <CInputPassword
          onChange={v => {
            setFormdata(prevState => ({
              ...prevState,
              password: v
            }));
          }}
          className="text-lg"
          placeholder="Please enter your password"
          error={errorPassword}
        />
      </div>
      <div className="mt-5">
        <Typography variant="h5" color="black">
          {t('input.type.rePassword')} <span className="text-red-900">*</span>
        </Typography>
        <CInputPassword
          onChange={v => {
            setFormdata(prevState => ({
              ...prevState,
              rePassword: v
            }));
          }}
          className="text-lg"
          placeholder="Please enter your password"
          error={errorRePassword}
        />
      </div>
      <div className="mt-5">
        <Typography variant="h5" color="black">
          Password Must Contain:
        </Typography>
        <div className="flex flex-col gap-2 mt-2">
          {passwordRules.map((rule: string, indexrl: number) => {
            return (
              <div
                className="flex gap-2 items-center"
                key={`passw-rule-${indexrl}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="0.6rem"
                  viewBox="0 0 512 512"
                  className="fill-[#7856E1]"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                </svg>
                <Typography variant="small" color="black" className="">
                  {rule}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-8">
        <Button
          disabled={!isValid}
          type="submit"
          fullWidth
          className="border bg-[#3AC4A0] rounded-full border-[#3AC4A0]"
        >
          {t('registerPage.nextButton')}
        </Button>
      </div>
    </form>
  );
};

export default CreatePasswordPage;
