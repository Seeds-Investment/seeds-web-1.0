// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { IButton } from '@/utils/interfaces/components.interfaces';
import { Button } from '@material-tailwind/react';
import React from 'react';

export default function CButton({
  children,
  className
}: IButton): React.ReactElement {
  return <Button className={className}>{children}</Button>;
}
