// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { ICard } from '@/utils/interfaces/components.interfaces';
import { Card } from '@material-tailwind/react';

export default function CCard({
  children,
  className
}: ICard): React.ReactElement {
  return <Card className={`${className}`}>{children}</Card>;
}
