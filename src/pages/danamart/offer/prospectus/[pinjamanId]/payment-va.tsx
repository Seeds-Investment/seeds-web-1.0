import {
  BankBCA,
  BankBNI,
  BankBRI,
  BankMandiri,
  BankPermata,
  SeedyPayment
} from '@/assets/danamart';
import CAccordion from '@/components/CAccordion';
import ModalCancelPayment from '@/components/danamart/offer/purchase/ModalCancelPayment';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { standartCurrency } from '@/helpers/currency';
import { getEarningReceiptDate } from '@/helpers/dateFormat';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import {
  cancelPayment,
  getDetailPayment
} from '@/repository/danamart/offers.repository';
import LanguageContext from '@/store/language/language-context';
import { bankInstructionsEnglish } from '@/utils/_static/bank-en';
import { bankInstructionsIndonesian } from '@/utils/_static/bank-id';
import { type PaymentDetail } from '@/utils/interfaces/danamart/offers.interface';
import { Button, Typography } from '@material-tailwind/react';
import Image, { type StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';

const PaymentVA = (): React.ReactElement => {
  const { t } = useTranslation();
  const router = useRouter();
  const languageCtx = useContext(LanguageContext);
  const [paymentDetail, setPaymentDetail] = useState<PaymentDetail>();
  const pinjamanId = Array.isArray(router.query.pinjamanId)
    ? router.query.pinjamanId[0]
    : router.query.pinjamanId;
  const pathTranslation = 'danamart.offers.purchase.payment';
  const [isShowCancelPayment, setIsShowCancelPayment] =
    useState<boolean>(false);
  const [isCancelPayment, setIsCancelPayment] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);

  const bankInstructions =
    languageCtx?.language === 'ID'
      ? bankInstructionsIndonesian
      : bankInstructionsEnglish;
  const selectedBank = paymentDetail?.Data
    .kode_pembayaran as keyof typeof bankInstructions;
  const bankData =
    selectedBank in bankInstructions ? bankInstructions[selectedBank] : [];

  const getDataDetailPayment = async (pinjamanId: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getDetailPayment({ idPinjaman: pinjamanId });
      setPaymentDetail(response?.data);
    } catch (error: any) {
      toast.error('Error fetching data: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelPayment = async (pinjamanId: string): Promise<void> => {
    try {
      const response = await cancelPayment({ pinjamanId });
      if (response?.data?.StatusCode === '200') {
        toast.success(t(`${pathTranslation}.cancelationSucceed`));
        setTimeout(() => {
          void (async () => {
            await router.push('/danamart/offer');
          })();
        }, 2000);
      }
    } catch (error) {
      toast.success(t(`${pathTranslation}.cancelationFailed`));
    }
  };

  const handleBankLogo = (bankName: string): StaticImageData => {
    if (bankName === 'BCA') return BankBCA;
    if (bankName === 'MANDIRI') return BankMandiri;
    if (bankName === 'PERMATA') return BankPermata;
    if (bankName === 'BNI') return BankBNI;
    return BankBRI;
  };

  const handleCopyVANumber = async (vaNumber: string): Promise<void> => {
    await navigator.clipboard.writeText(vaNumber).then(() => {
      toast.success(t(`${pathTranslation}.numberVACopied`));
    });
  };

  useEffect(() => {
    if (pinjamanId !== undefined) {
      void Promise.all([getDataDetailPayment(pinjamanId)]);
    }
  }, [pinjamanId, isRefetch]);

  useEffect(() => {
    if (pinjamanId !== undefined && isCancelPayment) {
      void handleCancelPayment(pinjamanId);
    }
  }, [isCancelPayment]);

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="w-full flex flex-col justify-center items-center rounded-xl font-poppins p-5 bg-white">
        <div className="w-full flex justify-start items-center bg-seeds-button-green lg:bg-gradient-to-r from-seeds-button-green to-white rounded-md">
          <div className="flex justify-center items-center h-[80px] w-auto m-2">
            <Image
              alt="SeedyPayment"
              width={100}
              height={100}
              src={SeedyPayment}
              className="h-full w-auto"
            />
          </div>
          <Typography className="font-poppins font-semibold text-white text-lg">
            {t(`${pathTranslation}.titleVA`)}
          </Typography>
        </div>
        <Typography className="font-poppins font-semibold text-white text-lg">
          {t(`${pathTranslation}.descriptionVA`)}
        </Typography>
        <div className="w-full flex flex-col md:flex-row gap-4">
          <div className="w-full flex flex-col gap-4">
            <div>
              <Typography className="font-poppins text-[#BDBDBD]">
                {t(`${pathTranslation}.orderId`)}
              </Typography>
              {paymentDetail !== undefined ? (
                <Typography className="font-poppins text-[#262626] font-medium">
                  {paymentDetail?.Data?.fva_id ?? ''}
                </Typography>
              ) : (
                <div className="w-[80%] md:w-[60%] h-[18px] flex flex-col justify-start items-start bg-gray-300 animate-pulse rounded-full">
                  <div className="text-sm text-center items-center bg-gray-400 flex-grow w-full rounded-full" />
                </div>
              )}
            </div>
            <div>
              <Typography className="font-poppins text-[#BDBDBD]">
                {t(`${pathTranslation}.nominal`)}
              </Typography>
              {paymentDetail !== undefined ? (
                <Typography className="font-poppins text-[#262626] font-medium">
                  IDR{' '}
                  {standartCurrency(paymentDetail?.Data?.jml_pendanaan ?? 0)}
                </Typography>
              ) : (
                <div className="w-[80%] md:w-[60%] h-[18px] flex flex-col justify-start items-start bg-gray-300 animate-pulse rounded-full">
                  <div className="text-sm text-center items-center bg-gray-400 flex-grow w-full rounded-full" />
                </div>
              )}
            </div>
            <div>
              <Typography className="font-poppins text-[#BDBDBD]">
                {t(`${pathTranslation}.expiredDate`)}
              </Typography>
              {paymentDetail !== undefined ? (
                <Typography className="font-poppins text-[#262626] font-medium">
                  {languageCtx?.language === 'ID'
                    ? `${getEarningReceiptDate(
                        new Date(
                          paymentDetail?.Data?.expiration_date ??
                            '2024-12-31T00:00:00.314412Z'
                        ),
                        'id-ID'
                      )}`
                    : `${getEarningReceiptDate(
                        new Date(
                          paymentDetail?.Data?.expiration_date ??
                            '2024-12-31T00:00:00.314412Z'
                        ),
                        'en-US'
                      )}`}
                </Typography>
              ) : (
                <div className="w-[80%] md:w-[60%] h-[18px] flex flex-col justify-start items-start bg-gray-300 animate-pulse rounded-full">
                  <div className="text-sm text-center items-center bg-gray-400 flex-grow w-full rounded-full" />
                </div>
              )}
            </div>
            <div>
              <Typography className="font-poppins text-[#BDBDBD]">
                {t(`${pathTranslation}.status`)}
              </Typography>
              {paymentDetail !== undefined ? (
                <Typography className="font-poppins text-[#262626] font-medium">
                  {paymentDetail?.Data?.status_payment ?? ''}
                </Typography>
              ) : (
                <div className="w-[80%] md:w-[60%] h-[18px] flex flex-col justify-start items-start bg-gray-300 animate-pulse rounded-full">
                  <div className="text-sm text-center items-center bg-gray-400 flex-grow w-full rounded-full" />
                </div>
              )}
            </div>
            <div>
              <Typography className="font-poppins text-[#BDBDBD]">
                Bank
              </Typography>
              {paymentDetail !== undefined ? (
                <div className="flex justify-center items-center w-[200px] h-auto mt-2">
                  <Image
                    alt="BankName"
                    width={100}
                    height={100}
                    src={handleBankLogo(
                      paymentDetail?.Data?.kode_pembayaran ?? ''
                    )}
                    className="h-full w-auto"
                  />
                </div>
              ) : (
                <div className="w-[80%] md:w-[60%] h-[18px] flex flex-col justify-start items-start bg-gray-300 animate-pulse rounded-full">
                  <div className="text-sm text-center items-center bg-gray-400 flex-grow w-full rounded-full" />
                </div>
              )}
            </div>
            <div>
              <Typography className="font-poppins text-[#BDBDBD]">
                {t(`${pathTranslation}.numberVA`)}
              </Typography>
              {paymentDetail !== undefined ? (
                <Typography
                  onClick={async () => {
                    await handleCopyVANumber(paymentDetail?.Data?.fva ?? '');
                  }}
                  className="flex justify-start items-center gap-2 font-poppins text-seeds-button-green font-medium cursor-pointer"
                >
                  {paymentDetail?.Data?.fva ?? ''} <FaRegCopy />
                </Typography>
              ) : (
                <div className="w-[80%] md:w-[60%] h-[18px] flex flex-col justify-start items-start bg-gray-300 animate-pulse rounded-full">
                  <div className="text-sm text-center items-center bg-gray-400 flex-grow w-full rounded-full" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-2 justify-between items-center mt-4">
          <Button
            onClick={() => {
              setIsRefetch(!isRefetch);
            }}
            disabled={isLoading}
            className="w-full md:w-[200px] flex gap-2 justify-center items-center rounded-full bg-seeds-button-green border-[1px] text-sm font-semibold capitalize text-white transition-all font-poppins"
          >
            {t(`${pathTranslation}.refresh`)}
          </Button>
          <Button
            onClick={() => {
              setIsShowCancelPayment(true);
            }}
            disabled={isLoading}
            className="w-full md:w-[200px] flex gap-2 justify-center items-center rounded-full bg-[#DA2D1F] border-[1px] text-sm font-semibold capitalize text-white transition-all font-poppins"
          >
            {t(`${pathTranslation}.cancel`)}
          </Button>
        </div>
        <div className="mt-6">
          <Typography className="text-md font-semibold font-poppins text-[#7C7C7C] mb-2">
            {t(`${pathTranslation}.howToPayVA1`)}{' '}
            {paymentDetail?.Data?.kode_pembayaran}{' '}
            {t(`${pathTranslation}.howToPayVA2`)}
          </Typography>
          <div className="mt-2">
            {bankData?.map((item, index) => (
              <CAccordion
                key={index}
                title={item?.title}
                description={
                  <div
                    className="font-poppins leading-8 text-[#7C7C7C] text-md font-medium"
                    dangerouslySetInnerHTML={{ __html: item?.body }}
                  />
                }
              />
            ))}
          </div>
        </div>
      </div>
      {isShowCancelPayment && (
        <ModalCancelPayment
          setIsShowCancelPayment={setIsShowCancelPayment}
          isShowCancelPayment={isShowCancelPayment}
          setIsCancelPayment={setIsCancelPayment}
        />
      )}
    </PageGradient>
  );
};

export default withAuthDanamart(PaymentVA);
