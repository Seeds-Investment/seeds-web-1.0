import SuccesAddAsset from '@/assets/play/tournament/success-asset.svg';
import Image from 'next/image';
import React from 'react';
import Modal from '../ui/modal/Modal';

interface Props {
  onClose: () => void;
  assetName: string;
}

const ModalSuccessAddAsset: React.FC<Props> = ({ onClose, assetName }) => {
  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/75 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed bottom-0 md:top-[50%] md:left-[20%] md:right-[-20%] xl:left-[30%] xl:right-[-30%] mt-[-12.35rem] w-full md:w-[60%] xl:w-[40%] h-[380px] p-4 lg:rounded-2xl rounded-t-2xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white"
    >
      <div className="flex flex-col justify-center items-center">
        <Image
          src={SuccesAddAsset}
          alt="success-seedy"
          width={200}
          height={200}
          className="mb-4"
        />
      </div>
    </Modal>
  );
};

export default ModalSuccessAddAsset;
