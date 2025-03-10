import WinnerIcon from '@/assets/play/game-decentralize/quiz/winner-icon.svg';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import CInputFile from '../CInputIFile';
import CInputCurrency from '../CInputNumber';
import CInputText from '../CInputText';

interface DynamicPrizeInputProps {
  name: string;
  label: string;
  typeInput?: 'text' | 'number';
  isImage?: boolean;
  maxItems?: number;
  defaultItems?: number;
  disabledAdd?: boolean;
}

const DynamicPrizeInput: React.FC<DynamicPrizeInputProps> = ({
  name,
  label,
  isImage = true,
  typeInput = 'text',
  maxItems = 5,
  defaultItems = 3,
  disabledAdd = false
}) => {
  const methods = useFormContext(); // Ensure form context is available
  const { control, register } = methods;

  // Ensure `control` is available
  const { fields, append, remove } = useFieldArray({
    control,
    name
  });

  useEffect(() => {
    // Initialize with default items
    for (let i = 0; i < defaultItems; i++) {
      append({ link: '', image: '' });
    }
  }, [append, defaultItems]);

  if (!methods) {
    console.error('DynamicPrizeInput must be inside a FormProvider.');
    return null;
  }

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <label className="block text-lg font-bold">{label}</label>
        {/* Add Button */}
        {!disabledAdd && fields.length < maxItems && (
          <button
            type="button"
            onClick={() => {
              append({ link: '', image: '' });
            }}
            className="flex items-center justify-center text-seeds-button-green font-bold"
          >
            Add More Winner
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {fields.map((field, index) => (
          <div key={field.id} className="relative p-3">
            {/* Winner Header */}
            <div className="flex gap-3">
              <Image
                src={WinnerIcon}
                alt="Winner Icon"
                width={24}
                height={24}
              />
              <span className="text-lg font-semibold">Winner {index + 1}</span>
            </div>

            {/* Link Input */}
            {typeInput === 'text' ? (
              <CInputText
                placeholder={`https://www.winner${index + 1}.com`}
                label=""
                register={register(`${name}[${index}].link` as const)}
              />
            ) : (
              <CInputCurrency />
            )}

            {/* Image Input (Optional) */}
            {isImage && (
              <CInputFile
                accept="image/png, image/jpeg"
                height="150px"
                placeholderText="Upload Image"
              />
            )}

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => {
                remove(index);
              }}
              className="absolute right-3 top-3 text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicPrizeInput;
