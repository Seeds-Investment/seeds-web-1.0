// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { IButton } from '@/utils/interfaces/components.interfaces';
import { Button } from '@material-tailwind/react';
import React from 'react';

export default function CButton({
  children,
  className,
  onClick,
  disabled,
  color,
  fullWidth
}: IButton): React.ReactElement {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={className}
      color={color}
      fullWidth={fullWidth}
    >
      {children}
    </Button>
  );
}
