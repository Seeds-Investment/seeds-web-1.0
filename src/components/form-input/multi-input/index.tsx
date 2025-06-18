/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  type MultiProps,
  type Option
} from '@/utils/interfaces/multi-input.interface';
import Image from 'next/image';
import { WarningGreenIcon } from 'public/assets/vector';
import { useState, type ChangeEvent } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { FileInput, Toggle } from 'react-daisyui';
import {
  Controller,
  type FieldValues,
  type Path,
  type PathValue
} from 'react-hook-form';
import { toast } from 'react-toastify';
import CInput from '../input';
import Select from '../select';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
};

const Tooltip = ({ content }: { content: string }): JSX.Element => (
  <div className="font-poppins absolute z-10 top-full left-0 mt-1 w-max max-w-xs p-2 bg-gray-800 text-white text-sm rounded shadow-lg">
    {content}
  </div>
);

export default function MInput<T extends FieldValues>(
  props: MultiProps<T>
): JSX.Element {
  const { label, registerName, errors, extraElement, tooltip, clickAction, onIconClick } = props;
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleClick = (): void => {
    if (clickAction && typeof onIconClick === 'function') {
      onIconClick();
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label !== null && (
        <div className="relative w-fit">
          <label
            className={`flex gap-2 font-semibold font-poppins text-base text-[#262626] ${
              props.type === 'radio' || props.type === 'checkbox'
                ? ''
                : 'cursor-pointer'
            }`}
            htmlFor={`${registerName}-label`}
          >
            {label}
            {tooltip && (
              <Image
                src={WarningGreenIcon}
                alt="WarningGreenIcon"
                width={20}
                height={20}
                className="cursor-pointer"
                onMouseEnter={() => { setShowPopup(true); }}
                onMouseLeave={() => { setShowPopup(false); }}
                onClick={handleClick}
              />
            )}
          </label>
          {showPopup && tooltip && (
            <Tooltip content={props.tooltipContent ?? 'This is a tooltip'} />
          )}
        </div>
      )}
      <CommonInput {...props} />
      <NumberInput {...props} />
      <LongNumberInput {...props} />
      <CheckboxInput {...props} />
      <RadioInput {...props} />
      <ImageInput {...props} />
      <DropdownInput {...props} />
      <SwitchToggle {...props} />
      <ImageBase64Input {...props} />
      {extraElement}
      {errors != null && Boolean(getNestedValue(errors, registerName)) && (
        <p className="font-poppins font-normal text-sm text-[#EF5350] text-right">
          {getNestedValue(errors, registerName)?.message}
        </p>
      )}
    </div>
  );
}

// List of component input

const CommonInput = <T extends FieldValues>(
  props: MultiProps<T>
): JSX.Element | null => {
  return props.type === 'text' ||
    props.type === 'datetime-local' ||
    props.type === 'date' ||
    props.type === 'email' ? (
    <CInput
      onInput={props.onInput}
      type={props.type}
      maxLength={props.maxLength}
      disabled={props.disabled}
      style={{
        fontWeight: '400',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '16px',
        lineHeight: '48px',
        color: '#201B1C',
        border: '1px solid #BDBDBD'
      }}
      id={`${props.registerName}-label`}
      placeholder={props.placeholder}
      className={props.className}
      {...props.register(props.registerName)}
    />
  ) : null;
};

const NumberInput = <T extends FieldValues>(
  props: MultiProps<T>
): JSX.Element | null => {
  if (props.type !== 'number') return null;
  const { locale = 'id-ID' } = props;
  return (
    <Controller
      control={props.control}
      name={props.registerName}
      render={({ field: { value, onChange } }) => (
        <CurrencyInput
          id={`${props.registerName}-label`}
          className={`w-full font-poppins py-[11px] disabled:cursor-not-allowed ${
            props.extraClasses
              ? props.extraClasses
              : 'px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg'
          }`}
          intlConfig={{ locale }}
          decimalsLimit={props.decimalsLimit !== null ? props.decimalsLimit : 0}
          disableAbbreviations
          allowNegativeValue={props.allowNegativeValue}
          disableGroupSeparators={props.disableGroupSeparators}
          prefix={props.prefix ? `${props.prefix} ` : ''}
          suffix={props.suffix}
          placeholder={props.placeholder}
          disabled={props.disabled}
          value={
            props.watch(props.registerName)
              ? props.max && value > props.max
                ? props.max
                : value
              : ''
          }
          onValueChange={val => {
            onChange(val);
          }}
          max={props.max}
        />
      )}
    />
  );
};

const LongNumberInput = <T extends FieldValues>(
  props: MultiProps<T>
): JSX.Element | null => {
  if (props.type !== 'long-number') return null;

  return (
    <Controller
      control={props.control}
      name={props.registerName}
      render={({ field: { value, onChange } }) => (
        <input
          id={`${props.registerName}-label`}
          type="text"
          value={value || ''}
          onChange={e => {
            const val = e.target.value;
            if (/^\d{0,16}$/.test(val)) {
              onChange(val);
            }
          }}
          maxLength={props.maxLength ?? 16}
          minLength={props.minLength ?? 0}
          placeholder={props.placeholder ?? 'Enter a 16-digit number'}
          disabled={props.disabled}
          className={`w-full py-[11px] font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg px-3 font-poppins ${
            props.extraClasses ?? ''
          }`}
        />
      )}
    />
  );
};

const CheckboxInput = <T extends FieldValues>(
  props: MultiProps<T>
): JSX.Element | null => {
  return props.type === 'checkbox' ? (
    <div className="flex items-center gap-3">
      <input
        type={props.type}
        className={`w-5 h-5 shrink-0 appearance-none rounded-md border-2 checked:border-none checked:bg-[#3AC4A0] disabled:checked:!bg-[#727272] relative after:checked:content-[' '] after:checked:absolute after:checked:w-2 after:checked:h-3 after:checked:border after:checked:border-white after:checked:border-t-0 after:checked:border-e-[3px] after:checked:border-b-[3px] after:checked:border-s-0 after:checked:rotate-45 after:checked:top-0.5 after:checked:left-1/2 after:checked:-translate-x-1/2 cursor-pointer peer ${
          props.disabled ?? false ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        disabled={props.disabled}
        id={`${props.registerName}-${props.labelCheckbox}-label-checkbox`}
        value={
          typeof props.value === 'object'
            ? JSON.stringify(props.value)
            : props.value
        }
        {...props.register(props.registerName)}
      />
      <label
        className={`font-normal font-poppins text-base w-auto ${
          props.disabled ?? false
            ? 'text-[#727272] cursor-not-allowed'
            : 'peer-checked:text-[#3AC4A0] text-[#262626] cursor-pointer'
        }`}
        htmlFor={`${props.registerName}-${props.labelCheckbox}-label-checkbox`}
      >
        {props.labelCheckbox}
      </label>
    </div>
  ) : null;
};

const RadioInput = <T extends FieldValues>(
  props: MultiProps<T>
): JSX.Element | null => {
  return props.type === 'radio' ? (
    <div className="flex gap-7 flex-wrap">
      {props.data.map((item, index) => (
        <label
          className="flex items-center gap-5"
          key={index}
          htmlFor={`${props.registerName}-${item.label}-label`}
        >
          <input
            type={props.type}
            className={`w-3 h-3 appearance-none checked:bg-[#3AC4A0] outline outline-2 outline-offset-2 checked:outline-[#3AC4A0] disabled:checked:outline-[#727272] disabled:checked:!bg-[#727272] outline-[#DADADA] rounded-full peer ${
              props.disabled ?? false ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            disabled={props.disabled}
            id={`${props.registerName}-${item.label}-label`}
            value={
              typeof item.value === 'object'
                ? JSON.stringify(item.value)
                : item.value
            }
            {...props.register(props.registerName)}
          />
          <p
            className={`font-normal font-poppins text-base ${
              props.disabled ?? false
                ? 'text-[#727272] cursor-not-allowed'
                : 'peer-checked:text-[#3AC4A0] text-[#262626] cursor-pointer'
            }`}
          >
            {item.label}
          </p>
        </label>
      ))}
    </div>
  ) : null;
};

const ImageInput = <T extends FieldValues>(
  props: MultiProps<T>
): JSX.Element | null => {
  return props.type === 'image' ? (
    <>
      {props.usePreview ? (
        <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3">
          {props.imageURLPreview !== null ? (
            props.imageURLPreview ? (
              <img
                className="flex mx-auto w-[500px] h-[166px] object-contain"
                src={props.imageURLPreview}
                alt=""
                onClick={() => {
                  if (
                    (props.isCrop ?? false) &&
                    props.handleOpen !== null &&
                    props.handleOpen !== undefined
                  ) {
                    props.handleOpen();
                  }
                }}
              />
            ) : (
              <div className="text-seeds">Choose your image here</div>
            )
          ) : props.dataImage !== undefined ? (
            <img
              className="flex mx-auto w-[500px] h-[166px] object-contain"
              src={props.dataImage}
              alt=""
            />
          ) : (
            <div className="text-seeds">Choose your image here</div>
          )}
          <FileInput
            {...props.register(props.registerName)}
            size="sm"
            accept={props.fileType ? props.fileType : 'image/*'}
            className="w-full sm:w-fit cursor-pointer border border-[#E2E2E2]"
          />
        </div>
      ) : (
        <FileInput
          {...props.register(props.registerName)}
          size="sm"
          accept={props.fileType ? props.fileType : 'image/*'}
          className={`${
            props.extraClasses ? props.extraClasses : 'w-full sm:w-fit'
          }`}
        />
      )}
    </>
  ) : null;
};

const ImageBase64Input = <T extends FieldValues>(
  props: MultiProps<T>
): JSX.Element | null => {
  const [localPreviewURL, setLocalPreviewURL] = useState<string | null>(null); // <-- moved to top

  if (props.type !== 'image64') {
    return null;
  }

  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64String = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        props.setValue?.(
          props.registerName,
          base64String as PathValue<T, Path<T>>
        );

        setLocalPreviewURL(base64String);
        props.onFileChange?.(base64String);
      } catch (error) {
        toast.error('Failed to process the file');
      }
    } else {
      toast.error('No file selected');
    }
  };

  const finalPreviewURL = localPreviewURL ?? props.imageURLPreview;

  return (
    <>
      {props.usePreview ? (
        <div className="w-full border-[#BDBDBD] border rounded-lg flex flex-col text-center items-center justify-center p-10 gap-3">
          {finalPreviewURL ? (
            <img
              className="flex mx-auto w-[500px] h-[166px] object-contain"
              src={finalPreviewURL}
              alt="Preview"
            />
          ) : (
            <div className="text-seeds">Choose your image here</div>
          )}
          <input
            type="file"
            accept={props.fileType ?? 'image/*'}
            className="w-full sm:w-fit cursor-pointer border border-[#E2E2E2]"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <input
          type="file"
          accept={props.fileType ?? 'image/*'}
          className={`${
            props.extraClasses ? props.extraClasses : 'w-full sm:w-fit'
          }`}
          onChange={handleFileChange}
        />
      )}
    </>
  );
};

const DropdownInput = <T extends FieldValues>(
  props: MultiProps<T>
): JSX.Element | null => {
  return props.type === 'dropdown' &&
    props.control != null &&
    props.options != null &&
    props.options.length > 0 ? (
    <Controller
      control={props.control}
      name={props.registerName}
      render={({ field: { value, onChange } }) => (
        <Select
          value={value}
          options={props.options ?? []}
          onChange={(e: Option) => {
            onChange(e.value);
          }}
          disabled={props.disabled}
          rounded={props.rounded}
          fullWidth={props.fullWidth}
        />
      )}
    />
  ) : null;
};

const SwitchToggle = <T extends FieldValues>(
  props: MultiProps<T>
): JSX.Element | null => {
  return props.type === 'switch' ? (
    <Controller
      control={props.control}
      name={props.registerName}
      render={({ field: { value, onChange } }) => (
        <Toggle
          checked={Boolean(value)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (props.onSwitchToggle) {
              props.onSwitchToggle(e.target.checked);
            }
            onChange(e.target.checked);
          }}
          disabled={props.disabled}
          className={`
              ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            cursor-pointer bg-white hover:bg-white border-none ${
              value
                ? '[--tglbg:#3AC4A0] hover:[--tglbg:#3AC4A0] '
                : '[--tglbg:#BDBDBD] hover:[--tglbg:#bdbdbd]'
            }`}
        />
      )}
    />
  ) : null;
};
