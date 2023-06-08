import { useState, type SetStateAction } from 'react';

import Image from 'next/image';
import { ChangeTelephoneIcon } from 'public/assets/vector';

import Button from './ui/button/Button';
import CardGradient from './ui/card/CardGradient';
import Input from './ui/input/Input';

import useInput from '@/hooks/useInput';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';

import { formatNumericHandler } from '@/helpers/formatNumericHandler';

const options = [
  { id: 1, countryCode: '+62' },
  { id: 2, countryCode: '+1' }
];

const errorMessage =
  'Phone number is required, please enter your phone number!';

const validatePhoneNumber = (value: string): boolean => {
  return value.length !== 0;
};

const ChangeTelephone: React.FC = () => {
  const width = useWindowInnerWidth();

  const [enteredCountryCode, setEnteredCountryCode] = useState('');

  const {
    value: enteredPhoneNumber,
    isError: phoneNumberIsError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler
  } = useInput(validatePhoneNumber, formatNumericHandler);

  const countryCodeHandler = (event: SetStateAction<string>): void => {
    setEnteredCountryCode(event);
  };

  const submitHandler = (): void => {
    // ...API
  };

  return (
    <CardGradient
      defaultGradient={width >= 640}
      extraClasses="w-full sm:w-[90%] sm:rounded-[18px] sm:h-[36rem] h-[44rem] bg-white p-6"
    >
      <div className="z-10 flex flex-col justify-between lg:w-1/2 md:w-2/3 sm:w-[80%] w-full h-full mx-auto p-4 bg-white">
        <div>
          <h6 className="mb-0.5 text-center font-semibold text-base">
            Change Telephone Number
          </h6>
          <p className="mb-8 text-center text-sm text-[#7C7C7C]">
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
            label="Your New Telephone Number"
            isError={phoneNumberIsError}
            errorMessage={errorMessage}
            selectValue={enteredCountryCode}
            selectOptions={options}
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
