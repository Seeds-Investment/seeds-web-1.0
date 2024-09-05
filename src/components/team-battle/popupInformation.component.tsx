import Image from 'next/image';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { CiSquareChevUp } from 'react-icons/ci';

interface PopupInformationProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopupInformation: React.FC<PopupInformationProps> = ({
  onClose,
  isOpen
}) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div className="relative bg-white/50 rounded-3xl shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-[#ff4672] border-white border-4 text-white rounded-full p-2 transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer"
          >
            <AiOutlineClose size={15} />
          </button>
          <div className="pt-14 px-4 pb-4">
            <div className="rounded-3xl bg-gradient-to-r from-[#227e7f]/85 to-[#4760a8]/85 overflow-hidden h-[450px] w-[450px]">
              <div className="relative w-full h-40 overflow-hidden">
                <Image
                  src={
                    'https://dev-assets.seeds.finance/quiz/ee6442eb-fd90-421c-ab88-daee07c66d5e.png'
                  }
                  alt="battle-banner"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="absolute top-0 left-0"
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="text-2xl font-semibold text-white">
                  Title vs Title
                </div>
                <div className="text-white font-semibold flex flex-row items-center gap-1">
                  <span className="text-xs">More Information</span>
                  <CiSquareChevUp size={15} />
                </div>
                <div className="py-2 px-5 border-white border-2 rounded-3xl text-white text-xs">
                  Periode : 01 Mei 2025 - 02 Mei 2025
                </div>
                <ol className="text-white text-xs flex flex-col gap-2 my-5">
                  <li>Single competition, participants compete for prizes.</li>
                  <li>Start with 50 million virtual capital.</li>
                  <li>Winner based on highest equity score.</li>
                  <li>Participants must follow Instagram @seeds_finance.</li>
                  <li>Ticket fee: 100,000/entry (no promo code).</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupInformation;
