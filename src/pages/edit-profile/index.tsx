import Image from 'next/image';
import { withRouter, type NextRouter } from 'next/router';
import { FormEventHandler, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Button from '@/components/ui/button/Button';
import CardGradient from '@/components/ui/card/CardGradient';
import Input from '@/components/ui/input/Input';
import TextArea from '@/components/ui/input/TextArea';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import ArrowCollapseIcon from '@/components/ui/vector/ArrowCollapseIcon';

import { ArrowBackwardIcon, Dot } from 'public/assets/vector';

import useInput from '@/hooks/useInput';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';

import {
  formatAlphabeticWithSpaceHandler,
  formatSeedsTagHandler
} from '@/helpers/useInputFormats';

import LanguageContext from '@/store/language/language-context';
import { userActions } from '@/store/redux/features/user-data/user-slice';

import { editUserInfo, getUserInfo } from '@/repository/profile.repository';
interface ConfirmNewPinProps {
  router: NextRouter;
}

const ConfirmNewPinPage: React.FC<ConfirmNewPinProps> = ({ router }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const languageCtx = useContext(LanguageContext);

  const width = useWindowInnerWidth();

  // const [userData, setUserData] = useState<Record<string, any>>();
  const [form, setForm] = useState<any>({
    name: '',
    seedsTag: '',
    email: '',
    pin: '',
    avatar: '',
    bio: '',
    birthDate: '',
    phone: '',
    _pin: ''
  });

  useEffect(() => {
    const fetchUserProfile = async (): Promise<void> => {
      try {
        const userInfo = await getUserInfo();
        // setUserData(userInfo);
        setForm({
          name: userInfo.name,
          seedsTag: userInfo.seedsTag,
          email: userInfo.email,
          avatar: userInfo.avatar,
          bio: userInfo.bio,
          birthDate: userInfo.birthDate,
          phone: userInfo.phoneNumber
        });
      } catch (error: any) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    const fetchData = async (): Promise<void> => {
      try {
        await Promise.all([fetchUserProfile()]);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);

  const handleOnChange = (fieldName: string, value: string): void => {
    setForm((prevForm: any) => ({
      ...prevForm,
      [fieldName]: value
    }));
  };

  const submitForm: FormEventHandler<HTMLFormElement> = async e => {
    try {
      e.preventDefault();

      await editUserInfo(form);

      setForm({
        name: '',
        seedsTag: '',
        email: '',
        avatar: '',
        bio: '',
        birthDate: '',
        phone: ''
      });
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  const {
    // isValid: nameIsValid,
    isError: nameIsError,
    inputBlurHandler: nameBlurHandler
  } = useInput(
    (payload: string) => payload.trim().length !== 0,
    formatAlphabeticWithSpaceHandler
  );

  const {
    // isValid: tagIsValid,
    isError: tagIsError,
    inputBlurHandler: tagBlurHandler
  } = useInput(
    (payload: string) => payload.trim().length !== 0,
    formatSeedsTagHandler
  );

  function formatDate(inputDateString: any) {
    const date = new Date(inputDateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken');
    dispatch(userActions.setAccessToken(accessToken));
  }, [dispatch]);

  const cancelHandler = (): void => {
    router.back();
  };

  return (
    <PageGradient
      defaultGradient
      className="relative overflow-hidden flex flex-col items-center sm:p-0 sm:pb-16 w-full"
    >
      <CardGradient
        defaultGradient
        className={`relative overflow-hidden w-full sm:w-[90%] sm:rounded-[18px] sm:min-h-[36rem] bg-white sm:px-20 px-4 py-8 ${
          width !== undefined && width < 370
            ? 'min-h-[38rem]'
            : width !== undefined && width < 400
            ? 'min-h-[45rem]'
            : width !== undefined && width < 415
            ? 'min-h-[48rem]'
            : ''
        }`}
      >
        <form onSubmit={submitForm}>
          {/* ----- Header ----- */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={cancelHandler}
              className="w-10 transition-colors rounded-md hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:bg-gray-200"
            >
              <Image src={ArrowBackwardIcon} alt="arrow-backward-icon" />
            </button>
            <h6 className="font-montserrat font-semibold text-neutral-medium md:text-base text-sm">
              {t('editProfile.title')}
            </h6>
            <button
              type="submit"
              className="focus:outline-none focus:border-b active:scale-[0.95] transition-transform font-poppins font-semibold md:text-base text-sm text-seeds-button-green hover:border-b border-seeds-button-green disabled:cursor-not-allowed"
              onClick={() => {
                console.log(form);
              }}
            >
              {t('button.label.done')}
            </button>
          </div>

          {/* ----- Image Container ----- */}
          <div className="z-10 overflow-hidden rounded-full mb-1 mx-auto md:w-28 md:h-28 w-20 h-20">
            <Image
              alt="avatar"
              src={form?.avatar}
              width={100}
              height={100}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="mb-8 text-center">
            <button className="z-20 focus:outline-none focus:border-b active:scale-[0.95] transition-transform font-poppins font-semibold text-xs text-seeds-button-green hover:border-b border-seeds-button-green disabled:cursor-not-allowed">
              {t('editProfile.editImage')}
            </button>
          </div>

          {/* -----Inner Card----- */}
          <div className="mb-10 p-4 pt-10 bg-white">
            <Input
              required
              label={t('input.label.name')}
              placeholder={
                languageCtx.language === 'EN'
                  ? 'Enter Your Name'
                  : 'Masukan Nama Anda'
              }
              extraClasses="mb-14"
              extraInputClasses="md:text-base text-sm"
              extraLabelClasses="md:text-base text-sm md:peer-focus:text-base peer-focus:text-sm"
              errorClasses="absolute sm:-bottom-[1.125rem] -bottom-4 font-poppins text-xs text-warning-hard"
              isError={nameIsError}
              errorMessage={t('errorMessage.requiredName')}
              props={{
                value: form?.name,
                onChange: (e: any) => handleOnChange('name', e.target.value),
                onBlur: nameBlurHandler,
                maxLength: 255
              }}
            />
            <Input
              required
              type="seedsTag"
              label="SeedsTag"
              placeholder={
                languageCtx.language === 'EN' ? 'yourseedstag' : 'seedstaganda'
              }
              extraClasses="mb-14"
              extraInputClasses="md:text-base text-sm"
              extraLabelClasses="md:text-base text-sm md:peer-focus:text-base peer-focus:text-sm"
              errorClasses="absolute sm:-bottom-[1.125rem] -bottom-4 font-poppins text-xs text-warning-hard"
              isError={tagIsError}
              errorMessage={t('errorMessage.requiredSeedsTag')}
              props={{
                value: form?.seedsTag,
                onChange: (e: any) =>
                  handleOnChange('seedsTag', e.target.value),
                onBlur: tagBlurHandler,
                maxLength: 16
              }}
            />
            <Input
              required
              type="date"
              label={t('input.label.dateOfBirth')}
              placeholder={
                languageCtx.language === 'EN'
                  ? 'Enter Your Birth Date'
                  : 'Masukan Tanggal Lahir Anda'
              }
              extraClasses="mb-12"
              extraInputClasses="md:text-base text-sm"
              extraLabelClasses="md:text-base text-sm md:peer-focus:text-base peer-focus:text-sm"
              props={{
                readOnly: false,
                value: formatDate(form?.birthDate),
                onChange: (e: any) =>
                  handleOnChange('birthDate', e.target.value)
              }}
            />
            <TextArea
              showCount
              value={form?.bio}
              variant="standard"
              label="Bio"
              placeholder={
                languageCtx.language === 'EN'
                  ? 'Enter Your Bio'
                  : 'Masukan Bio Anda'
              }
              extraClasses="mb-12"
              extraInputClasses="md:text-base text-sm"
              extraLabelClasses="md:text-base text-sm md:peer-focus:text-base peer-focus:text-sm"
              extraCounterClasses="md:text-base text-sm"
              maxLength={50}
              props={{
                rows: 1,
                onChange: (e: any) => handleOnChange('bio', e.target.value)
              }}
            />
            <Input
              required
              isRedirectButton
              type="isSelectPhoneNumber"
              label={t('editProfile.telephoneNumber')}
              redirectUrl="/change-telephone-number"
              placeholder={
                languageCtx.language === 'EN'
                  ? 'Enter Your Telephone Number'
                  : 'Masukan Nomor Telepon Anda'
              }
              className="group relative flex items-baseline gap-2.5 mb-12 pb-2 border-b border-neutral-ultrasoft cursor-pointer"
              extraLabelClasses="md:text-base text-sm md:peer-focus:text-base peer-focus:text-sm"
              extraInputClasses="disabled:bg-transparent cursor-pointer md:text-base text-sm"
              props={{
                readOnly: true,
                value: form?.phone
              }}
            />
            <Input
              required
              isRedirectButton
              label="Email"
              redirectUrl="/change-email-address"
              placeholder={
                languageCtx.language === 'EN'
                  ? 'Enter Your Email'
                  : 'Masukan Email Anda'
              }
              extraClasses="mb-8"
              extraInputClasses="md:text-base text-sm"
              extraLabelClasses="md:text-base text-sm md:peer-focus:text-base peer-focus:text-sm"
              props={{
                readOnly: true,
                value: form?.email
              }}
            />

            {/* -----Linked Account----- */}
            <div className="group relative mb-8 pb-3 border-b border-neutral-ultrasoft cursor-pointer">
              <h6 className="font-poppins font-semibold leading-6 text-neutral-medium md:text-base text-sm">
                {t('editProfile.linkedAccount')}
                <span className="text-warning-hard">*</span>
              </h6>
              <span className="absolute right-2 bottom-1/3 group-hover:translate-x-1 group-hover:ease-in-out group-hover:duration-500 transition-all">
                <ArrowCollapseIcon stroke="#262626" strokeWidth="2" />
              </span>
            </div>

            {/* -----Change Pin----- */}
            <div className="group relative pb-3 border-b border-neutral-ultrasoft cursor-pointer">
              <h6 className="font-poppins font-semibold leading-6 text-neutral-medium md:text-base text-sm">
                {t('editProfile.changePin')}
                <span className="text-warning-hard">*</span>
              </h6>
              <>
                <span className="absolute right-10 bottom-[40%] flex gap-2">
                  {Array(6).fill(<Image src={Dot} alt="dot" />)}
                </span>
                <span className="absolute right-2 bottom-1/3 group-hover:translate-x-1 group-hover:ease-in-out group-hover:duration-500 transition-all">
                  <ArrowCollapseIcon stroke="#262626" strokeWidth="2" />
                </span>
              </>
            </div>
          </div>
        </form>

        {/* -----Delete Button----- */}
        <Button
          variant="outlined"
          label={t('button.label.deleteAccount')}
          extraClasses="absolute bottom-4 left-1/2 -translate-x-1/2 sm:w-1/3"
        />
      </CardGradient>
    </PageGradient>
  );
};

export default withRouter(ConfirmNewPinPage);
