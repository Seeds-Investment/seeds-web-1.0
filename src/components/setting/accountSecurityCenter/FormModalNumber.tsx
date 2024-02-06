import SeedyAuthPass from '@/assets/auth/SeedyAuthPass.png';
import close from '@/assets/more-option/close.svg';
import AuthNumber from '@/components/auth/AuthNumber';
import countries from '@/constants/countries.json';
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
  phoneData: string;
  country: number;
  setCountry: any;
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
  phoneData,
  country,
  setCountry
}: IEditFormModal) => {
  const { dataUser } = useAppSelector(state => state.user);
  const { t } = useTranslation();
  const [formData, setFormData] = useState<IForm>({
    name: dataUser.name,
    seedsTag: dataUser.seedsTag,
    email: dataUser.email,
    avatar: dataUser.avatar,
    bio: dataUser.bio,
    birthDate: dataUser.birthDate,
    phone: ''
  });
  const handleChange = (e: any, dialCode: any): void => {
    if (formData.phone === dialCode) {
      setFormData({
        ...formData,
        phone: e.target.value.substring(dialCode.length)
      });
    } else if (formData.phone === '0') {
      setFormData({
        ...formData,
        phone: e.target.value.substring(1)
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
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
        <Image src={SeedyAuthPass} alt="SeedyAuthPass" className="w-52 h-52" />
        <div className="flex flex-col gap-2 items-center">
          <Typography className="font-poppins font-semibold text-xl text-[#262626]">
            {phoneData !== ''
              ? t('setting.setting.accountSecure.titleChangeNumber1')
              : t('setting.setting.accountSecure.titleNumber1')}
          </Typography>
          <Typography className="font-poppins font-light text-base text-[#7C7C7C]">
            {phoneData !== ''
              ? t('setting.setting.accountSecure.titleChangeNumber2')
              : t('setting.setting.accountSecure.titleNumber2')}
          </Typography>
        </div>
        <AuthNumber
          handleChange={handleChange}
          country={country}
          setCountry={setCountry}
          countries={countries}
          formData={formData.phone}
          name="phone"
          error={false}
          handleSubmit={handleOpen}
        />

        <Button className="font-poppins font-semibold text-base text-white capitalize w-full bg-[#3AC4A0] rounded-full">
          {t('setting.setting.accountSecure.confirm')}
        </Button>
      </DialogBody>
    </Dialog>
  );
};

export default EditFormModal;
