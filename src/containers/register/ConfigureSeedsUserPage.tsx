import CErrorMessage from '@/components/CErrorMessage';
import type { IRegisterPaging } from '@/pages/circle/auth/register';
import { fieldValidity } from '@/utils/common/utils';
import { formConfigureSeedsUserSchema } from '@/utils/validations/register.schema';
import { Button, Input, Typography } from '@material-tailwind/react';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const ReferralCodePage = ({
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
      setPage(2);
    },
    validationSchema: formConfigureSeedsUserSchema
  });

  const errorName = useMemo(() => fieldValidity(formik.errors?.name), [formik]);

  const errorSeedsTag = useMemo(
    () => fieldValidity(formik.errors?.seedsTag),
    [formik]
  );

  const errorReferralCode = useMemo(
    () => fieldValidity(formik.errors?.referralCode),
    [formik]
  );

  const isValid = useMemo(() => {
    return (
      fieldValidity(formdata.name) &&
      fieldValidity(formdata.seedsTag) &&
      !errorName &&
      !errorSeedsTag &&
      !errorReferralCode
    );
  }, [formdata, errorName, errorSeedsTag, errorReferralCode]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <Typography variant="h3" color="black">
          {t('registerPage.title.seedsuser')}
        </Typography>
        <Typography variant="small" color="black">
          {t('registerPage.description.seedsuser')}
        </Typography>
      </div>
      <div className="mt-10">
        <Typography variant="h5" color="black">
          {t('input.type.name')}
        </Typography>
        <Input
          className="text-lg"
          type="text"
          size="md"
          variant="standard"
          color="gray"
          placeholder="Your Name"
          value={formdata.name}
          onChange={e => {
            setFormdata(prevState => ({
              ...prevState,
              name: e.target.value
            }));
          }}
          error={errorName}
        />
        <CErrorMessage>{formik.errors?.name}</CErrorMessage>
      </div>
      <div className="mt-5">
        <Typography variant="h5" color="black">
          {t('input.type.seedsTag')}
        </Typography>
        <Input
          className="text-lg"
          type="text"
          size="md"
          variant="standard"
          color="gray"
          placeholder="@seedstag"
          value={formdata.seedsTag}
          onChange={e => {
            setFormdata(prevState => ({
              ...prevState,
              seedsTag: e.target.value
            }));
          }}
          error={errorSeedsTag}
        />
        <CErrorMessage>{formik.errors?.seedsTag}</CErrorMessage>
      </div>
      <div className="mt-5">
        <div className="flex gap-2">
          <Typography variant="h5" color="black">
            {t('input.type.referralCode')}
          </Typography>
          <Typography>(optional)</Typography>
        </div>
        <Input
          className="text-lg"
          type="text"
          size="md"
          variant="standard"
          color="gray"
          placeholder="Referral Code"
          value={formdata.referralCode}
          onChange={e => {
            setFormdata(prevState => ({
              ...prevState,
              referralCode: e.target.value
            }));
          }}
          error={errorReferralCode}
        />
        <CErrorMessage>{formik.errors?.referralCode}</CErrorMessage>
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

export default ReferralCodePage;
