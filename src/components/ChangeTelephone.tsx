import { useState, type SetStateAction } from 'react';

import Image from 'next/image';
import { ChangeTelephoneIcon } from 'public/assets/vector';

import Button from './ui/button/Button';
import CardGradient from './ui/card/CardGradient';
import Input from './ui/input/Input';

import useInput from '@/hooks/useInput';
import useWindowInnerHeight from '@/hooks/useWindowInnerHeight';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';

import { formatNumericHandler } from '@/helpers/formatNumericHandler';

import ListCountryFlag from '@/constants/countryFlag';

const errorMessage =
  'Phone number is required, please enter your phone number!';

const validatePhoneNumber = (value: string): boolean => {
  return value.length !== 0;
};

const ChangeTelephone: React.FC = () => {
  const width = useWindowInnerWidth();
  const height = useWindowInnerHeight();

  const [enteredCountryCode, setEnteredCountryCode] = useState('+62');
  const [selectedCountryFlag, setSelectedCountryFlag] = useState('ID');

  const {
    value: enteredPhoneNumber,
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
    // ...API
  };

  return (
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
            Change Telephone Number
          </h6>
          <p
            className={`mb-8 text-center font-poppins ${
              height !== undefined && height < 760 ? 'text-xs' : 'text-sm'
            } text-neutral-soft`}
          >
            All information from Seeds is transferred to your
            <br />
            new address.
          </p>
          <Image
            src={ChangeTelephoneIcon}
            alt="input user email"
            className="z-10 mx-auto mb-14"
          />
          <Input
            type="isSelectPhoneNumber"
            isError={phoneNumberIsError}
            errorMessage={errorMessage}
            selectedCountryFlag={selectedCountryFlag}
            selectValue={enteredCountryCode}
            selectOptions={ListCountryFlag}
            onSelect={countryCodeHandler}
            props={{
              maxLength: 10,
              value: enteredPhoneNumber,
              onChange: phoneNumberChangeHandler,
              onBlur: phoneNumberBlurHandler
            }}
          />
        </div>
        <Button
          label="Change"
          props={{
            onClick: submitHandler
          }}
        />
      </div>
    </CardGradient>
  );
};

export default ChangeTelephone;
