import Image from 'next/image';
import { useState } from 'react';

import { Input } from '@material-tailwind/react';
import type {
  color,
  size,
  variant
} from '@material-tailwind/react/types/components/input';
import { Eye, EyeSlash } from 'public/assets/vector';

export interface ICInputPassword {
  className?: string;
  onChange: (password: string) => void;
  placeholder?: string;
  size?: size;
  variant?: variant;
  color?: color;
}

const CInputPassword = ({
  className = 'text-lg',
  onChange,
  placeholder,
  size = 'md',
  variant = 'standard',
  color = 'gray'
}: ICInputPassword): React.ReactElement => {
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Input
      className={className}
      type={showPassword ? 'text' : 'password'}
      color={color}
      onChange={e => {
        setPassword(e.target.value);
        onChange(e.target.value);
      }}
      size={size}
      variant={variant}
      placeholder={placeholder}
      icon={
        <Image
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          src={showPassword ? Eye : EyeSlash}
          alt=""
        />
      }
      value={password}
    />
  );
};

export default CInputPassword;
