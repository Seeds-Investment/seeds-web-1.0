import Image from 'next/image';
import { useEffect, useState } from 'react';

import { ArrowBackwardIcon, DeleteIcon, Logo } from 'public/assets/vector';

import CardGradient from './ui/card/CardGradient';

const numbersColumn1 = ['1', '4', '7'];
const numbersColumn2 = ['2', '5', '8', '0'];
const numbersColumn3 = ['3', '6', '9', ''];
const dotsRow = ['', '', '', '', '', ''];

const dotContainerClasses = 'relative flex justify-center items-center';

const dotClasses =
  'absolute w-7 h-7 lg:w-9 lg:h-9 rounded-full border-[#CCDCDC] border-4';

const animationClasses =
  'absolute animate-ping w-5 h-5 lg:w-7 lg:h-7 rounded-full bg-neutral-medium';

const defaultClasses =
  'relative overflow-hidden w-full sm:w-[90%] sm:rounded-[18px] sm:h-[36rem] h-[44rem] sm:mb-8 bg-white';

interface InputPinProps {
  onCancel: () => void;
  onContinue: (pin: string) => void;
  title?: string;
  subtitle?: string;
  className?: string;
  style?: object;
}

const InputPin: React.FC<InputPinProps> = ({
  onCancel,
  onContinue,
  title = 'Enter Your PIN',
  subtitle = 'Please enter your PIN number correctly',
  className,
  style
}) => {
  const [pin, setPin] = useState<string[]>([]);

  const enterPinHandler = (value: string) => () => {
    setPin(prevData => prevData.concat(value));
  };

  const deletePinHandler = (): void => {
    setPin(prevData => prevData.slice(0, prevData.length - 1));
  };

  const isDisabled = pin.length === 6;

  const buttonClasses = `z-10 flex justify-center items-center w-10 h-10 transition-colors rounded-full text-3xl font-semibold hover:bg-gray-200 ${
    !isDisabled ? 'active:bg-gray-300' : ''
  } ${isDisabled ? 'cursor-not-allowed' : ''}`;

  useEffect(() => {
    if (pin.length === 6) {
      const payload = pin.join('');
      onContinue(payload);
    }
  }, [pin, onContinue]);

  return (
    <CardGradient
      defaultGradient
      className={className ?? defaultClasses}
      style={style}
    >
      <div className="max-w-max mx-auto mt-6 mb-36">
        {/* -----Nav & Logo----- */}
        <div className="relative flex items-center sm:mb-8 mb-10">
          <button
            onClick={onCancel}
            className="absolute left-0 w-10 transition-colors rounded-md hover:bg-gray-200 active:bg-gray-300"
          >
            <Image src={ArrowBackwardIcon} alt="arrow-backward-icon" />
          </button>
          <span className="mx-auto">
            <Image src={Logo} alt="logo" />
          </span>
        </div>

        {/* -----Title----- */}
        <>
          <h2 className="mb-2 lg:text-3xl text-2xl font-semibold text-center text-neutral-medium">
            {title}
          </h2>
          <p className="sm:mb-10 mb-12 text-base text-center text-neutral-soft">
            {subtitle}
          </p>
        </>

        {/* -----Dots----- */}
        <div className="flex justify-center items-center gap-14 lg:gap-20 h-10 px-5 sm:mb-10 mb-16">
          {dotsRow.map((_, index) => (
            <span key={index} className={dotContainerClasses}>
              <span
                className={pin.length === index + 1 ? animationClasses : ''}
              ></span>
              <span
                className={
                  pin.length >= index + 1
                    ? `${dotClasses} bg-neutral-medium`
                    : dotClasses
                }
              ></span>
            </span>
          ))}
        </div>

        {/* -----Inputs----- */}
        <div className="flex justify-evenly lg:justify-between [&>*]:flex [&>*]:flex-col [&>*]:gap-4">
          <div>
            {numbersColumn1.map(number => (
              <button
                key={number}
                tabIndex={0}
                className={buttonClasses}
                onClick={enterPinHandler(number)}
                disabled={isDisabled}
              >
                {number}
              </button>
            ))}
          </div>
          <div className="mx-8 lg:mx-0">
            {numbersColumn2.map(number => (
              <button
                key={number}
                tabIndex={0}
                className={buttonClasses}
                onClick={enterPinHandler(number)}
                disabled={isDisabled}
              >
                {number}
              </button>
            ))}
          </div>
          <div>
            {numbersColumn3.map(number => (
              <button
                key={number}
                tabIndex={0}
                className={`${buttonClasses} ${
                  number === '' ? 'cursor-pointer active:bg-gray-300' : ''
                }`}
                onClick={
                  number === '' ? deletePinHandler : enterPinHandler(number)
                }
                disabled={number === '' ? false : isDisabled}
              >
                {number === '' ? (
                  <Image src={DeleteIcon} alt="delete-icon" />
                ) : (
                  number
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </CardGradient>
  );
};

export default InputPin;
