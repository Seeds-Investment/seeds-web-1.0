import SummaryPay from '@/components/academy/SummaryPay';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const VAList = [
  { id: 1, bank_name: 'BCA', icon: '/assets/academy/payment/bca.svg' },
  { id: 2, bank_name: 'BRI', icon: '/assets/academy/payment/bri.svg' },
  {
    id: 3,
    bank_name: 'CIMB Niaga',
    icon: '/assets/academy/payment/cimbniaga.svg'
  },
  {
    id: 4,
    bank_name: 'Permata Bank',
    icon: '/assets/academy/payment/permata.svg'
  },
  { id: 5, bank_name: 'Mandiri', icon: '/assets/academy/payment/mandiri.svg' }
];

const WalletList = [
  { id: 1, bank_name: 'Gopay', icon: '/assets/academy/payment/gopay.svg' },
  { id: 2, bank_name: 'Dana', icon: '/assets/academy/payment/dana.svg' },
  { id: 3, bank_name: 'OVO', icon: '/assets/academy/payment/ovo.svg' }
];

const OtherList = [
  {
    id: 1,
    bank_name: 'Google Pay',
    icon: '/assets/academy/payment/googlepay.svg'
  }
];

const Payment: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [namePayment, setNamePayment] = useState('');
  const { t } = useTranslation();

  const togglePopup = (): void => {
    setShowPopup(!showPopup);
  };

  const handleSelect = (id: string): void => {
    setSelectedPayment(id);
  };

  const renderOptions = (
    list: Array<{ id: number; bank_name: string; icon: string }>,
    prefix: string
  ): JSX.Element[] => {
    return list.map(item => (
      <div
        key={item.id}
        className={`flex items-center mb-2 justify-between px-3 py-2 border border-[#E0E0E0] rounded-lg cursor-pointer ${
          selectedPayment === `${prefix}-${item.id}` ? 'bg-gray-200' : ''
        }`}
        onClick={() => {
          handleSelect(`${prefix}-${item.id}`);
          setNamePayment(item.bank_name);
        }}
      >
        <Image
          src={item.icon}
          width={100}
          height={100}
          alt={`${item.bank_name} icon`}
          className="h-5 object-cover w-auto"
        />
        <input
          type="radio"
          id={`${prefix}-${item.id}`}
          name="payment"
          checked={selectedPayment === `${prefix}-${item.id}`}
          onChange={() => {
            handleSelect(`${prefix}-${item.id}`);
          }}
          className="mr-2"
        />
      </div>
    ));
  };

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="bg-white p-3 rounded-xl shadow-md">
        <div className="text-2xl font-bold text-center mb-4">
          {t('academy.payment.method')}
        </div>

        <div className="mb-4">
          <div className="text-sm font-semibold mb-2 text-[#7C7C7C]">
            {t('academy.payment.va')}
          </div>
          {renderOptions(VAList, 'va')}
        </div>

        <div className="mb-4">
          <div className="text-sm font-semibold mb-2 text-[#7C7C7C]">
            {t('academy.payment.ew')}
          </div>
          {renderOptions(WalletList, 'wallet')}
        </div>

        <div className="mb-4">
          <div className="text-sm font-semibold mb-2 text-[#7C7C7C]">
            {t('academy.payment.other')}
          </div>
          {renderOptions(OtherList, 'other')}
        </div>

        <button
          disabled={selectedPayment === null}
          className={`${
            selectedPayment !== null
              ? 'bg-[#3AC4A0] text-white'
              : 'bg-[#BDBDBD] text-[#7C7C7C]'
          } mb-4 p-3 rounded-3xl w-full font-medium`}
          onClick={togglePopup}
        >
          {t('academy.payment.pay')}
        </button>
      </div>
      <SummaryPay
        isOpen={showPopup}
        onClose={togglePopup}
        payment={namePayment}
      />
    </PageGradient>
  );
};

export default Payment;
