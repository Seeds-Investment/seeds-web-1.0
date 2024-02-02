import { Input } from '@material-tailwind/react';

interface ISettingCommonInput {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  divClassName: string;
  className: string;
  extraClassesTop?: React.ReactNode;
  extraClassesBottom?: React.ReactNode;
  error?: boolean;
  maxLength?: number;
}

const SettingCommonInput: React.FC<ISettingCommonInput> = ({
  label,
  name,
  value,
  onChange,
  divClassName,
  className,
  extraClassesTop,
  extraClassesBottom,
  error,
  maxLength
}: ISettingCommonInput) => {
  return (
    <div className={divClassName}>
      {extraClassesTop}
      <Input
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        variant="static"
        labelProps={{
          className: '!text-base !text-[#262626] !font-semibold !font-poppins'
        }}
        className={className}
        error={error}
        maxLength={maxLength}
      />
      {extraClassesBottom}
    </div>
  );
};

export default SettingCommonInput;
