import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';

interface HowToUseProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToUseSeedsplan: React.FC<HowToUseProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40" />
      <div className="fixed inset-0 flex items-end justify-center md:items-center z-50">
        <div className="bg-white rounded-t-2xl md:rounded-2xl overflow-hidden w-full md:w-3/4 lg:w-1/2 border-2">
          <div className="flex justify-between p-4">
            <div className="font-semibold">How to Use The Voucher</div>
            <button
              onClick={onClose}
              className="transform scale-100 hover:scale-110 transition-transform duration-300"
            >
              <IoCloseSharp size={30} />
            </button>
          </div>
          <div className="px-4 pb-4">
            <ol className="flex flex-col gap-2">
              <li>1. Open the Seeds Finance app</li>
              <li>
                2. Select the Quiz and Play Tournament in the &quot;Play&quot;
                section or select &quot;Circle&quot; and &quot;Premium
                Post&quot; in the &quot;Social&quot; section according to your
                choice.
              </li>
              <li>
                3. On the payment page, select payment method and voucher
                (including the Seeds Unlimited voucher you purchased)
              </li>
              <li>
                4. If the voucher is already active, you will be able to
                participate in variety of premium discount for free, depending
                on the type of voucher you purchased
              </li>
              <li>5. Yay! Now you can join and enjoy multiple savings</li>
            </ol>
          </div>
          <div className="px-4 py-4 flex flex-col gap-3 items-center">
            <button
              onClick={onClose}
              className="w-full md:w-1/2 bg-[#3AC4A0] font-semibold py-2 px-4 rounded-3xl transform scale-100 hover:scale-105 transition-transform duration-300"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowToUseSeedsplan;
