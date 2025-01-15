import {
    type Control,
    type FieldErrors,
    type FieldValues,
    type Path,
    type UseFormRegister,
    type UseFormWatch,
} from "react-hook-form";

export interface Option {
  key: number;
  label: string;
  value: string;
}

interface Data {
  label: string;
  value: any
}

interface CommonProps<T extends FieldValues> {
  registerName: Path<T>;
  label?: string;
  errors?: FieldErrors<T>;
  extraElement?: React.ReactNode;
}

interface CommonIProps<T extends FieldValues> extends CommonProps<T> {
  type: "text" | "datetime-local" | "email";
  register: UseFormRegister<T>;
  disabled?: boolean;
  maxLength?: number;
  placeholder?: string;
  className?: string;
}

interface NumberIProps<T extends FieldValues> extends CommonProps<T> {
  type: "number";
  watch: UseFormWatch<T>;
  control: Control<T, any>;
  locale?: string;
  disabled?: boolean;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  decimalsLimit?: number;
  max?:number
}

interface CheckboxIProps<T extends FieldValues> extends CommonProps<T> {
  type: "checkbox";
  labelCheckbox: string;
  value: any;
  register: UseFormRegister<T>;
  disabled?: boolean;
}

interface RadioIProps<T extends FieldValues> extends CommonProps<T> {
  type: "radio";
  data: Data[];
  register: UseFormRegister<T>;
  disabled?: boolean;
}

interface ImageIProps<T extends FieldValues> extends CommonProps<T> {
  type: "image";
  imageURLPreview: string | undefined;
  dataImage?: string;
  isCrop?: boolean;
  handleOpen?: () => void;
  register: UseFormRegister<T>;
}

interface DropdownProps<T extends FieldValues> extends CommonProps<T> {
  type: "dropdown";
  registerName: Path<T>;
  control?: Control<T, any>;
  options?: Option[];
  disabled?: boolean;
  rounded?: boolean;
  fullWidth?: boolean;
}

export type MultiProps<T extends FieldValues> =
  | CommonIProps<T>
  | NumberIProps<T>
  | CheckboxIProps<T>
  | RadioIProps<T>
  | ImageIProps<T>
  | DropdownProps<T>;
