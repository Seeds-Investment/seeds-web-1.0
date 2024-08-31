import UnsubscribeWarning from '@/assets/seedsplan/unsubscribe-warning.svg';
import { type TFunction } from 'i18next';
import Image from 'next/image';
import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';

interface TncProps {
  translation: TFunction;
  voucherAmount: number;
  isOpen: boolean;
  onClose: () => void;
  handleStopSubscription: () => void;
}

const ConfirmationUnsubscribe: React.FC<TncProps> = ({
  translation,
  voucherAmount, 
  isOpen, 
  onClose,
  handleStopSubscription
}) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40" />
      <div className="fixed inset-0 flex items-end justify-center md:items-center z-50">
        <div className="bg-white rounded-t-2xl md:rounded-2xl overflow-hidden w-full md:w-3/4 lg:w-1/2 border-2">
          <div className="flex justify-between p-4">
            <div className="font-semibold text-xl">{translation('seedsPlan.modalUnsubscribe.text1')}</div>
            <button
              onClick={onClose}
              className="transform scale-100 hover:scale-110 transition-transform duration-300"
            >
              <IoCloseSharp size={30} />
            </button>
          </div>
          <div className='px-4 pb-4'>
            {translation('seedsPlan.modalUnsubscribe.text2')}
          </div>
          <div className='mx-4 p-4 pb-4 bg-[#E0E0E099] rounded-xl'>
            <div className='w-full flex justify-start items-center gap-2'>
              <div className='w-[24px] h-[24px]'>
                <Image
                  src={UnsubscribeWarning}
                  width={500}
                  height={500}
                  alt="seedsplan"
                  className="w-full h-full"
                />
              </div>
              <div className='text-[#C1282A] font-semibold'>
                {translation('seedsPlan.modalUnsubscribe.text3')}
              </div>
            </div>
            <div className='pl-4 mt-4'>
              <div>
                {translation('seedsPlan.modalUnsubscribe.text4')}
                {voucherAmount}
                {voucherAmount > 1 ? translation('seedsPlan.modalUnsubscribe.text6') : translation('seedsPlan.modalUnsubscribe.text5')}
                {translation('seedsPlan.modalUnsubscribe.text7')}
              </div>
            </div>
          </div>
          <div className='flex flex-col my-4 gap-4 mx-4'>
            <div
              onClick={handleStopSubscription}
              className='text-[#262626] border border-[#3AC4A0] font-semibold text-center rounded-full py-2 cursor-pointer'
            >
              {translation('seedsPlan.modalUnsubscribe.text8')}
            </div>
            <div
              onClick={onClose}
              className='text-[#262626] bg-[#3AC4A0] border border-[#3AC4A0] font-semibold text-center rounded-full py-2 cursor-pointer'
            >
              {translation('seedsPlan.modalUnsubscribe.text9')}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationUnsubscribe;
