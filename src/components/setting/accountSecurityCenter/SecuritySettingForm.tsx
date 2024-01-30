import ChecklistInputSecuritySetting from '@/assets/my-profile/editProfile/ChecklistInputSecuritySetting.svg';
import ChevronRight from '@/assets/my-profile/editProfile/ChevronRight.svg';
import NoneInputSecuritySetting from '@/assets/my-profile/editProfile/NoneInputSecuritySetting.svg';
import { Input, Typography } from '@material-tailwind/react';
import Image from 'next/image';

interface ISecuritySettingForm {
  form: any;
  label: string;
  textBlank: string;
  extraChildren: any;
  onClick: () => void;
}

const SecuritySettingForm: React.FC<ISecuritySettingForm> = ({
  form,
  label,
  textBlank,
  extraChildren,
  onClick
}: ISecuritySettingForm) => {
  return (
    <div onClick={onClick} className="relative flex w-full p-0 bg-transparent">
      <div className="absolute flex p-0 gap-2 items-center pr-[18px] pb-[7px] pt-[15px]">
        {extraChildren}
        <Typography
          className={`${
            form === '' ? 'text-[#7C7C7C]' : 'text-[#262626]'
          } text-base font-poppins font-normal`}
        >
          {form === '' ? textBlank : form}
        </Typography>
        {label !== 'Password' ? (
          <Image
            src={
              form === ''
                ? NoneInputSecuritySetting
                : ChecklistInputSecuritySetting
            }
            alt="InformationInputIcon"
          />
        ) : null}
      </div>
      <Input
        label={label}
        type="text"
        variant="static"
        labelProps={{
          className: '!text-base !text-[#262626] !font-semibold !font-poppins'
        }}
        className="cursor-pointer"
        readOnly
      />
      <Image
        src={ChevronRight}
        alt="ChevronRight"
        className="absolute right-0 pb-[7px] pt-[15px]"
      />
    </div>
  );
};

export default SecuritySettingForm;
