// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { IButton } from '@/utils/interfaces/components.interfaces';
import { Button } from '@material-tailwind/react';
import React from 'react';

export default function CButton({
  children,
  className,
  onClick
}: IButton): React.ReactElement {
  return (
    <Button onClick={onClick} className={className}>
      {children}
    </Button>
  );
}
