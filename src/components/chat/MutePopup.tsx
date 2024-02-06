'use client';
// import { mutePersonalChat } from '@/repository/chat.repository';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { XIcon } from 'public/assets/vector';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/modal/Modal';
interface Props {
  onClose: () => void;
  onMute: (muteType: 'eight_hours' | 'one_week' | 'always') => void;
  roomId: any;
}

const MutePopUp: React.FC<Props> = ({ onClose, onMute, roomId }) => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleMute = async (): Promise<void> => {
    try {
      if (selectedOption !== null) {
        const muteType =
          selectedOption === 'eight_hours'
            ? 'eight_hours'
            : selectedOption === 'one_week'
            ? 'one_week'
            : 'always';
        onMute(muteType);
        onClose();
      }
    } catch (error) {
      console.error('Error muting personal chat:', error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex justify-between mb-3">
        <div>
          <h1 className="text-lg text-left font-semibold font--poppins text-[#262626]">
            Are you sure to mute notifications?
          </h1>
          <h1 className="text-sm text-left text-[#7C7C7C] font-poppins font-normal">
            Other participants will not see that you muted this chat
          </h1>
        </div>
        <Image
          src={XIcon}
          alt="X"
          width={30}
          height={30}
          onClick={onClose}
          className="hover:scale-110 transition ease-out cursor-pointer"
        />
      </div>
      <hr></hr>
      <div className="">
        <label className="flex items-center justify-between p-2 ">
          8 hours
          <input
            type="radio"
            name="muteDuration"
            value={'eight_hours'}
            checked={selectedOption === 'eight_hours'}
            onChange={() => {
              setSelectedOption('eight_hours');
            }}
            className="mr-2"
          />
        </label>
        <label className="flex items-center justify-between p-2 ">
          1 Week
          <input
            type="radio"
            name="muteDuration"
            value={'one_week'}
            checked={selectedOption === 'one_week'}
            onChange={() => {
              setSelectedOption('one_week');
            }}
            className="mr-2"
          />
        </label>
        <label className="flex items-center justify-between p-2">
          Always
          <input
            type="radio"
            name="muteDuration"
            value={'always'}
            checked={selectedOption === 'always'}
            onChange={() => {
              setSelectedOption('always');
            }}
            className="mr-2"
          />
        </label>
      </div>
      <hr></hr>
      <div className="flex flex-col gap-4">
        <div
          onClick={handleMute}
          className="bg-[#3AC4A0] mt-5 w-full hover:bg-[#3AC4A0] rounded-full hover:scale-105 transition ease-out"
        >
          <Typography className="text-white text-lg font-bold text-center p-2">
            {t('DeleteAccount.confirmButton')}
          </Typography>
        </div>

        <Typography
          onClick={onClose}
          className="text-center cursor-pointer hover:scale-105 transition ease-out text-[#7555DA] text-lg font-bold"
        >
          {t('DeleteAccount.cancelButton')}
        </Typography>
      </div>
    </Modal>
  );
};

export default MutePopUp;
