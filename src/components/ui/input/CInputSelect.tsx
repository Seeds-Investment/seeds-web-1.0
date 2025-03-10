import React from 'react';
import { Controller, type Control, type FieldError } from 'react-hook-form';
import ReactSelect from 'react-select';

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  name: string;
  options: Option[];
  placeholder?: string;
  control: Control<any>;
  errors?: FieldError | string;
  className?: string;
  defaultValue?: string;
  saveValueAsLabel?: boolean;
  customColor?: string;
  onChange?: (value: string) => void;
}

const CInputSelect: React.FC<Props> = ({
  label,
  name,
  options,
  placeholder = 'Select an option',
  control,
  errors,
  className = '',
  defaultValue,
  saveValueAsLabel = false,
  customColor = '#3AC4A0',
  onChange
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-bold text-black mb-2">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <ReactSelect
            {...field}
            options={options}
            defaultValue={options.find(option =>
              saveValueAsLabel
                ? option.label === defaultValue
                : option.value === defaultValue
            )}
            value={options.find(option =>
              saveValueAsLabel
                ? option.label === field.value
                : option.value === field.value
            )}
            placeholder={placeholder}
            classNamePrefix="react-select"
            getOptionValue={(option: Option) => option.value}
            getOptionLabel={(option: Option) => option.label}
            onChange={(selectedOption: Option | null) => {
              const value =
                selectedOption !== null
                  ? saveValueAsLabel
                    ? selectedOption.label
                    : selectedOption.value
                  : null;
              field.onChange(value);
              if (onChange != null) {
                if (value !== null) {
                  onChange(value);
                }
              }
            }}
            styles={{
              control: (base: any, { isFocused }: { isFocused: boolean }) => ({
                ...base,
                padding: '6px',
                fontSize: '16px',
                borderColor:
                  errors !== undefined
                    ? 'red'
                    : isFocused
                    ? customColor
                    : 'black',
                boxShadow: isFocused
                  ? `0 0 0 3px ${customColor}40`
                  : base.boxShadow,
                '&:hover': {
                  borderColor: customColor
                },
                minHeight: '40px',
                borderRadius: '10px'
              }),
              menu: (base: any) => ({
                ...base,
                backgroundColor: '#FFFFFF', // Warna latar belakang dropdown
                borderRadius: '12px',
                padding: '8px'
              }),
              menuList: (base: any) => ({
                ...base,
                borderRadius: '12px',
                padding: '4px'
              }),
              option: (provided: any, state: any) => ({
                ...provided,
                backgroundColor: (state as { isSelected: boolean }).isSelected
                  ? '#E6FAE6'
                  : (state as { isFocused: boolean }).isFocused
                  ? '#F5F5F5'
                  : '#F9F9F9',
                color: 'black',
                borderRadius: '4px',
                margin: '1px 0px',
                border: (state as { isFocused: boolean }).isFocused
                  ? `1px solid ${customColor}`
                  : 'none',
                padding: 12,
                cursor: 'pointer'
              })
            }}
          />
        )}
      />
      {errors !== undefined && (
        <p className="text-red-500 text-xs mt-1">
          {typeof errors === 'string' ? errors : errors.message}
        </p>
      )}
    </div>
  );
};

export default CInputSelect;
