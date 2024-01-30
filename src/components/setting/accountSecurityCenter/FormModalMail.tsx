import PenMail from '@/assets/auth/PenMail.svg';
import SeedyMail from '@/assets/auth/SeedyMail.png';
import close from '@/assets/more-option/close.svg';
import AuthCommonInput from '@/components/auth/AuthCommonInput';
import { useAppSelector } from '@/store/redux/store';
import {
  Button,
  Dialog,
  DialogBody,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
interface IEditFormModal {
  open: boolean;
  handleOpen: () => void;
  emailData: string;
}

interface IForm {
  name: string;
  seedsTag: string;
  email: string;
  avatar: string;
  bio: string;
  birthDate: string;
  phone: string;
}
const EditFormModal: React.FC<IEditFormModal> = ({
  open,
  handleOpen,
  emailData
}: IEditFormModal) => {
  const { dataUser } = useAppSelector(state => state.user);
  const { t } = useTranslation();
  const [formData, setFormData] = useState<IForm>({
    name: dataUser.name,
    seedsTag: dataUser.seedsTag,
    email: '',
    avatar: dataUser.avatar,
    bio: dataUser.bio,
    birthDate: dataUser.birthDate,
    phone: dataUser.phoneNumber
  });
  const handleChange = (e: any): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size="sm"
      className="p-8"
      dismiss={{ enabled: false }}
    >
      <Image
        src={close}
        alt="close"
        className="absolute right-8 top-8 cursor-pointer z-10"
        onClick={() => {
          handleOpen();
        }}
      />

      <DialogBody className="flex flex-col items-center gap-5 p-0">
        <Image src={SeedyMail} alt="SeedyMail" className="w-52 h-52" />
        <div className="flex flex-col gap-2 items-center">
          <Typography className="font-poppins font-semibold text-xl text-[#262626]">
            {emailData !== ''
              ? t('setting.setting.accountSecure.titleChangeMail1')
              : t('setting.setting.accountSecure.titleMail1')}
          </Typography>
          <Typography className="font-poppins font-light text-base text-[#7C7C7C]">
            {emailData !== ''
              ? t('setting.setting.accountSecure.titleChangeMail2')
              : t('setting.setting.accountSecure.titleMail2')}
          </Typography>
        </div>
        <div className="w-full relative">
          <AuthCommonInput
            label="Email"
            type="email"
            placeholder={t('setting.setting.accountSecure.placeholderMail')}
            required={false}
            name="email"
            formData={formData.email}
            handleChange={handleChange}
            error={false}
          />
          <Image
            src={PenMail}
            alt="PenMail"
            className="absolute right-[14px] top-[14px]"
          />
        </div>

        <Button className="font-poppins font-semibold text-base text-white capitalize w-full bg-[#3AC4A0] rounded-full">
          {t('setting.setting.accountSecure.confirm')}
        </Button>
      </DialogBody>
    </Dialog>
  );
};

export default EditFormModal;
