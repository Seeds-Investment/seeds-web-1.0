import type { color } from '@material-tailwind/react/types/components/button';

export interface IButton {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  color?: color | undefined;
  fullWidth?: boolean;
}

export interface ICard {
  children: React.ReactNode;
  className: string;
}
