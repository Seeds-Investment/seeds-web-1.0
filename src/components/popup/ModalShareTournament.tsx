'use client';
import Barcode from '@/assets/play/tournament/barcode.svg';
import CopyLink from '@/assets/play/tournament/copyTournamentLink.svg';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { XIcon } from 'public/assets/vector';
// import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from '../ui/modal/Modal';

interface Props {
  onClose: () => void;
}

const ModalShareTournament: React.FC<Props> = ({ onClose }) => {
  // const { t } = useTranslation();
  const handleCopyClick = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    // const textToCopy = `${baseUrl}/play/quiz/${detailQuiz?.id}`;
    const textToCopy = "tournament's link";
    await navigator.clipboard.writeText(textToCopy).then(() => {
      toast('Quiz link copied!');
    });
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex justify-between">
        <Typography className="font-bold text-lg text-black">
          Share This Arena
        </Typography>
        <Image
          src={XIcon}
          alt="X"
          width={30}
          height={30}
          onClick={onClose}
          className="hover:scale-110 transition ease-out cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-3 justify-center  px-8 pt-2 items-center text-center">
        <Typography className="text-lg text-black">
          Play ID : #123456
        </Typography>
        <Image
          src={Barcode}
          alt="barcode"
          width={0}
          height={0}
          sizes="100vw"
          className="w-auto h-auto aspect-auto"
        />

        <Typography className="font-bold text-lg text-black">
          Share links:
        </Typography>

        <div className='w-full h-fit flex mb-4'>
          <input
            id="search"
            type="text"
            name="search"
            placeholder=""
            readOnly={true}
            disabled={false}
            value={`https://circle.seeds.finance/us-stocks`}
            className="block w-full text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-3 pl-8 rounded-xl border border-[#BDBDBD]"
          />
          <div onClick={handleCopyClick} className='w-[50px] cursor-pointer flex justify-center items-center'>
            <Image alt="" src={CopyLink} className='w-[20px]'/>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalShareTournament;
