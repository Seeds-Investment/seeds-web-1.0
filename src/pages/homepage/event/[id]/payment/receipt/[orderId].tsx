import Loading from '@/components/popup/Loading';
import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { CeklisCircle } from '@/constants/assets/icons';
import withAuth from '@/helpers/withAuth';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import {
  getHowToPay,
  getPaymentDetail,
  getPaymentList
} from '@/repository/payment.repository';
import { formatCurrency } from '@/utils/common/currency';
import { Button, Card, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Pending } from 'public/assets/circle';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface PaymentList {
  admin_fee: number;
  id: string;
  is_active: boolean;
  is_priority: boolean;
  is_promo_available: boolean;
  logo_url: string;
  minimum_withdrawal: number;
  payment_gateway: string;
  payment_method: string;
  payment_type: string;
  promo_price: number;
  service_fee: number;
}

interface ReceiptDetail {
  currency: string;
  grossAmount: number;
  howToPayApi?: string;
  itemId: string;
  itemName: string;
  merchantId: string;
  orderId: string;
  paymentGateway: string;
  paymentMethod: string;
  quantity: number;
  transactionId: string;
  transactionStatus: string;
  vaNumber?: string;
}

interface QRList {
  admin_fee: number;
  id: string;
  is_active: boolean;
  is_priority: boolean;
  is_promo_available: boolean;
  logo_url: string;
  minimum_withdrawal: number;
  payment_gateway: string;
  payment_method: string;
  payment_type: string;
  promo_price: number;
  service_fee: number;
}

const SuccessPaymentPage: React.FC = () => {
  const width = useWindowInnerWidth();
  const router = useRouter();
  const id = router.query.id as string;
  const orderId = router.query.orderId as string;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [eWalletList, setEWalletList] = useState([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [orderDetail, setOrderDetail] = useState<undefined | ReceiptDetail>();
  const [qRisList, setQRisList] = useState<QRList[]>([]);
  const { t } = useTranslation();

  const fetchOrderDetail = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getPaymentDetail(orderId);
      setOrderDetail(response);
    } catch (error) {
      toast.error(`Error fetching order detail ${error as string}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPaymentList = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const data = await getPaymentList();
      setQRisList(data.type_qris);
      setEWalletList(data.type_ewallet);
    } catch (error) {
      toast.error(`Error fetching order detail ${error as string}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHowToPay = async (url: string): Promise<void> => {
    try {
      setIsLoading(true);
      const data = await getHowToPay(url);
      setSteps(data.payment_instruction[0].step);
    } catch (error) {
      toast.error(`Error fetching Payment List ${error as string}`);
    } finally {
      setIsLoading(false);
    }
  };

  function parseStrongText(text: string): React.ReactNode[] {
    const regex = /"(.*?)"/g;
    const splitText = text.split(regex);

    return splitText.map((part: string, index: number) => {
      if (index % 2 === 1) {
        return (
          <strong className="font-semibold font-poppins" key={index}>
            {part}
          </strong>
        );
      } else {
        return part;
      }
    });
  }

  useEffect(() => {
    void fetchOrderDetail();
    void fetchPaymentList();
    if (orderDetail?.howToPayApi !== undefined) {
      void fetchHowToPay(orderDetail.howToPayApi);
    }
  }, [orderId, orderDetail?.howToPayApi]);

  const paymentSelectedEWallet: PaymentList[] = eWalletList.filter(
    (el: PaymentList | undefined): boolean => {
      return el?.payment_method === orderDetail?.paymentMethod;
    }
  );

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const isPaid = (): boolean => {
    if (orderDetail?.transactionStatus === 'SUCCEEDED') {
      return true
    } else {
      return false
    }
  }

  return (
    <div className="pt-10">
      {isLoading && <Loading />}
      <PageGradient
        defaultGradient
        className="relative overflow-hidden h-full flex flex-col items-center sm:p-0 sm:pb-16 w-full"
      >
        <CardGradient
          defaultGradient
          className={`relative overflow-hidden w-full h-full sm:min-w-[90%] sm:rounded-[18px] sm:min-h-[36rem] bg-white px-0 md:px-4 py-8 ${
            width !== undefined && width < 370
              ? 'min-h-[38rem]'
              : width !== undefined && width < 400
              ? 'min-h-[45rem]'
              : width !== undefined && width < 415
              ? 'min-h-[48rem]'
              : ''
          }`}
        >
          <div className="flex items-center justify-center rounded-xl w-full">
            <Card
              className="p-9 border-none rounded-xl shadow-none w-full md:w-2/3 xl:w-1/2 h-full"
              style={{
                background:
                  'linear-gradient(to bottom, #3AC4A0 55%, #FFFFFF 50%)'
              }}
            >
              <div className="flex items-center justify-center mb-4 mt-3">
                {isPaid() ? (
                  <div className="rounded-full bg-white/20 p-4">
                    <div className="bg-white rounded-full ">
                      <Image
                        src={Pending}
                        alt="AVATAR"
                        width={40}
                        height={40}
                      />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={CeklisCircle.src}
                    alt="AVATAR"
                    width={80}
                    height={80}
                  />
                )}
              </div>
              <Typography className="text-sm font-normal text-white text-center">
                {isPaid()
                  ? 'Successful'
                  : t('seedsEvent.payment.receipt.pendingPaidEvent')}
              </Typography>
              <Typography className="text-2xl font-semibold text-white text-center">
                {isPaid()
                  ? t('seedsEvent.payment.receipt.successful')
                  : `${orderDetail?.currency ?? 'IDR'} ${formatCurrency(
                      orderDetail?.grossAmount ?? 0
                    )}`}
              </Typography>
              <Typography className="text-sm font-normal text-white text-center">
                {isPaid() &&
                  t('seedsEvent.payment.receipt.recurringSaved')}
              </Typography>

              <Card className="p-5 mt-8 bg-white w-full">
                <Typography className="text-sm font-semibold text-[#BDBDBD] text-center">
                  {orderDetail?.vaNumber !== undefined
                    ? t('seedsEvent.payment.receipt.virtualNumber')
                    : t('seedsEvent.payment.receipt.paymentMethod')}
                </Typography>
                {orderDetail?.paymentMethod === 'OTHER_QRIS' && (
                  <div className="flex items-center justify-center mb-9 mt-3">
                    <Image
                      src={qRisList[0]?.logo_url}
                      alt="AVATAR"
                      width={90}
                      height={90}
                    />
                  </div>
                )}
                {paymentSelectedEWallet.length > 0 && (
                  <div className="flex items-center justify-center mb-9 mt-3">
                    <Image
                      src={paymentSelectedEWallet[0]?.logo_url}
                      alt="AVATAR"
                      width={90}
                      height={90}
                    />
                  </div>
                )}
                <hr className="border-t-2 border-dashed" />
                <div className="flex justify-between relative bottom-3 z-50">
                  <div className="bg-[#3AC4A0] h-6 rounded-full w-6 -mx-8 outline-none" />
                  <div className="bg-[#3AC4A0] h-6 rounded-full w-6 -mx-8 outline-none" />
                </div>

                {/* Event Fee */}
                {orderDetail?.currency !== undefined &&
                orderDetail?.grossAmount !== undefined &&
                orderDetail?.paymentMethod !== 'OTHER_QRIS' ? (
                  <div className="flex flex-row justify-between my-5">
                    <Typography className="text-sm font-semibold text-[#BDBDBD]">
                      {t('seedsEvent.payment.receipt.tournamentFee')}
                    </Typography>
                    <Typography className="text-sm font-semibold text-[#262626]">
                      {`${orderDetail?.currency} ${formatCurrency(
                        orderDetail?.grossAmount -
                          ((paymentSelectedEWallet[0]?.admin_fee ?? 0) +
                            (paymentSelectedEWallet[0]?.service_fee ?? 0))
                      )}`}
                    </Typography>
                  </div>
                ) : (
                  ''
                )}

                {/* Event Fee QRIS */}
                {orderDetail?.currency !== undefined &&
                orderDetail.grossAmount !== undefined &&
                orderDetail?.paymentMethod === 'OTHER_QRIS' ? (
                  <div className="flex flex-row justify-between my-5">
                    <Typography className="text-sm font-semibold text-[#BDBDBD]">
                      {t('seedsEvent.payment.receipt.tournamentFee')}
                    </Typography>
                    <Typography className="text-sm font-semibold text-[#262626]">
                      {`${orderDetail?.currency} ${formatCurrency(
                        orderDetail?.grossAmount -
                          ((qRisList[0]?.admin_fee ?? 0) +
                            (qRisList[0]?.service_fee ?? 0))
                      )}`}
                    </Typography>
                  </div>
                ) : (
                  ''
                )}

                {/* Admin Fee */}
                {paymentSelectedEWallet !== undefined &&
                paymentSelectedEWallet[0]?.admin_fee > 0 ? (
                  <div className="flex flex-row justify-between mb-5">
                    <Typography className="text-sm font-semibold text-[#BDBDBD]">
                      {t('seedsEvent.payment.receipt.adminFee')}
                    </Typography>
                    <Typography className="text-sm font-semibold text-[#262626]">
                      {orderDetail?.currency !== undefined &&
                        `${orderDetail.currency} ${formatCurrency(
                          paymentSelectedEWallet[0].admin_fee ?? 0
                        )}`}
                    </Typography>
                  </div>
                ) : (
                  ''
                )}

                {/* Admin Fee QRIS */}
                {qRisList !== undefined &&
                qRisList[0]?.admin_fee > 0 &&
                orderDetail?.paymentMethod === 'OTHER_QRIS' ? (
                  <div className="flex flex-row justify-between mb-5">
                    <Typography className="text-sm font-semibold text-[#BDBDBD]">
                      {t('seedsEvent.payment.receipt.adminFee')}
                    </Typography>
                    <Typography className="text-sm font-semibold text-[#262626]">
                      {orderDetail?.currency !== undefined &&
                        `${orderDetail.currency} ${formatCurrency(
                          qRisList[0]?.admin_fee ?? 0
                        )}`}
                    </Typography>
                  </div>
                ) : (
                  ''
                )}

                {/* Service Fee */}
                {paymentSelectedEWallet[0]?.service_fee > 0 ? (
                  <div className="flex flex-row justify-between mb-5">
                    <Typography className="text-sm font-semibold text-[#BDBDBD]">
                      {t('seedsEvent.payment.receipt.serviceFee')}
                    </Typography>
                    <Typography className="text-sm font-semibold text-[#262626]">
                      {orderDetail?.currency !== undefined &&
                      orderDetail.grossAmount !== undefined
                        ? `${orderDetail.currency} ${formatCurrency(
                            paymentSelectedEWallet[0]?.service_fee ?? 0
                          )}`
                        : ''}
                    </Typography>
                  </div>
                ) : (
                  ''
                )}

                {/* Service Fee QRIS */}
                {qRisList !== undefined &&
                qRisList[0]?.service_fee > 0 &&
                orderDetail?.paymentMethod === 'OTHER_QRIS' ? (
                  <div className="flex flex-row justify-between mb-5">
                    <Typography className="text-sm font-semibold text-[#BDBDBD]">
                      {t('seedsEvent.payment.receipt.serviceFee')}
                    </Typography>
                    <Typography className="text-sm font-semibold text-[#262626]">
                      {orderDetail?.currency !== undefined &&
                      orderDetail.grossAmount !== undefined
                        ? `${orderDetail.currency} ${formatCurrency(
                            qRisList[0]?.service_fee ?? 0
                          )}`
                        : ''}
                    </Typography>
                  </div>
                ) : (
                  ''
                )}

                {/* Discount Fee */}
                {paymentSelectedEWallet.length > 0 && (
                  <div>
                    {paymentSelectedEWallet[0]?.is_promo_available && (
                      <div className="flex flex-row justify-between mb-5">
                        <Typography className="text-sm font-semibold text-[#BDBDBD]">
                          {t('seedsEvent.payment.receipt.discountFee')}
                        </Typography>
                        <Typography className="text-sm font-semibold text-[#262626]">
                          {orderDetail?.currency !== undefined
                            ? `- ${orderDetail.currency} ${formatCurrency(
                                paymentSelectedEWallet.length > 0
                                  ? paymentSelectedEWallet[0]?.promo_price ?? 0
                                  : 0
                              )}`
                            : ''}
                        </Typography>
                      </div>
                    )}
                  </div>
                )}

                {/* Discount Fee QRIS */}
                {qRisList !== undefined &&
                  orderDetail?.paymentMethod === 'OTHER_QRIS' && (
                    <div>
                      {qRisList[0]?.is_promo_available && (
                        <div className="flex flex-row justify-between mb-5">
                          <Typography className="text-sm font-semibold text-[#BDBDBD]">
                            {t('seedsEvent.payment.receipt.discountFee')}
                          </Typography>
                          <Typography className="text-sm font-semibold text-[#262626]">
                            {orderDetail?.currency !== undefined
                              ? `- ${orderDetail.currency} ${formatCurrency(
                                  qRisList !== undefined
                                    ? qRisList[0]?.promo_price ?? 0
                                    : 0
                                )}`
                              : ''}
                          </Typography>
                        </div>
                      )}
                    </div>
                  )}

                {/* Discount Coins */}
                <div>
                  {orderDetail?.currency !== undefined
                    ? paymentSelectedEWallet[0]?.admin_fee +
                        paymentSelectedEWallet[0]?.service_fee -
                        orderDetail.grossAmount -
                        paymentSelectedEWallet[0]?.promo_price >
                        0 && (
                        <div className="flex flex-row justify-between mb-5">
                          <Typography className="text-sm font-semibold text-[#BDBDBD]">
                            {t('seedsEvent.payment.receipt.discountCoins')}
                          </Typography>
                          <Typography className="text-sm font-semibold text-[#262626]">
                            {`- ${orderDetail.currency} ${formatCurrency(
                              paymentSelectedEWallet[0]?.admin_fee +
                                paymentSelectedEWallet[0]?.service_fee -
                                orderDetail.grossAmount
                            )}`}
                          </Typography>
                        </div>
                      )
                    : ''}
                </div>

                {/* Discount Coins QRIS */}
                <div>
                  {orderDetail?.currency !== undefined &&
                  orderDetail?.paymentMethod === 'OTHER_QRIS' &&
                  qRisList !== undefined
                    ? qRisList[0]?.admin_fee +
                        qRisList[0]?.service_fee -
                        orderDetail.grossAmount -
                        qRisList[0]?.promo_price >
                        0 && (
                        <div className="flex flex-row justify-between mb-5">
                          <Typography className="text-sm font-semibold text-[#BDBDBD]">
                            {t('seedsEvent.payment.receipt.discountCoins')}
                          </Typography>
                          <Typography className="text-sm font-semibold text-[#262626]">
                            {`- ${orderDetail.currency} ${formatCurrency(
                              qRisList[0]?.admin_fee +
                                qRisList[0]?.service_fee -
                                orderDetail?.grossAmount
                            )}`}
                          </Typography>
                        </div>
                      )
                    : ''}
                </div>

                {/* Discount Fee */}
                {paymentSelectedEWallet.length > 0 && (
                  <div>
                    {paymentSelectedEWallet[0]?.is_promo_available && (
                      <div className="flex flex-row justify-between mb-5">
                        <Typography className="text-sm font-semibold text-[#BDBDBD]">
                          {t('seedsEvent.payment.receipt.discountFee')}
                        </Typography>
                        <Typography className="text-sm font-semibold text-[#262626]">
                          {orderDetail?.currency !== undefined
                            ? `- ${orderDetail.currency} ${formatCurrency(
                                paymentSelectedEWallet.length > 0
                                  ? paymentSelectedEWallet[0]?.promo_price ?? 0
                                  : 0
                              )}`
                            : ''}
                        </Typography>
                      </div>
                    )}
                  </div>
                )}
                <hr />

                {/* Total Amount */}
                <div className="flex flex-row justify-between my-5">
                  <Typography className="text-sm font-semibold text-[#BDBDBD]">
                    {t('seedsEvent.payment.receipt.totalAmount')}
                  </Typography>
                  <Typography className="text-sm font-semibold text-[#262626]">
                    {orderDetail?.currency !== undefined &&
                      `${orderDetail?.currency} ${formatCurrency(
                        orderDetail?.grossAmount
                      )}`}
                  </Typography>
                </div>

                {/* ID Transaction */}
                <div className="flex flex-row justify-between mb-5">
                  <Typography className="text-sm font-semibold text-[#BDBDBD]">
                    {t('seedsEvent.payment.receipt.idTransaction')}
                  </Typography>
                  <Typography className="text-sm font-semibold text-[#262626] text-right">
                    {orderDetail?.merchantId ?? 'Loading...'}
                  </Typography>
                </div>
              </Card>
              {orderDetail?.vaNumber !== undefined && steps.length > 0 && (
                <Card className="p-5 mt-8 bg-white">
                  <div className="flex justify-between">
                    <h1 className="text-xl font-bold mb-4">{t('seedsEvent.payment.howToPay')}</h1>
                    <button className="ml-2" onClick={toggleDropdown}>
                      {isOpen ? '▲' : '▼'}
                    </button>
                  </div>
                  <div
                    className={`overflow-hidden transition-max-height duration-700 ${
                      isOpen ? 'max-h-[1000px]' : 'max-h-0'
                    }`}
                  >
                    {steps.map((step: string, index: number) => (
                      <div
                        className="flex items-start mb-3 relative"
                        key={index}
                      >
                        <div className="flex-shrink-0 w-6 h-6 z-50 rounded-full bg-seeds-purple-2 text-white flex items-center justify-center mr-3">
                          {index + 1}
                        </div>
                        <Typography className="font-poppins text-black">
                          {parseStrongText(step)}
                        </Typography>
                        {index < steps.length - 1 && (
                          <div
                            className="w-0.5 bg-seeds-purple-2 absolute left-3"
                            style={{ height: 'calc(100% + 1.5rem)' }}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              <div className='flex gap-2 w-full justify-start items-center my-4'>
                <div className='w-[16px] h-[16px] flex justify-center items-center'>
                  <svg width="16" height="16" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 13.5C7.78558 13.5 9.04228 13.1188 10.1112 12.4046C11.1801 11.6903 12.0132 10.6752 12.5052 9.48744C12.9972 8.29972 13.1259 6.99279 12.8751 5.73191C12.6243 4.47104 12.0052 3.31285 11.0962 2.40381C10.1871 1.49476 9.02896 0.8757 7.76808 0.624896C6.50721 0.374092 5.20027 0.502813 4.01256 0.994783C2.82484 1.48675 1.80967 2.31987 1.09544 3.38879C0.381215 4.45771 -2.86102e-06 5.71442 -2.86102e-06 7C0.00330067 8.72289 0.689181 10.3743 1.90745 11.5925C3.12572 12.8108 4.77711 13.4967 6.5 13.5ZM7 10C7 10.1326 6.94732 10.2598 6.85355 10.3536C6.75978 10.4473 6.63261 10.5 6.5 10.5C6.36739 10.5 6.24021 10.4473 6.14644 10.3536C6.05268 10.2598 6 10.1326 6 10L6 6.5C6 6.36739 6.05268 6.24021 6.14644 6.14645C6.24021 6.05268 6.36739 6 6.5 6C6.63261 6 6.75978 6.05268 6.85355 6.14645C6.94732 6.24021 7 6.36739 7 6.5L7 10ZM6.5 3.5C6.64833 3.5 6.79334 3.54399 6.91667 3.6264C7.04001 3.70881 7.13614 3.82594 7.19291 3.96299C7.24967 4.10003 7.26452 4.25083 7.23559 4.39632C7.20665 4.5418 7.13522 4.67544 7.03033 4.78033C6.92544 4.88522 6.7918 4.95665 6.64632 4.98559C6.50083 5.01453 6.35003 4.99967 6.21299 4.94291C6.07594 4.88614 5.95881 4.79001 5.8764 4.66668C5.79398 4.54334 5.75 4.39834 5.75 4.25C5.75 4.05109 5.82902 3.86032 5.96967 3.71967C6.11032 3.57902 6.30108 3.5 6.5 3.5Z" fill="#3C49D6"/>
                  </svg>
                </div>
                <Typography className='font-poppins text-sm text-[#3C49D6]'>
                  {
                    isPaid()
                      ? t('seedsEvent.payment.receipt.messageComplete')
                      : t('seedsEvent.payment.receipt.messageUncomplete')
                  }
                </Typography>
              </div>

              {/* Navigation Button */}
              <div className="w-full flex flex-col gap-4 items-center justify-center">
                <Button
                  className="w-full text-sm font-semibold bg-seeds-button-green rounded-full capitalize"
                  onClick={() => {
                    if (
                      isPaid()
                    ) {
                      void router.replace(
                        `/homepage/event/${id}/${orderId}/booking-success-details`
                      );
                    } else {
                      void router.replace(`/homepage/event/${id}/payment/receipt/${orderId}`).then(() => {
                        router.reload();
                      });
                    }
                  }}
                >
                  {
                    isPaid()
                      ? t('seedsEvent.payment.receipt.seeTicket')
                      : t('seedsEvent.payment.receipt.refreshPage')
                  }
                </Button>
              </div>
            </Card>
          </div>
        </CardGradient>
      </PageGradient>
    </div>
  );
};

export default withAuth(SuccessPaymentPage);
