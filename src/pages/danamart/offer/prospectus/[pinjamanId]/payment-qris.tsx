import { DownloadIcon, SeedyPayment } from '@/assets/danamart';
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
import { type PaymentDetail } from '@/utils/interfaces/danamart/offers.interface';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';

const PaymentQRIS = (): React.ReactElement => {
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

  const downloadQRCode = (): void => {
    const svg = document.getElementById('qrCodeSVG') as SVGSVGElement | null;
    if (svg == null) {
      toast.error('QR Code SVG not found!');
      return;
    }

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      if (ctx != null) {
        ctx.drawImage(img, 0, 0, 200, 200);
        const pngUrl = canvas.toDataURL('image/png');

        // Create download link
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = 'qris-pembayaran.png';
        link.click();

        URL.revokeObjectURL(url);
      }
    };

    img.src = url;
  };

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
      toast.error(t(`${pathTranslation}.cancelationFailed`));
    }
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
            {t(`${pathTranslation}.titleQR`)}
          </Typography>
        </div>
        <Typography className="font-poppins font-semibold text-white text-lg">
          {t(`${pathTranslation}.descriptionQR`)}
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
          </div>
          <div className="w-full md:w-[300px] lg:w-[400px] flex flex-col gap-4 justify-center items-center">
            <Typography className="font-poppins text-[#BDBDBD] text-lg font-medium mt-8 md:mt-0 text-center">
              {t(`${pathTranslation}.scan`)}
            </Typography>
            {paymentDetail !== undefined ? (
              <QRCode
                id="qrCodeSVG"
                style={{ height: '200px', width: 'auto' }}
                value={paymentDetail?.Data?.kode_pembayaran ?? ''}
              />
            ) : (
              <div className="w-full h-[200px] flex flex-col justify-start items-start bg-gray-300 animate-pulse rounded-lg">
                <div className="text-sm text-center items-center bg-gray-400 flex-grow w-full rounded-lg" />
              </div>
            )}
            <Button
              onClick={() => {
                downloadQRCode();
              }}
              disabled={isLoading}
              className="flex gap-2 justify-center items-center rounded-full bg-white border-[1px] border-seeds-button-green text-sm font-semibold capitalize text-seeds-button-green transition-all font-poppins"
            >
              <Typography>{t(`${pathTranslation}.download`)}</Typography>
              <Image
                alt="DownloadIcon"
                width={20}
                height={20}
                src={DownloadIcon}
              />
            </Button>
          </div>
        </div>
        <div className="mt-6">
          <Typography className="text-md font-semibold font-poppins text-[#BDBDBD] mb-2">
            {t(`${pathTranslation}.howToPayQR`)}
          </Typography>
          <div
            className="font-poppins text-justify text-[#262626]"
            dangerouslySetInnerHTML={{
              __html: t(`${pathTranslation}.qris.steps`) ?? ''
            }}
          />
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

export default withAuthDanamart(PaymentQRIS);
