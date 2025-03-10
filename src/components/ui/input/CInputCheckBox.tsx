import { Typography } from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, type Control } from 'react-hook-form';

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  name: string;
  options: Option[];
  control: Control<any>;
  className?: string;
  isAllbutton?: boolean;
}

const CInputMultiSelect: React.FC<Props> = ({
  label,
  name,
  options,
  isAllbutton = false,
  control,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Menutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative mb-4 ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-bold text-black mb-2">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            {/* INPUT FAKE */}
            <div
              className={`w-full flex items-center justify-between px-4 py-3 border border-black rounded-[10px] cursor-pointer hover:border-seeds-green bg-white ${
                isOpen
                  ? 'shadow-seeds-green shadow-center border-seeds-green'
                  : ''
              }`}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <span className="text-gray-700">
                {field.value != null && field.value.length > 0
                  ? field.value
                      .map(
                        (v: string) => options.find(o => o.value === v)?.label
                      )
                      .join(', ')
                  : 'Select a category'}
              </span>
            </div>

            {/* DROPDOWN LIST */}
            {isOpen && (
              <div className="absolute w-full bg-white border rounded-lg mt-2 shadow-lg z-10">
                <div className="flex flex-row justify-between items-center px-4 py-4">
                  <Typography className="text-[16px] font-bold text-black">
                    Choose {name}
                  </Typography>
                  <button
                    className="text-[14px] text-red-500 font-bold"
                    onClick={() => {
                      field.onChange([]);
                    }}
                  >
                    Clear
                  </button>
                </div>

                <div className="p-3 grid grid-cols-3 gap-2">
                  {isAllbutton && (
                    <label className="flex items-center space-x-2 cursor-pointer mb-2">
                      <input
                        type="checkbox"
                        checked={field.value?.length === options.length}
                        onChange={e => {
                          const allValues = options.map(option => option.value);
                          field.onChange(e.target.checked ? allValues : []);
                        }}
                        className="hidden"
                      />
                      <div
                        className={`w-5 h-5 flex items-center justify-center rounded-md border transition-all ${
                          field.value?.length === options.length
                            ? 'bg-[#3AC4A0] border-[#3AC4A0]'
                            : 'border-gray-400'
                        }`}
                      >
                        {field.value?.length === options.length && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            width="16"
                            height="16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M20.2929 5.70711C20.6834 5.31658 21.3166 5.31658 21.7071 5.70711C22.0976 6.09763 22.0976 6.7308 21.7071 7.12132L10.7071 18.1213C10.3166 18.5118 9.68342 18.5118 9.29289 18.1213L3.29289 12.1213C2.90237 11.7308 2.90237 11.0976 3.29289 10.7071C3.68342 10.3166 4.31658 10.3166 4.70711 10.7071L10 16L20.2929 5.70711Z"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-black">All</span>
                    </label>
                  )}
                  {options.map(option => {
                    const isChecked = (field.value ?? []).includes(
                      option.value
                    );
                    return (
                      <label
                        key={option.value}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={e => {
                            const newValue = e.target.checked
                              ? [...(field.value ?? []), option.value]
                              : (field.value ?? []).filter(
                                  (val: string) => val !== option.value
                                );
                            field.onChange(newValue);
                          }}
                          className="hidden"
                        />
                        <div
                          className={`w-5 h-5 flex items-center justify-center rounded-md border transition-all ${
                            isChecked === true
                              ? 'bg-[#3AC4A0] border-[#3AC4A0]'
                              : 'border-gray-400'
                          }`}
                        >
                          {isChecked === true && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="white"
                              width="16"
                              height="16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M20.2929 5.70711C20.6834 5.31658 21.3166 5.31658 21.7071 5.70711C22.0976 6.09763 22.0976 6.7308 21.7071 7.12132L10.7071 18.1213C10.3166 18.5118 9.68342 18.5118 9.29289 18.1213L3.29289 12.1213C2.90237 11.7308 2.90237 11.0976 3.29289 10.7071C3.68342 10.3166 4.31658 10.3166 4.70711 10.7071L10 16L20.2929 5.70711Z"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-black">{option.label}</span>
                      </label>
                    );
                  })}
                </div>

                {/* BUTTON SAVE */}
                <div className=" px-3 py-4">
                  <button
                    className="w-full bg-[#3AC4A0] text-white py-2 rounded-full text-[16px] font-bold"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};

export default CInputMultiSelect;
