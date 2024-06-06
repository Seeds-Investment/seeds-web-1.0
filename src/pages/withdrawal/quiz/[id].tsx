import ValidatePin from '@/components/forms/ValidatePin';
import Loading from '@/components/popup/Loading';
import WinnerInformation from '@/components/quiz/WinnerInformation';
import IndexWithdrawal from '@/components/quiz/Withdrawal';
import withRedirect from '@/helpers/withRedirect';
import useQuizCashout from '@/hooks/useCashoutQuiz';
import { postCloud } from '@/repository/cloud.repository';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export interface IWithdrawalAccount {
  method: string;
  account_name: string;
  account_number: string;
  beneficiary_name: string;
}

export interface IWinnerInformationData {
  social_media_type: string;
  social_media_username: string;
  testimonial: string;
  photo_url: string;
}

const Withdrawal: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [select, setSelect] = useState(0);
  const [pin, setPin] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<IWithdrawalAccount>();
  const [winnerInformationData, setWinnerInformationData] =
    useState<IWinnerInformationData>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const emptyPinIndex = pin.findIndex(number => number === '');
  const joinPin = pin.join('');
  const quizId = router.query.id;
  const { submitLoading, submitQuizCashout } = useQuizCashout();
  const currentUnixTime = Math.floor(Date.now() / 1000);
  const expiredUnixTime = parseInt(
    window.localStorage.getItem('expiresAt') as string
  );

  const redirect = async (): Promise<void> => {
    if (
      window.localStorage.getItem('accessToken') === null ||
      expiredUnixTime < currentUnixTime
    ) {
      await withRedirect(router, { withdrawal: 'true' }, '/auth2');
      toast.error(t('landingPageV2.redirectError'));
    }
  };

  useEffect(() => {
    void redirect();
  }, []);

  const handleSelectedFile = (file: File): void => {
    setSelectedFile(file);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      let updatedWinnerInfo = { ...winnerInformationData };

      if (selectedFile != null) {
        const { path: cloudResponse } = await postCloud({
          file: selectedFile,
          type: 'OTHER_URL'
        });
        updatedWinnerInfo = {
          ...updatedWinnerInfo,
          photo_url: cloudResponse
        };
      }
      const res = await submitQuizCashout({
        quiz_id: quizId as string,
        social_media_type: updatedWinnerInfo?.social_media_type as string,
        social_media_username:
          updatedWinnerInfo?.social_media_username as string,
        testimonial: updatedWinnerInfo?.testimonial as string,
        photo_url: updatedWinnerInfo?.photo_url as string,
        method: selectedAccount?.method as string,
        account_name: selectedAccount?.account_name as string,
        account_number: selectedAccount?.account_number as string,
        beneficiary_name: selectedAccount?.beneficiary_name as string
      });
      if (res?.id != null) {
        const params = {
          adminFee: res.admin_fee,
          withdraw: res.raw_amount,
          serviceFee: res.service_fee,
          promoPrice: res.promo_price,
          date: res.created_at,
          ref: res.reference_number,
          id: quizId
        };
        router
          .push({
            pathname: `/withdrawal/payment-detail`,
            query: params
          })
          .then(() => {})
          .catch(() => {});
      }
    } catch (error: any) {
      toast.error(`Error submitting data: ${error as string}`);
    }
  };

  if (joinPin !== '' && emptyPinIndex === -1) {
    setPin(['', '', '', '', '', '']);
    void handleSubmit();
  }

  const renderLoading = (): JSX.Element => <Loading />;
  const renderContent = (): JSX.Element => (
    <>
      <IndexWithdrawal
        setSelect={setSelect}
        className={select === 0 ? 'flex' : 'hidden'}
        setSelectedAccount={setSelectedAccount}
        account={selectedAccount}
      />
      <WinnerInformation
        setSelect={setSelect}
        className={select === 1 ? 'flex' : 'hidden'}
        winnerInformationData={winnerInformationData}
        setWinnerInformationData={setWinnerInformationData}
        handleSelectedFile={handleSelectedFile}
      />
      <ValidatePin
        pin={pin}
        setPin={setPin}
        emptyPinIndex={emptyPinIndex}
        error={error}
        setError={setError}
        className={select === 2 ? 'flex' : 'hidden'}
        title="Enter Your PIN"
        setSelect={setSelect}
      />
    </>
  );
  return <>{submitLoading ? renderLoading() : renderContent()}</>;
};

export default Withdrawal;
