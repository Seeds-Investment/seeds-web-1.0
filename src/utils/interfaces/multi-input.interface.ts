import {
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormWatch
} from 'react-hook-form';

export interface Option {
  key: number;
  label: string;
  value: string;
}

interface Data {
  label: string;
  value: any;
}

interface CommonProps<T extends FieldValues> {
  registerName: Path<T>;
  label?: string;
  errors?: FieldErrors<T>;
  extraElement?: React.ReactNode;
}

interface CommonIProps<T extends FieldValues> extends CommonProps<T> {
  type: 'text' | 'datetime-local' | 'date' | 'email';
  register: UseFormRegister<T>;
  disabled?: boolean;
  maxLength?: number;
  placeholder?: string;
  className?: string;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface NumberIProps<T extends FieldValues> extends CommonProps<T> {
  type: 'number';
  watch: UseFormWatch<T>;
  control: Control<T, any>;
  locale?: string;
  disabled?: boolean;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  decimalsLimit?: number;
  max?: number;
  extraClasses?: string;
}

interface CheckboxIProps<T extends FieldValues> extends CommonProps<T> {
  type: 'checkbox';
  labelCheckbox: string;
  value: any;
  register: UseFormRegister<T>;
  disabled?: boolean;
}

interface RadioIProps<T extends FieldValues> extends CommonProps<T> {
  type: 'radio';
  data: Data[];
  register: UseFormRegister<T>;
  disabled?: boolean;
}

interface ImageIProps<T extends FieldValues> extends CommonProps<T> {
  type: 'image';
  imageURLPreview?: string | undefined;
  usePreview: boolean;
  dataImage?: string;
  isCrop?: boolean;
  handleOpen?: () => void;
  register: UseFormRegister<T>;
  extraClasses?: string;
  fileType?: string;
}

interface DropdownProps<T extends FieldValues> extends CommonProps<T> {
  type: 'dropdown';
  registerName: Path<T>;
  watch?: UseFormWatch<T>;
  control?: Control<T, any>;
  options?: Option[];
  disabled?: boolean;
  rounded?: boolean;
  fullWidth?: boolean;
}

interface SwitchToggleProps<T extends FieldValues> extends CommonProps<T> {
  control?: Control<T, any>;
  registerName: Path<T>;
  type: 'switch';
  disabled?: boolean;
  onSwitchToggle?: (checked: boolean) => void;
}

interface LongNumberIProps<T extends FieldValues> extends CommonProps<T> {
  type: 'long-number';
  watch: UseFormWatch<T>;
  control: Control<T, any>;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  extraClasses?: string;
}

interface Image64IProps<T extends FieldValues> extends CommonProps<T> {
  type: 'image64';
  imageURLPreview?: string | undefined;
  usePreview: boolean;
  dataImage?: string;
  isCrop?: boolean;
  handleOpen?: () => void;
  register: UseFormRegister<T>;
  extraClasses?: string;
  fileType?: string;
  setValue?: UseFormSetValue<T>;
  onFileChange?: (base64String: string) => void;
}

export type MultiProps<T extends FieldValues> =
  | CommonIProps<T>
  | NumberIProps<T>
  | LongNumberIProps<T>
  | CheckboxIProps<T>
  | RadioIProps<T>
  | ImageIProps<T>
  | DropdownProps<T>
  | Image64IProps<T>
  | SwitchToggleProps<T>;
