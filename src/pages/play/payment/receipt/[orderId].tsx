import Loading from '@/components/popup/Loading';
import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { CeklisCircle } from '@/constants/assets/icons';
import { standartCurrency } from '@/helpers/currency';
import TrackerEvent from '@/helpers/GTM';
import withAuth from '@/helpers/withAuth';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import {
  getHowToPay,
  getPaymentDetail,
  getPaymentList
} from '@/repository/payment.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { getQuizById } from '@/repository/quiz.repository';
import { setPromoCodeValidationResult } from '@/store/redux/features/promo-code';
import { type IDetailQuiz } from '@/utils/interfaces/quiz.interfaces';
import { Button, Card, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Pending } from 'public/assets/circle';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

interface PaymentList {
  admin_fee: number;
  id: string;
  is_active: boolean;
  logo_url: string;
  payment_gateway: string;
  payment_method: string;
  payment_type: string;
  service_fee: number;
  is_promo_available: boolean;
  promo_price: number;
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
  admin_fee: number;
  service_fee: number;
  promoPrice: number;
  seeds_coin: number;
  promo_price?: number;
  is_promo_available?: boolean;
}

interface QrisDetail {
  admin_fee: number;
  id: string;
  is_active: boolean;
  is_priority: boolean;
  is_promo_available: boolean;
  logo_url: string;
  minimum_withdrawal: 0;
  payment_gateway: string;
  payment_method: string;
  payment_type: string;
  promo_price: number;
  service_fee: number;
}

const SuccessPaymentPage: React.FC = () => {
  const width = useWindowInnerWidth();
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const id = router.query.orderId as string;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [eWalletList, setEWalletList] = useState([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [orderDetail, setOrderDetail] = useState<undefined | ReceiptDetail>();
  const [qRisList, setQRisList] = useState<QrisDetail[]>([]);
  const [detailQuiz, setDetailQuiz] = useState<IDetailQuiz>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setVirtualAccountInfo] = useState<any>();
  const [userInfo, setUserInfo] = useState();

  const fetchOrderDetail = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getPaymentDetail(id);
      setOrderDetail(response);
    } catch (error) {
      toast.error(`Error fetching order detail: ${error as string}`);
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
      toast.error(`Error fetching payment list: ${error as string}`);
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
      toast.error(`Error fetching payment list: ${error as string}`);
    } finally {
      setIsLoading(false);
    }
  };

  function parseStrongText(text: string): any {
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
    if (
      orderDetail?.howToPayApi !== undefined &&
      orderDetail?.howToPayApi !== ''
    ) {
      void fetchHowToPay(orderDetail.howToPayApi);
    }
  }, [id, orderDetail?.howToPayApi]);

  const paymentSelectedEWallet: PaymentList[] = eWalletList.filter(
    (el: undefined | PaymentList): any => {
      return el?.payment_method === orderDetail?.paymentMethod;
    }
  );

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const getDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      const dataInfo = await getUserInfo();
      setUserInfo(dataInfo);
      const resp: IDetailQuiz = await getQuizById({
        id: orderDetail?.itemId as string,
        currency:
          dataInfo.preferredCurrency !== undefined
            ? dataInfo.preferredCurrency
            : 'IDR'
      });
      setDetailQuiz(resp);
    } catch (error) {
      toast(`ERROR fetch quiz ${error as string}`);
    } finally {
      setIsLoading(false);
    }
  }, [orderDetail]);

  useEffect(() => {
    void getDetail();
    dispatch(setPromoCodeValidationResult(0));
  }, [id, orderDetail]);

  return (
    <div className="pt-10">
      {isLoading && <Loading />}
      <PageGradient
        defaultGradient
        className="relative overflow-hidden h-full flex flex-col items-center sm:p-0 sm:pb-16 w-full"
      >
        <CardGradient
          defaultGradient
          className={`relative overflow-hidden w-full h-full sm:min-w-[90%] sm:rounded-[18px] sm:min-h-[36rem] bg-white sm:px-20 py-8 ${
            width !== undefined && width < 370
              ? 'min-h-[38rem]'
              : width !== undefined && width < 400
              ? 'min-h-[45rem]'
              : width !== undefined && width < 415
              ? 'min-h-[48rem]'
              : ''
          } bg-white`}
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
                {orderDetail?.transactionStatus !== 'SETTLEMENT' &&
                orderDetail?.transactionStatus !== 'SUCCESS' ? (
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
                {orderDetail?.transactionStatus !== 'SETTLEMENT' &&
                orderDetail?.transactionStatus !== 'SUCCESS'
                  ? t('quiz.payment.pendingPaidQuiz')
                  : t('quiz.payment.paymentSuccessful')}
              </Typography>
              <Typography className="text-2xl font-semibold text-white text-center">
                {orderDetail?.transactionStatus !== 'SETTLEMENT' &&
                orderDetail?.transactionStatus !== 'SUCCESS'
                  ? `${orderDetail?.currency ?? 'IDR'} ${standartCurrency(
                      orderDetail?.grossAmount ?? 0
                    )}`
                  : t('quiz.payment.paymentSuccessful')}
              </Typography>
              <Typography className="text-sm font-normal text-white text-center">
                {(orderDetail?.transactionStatus === 'SETTLEMENT' ||
                  orderDetail?.transactionStatus === 'SUCCESS') &&
                  t('quiz.payment.recurringSaved')}
              </Typography>

              <Card className="p-5 mt-8 bg-white w-full">
                <Typography className="text-sm font-semibold text-[#BDBDBD] text-center">
                  {orderDetail?.vaNumber !== undefined
                    ? t('quiz.payment.virtualNumber')
                    : t('quiz.payment.paymentMethod')}
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
                      src={paymentSelectedEWallet[0].logo_url}
                      alt="AVATAR"
                      width={90}
                      height={90}
                    />
                  </div>
                )}
                <hr className="border-t-2 border-dashed" />
                <div className="flex justify-between relative bottom-3 z-10">
                  <div className="bg-[#3AC4A0] h-6 rounded-full w-6 -mx-8 outline-none" />
                  <div className="bg-[#3AC4A0] h-6 rounded-full w-6 -mx-8 outline-none" />
                </div>

                {/* Quiz Fee */}
                {orderDetail?.currency !== undefined &&
                  orderDetail?.grossAmount !== undefined && (
                    <div className="flex flex-row justify-between my-5">
                      <Typography className="text-sm font-semibold text-[#BDBDBD]">
                        {t('quiz.payment.quizFeeTotal')}
                      </Typography>
                      <Typography className="text-sm font-semibold text-[#262626]">
                        {orderDetail?.currency !== undefined &&
                        orderDetail?.grossAmount !== undefined
                          ? `${orderDetail?.currency ?? 'IDR'} ${standartCurrency(
                              (orderDetail?.grossAmount ?? 0) === 0
                                ? 0
                                : (orderDetail?.grossAmount ?? 0) -
                                    orderDetail?.admin_fee -
                                    orderDetail?.service_fee +
                                    (orderDetail?.is_promo_available ?? false
                                      ? orderDetail?.promo_price ?? 0
                                      : 0)
                            )}`
                          : ''}
                      </Typography>
                    </div>
                  )}

                {/* Admin Fee */}
                {(orderDetail?.grossAmount ?? 0) > 0 &&
                qRisList !== undefined &&
                (orderDetail?.admin_fee ?? 0) > 0 ? (
                  <div className="flex flex-row justify-between mb-5">
                    <Typography className="text-sm font-semibold text-[#BDBDBD]">
                      {t('quiz.payment.adminFee')}
                    </Typography>
                    <Typography className="text-sm font-semibold text-[#262626]">
                      {orderDetail?.currency !== undefined &&
                        `${orderDetail?.currency ?? 'IDR'} ${standartCurrency(
                          orderDetail?.admin_fee ?? 0
                        )}`}
                    </Typography>
                  </div>
                ) : (
                  ''
                )}

                {/* Service Fee */}
                {(orderDetail?.grossAmount ?? 0) > 0 &&
                (orderDetail?.service_fee ?? 0) > 0 ? (
                  <div className="flex flex-row justify-between mb-5">
                    <Typography className="text-sm font-semibold text-[#BDBDBD]">
                      {t('quiz.payment.serviceFee')}
                    </Typography>
                    <Typography className="text-sm font-semibold text-[#262626]">
                      {orderDetail?.currency !== undefined &&
                      orderDetail.grossAmount !== undefined
                        ? `${orderDetail?.currency ?? 'IDR'} ${standartCurrency(
                            orderDetail?.service_fee ?? 0
                          )}`
                        : ''}
                    </Typography>
                  </div>
                ) : (
                  ''
                )}

                {/* Discount Fee */}
                {(orderDetail?.grossAmount ?? 0) > 0 &&
                  paymentSelectedEWallet.length > 0 && (
                    <div>
                      {(orderDetail?.is_promo_available ?? false) && (
                        <div className="flex flex-row justify-between mb-5">
                          <Typography className="text-sm font-semibold text-[#BDBDBD]">
                            {t('quiz.payment.discountFee')}
                          </Typography>
                          <Typography className="text-sm font-semibold text-[#262626]">
                            {orderDetail?.currency !== undefined
                              ? `- ${
                                  orderDetail?.currency ?? 'IDR'
                                } ${standartCurrency(
                                  orderDetail?.promo_price ?? 0
                                )}`
                              : ''}
                          </Typography>
                        </div>
                      )}
                    </div>
                  )}

                {/* Discount Coins */}
                <div>
                  {orderDetail?.currency !== undefined &&
                    orderDetail?.seeds_coin !== undefined &&
                    (orderDetail?.grossAmount ?? 0) > 0 &&
                    detailQuiz !== undefined &&
                    orderDetail?.seeds_coin !== 0 && (
                      <div className="flex flex-row justify-between mb-5">
                        <Typography className="text-sm font-semibold text-[#BDBDBD]">
                          {t('quiz.payment.discountCoins')}
                        </Typography>
                        <Typography className="text-sm font-semibold text-[#262626]">
                          {`- ${
                            orderDetail?.currency ?? 'IDR'
                          } ${standartCurrency(orderDetail?.seeds_coin ?? 0)}`}
                        </Typography>
                      </div>
                    )}
                </div>
                <hr />

                {/* Total Amount */}
                <div className="flex flex-row justify-between my-5">
                  <Typography className="text-sm font-semibold text-[#BDBDBD]">
                    {t('quiz.payment.totalAmount')}
                  </Typography>
                  <Typography className="text-sm font-semibold text-[#262626]">
                    {orderDetail?.currency !== undefined &&
                      `${orderDetail?.currency ?? 'IDR'} ${standartCurrency(
                        orderDetail?.grossAmount ?? 0
                      )}`}
                  </Typography>
                </div>
                <div className="flex flex-row justify-between mb-5">
                  <Typography className="text-sm font-semibold text-[#BDBDBD]">
                    {t('quiz.payment.idTransaction')}
                  </Typography>
                  <Typography className="text-sm font-semibold text-[#262626] text-right truncate">
                    {orderDetail?.transactionId === ''
                      ? '-'
                      : `${(orderDetail?.transactionId ?? '').slice(0, 20)}${
                          (orderDetail?.transactionId ?? '').length > 20
                            ? '...'
                            : ''
                        }`}
                  </Typography>
                </div>
              </Card>
              {orderDetail?.vaNumber !== undefined && steps.length > 0 && (
                <Card className="p-5 mt-8 bg-white">
                  <div className="flex justify-between">
                    <h1 className="text-xl font-bold mb-4">How to Pay</h1>
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

              <div className="w-full flex items-center justify-center">
                <Button
                  className="w-full text-sm font-semibold bg-seeds-button-green mt-10 rounded-full capitalize"
                  onClick={() => {
                    const formattedText = (text: string): string => {
                      return text
                        .split('|')[1]
                        .replaceAll(/[^a-zA-Z0-9_-]/g, '_');
                    };
                    TrackerEvent({
                      event: 'SW_quiz_payment',
                      userData: userInfo,
                      paymentData: {
                        ...orderDetail,
                        itemName:
                          formattedText(orderDetail?.itemName as string)
                            .length > 50
                            ? formattedText(
                                orderDetail?.itemName as string
                              ).substring(0, 50)
                            : formattedText(orderDetail?.itemName as string),
                        statusPayment: 'PAID'
                      }
                    });
                    void router.replace(
                      `/play/quiz/${orderDetail?.itemId as string}/start`
                    );
                  }}
                >
                  {t('quiz.payment.close')}
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

