/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */
'use client';
import SubmitButton from '@/components/SubmitButton';
import Loading from '@/components/popup/Loading';
import Dialog from '@/components/ui/dialog/Dialog';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { type PaymentData } from '@/pages/play/quiz/[id]/help-option';
import { joinCirclePost } from '@/repository/circleDetail.repository';
import { getPaymentList } from '@/repository/payment.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { joinQuiz } from '@/repository/quiz.repository';
import { selectPromoCodeValidationResult } from '@/store/redux/features/promo-code';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PaymentOptions from './PaymentOptions';
import VirtualAccountGuide from './VirtualAccountGuide';
import WalletForm from './WalletForm';

export interface Payment {
  id: string;
  payment_method: string;
  logo_url: string;
  payment_type: string;
  admin_fee: number;
  is_promo_available: boolean;
  promo_price: number;
  service_fee: number;
  payment_gateway?: string;
}

interface props {
  dataPost?: any;
  monthVal?: string;
  invitationCode?: string;
  useCoins?: boolean;
}

const userDefault: UserInfo = {
  avatar: '',
  badge: '',
  bio: '',
  birthDate: '',
  claims: {
    aud: [],
    avatar: '',
    birthDate: '',
    email: '',
    exp: 0,
    iat: 0,
    iss: '',
    nbf: '',
    phoneNumber: '',
    preferredCurrency: '',
    preferredLanguage: '',
    refCode: '',
    role: '',
    seedsTag: '',
    sub: ''
  },
  currentExp: 0,
  email: '',
  email_verification: '',
  followers: 0,
  following: 0,
  id: '',
  isPasswordExists: false,
  label: '',
  name: '',
  phoneNumber: '',
  pin: false,
  posts: 0,
  preferredCurrency: '',
  preferredLanguage: '',
  refCode: '',
  refCodeUsage: 0,
  region: '',
  seedsTag: '',
  verified: false,
};

const PaymentList: React.FC<props> = ({
  dataPost,
  monthVal,
  invitationCode,
  useCoins
}): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [qRisList, setQRisList] = useState([]);
  const [option, setOption] = useState<Payment>();
  const [eWalletList, setEWalletList] = useState([]);
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const promoCodeValidationResult = useSelector(
    selectPromoCodeValidationResult
  );

  const fetchPaymentList = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await getPaymentList(
        userInfo?.preferredCurrency?.toUpperCase()
      );
      setQRisList(data.type_qris);
      setEWalletList(data.type_ewallet);
    } catch (error) {
      toast(`Error fetching Payment List: ${error as string}`);
    } finally {
      setLoading(false);
    }
  };
  const fetchData = async (): Promise<void> => {
    try {
      const response = await getUserInfo();
      setUserInfo(response);
    } catch (error) {
      toast(`ERROR fetch user info ${error as string}`);
    }
  };

  const numberMonth = (): number => {
    if (monthVal !== undefined && monthVal.length > 0) {
      return parseInt(monthVal.substring(0, 2));
    } else {
      return 1;
    }
  };

  useEffect(() => {
    void fetchData();
    // void fetchPaymentList();
  }, []);

  useEffect(() => {
    void fetchPaymentList();
  }, [userInfo?.preferredCurrency]);

  const handlePay = async (
    type: string,
    paymentGateway: string,
    paymentMethod: string,
    totalAmount: number,
    phoneNumber: string | undefined = userInfo?.phoneNumber
  ): Promise<void> => {
    try {
      setLoading(true);
      if (
        type === 'ewallet' &&
        (phoneNumber === userInfo?.phoneNumber || phoneNumber === '')
      ) {
        toast(`Please fill the phone number`);
      }
      const replaceDataPost: PaymentData = dataPost;
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (replaceDataPost.quiz) {
        const response = await joinQuiz({
          quiz_id: replaceDataPost?.payment?.quiz_id,
          lifelines: replaceDataPost?.payment?.lifelines,
          language: replaceDataPost?.payment?.language,
          payment_gateway: paymentGateway,
          payment_method: paymentMethod,
          phone_number: `+62${phoneNumber as string}`,
          promo_code: promoCodeValidationResult?.response?.promo_code ?? '',
          invitation_code: invitationCode as string,
          is_use_coins: useCoins as boolean
        });

        if (response) {
          if (response.payment_url !== '') {
            window.open(response.payment_url as string, '_blank');
          }
          await router
            .replace(`/play/payment/receipt/${response.order_id as string}`)
            .catch(error => {
              toast(`${error as string}`);
            });
        }
      } else {
        const response = await joinCirclePost({
          circle_id: dataPost?.id,
          duration:
            numberMonth() === 1 ? numberMonth() : (numberMonth() % 3) + 1,
          payment_request: {
            amount: parseInt(`${totalAmount}`),
            payment_gateway: paymentGateway,
            payment_method: paymentMethod,
            phone_number: `+62${phoneNumber as string}`,
            item_id: dataPost?.id,
            item_name: dataPost?.name,
            quantity: 1,
            name: userInfo?.name,
            email: userInfo?.email,
            promo_code: promoCodeValidationResult?.response?.promo_code ?? '',
            spot_type: 'Join Circle Premium'
          }
        });

        if (response.success === true) {
          if (response.data.Response.payment_url !== undefined) {
            window.open(response.data.Response.payment_url as string, '_blank');
          }
          await router
            .push(
              `/connect/payment/receipt/${
                response.data.Response.order_id as string
              }`
            )
            .catch(error => {
              toast(`${error as string}`);
            });
        }
      }
    } catch (error) {
      toast(`${error as string}`);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = () => {
    let _admissionFee = 0;
    let _adminFee = 0;
    let _totalFee = 0;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (dataPost.quiz) {
      _admissionFee = dataPost?.quiz?.admission_fee;
      _adminFee = 0;
      _totalFee =
        Number(_admissionFee) + Number(_adminFee) + Number(dataPost?.quiz?.fee);
    } else {
      _admissionFee =
        dataPost?.premium_fee * (numberMonth() > 0 ? numberMonth() : 1 ?? 1);
      _adminFee = dataPost?.admin_fee as number;
      _totalFee = parseFloat(`${(_admissionFee + _adminFee).toFixed(2)}`);
    }

    if (option?.payment_type === 'qris') {
      void handlePay(option?.payment_type, 'MIDTRANS', 'OTHER_QRIS', _totalFee);
    } else {
      setOpenDialog(true);
    }
  };

  const renderLoading = (): JSX.Element => <Loading />;

  const renderContent = (): JSX.Element => (
    <div className="relative md:bg-[url('/assets/vector/purple-ellipse.svg')] bg-[white] bg-opacity-30 bg-no-repeat bg-left-top w-full h-full flex flex-col items-center pt-8 md:p-8 rounded-xl">
      <Typography className="w-full max-w-[600px] text-left px-8 md:text-center text-neutral-500 text-lg font-semibold mb-3">
        {t('PlayPayment.title')}
      </Typography>
      <div className="bg-[white] max-w-[600px] w-full h-full flex flex-col items-center p-8 rounded-xl">
        <PaymentOptions
          label="QRIS"
          options={qRisList}
          onChange={setOption}
          currentValue={option}
        />
        <PaymentOptions
          label={t('PlayPayment.eWalletLabel')}
          options={eWalletList}
          onChange={setOption}
          currentValue={option}
        />
        <SubmitButton
          disabled={option?.id == null}
          fullWidth
          onClick={onSubmit}
        >
          {t('PlayPayment.button')}
        </SubmitButton>
      </div>
    </div>
  );

  return (
    <PageGradient defaultGradient className="w-full md:px-20 my-10 h-screen">
      {loading ? renderLoading() : renderContent()}
      <Dialog
        title={
          option?.payment_type === 'ewallet'
            ? t('PlayPayment.WalletForm.title', {
                wallet: option.payment_method
              })
            : t('PlayPayment.VirtualAccountGuide.title', {
                bank: option?.payment_method?.split('_')[0]
              })
        }
        isOpen={openDialog}
        bottomSheetOnSmall
        handleClose={() => {
          setOpenDialog(false);
        }}
      >
        {option?.payment_type === 'ewallet' ? (
          <WalletForm
            payment={option}
            handlePay={handlePay}
            numberMonth={numberMonth() > 0 ? numberMonth() : 1}
            dataPost={dataPost}
            userInfo={userInfo ?? userDefault}
          />
        ) : (
          <VirtualAccountGuide
            payment={option}
            handlePay={handlePay}
            numberMonth={numberMonth() > 0 ? numberMonth() : 1}
            dataPost={dataPost}
          />
        )}
      </Dialog>
    </PageGradient>
  );
};

export default PaymentList;
