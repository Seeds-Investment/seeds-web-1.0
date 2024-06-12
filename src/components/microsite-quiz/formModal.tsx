import DetectiveSeedy from '@/assets/microsite-quiz/DetectiveSeedy.png';
import countries from '@/constants/countries.json';
import {
  handleChangePhoneNumber,
  handleFormattedData
} from '@/helpers/authFormData';
import { AuthLocalStorage } from '@/helpers/authLocalStorage';
import { quickRegister } from '@/repository/auth.repository';
import { type IDetailQuiz } from '@/utils/interfaces/quiz.interfaces';
import { Button, Dialog, Spinner } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AuthCommonInput from '../auth2/AuthCommonInput';
import AuthNumber from '../auth2/AuthNumber';

interface Props {
  id: string;
  open: boolean;
  useCoins: boolean;
  detailQuiz: IDetailQuiz | undefined;
  handleInvitationCode: () => Promise<void>;
  handleOpen: () => void;
}
interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
}

const FormModal: React.FC<Props> = ({
  id,
  open,
  useCoins,
  detailQuiz,
  handleInvitationCode,
  handleOpen
}: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [country, setCountry] = useState(101);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phoneNumber: ''
  });

  const formattedData = handleFormattedData(formData, country);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await quickRegister({
        ...formattedData,
        phone_number: formattedData.phoneNumber
      });
      AuthLocalStorage(response);
      console.log('tes');
      if (localStorage.getItem('accessToken') !== null) {
        console.log(detailQuiz);
        if (detailQuiz?.participant_status === 'JOINED') {
          await router.push(`/microsite-quiz/${id}/start`);
        } else {
          if (
            detailQuiz?.is_need_invitation_code !== undefined &&
            detailQuiz.is_need_invitation_code
          ) {
            await handleInvitationCode();
          } else {
            await router.push(
              `/microsite-quiz/${id}/welcome?useCoins=${
                useCoins ? 'true' : 'false'
              }`
            );
          }
        }
      }
      console.log(response);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.key === 'Enter') {
      await handleSave();
    }
  };
  return (
    <Dialog
      dismiss={{ enabled: !loading }}
      open={open}
      handler={handleOpen}
      className="flex flex-col gap-4 items-center p-4"
    >
      <Image
        src={DetectiveSeedy}
        alt="DetectiveSeedy"
        width={500}
        height={500}
        className=" w-[250px]"
      />
      <AuthCommonInput
        handleChange={handleChange}
        name="name"
        formData={formData.name}
        placeholder="Enter Your Name"
        label="Name"
        type="text"
        error={false}
        required
        handleSubmit={handleSubmit}
      />
      <AuthCommonInput
        handleChange={handleChange}
        name="email"
        formData={formData.email}
        placeholder="Enter your email"
        label="Email"
        type="email"
        error={false}
        required
        handleSubmit={handleSubmit}
      />
      <AuthNumber
        handleChange={handleChangePhoneNumber}
        formData={formData}
        setFormData={setFormData}
        name="phoneNumber"
        country={country}
        setCountry={setCountry}
        countries={countries}
        handleSubmit={handleSubmit}
      />
      <Button
        disabled={
          formData.name === '' ||
          formData.email === '' ||
          formData.phoneNumber === '' ||
          loading
        }
        onClick={handleSave}
        className="rounded-full w-full capitalize font-poppins font-semibold text-white text-base bg-[#3AC4A0] disabled:bg-[#BDBDBD] flex justify-center"
      >
        {loading ? <Spinner className=" h-6 w-6" /> : 'Save'}
      </Button>
    </Dialog>
  );
};

export default FormModal;
