export interface IButton {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

export interface ICard {
  children: React.ReactNode;
  className: string;
}
