import { type Watchlist } from '@/utils/interfaces/watchlist.interface';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { XIcon } from 'public/assets/vector';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/modal/Modal';

interface Props {
  onClose: () => void;
  assetId: string;
  watchlists: Watchlist[];
}

const ModalWatchlist: React.FC<Props> = ({ onClose, assetId, watchlists }) => {
  const { t } = useTranslation();

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/75 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed bottom-0 md:top-[50%] md:left-[20%] md:right-[-20%] xl:left-[30%] xl:right-[-30%] mt-[-12.35rem] w-full md:w-[60%] xl:w-[40%] h-[380px] p-4 lg:rounded-2xl rounded-t-2xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white"
    >
      <div className="flex justify-between items-center round mb-6">
        <Typography className="flex-1 text-center font-poppins font-semibold text-base">
          {t('tournament.watchlist.modalHeader')}
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
      <div className="h-[150px] overflow-y-auto px-6 flex flex-col gap-2 mb-8">
        {watchlists.map(watchlist => (
          <div
            key={watchlist?.id}
            className="flex justify-between items-center bg-[#F9F9F9] p-2 rounded-lg sc"
          >
            <Typography className="font-poppins font-normal text-base">
              {watchlist?.name}
            </Typography>
            <input
              className="cursor-pointer w-5 h-5"
              type="checkbox"
              // checked={!!checkboxState.includes(watchlist?.id)}
              // onChange={e => {
              //   handleCheckboxChange(asset?.id, e.target.checked);
              // }}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-4 px-6">
        <Button className="w-full rounded-full font-poppins font-semibold text-sm bg-seeds-button-green">
          {t('tournament.watchlist.addToWatchlist')}
        </Button>
        <Button className="w-full rounded-full font-poppins font-semibold text-sm bg-white border-2 border-[#3ac4a0] text-seeds-button-green">
          {t('tournament.watchlist.newWatchlist')}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalWatchlist;
