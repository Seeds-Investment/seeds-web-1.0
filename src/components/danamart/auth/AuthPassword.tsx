import Eye from '@/assets/my-profile/editProfile/Eye.svg';
import EyeSlash from '@/assets/my-profile/editProfile/EyeSlash.svg';
import { Input } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useState } from 'react';

interface AuthPasswordI {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  name: string;
  label: string;
  placeholder: string;
  handleSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

const AuthPassword: React.FC<AuthPasswordI> = ({
  value,
  onChange,
  error,
  name,
  label,
  placeholder,
  handleSubmit,
  className
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div
      className={`rounded-xl p-[2px] h-full w-full ${className ?? ''} ${
        error ? 'bg-[#FF3838]' : 'bg-gradient-to-l from-[#97A4E7] to-[#47C0AA]'
      }`}
    >
      <div
        className={`relative flex justify-center items-center bg-white border-none w-full rounded-[10px] h-full ${
          error ? 'border-red-500' : ''
        }`}
      >
        <Input
          type={open ? 'text' : 'password'}
          value={value}
          name={name}
          onChange={onChange}
          variant="static"
          placeholder={placeholder}
          label={label}
          onKeyDown={handleSubmit}
          error={error}
          className="!border-none focus:!border-none !p-1.5 !ps-4 !font-poppins !font-normal !text-base !text-[#262626] !rounded-[10px] leading-3 pr-10"
          labelProps={{
            className:
              '!bg-white !w-fit !h-fit !px-1 !ms-3 after:!border-none !font-semibold !font-poppins !text-base !text-[#262626] !leading-[10px]'
          }}
        />
        <Image
          src={open ? Eye : EyeSlash}
          alt="EyePassword"
          className="absolute right-3 cursor-pointer hover:scale-125 duration-200"
          onClick={() => {
            setOpen(!open);
          }}
        />
      </div>
    </div>
  );
};

export default AuthPassword;
