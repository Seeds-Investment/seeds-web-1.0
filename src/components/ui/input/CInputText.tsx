import React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  label: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  errors?: string;
  type?: 'text' | 'email' | 'password';
  className?: string;
}

const CInputText: React.FC<Props> = ({
  label,
  placeholder,
  register,
  errors,
  type = 'text',
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-bold text-black mb-2">{label}</label>
      <input
        type={type}
        className={`w-full bg-white border  ${
          errors !== undefined ? 'border-red-500' : 'border-gray-700'
        } p-3 rounded-[10px] font-normal text-[16px] text-black hover:border-seeds-green focus:outline-none focus:border-seeds-green  focus:shadow-seeds-green  focus:shadow-center  transition duration-200`}
        placeholder={placeholder}
        {...register}
      />
      {errors !== undefined && (
        <p className="text-red-500 text-xs mt-1">{errors}</p>
      )}
    </div>
  );
};

export default CInputText;
