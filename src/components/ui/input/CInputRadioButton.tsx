import React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  name: string;
  options: Option[];
  register: UseFormRegisterReturn;
  errors?: string;
  className?: string;
}

const CInputRadioButton: React.FC<Props> = ({
  label,
  name,
  options,
  register,
  errors,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-bold text-black mb-2">{label}</label>
      <div className="flex flex-wrap gap-4">
        {options.map(option => (
          <label
            key={option.value}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              value={option.value}
              {...register}
              className="hidden peer"
            />
            <div className="w-5 h-5 border-2 border-gray-700 rounded-full flex items-center justify-center peer-checked:border-green-600">
              <div className="w-3 h-3 bg-green-600 rounded-full peer-checked:opacity-100 opacity-0 transition-opacity"></div>
            </div>
            <span className="text-black">{option.label}</span>
          </label>
        ))}
      </div>
      {errors !== undefined && (
        <p className="text-red-500 text-xs mt-1">{errors}</p>
      )}
    </div>
  );
};

export default CInputRadioButton;
