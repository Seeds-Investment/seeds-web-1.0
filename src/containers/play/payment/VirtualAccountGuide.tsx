'use client';
import SubmitButton from '@/components/SubmitButton';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Divider from './components/Divider';
import InlineText from './components/InlineText';
interface VirtualAccountGuideProps {
  payment: any;
  dataPost: any;
  handlePay: (
    type: string,
    paymentGateway: string,
    paymentMethod: string,
    totalAmount: number,
    phoneNumber?: string | undefined
  ) => Promise<void>;
}

const VirtualAccountGuide = ({
  payment,
  dataPost,
  handlePay
}: VirtualAccountGuideProps): JSX.Element => {
  const { t } = useTranslation();
  const accountNumber = '123 0865 9878 9000';
  const accountName = 'Margaretha Intan Pratiwi';
  const userName = 'Jeri';
  const admissionFee = dataPost?.premium_fee as number;
  const adminFee = dataPost?.admin_fee as number;
  const totalFee = admissionFee + adminFee;
  const translationsId = 'PlayPayment.VirtualAccountGuide';
  const bankName = payment?.payment_method?.split('_')[0];
  return (
    <div className="max-h-[70vh]">
      <div className="flex items-center">
        <Image
          src={payment?.logo_url}
          width={200}
          height={200}
          className="h-[20px] w-auto mr-2 object-contain"
          alt={payment?.payment_method}
        />
        <Typography className="text-[#201B1C] font-normal text-md">
          {t(`${translationsId}.bankName`, { bank: bankName })}
        </Typography>
      </div>
      <Divider />
      <Typography className="text-[#201B1C] font-normal">
        {t(`${translationsId}.accountNumberLabel`)}
      </Typography>
      <div className="flex justify-between mb-4">
        <Typography className="text-[#7555DA] font-normal">
          {accountNumber}
        </Typography>
        <Button
          variant="text"
          onClick={() => {}}
          className="text-[#3AC4A0] text-md font-normal p-0 normal-case "
        >
          {t(`${translationsId}.copy`)}
        </Button>
      </div>
      <Typography className="text-[#201B1C] font-normal">
        {t(`${translationsId}.accountNameLabel`)}
      </Typography>
      <Typography className="text-[#7555DA] font-normal">
        {accountName}
      </Typography>
      <Divider />
      <InlineText
        label={t(`${translationsId}.admissionFeeLabel`)}
        value={`IDR ${admissionFee}`}
        className="mb-2"
      />
      <InlineText
        label={t(`${translationsId}.adminFeeLabel`)}
        value={`IDR ${adminFee}`}
      />
      <Divider />
      <Typography className="text-3xl text-[#3AC4A0] font-semibold text-right">
        {`IDR ${totalFee}`}
      </Typography>
      <Divider />
      <Typography className="text-[#DD2525] font-normal text-sm mb-6">
        {t(`${translationsId}.note`)}
      </Typography>
      <Typography className="text-[#262626] font-normal">
        {t(`${translationsId}.instructionLabel`)}
      </Typography>
      <Divider />
      <Typography className="text-[#262626] font-normal mb-4">
        1.
        <a className="text-[#7C7C7C]"> {t(`${translationsId}.step1.1`)} </a>
        {t(`${translationsId}.step1.2`, { provider: 'BCA' })}
      </Typography>
      <Typography className="text-[#262626] font-normal mb-4">
        2.
        <a className="text-[#7C7C7C]"> {t(`${translationsId}.step2.1`)} </a>
        {t(`${translationsId}.step2.2`)}
        <a className="text-[#7555DA]"> {accountNumber}</a>
        <a className="text-[#7C7C7C]"> {t(`${translationsId}.step2.3`)} </a>
        {t(`${translationsId}.step2.4`)}
      </Typography>
      <Typography className="text-[#262626] font-normal mb-4">
        3.
        <a className="text-[#7C7C7C]"> {t(`${translationsId}.step3.1`)} </a>
        {t(`${translationsId}.step3.2`)}
        <a className="text-[#7C7C7C]"> {t(`${translationsId}.step3.3`)} </a>
        {userName}.
        <a className="text-[#7C7C7C]"> {t(`${translationsId}.step3.4`)} </a>
        {t(`${translationsId}.step3.5`)}
      </Typography>
      <Typography className="text-[#262626] font-normal mb-4">
        4.
        <a className="text-[#7C7C7C]">
          {' '}
          {t(`${translationsId}.step4.1`, { provider: bankName })}{' '}
        </a>
        {t(`${translationsId}.step4.2`)}
      </Typography>
      <SubmitButton
        onClick={async () => {
          await handlePay(
            payment?.payment_type,
            payment.payment_gateway,
            payment?.payment_method,
            totalFee
          );
        }}
      >
        Pay
      </SubmitButton>
      <Divider />
    </div>
  );
};

export default VirtualAccountGuide;
