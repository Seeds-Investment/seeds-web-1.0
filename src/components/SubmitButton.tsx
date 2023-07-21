// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { IButton } from '@/utils/interfaces/components.interfaces';
import { Button } from '@material-tailwind/react';
import React from 'react';

export default function CButton({
  children,
  className,
  onClick,
  onSubmit,
  disabled,
  color,
  fullWidth
}: IButton): React.ReactElement {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      onSubmit={onSubmit}
      className={`p-2 items-center rounded-3xl bg-[#3AC4A0] text-[white] font-semibold text-lg normal-case ${className ?? ''}`}
      color={color}
      fullWidth={true}
    >
      {children}
    </Button>
  );
}

