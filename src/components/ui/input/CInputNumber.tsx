import React, { useState } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  label: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  errors?: string;
  currency?: 'IDR' | 'USD';
  className?: string;
}

const formatCurrency = (value: string, currency: 'IDR' | 'USD'): string => {
  const number = parseFloat(value.replace(/\D/g, '')) || 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(number);
};

const CInputCurrency: React.FC<Props> = ({
  label,
  placeholder,
  register,
  errors,
  currency = 'IDR',
  className = ''
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const formattedValue = formatCurrency(event.target.value, currency);
    setInputValue(formattedValue);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-bold text-black mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          className={`w-full bg-white border ${
            errors != null ? 'border-red-500' : 'border-gray-700'
          } p-3 rounded-[10px] font-normal text-[16px] text-black hover:border-seeds-green focus:outline-none focus:border-seeds-green transition duration-200`}
          placeholder={inputValue !== '' ? '' : placeholder}
          value={inputValue}
          onChange={handleChange}
          {...register}
        />
      </div>
      {errors !== undefined && (
        <p className="text-red-500 text-xs mt-1">{errors}</p>
      )}
    </div>
  );
};

export default CInputCurrency;
