import Image from 'next/image';
import {
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode
} from 'react';

import { SendOTPImage } from 'public/assets/vector';

import CardGradient from './ui/card/CardGradient';

import useWindowInnerHeight from '@/hooks/useWindowInnerHeight';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';

import Input from './ui/input/Input';

interface SendOTPProps {
  message?: string;
  submessage?: ReactNode | string;
}

const SendOTP: React.FC<SendOTPProps> = ({
  message = 'Enter the OTP code',
  submessage = (
    <span className="font-poppins text-sm text-neutral-soft">
      Please check your email to get the OTP
      <br />
      code
    </span>
  )
}) => {
  const width = useWindowInnerWidth();
  const height = useWindowInnerHeight();

  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');

  function clickEventHandler(
    event: KeyboardEvent<HTMLInputElement>,
    id: number
  ): void {
    if (
      event.key === 'Tab' ||
      event.key === ' ' ||
      (isNaN(+event.key) && event.key !== 'Backspace')
    ) {
      return;
    }
    if (event.key === 'Backspace') {
      document.getElementById(`${+id - 1}`)?.focus();
    } else {
      document.getElementById(`${+id + 1}`)?.focus();
    }
  }

  return (
    <>
      <CardGradient
        defaultGradient={width !== undefined && width > 640}
        extraClasses={`flex flex-col gap-4 w-[90%] sm:rounded-[18px] sm:h-[36rem] ${
          height !== undefined && height >= 860
            ? 'h-[44rem]'
            : height !== undefined && height < 750
            ? 'h-[35rem]'
            : 'h-[40rem]'
        } md:bg-white bg-transparent sm:p-6 p-0`}
      >
        <div
          className={`z-10 flex flex-col sm:justify-between justify-evenly lg:w-1/2 md:w-2/3 sm:w-[80%] w-full h-1/2 mx-auto p-4 bg-white`}
        >
          <div className="text-center">
            <h3 className="mb-2 font-poppins font-semibold text-2xl text-neutral-medium">
              {message}
            </h3>
            {typeof submessage === 'object' ? <p>{submessage}</p> : submessage}
          </div>
          <Image
            src={SendOTPImage}
            alt="send otp"
            className="z-10 sm:mb-0 mx-auto"
          />
        </div>
        <div
          className={`z-10 lg:w-1/2 md:w-2/3 sm:w-[80%] w-full h-1/2 mx-auto py-6 px-4 bg-white`}
        >
          <h6 className="mb-8 font-poppins font-semibold text-center text-neutral-medium">
            OTP Code
          </h6>
          <div className="mb-8 flex gap-8">
            <Input
              placeholder=""
              label=""
              props={{
                id: 1,
                value: first,
                onChange: (event: ChangeEvent<HTMLInputElement>) => {
                  setFirst(event.target.value.replace(/\D/g, ''));
                },
                onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => {
                  clickEventHandler(event, 1);
                },
                maxLength: 1,
                style: {
                  fontWeight: 600,
                  textAlign: 'center',
                  color: '#262626'
                }
              }}
            />
            <Input
              placeholder=""
              label=""
              props={{
                id: 2,
                value: second,
                onChange: (event: ChangeEvent<HTMLInputElement>) => {
                  setSecond(event.target.value.replace(/\D/g, ''));
                },
                onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => {
                  clickEventHandler(event, 2);
                },
                maxLength: 1,
                style: {
                  fontWeight: 600,
                  textAlign: 'center',
                  color: '#262626'
                }
              }}
            />
            <Input
              placeholder=""
              label=""
              props={{
                id: 3,
                value: third,
                onChange: (event: ChangeEvent<HTMLInputElement>) => {
                  setThird(event.target.value.replace(/\D/g, ''));
                },
                onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => {
                  clickEventHandler(event, 3);
                },
                maxLength: 1,
                style: {
                  fontWeight: 600,
                  textAlign: 'center',
                  color: '#262626'
                }
              }}
            />
            <Input
              placeholder=""
              label=""
              props={{
                id: 4,
                value: fourth,
                onChange: (event: ChangeEvent<HTMLInputElement>) => {
                  setFourth(event.target.value.replace(/\D/g, ''));
                },
                onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => {
                  clickEventHandler(event, 4);
                },
                maxLength: 1,
                style: {
                  fontWeight: 600,
                  textAlign: 'center',
                  color: '#262626'
                }
              }}
            />
          </div>
          <h6 className="text-center font-poppins font-light">
            didn&apos;t get email?{' '}
            <span className="font-poppins text-seeds-button-green hover:border-b border-seeds-button-green">
              <button>Resending</button>
            </span>
          </h6>
        </div>
      </CardGradient>
    </>
  );
};

export default SendOTP;
