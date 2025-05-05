/* eslint-disable @next/next/no-img-element */
import { Input } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';

interface Props {
  name: string;
  value: string;
  fillable: boolean;
  setEmail?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  handleSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const AuthEmail: React.FC<Props> = ({
  name,
  value,
  fillable,
  setEmail,
  disabled,
  handleSubmit
}) => {
  const { t } = useTranslation();
  return (
    <div className="rounded-xl p-[2px] h-full w-full bg-gradient-to-l from-[#97A4E7] to-[#47C0AA]">
      <div className="relative flex justify-center items-center bg-white border-none w-full rounded-[10px] h-full">
        {fillable ? (
          <Input
            label={t('danamart.login.email').toString()}
            type="text"
            name={name}
            value={value}
            required
            variant="static"
            placeholder={`${t('danamart.login.emailPlaceholder')}`}
            onChange={e => {
              setEmail?.(e);
            }}
            disabled={disabled}
            labelProps={{
              className:
                '!bg-white !w-fit !h-fit !px-1 !ms-3 after:!border-none !font-semibold !font-poppins !text-base !text-[#262626] !leading-[10px]'
            }}
            className="!border-none focus:!border-none !p-1.5 !ps-4 !font-poppins !font-normal !text-base !text-[#262626] !rounded-[10px] leading-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            onKeyDown={handleSubmit}
          />
        ) : (
          <Input
            label={t('danamart.login.email').toString()}
            type="text"
            name={name}
            value={value}
            required
            variant="static"
            disabled={disabled}
            labelProps={{
              className:
                '!bg-white !w-fit !h-fit !px-1 !ms-3 after:!border-none !font-semibold !font-poppins !text-base !text-[#262626] !leading-[10px]'
            }}
            className="!border-none focus:!border-none !p-1.5 !ps-4 !font-poppins !font-normal !text-base !text-[#262626] !rounded-[10px] leading-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            onKeyDown={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default AuthEmail;
