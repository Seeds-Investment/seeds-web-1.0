import Image from 'next/image';
import { InputUserEmail } from 'public/assets/vector';

import Button from './Button';
import CardGradient from './ui/card/CardGradient';
import Input from './ui/input/Input';

import { emailValidationHandler } from '@/helpers/emailValidationHandler';

import useInput from '@/hooks/useInput';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';

const ChangeEmail: React.FC = () => {
  const width = useWindowInnerWidth();

  const {
    value: enteredEmail,
    isError: emailIsError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler
  } = useInput(emailValidationHandler);

  const submitHandler = (): void => {
    // ...API
  };

  const errorMessage =
    enteredEmail.trim().length === 0
      ? 'Email is required, please enter your email!'
      : 'Please enter your email address in format yourname@example.com';

  return (
    <CardGradient defaultGradient={width >= 640} padding="p-6">
      <div className="z-10 flex flex-col justify-between lg:w-1/2 md:w-2/3 sm:w-[80%] w-full h-full mx-auto p-4 bg-white">
        <div>
          <h6 className="mb-0.5 text-center font-semibold text-base">
            Change Email Address
          </h6>
          <p className="mb-8 text-center text-sm text-[#7C7C7C]">
            All information from Seeds is transferred to your
            <br />
            new address.
          </p>
          <Image
            src={InputUserEmail}
            alt="input user email"
            className="z-10 mx-auto mb-14"
          />
          <Input
            isError={emailIsError}
            errorMessage={errorMessage}
            props={{
              value: enteredEmail,
              onChange: emailChangeHandler,
              onBlur: emailBlurHandler
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

export default ChangeEmail;
