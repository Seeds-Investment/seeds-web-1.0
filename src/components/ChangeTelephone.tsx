import Image from 'next/image';
import { useContext, useState, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import { ChangeTelephoneIcon } from 'public/assets/vector';

import Button from './ui/button/Button';
import CardGradient from './ui/card/CardGradient';
import Input from './ui/input/Input';

import useInput from '@/hooks/useInput';
import useWindowInnerHeight from '@/hooks/useWindowInnerHeight';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';

import { formatNumericHandler } from '@/helpers/formatNumericHandler';

import ListCountryFlag from '@/constants/countryFlag';

import LanguageContext from '@/store/language/language-context';
import PhoneContext from '@/store/phone/phone-context';

const validatePhoneNumber = (value: string): boolean => {
  return value.length !== 0;
};

const ChangeTelephone: React.FC = () => {
  const { t } = useTranslation();
  const phoneCtx = useContext(PhoneContext);
  const languageCtx = useContext(LanguageContext);

  const width = useWindowInnerWidth();
  const height = useWindowInnerHeight();

  const [enteredCountryCode, setEnteredCountryCode] = useState('+62');
  const [selectedCountryFlag, setSelectedCountryFlag] = useState('ID');

  const {
    value: enteredPhoneNumber,
    isValid: phoneNumberIsValid,
    isError: phoneNumberIsError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler
  } = useInput(validatePhoneNumber, formatNumericHandler);

  const countryCodeHandler = (
    countryCode: SetStateAction<string>,
    countryFlag: SetStateAction<string>
  ): void => {
    setEnteredCountryCode(countryCode);
    setSelectedCountryFlag(countryFlag);
  };

  const submitHandler = (): void => {
    const payload = enteredCountryCode
      .concat(enteredPhoneNumber)
      .replace('+', '');

    phoneCtx.validatePhone(payload);
  };

  const errorMessage = t('errorMessage.requiredPhoneNumber');

  return (
    <>
      <CardGradient
        defaultGradient={width !== undefined && width > 640}
        extraClasses={`w-[90%] sm:rounded-[18px] sm:h-[36rem] ${
          height !== undefined && height >= 860
            ? 'h-[44rem]'
            : height !== undefined && height < 750
            ? 'h-[35rem]'
            : 'h-[40rem]'
        } bg-white sm:p-6 py-6`}
      >
        <div
          className={`z-10 flex flex-col justify-between lg:w-1/2 md:w-2/3 sm:w-[80%] w-full h-full mx-auto sm:p-4 px-4 bg-white`}
        >
          <div>
            <h6
              className={`mb-2 text-center font-poppins font-semibold ${
                height !== undefined && height < 760 ? 'text-sm' : 'text-base'
              }`}
            >
              {t('changeTelephoneNumber.title')}
            </h6>
            <p
              className={`mb-8 text-center font-poppins ${
                height !== undefined && height < 760 ? 'text-xs' : 'text-sm'
              } text-neutral-soft`}
            >
              {languageCtx.language === 'EN'
                ? 'All information from Seeds is transferred to your'
                : 'Semua informasi dari Seeds ditransfer ke alamat'}
              {width !== undefined && width >= 640 ? <br /> : ' '}
              {languageCtx.language === 'EN' ? 'new address.' : 'baru Anda.'}
            </p>
            <Image
              src={ChangeTelephoneIcon}
              alt="input user email"
              className="z-10 mx-auto mb-14"
            />
            <Input
              type="isSelectPhoneNumber"
              label={t('input.label.phone')}
              placeholder=""
              isError={phoneNumberIsError}
              errorMessage={errorMessage}
              selectedCountryFlag={selectedCountryFlag}
              selectValue={enteredCountryCode}
              selectOptions={ListCountryFlag}
              onSelect={countryCodeHandler}
              props={{
                maxLength: 13,
                value: enteredPhoneNumber,
                onChange: phoneNumberChangeHandler,
                onBlur: phoneNumberBlurHandler
              }}
            />
          </div>
          <Button
            color="dark"
            label={t('button.label.change')}
            props={{
              onClick: submitHandler,
              disabled: phoneNumberIsValid === false
            }}
          />
        </div>
      </CardGradient>
    </>
  );
};

export default ChangeTelephone;
