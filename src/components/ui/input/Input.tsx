import { useState, type SetStateAction } from 'react';

import Image from 'next/image';
import ID from 'public/assets/images/flags/ID.png';
import ArrowCollapseIcon from '../vector/ArrowCollapseIcon';

import classes from './Input.module.css';

interface InputProps {
  type?: 'text' | 'isSelectPhoneNumber' | 'isSelect';
  label?: string;
  placeholder?: string;
  width?: string;
  margin?: string;
  isError?: boolean;
  errorMessage?: string;
  errorClasses?: string;
  selectValue?: string | number;
  selectOptions?: any[];
  onSelect?: (event: SetStateAction<any>) => void;
  className?: string;
  style?: object;
  props?: object;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label = 'Your New Email',
  placeholder = 'example@mail.com',
  width = '',
  margin = '',
  isError,
  errorMessage,
  errorClasses,
  selectValue,
  selectOptions,
  onSelect = () => {},
  className,
  style,
  ...props
}) => {
  const [isExpand, setIsExpand] = useState(false);

  const handleExpand = (value?: number | string) => () => {
    if (value !== undefined) {
      setIsExpand(prevExpand => !prevExpand);
    }
    setIsExpand(prevExpand => !prevExpand);
  };

  const defaultInputClasses = `relative h-11 ${width} ${margin}`;

  return (
    <div className={className ?? defaultInputClasses} style={style}>
      {type === 'text' && (
        <>
          <input
            {...props.props}
            placeholder={placeholder}
            className="peer h-full w-full border-b border-neutral-ultrasoft bg-transparent py-1.5 font-sans text-base text-neutral-soft outline outline-0 transition-all placeholder-shown:border-neutral-ultrasoft focus:border-seeds-button-green/80 focus:outline-0 disabled:border-0 disabled:bg-neutral-ultrasoft/10 disabled:cursor-not-allowed"
          />
          <label className="after:content[' '] pointer-events-none absolute left-0 -top-6 flex h-full w-full select-none text-base font-semibold leading-6 text-neutral-medium transition-all after:absolute after:-bottom-6 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-seeds-button-green/80 after:transition-transform after:duration-300 peer-placeholder-shown:leading-6 peer-placeholder-shown:text-neutral-medium peer-focus:text-base peer-focus:leading-6 peer-focus:text-seeds-button-green/80 peer-focus:after:scale-x-100 peer-focus:after:border-seeds-button-green/80 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-neutral-medium">
            {label}
          </label>
          {isError === true && (
            <p className={errorClasses ?? 'mt-1 text-xs text-warning-hard'}>
              {errorMessage}
            </p>
          )}
        </>
      )}

      {(type === 'isSelect' || type === 'isSelectPhoneNumber') && (
        <>
          <input
            {...props.props}
            placeholder={placeholder}
            className="peer h-full w-full border-b border-neutral-ultrasoft bg-transparent pl-[3.125rem] py-1.5 font-sans text-base text-neutral-soft outline outline-0 transition-all placeholder-shown:border-neutral-ultrasoft focus:border-seeds-button-green/80 focus:outline-0 disabled:border-0 disabled:bg-neutral-ultrasoft/10 disabled:cursor-not-allowed"
          />
          <label className="after:content[' '] pointer-events-none absolute left-0 -top-6 flex h-full w-full select-none text-base font-semibold leading-6 text-neutral-medium transition-all after:absolute after:-bottom-6 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-seeds-button-green/80 after:transition-transform after:duration-300 peer-placeholder-shown:leading-6 peer-placeholder-shown:text-neutral-medium peer-focus:text-base peer-focus:leading-6 peer-focus:text-seeds-button-green/80 peer-focus:after:scale-x-100 peer-focus:after:border-seeds-button-green/80 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-neutral-medium">
            {label}
          </label>
          <button
            onClick={handleExpand()}
            className="absolute left-0 bottom-2.5 flex justify-between items-center w-10 h-6"
          >
            <Image src={ID} alt="flag" />
            <ArrowCollapseIcon
              stroke="#535353"
              strokeWidth="1.75"
              width="6"
              isExpand={isExpand}
              expandAngle="rotate-[270deg]"
              collapseAngle="rotate-90"
            />
            {isExpand && (
              <div className="animate-slide-down absolute top-10 min-w-max max-h-32 rounded-md bg-white shadow-[0px_0px_1.34767px_rgba(48,49,51,0.05),0px_2.69534px_5.39068px_rgba(48,49,51,0.1)]">
                <div
                  className={`flex flex-col w-full max-h-32 overflow-auto ${classes['custom-scrollbar']}`}
                >
                  {selectOptions?.map(item => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center gap-4 px-3 py-1 hover:bg-gray-200 active:bg-gray-300 focus:outline-0 active:outline-0 focus:bg-gray-200 transition-all duration-300"
                      tabIndex={0}
                      onClick={() => {
                        onSelect(item.id);
                      }}
                    >
                      <Image src={ID} alt="flag" />
                      <span className="text-sm text-neutral-soft">
                        {type === 'isSelect' ? item.name : item.countryCode}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </button>
          {isError === true && (
            <p className={errorClasses ?? 'mt-1 text-xs text-warning-hard'}>
              {errorMessage}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Input;
