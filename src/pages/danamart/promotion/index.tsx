import ModalPromoGuide from '@/components/danamart/promotion/ModalPromoGuide';
import ModalPromoRejection from '@/components/danamart/promotion/ModalPromoRejection';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import { validatePromoCode } from '@/repository/danamart/promotion.repository';
import { Button, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiAlertOctagon } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Promotion = (): React.ReactElement => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.promotion';
  const [jnsPromo, setJnsPromo] = useState<string>('');
  const [kodePromo, setKodePromo] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowPromoGuide, setIsShowPromoGuide] = useState<boolean>(false);
  const [isShowPromoRejection, setIsShowPromoRejection] = useState<boolean>(false);

  const handleValidatePromoCode = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('jns_promo', jnsPromo);
      formData.append('kode_promo', kodePromo);

      const response = await validatePromoCode(formData);

      if (
        response?.message ===
        'Selamat! Kode-mu valid dan berhasil diklaim. Saat ini sudah bisa menikmati benefitnya.'
      ) {
        toast.success(t(`${pathTranslation}.text8`));
      } else {
        toast.success(response?.message);
      }
      setKodePromo('');
    } catch (error: any) {
      if (
        error?.response?.data?.message ===
        'Maaf! Kode-mu tidak valid, kuota sudah habis , masa berlakunya telah berakhir atau tidak memenuhi syarat dan ketentuan. Silakan coba lagi dengan kode lainnya ya.'
      ) {
        setIsShowPromoRejection(true)
      } else {
        setIsShowPromoRejection(true)
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="w-full bg-white flex flex-col px-5 py-5 rounded-lg">
        <Typography className="font-poppins md:text-2xl text-lg font-semibold text-[#262626] mb-4">
          {t(`${pathTranslation}.title`)}
        </Typography>
        <div
          onClick={() => {
            setIsShowPromoGuide(true);
          }}
          className="w-full flex justify-start items-center gap-2 mb-4"
        >
          <Typography className="font-poppins font-medium text-seeds-button-green">
            {t(`${pathTranslation}.text1`)}
          </Typography>
          <FiAlertOctagon
            size={24}
            className="text-seeds-button-green cursor-pointer"
          />
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <label className="w-full flex flex-col">
            <Typography className="font-poppins font-medium text-[#262626]">
              {t(`${pathTranslation}.text2`)}
            </Typography>
            <select
              value={jnsPromo}
              onChange={e => {
                setJnsPromo(e.target.value);
              }}
              className="py-2 px-4 border rounded-full"
            >
              <option value="" disabled>
                {t(`${pathTranslation}.text3`)}
              </option>
              <option value="event">{t(`${pathTranslation}.text4`)}</option>
            </select>
          </label>

          <label className="w-full flex flex-col">
            <Typography className="font-poppins font-medium text-[#262626]">
              {t(`${pathTranslation}.text5`)}
            </Typography>
            <input
              type="text"
              value={kodePromo}
              onChange={e => {
                setKodePromo(e.target.value);
              }}
              className="py-2 px-4 border rounded-full"
              placeholder={`${t(`${pathTranslation}.text6`)}`}
            />
          </label>
        </div>
        <div className="w-full flex justify-end items-end">
          <Button
            onClick={handleValidatePromoCode}
            disabled={isLoading || kodePromo.length === 0 || jnsPromo === ''}
            className="shrink-0 md:mt-5 rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
          >
            {t(`${pathTranslation}.text7`)}
          </Button>
        </div>
      </div>
      {isShowPromoGuide && (
        <ModalPromoGuide
          setIsShowPromoGuide={setIsShowPromoGuide}
          isShowPromoGuide={isShowPromoGuide}
        />
      )}
      {isShowPromoRejection && (
        <ModalPromoRejection
          setIsShowPromoRejection={setIsShowPromoRejection}
          isShowPromoRejection={isShowPromoRejection}
        />
      )}
    </PageGradient>
  );
};

export default withAuthDanamart(Promotion);
