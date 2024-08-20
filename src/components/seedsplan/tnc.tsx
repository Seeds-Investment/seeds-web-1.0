import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';

interface TncProps {
  isOpen: boolean;
  onClose: () => void;
}

const TncSeedsplan: React.FC<TncProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40" />
      <div className="fixed inset-0 flex items-end justify-center md:items-center z-50">
        <div className="bg-white rounded-t-2xl md:rounded-2xl overflow-hidden w-full md:w-3/4 lg:w-1/2 border-2">
          <div className="flex justify-between p-4">
            <div className="font-semibold">Terms and Condition</div>
            <button
              onClick={onClose}
              className="transform scale-100 hover:scale-110 transition-transform duration-300"
            >
              <IoCloseSharp size={30} />
            </button>
          </div>
          <div className="px-4 pb-4 text-justify">
            Attention: Users are required to read the following terms and
            conditions (“T&C SEEDS”) before using or accessing the Seeds
            website/application. T&C Seeds are subject to change at any time
            without prior notice. By continuing to access or use or register
            and/or register on the Seeds site/application, the User acknowledges
            and agrees that the User has carefully read, understood, accepted
            and agreed to all of this T&C Seeds which will act as an agreement
            between the User and Us. We reserve the right to terminate or
            restrict User access to the Seeds site/application at any time
            without prior notice. Users are encouraged to visit the Seeds
            website/application periodically in order to be aware of any
            changes.
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

export default TncSeedsplan;
