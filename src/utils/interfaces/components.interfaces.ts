export interface IButton {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface ICard {
  children: React.ReactNode;
  className: string;
}
