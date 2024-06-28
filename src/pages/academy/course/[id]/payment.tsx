import Receipt from '@/components/academy/Receipt';
import SummaryPay from '@/components/academy/SummaryPay';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { enrollClass, getClassDetail } from '@/repository/academy.repository';
import { getPaymentList } from '@/repository/payment.repository';
import { getPaymentById } from '@/repository/play.repository';
import { getUserInfo } from '@/repository/profile.repository';
import {
  type DetailClassI,
  type EnrollClassI,
  type PaymentStatus
} from '@/utils/interfaces/academy.interface';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Payment: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [namePayment, setNamePayment] = useState('');
  const { t } = useTranslation();
  const [eWalletList, setEWalletList] = useState([]);
  const [qRisList, setQRisList] = useState([]);
  const [virtualList, setVirtualList] = useState([]);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState<EnrollClassI>({
    phone_number: '',
    payment_gateway: '',
    payment_method: ''
  });
  const [paymentGateway, setPaymentGateway] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [paymentLogo, setPaymentLogo] = useState<string>('');
  const [paymentAdminFee, setPaymentAdminFee] = useState<number>(0);
  // const [paymentPromoPrice, setPaymentPromoPrice] = useState<number>(0);
  const [paymentServiceFee, setPaymentServiceFee] = useState<number>(0);
  const [data, setData] = useState<DetailClassI | undefined>(undefined);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>();
  const formattedPrice = data?.price?.idr;
  // setPaymentStatus(resp);

  const handleGetClass = async (): Promise<void> => {
    try {
      const responseClass = await getClassDetail(id as string);
      setData(responseClass);
    } catch (error: any) {
      toast(error.message, { type: 'error' });
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      void handleGetClass();
    }
  }, [id]);

  const handleSelect = (
    id: string,
    gateway: string,
    method: string,
    adminFee: number,
    // promoPrice: number,
    serviceFee: number,
    paymentLogo: string
  ): void => {
    setSelectedPayment(id);
    setPaymentGateway(gateway);
    setPaymentMethod(method);
    setPaymentAdminFee(adminFee);
    // setPaymentPromoPrice(promoPrice);
    setPaymentServiceFee(serviceFee);
    setPaymentLogo(paymentLogo);
  };

  const handlePaymentList = async (): Promise<void> => {
    try {
      const payList = await getPaymentList(
        userInfo?.preferredCurrency?.toUpperCase()
      );
      setQRisList(payList.type_qris);
      setEWalletList(payList.type_ewallet);
      setVirtualList(payList.type_va);
    } catch (error: any) {
      toast(error.message, { type: 'error' });
    }
  };

  const handleGetUserInfo = async (): Promise<void> => {
    try {
      const response = await getUserInfo();
      setUserInfo(response);
      setFormData({ phone_number: response?.phoneNumber });
    } catch (error: any) {
      toast(error.message, { type: 'error' });
    }
  };

  const togglePopup = (): void => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    void handleGetUserInfo();
  }, []);

  useEffect(() => {
    void handlePaymentList();
  }, [userInfo?.preferredCurrency]);

  const handlePayment = async (): Promise<void> => {
    if (selectedPayment === null) {
      toast('Select payment method!', { type: 'warning' });
      return;
    }

    try {
      const response = await enrollClass(id as string, {
        ...formData,
        payment_gateway: paymentGateway,
        payment_method: paymentMethod
      });
      const statusOrder = await getPaymentById(response?.order_id);
      setPaymentStatus(statusOrder);
      if (response?.payment_url !== '') {
        window.open(response.payment_url, '_blank');
      } else {
        toast('Payment url not found!', { type: 'warning' });
      }
    } catch (error: any) {
      toast(error.message, { type: 'error' });
    }
  };

  const handleConfirm = async (): Promise<void> => {
    await handlePayment();
    togglePopup();
  };

  const renderOptions = (
    list: Array<{
      id: string;
      payment_method: string;
      payment_gateway: string;
      logo_url: string;
      admin_fee: number;
      promo_price: number;
      service_fee: number;
    }>,
    prefix: string
  ): JSX.Element[] => {
    return list.map(item => (
      <div
        key={item.id}
        className={`flex items-center mb-2 justify-between px-3 py-2 border border-[#E0E0E0] rounded-lg cursor-pointer ${
          selectedPayment === `${prefix}-${item.id}` ? 'bg-gray-200' : ''
        }`}
        onClick={() => {
          handleSelect(
            `${prefix}-${item.id}`,
            item.payment_gateway,
            item.payment_method,
            item.admin_fee,
            // item.promo_price,
            item.service_fee,
            item.logo_url
          );
          setNamePayment(item.payment_method);
        }}
      >
        <Image
          src={item.logo_url}
          width={100}
          height={100}
          alt={`${item.payment_method} icon`}
          className="h-5 object-cover w-auto"
        />
        <input
          type="radio"
          id={`${prefix}-${item.id}`}
          name="payment"
          checked={selectedPayment === `${prefix}-${item.id}`}
          onChange={() => {
            handleSelect(
              `${prefix}-${item.id}`,
              item.payment_gateway,
              item.payment_method,
              item.admin_fee,
              // item.promo_price,
              item.service_fee,
              item.logo_url
            );
          }}
          className="mr-2"
        />
      </div>
    ));
  };

  return (
    <PageGradient defaultGradient className="w-full">
      <div
        className="bg-white p-3 rounded-xl shadow-md"
        hidden={paymentStatus?.transactionStatus === 'CREATED'}
      >
        <div className="text-2xl font-bold text-center mb-4">
          {t('academy.payment.method')}
        </div>

        <div className="mb-4">
          <div className="text-sm font-semibold mb-2 text-[#7C7C7C]">
            {t('academy.payment.va')}
          </div>
          {renderOptions(virtualList, 'va')}
        </div>

        <div className="mb-4">
          <div className="text-sm font-semibold mb-2 text-[#7C7C7C]">
            {t('academy.payment.ew')}
          </div>
          {renderOptions(eWalletList, 'wallet')}
        </div>

        <div className="mb-4">
          <div className="text-sm font-semibold mb-2 text-[#7C7C7C]">
            {t('academy.payment.other')}
          </div>
          {renderOptions(qRisList, 'other')}
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
        amount={formattedPrice as number}
        adminFee={paymentAdminFee}
        onConfirm={handleConfirm}
        // promoPrice={paymentPromoPrice}
        serviceFee={paymentServiceFee}
      />
      {paymentStatus?.transactionStatus === 'CREATED' && (
        <Receipt
          amount={formattedPrice as number}
          adminFee={paymentAdminFee}
          serviceFee={paymentServiceFee}
          logoURL={paymentLogo}
        />
      )}
    </PageGradient>
  );
};

export default Payment;
