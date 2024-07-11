import Seedy from '@/assets/promo/seedy.svg';
import TournamentPagination from '@/components/TournmentPagination';
import { standartCurrency } from '@/helpers/currency';
import { getPlayById } from '@/repository/play.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { getPromocodeActive, promoValidate } from '@/repository/promo.repository';
import { selectPromoCodeValidationResult, setPromoCodeValidationResult } from '@/store/redux/features/promo-code';
import { type IDetailTournament, type UserInfo } from '@/utils/interfaces/tournament.interface';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowBackwardIcon } from 'public/assets/vector';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface PromoCode {
  QuantityRunsOutDate: string;
  category: string;
  description: string;
  discount_percentage: number;
  discount_type: string;
  end_date: string;
  expired_date: string;
  feature_ids: string;
  id: string;
  initial_quantity: number;
  is_active: boolean;
  is_eligible: boolean;
  max_redeem: number;
  min_exp: number;
  min_transaction: number;
  promo_code: string;
  quantity: number;
  ref_code: string;
  start_date: string;
  tnc: string;
  type: string;
}

interface Metadata {
  currentPage: number;
  limit: number;
  total: number;
  totalPage: number;
}

const PromoCodeTournament: React.FC = () => {
  const router = useRouter();
  const id = router.query.id;
  const { t } = useTranslation();
  const [activePromoCodes, setActivePromoCodes] = useState<PromoCode[]>([]);
  const [promoCode, setPromoCode] = useState<string>('');
  // const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [detailTournament, setDetailTournament] = useState<IDetailTournament>();
  const dispatch = useDispatch();

  const [promoParams, setPromoParams] = useState({
    page: 1,
    limit: 10
  });
  const [metadata, setMetadata] = useState<Metadata>();
  
  const promoCodeValidationResult = useSelector(
    selectPromoCodeValidationResult
  );

  console.log('promoCodeValidationResult ', promoCodeValidationResult)

  useEffect(() => {
    fetchData()
      .then()
      .catch(() => {});

    setPromoCode(promoCodeValidationResult?.promo_code)
  }, []);

  useEffect(() => {
    if (id !== null) {
      void getDetail();
    }
    void fetchPromoData();
  }, [id, userInfo, promoParams]);

  const fetchData = async (): Promise<void> => {
    try {
      const dataInfo = await getUserInfo();
      setUserInfo(dataInfo);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };

  const fetchPromoData = async (): Promise<void> => {
    try {
      const activePromoCodesResponse = await getPromocodeActive(promoParams.page, promoParams.limit);
      setActivePromoCodes(activePromoCodesResponse?.data);
      setMetadata(activePromoCodesResponse?.metadata)
    } catch (error) {
      toast.error('Error fetching promo codes:');
    }
  };

  const getDetail = useCallback(async () => {
    try {
      const resp: IDetailTournament = await getPlayById(id as string);
      setDetailTournament(resp);
    } catch (error) {
      toast(`Error fetch tournament ${error as string}`);
    }
  }, [id]);

  const handlePromoCodeSelection = async (promoCode: string): Promise<void> => {
    console.log('promoCode Selected: ', promoCode)
    setPromoCode(promoCode);
    try {
      const response = await promoValidate({
        promo_code: promoCode,
        spot_type: 'Paid Tournament',
        item_price: detailTournament?.admission_fee,
        item_id: detailTournament?.id,
        currency: detailTournament?.currency
      });
      console.log('response ', response)

      if (promoCodeValidationResult.promo_code === promoCode) {
        setPromoCode('');
        dispatch(setPromoCodeValidationResult(0));
        console.log('heweh')
      } else if (response.total_discount !== undefined) {
        setPromoCode(promoCode);
        // setTotalDiscount(response.total_discount);
        dispatch(setPromoCodeValidationResult(response));
      } else {
        toast.error('Error Promo Code:', response.message);
      }
    } catch (error) {
      toast.error('Error Promo Code only for New User');
      setPromoCode('');
      dispatch(setPromoCodeValidationResult(0));
    }
  };

  const getRemainingTime = (endDate: string): string => {
    const end = new Date(endDate);
    const now = new Date();
    const diffInMs = end.getTime() - now.getTime();
    const diffInMinutes = diffInMs / (1000 * 60);
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;

    if (diffInDays >= 2) {
      return `${t('promo.endsIn')} ${Math.floor(diffInDays)} ${t('promo.daysRemain')}`;
    } else if ((diffInDays >= 1) && (diffInDays < 2)) {
      return `${t('promo.endsIn')} ${Math.floor(diffInDays)} ${t('promo.dayRemain')}`;
    } else if ((diffInHours < 24) && (diffInHours >= 2)) {
      return `${t('promo.endsIn')} ${Math.floor(diffInHours)} ${t('promo.hoursRemain')}`;
    } else if ((diffInHours >= 1) && (diffInHours < 2)) {
      return `${t('promo.endsIn')} ${Math.floor(diffInHours)} ${t('promo.hourRemain')}`;
    } else if ((diffInMinutes < 60) && (diffInMinutes >= 2)) {
      return `${t('promo.endsIn')} ${Math.floor(diffInMinutes)} ${t('promo.minutesRemain')}`;
    } else if ((diffInMinutes >= 1) && (diffInMinutes < 2)) {
      return `${t('promo.endsIn')} ${Math.floor(diffInMinutes)} ${t('promo.minuteRemain')}`;
    } else if ((diffInMinutes < 1) && (diffInMinutes > 0)) {
      return `${t('promo.endsIn')} ${t('promo.lessThanMinute')}`
    } else {
      return `${t('promo.promoOver')}`
    }
  }

  console.log('promoCode ', promoCode)

  return (
    <div className="flex flex-col justify-center items-center rounded-xl font-poppins p-5 bg-white">
      <div className='w-full relative'>
        <Typography className='font-poppins text-2xl lg:text-3xl text-center font-semibold'>
          Choose Voucher & Promo
        </Typography>
        <div
          onClick={async() => await router.push(`/play/tournament/${id as string}`)}
          className='absolute left-0 top-0 w-[35px] h-[35px] flex justify-center items-center cursor-pointer'
        >
          <Image
            src={ArrowBackwardIcon}
            alt={'ArrowBackwardIcon'}
            width={30}
            height={30}
          />
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-4 w-full justify-center items-center mt-4'>
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Have a promo code? Enter it here!"
          className="block w-full md:w-[300px] text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-3 pl-4 rounded-xl border border-[#BDBDBD]"
        />
        <div className='bg-[#BDBDBD] w-full md:w-[100px] py-2 rounded-full text-white px-8 flex justify-center items-center'>
          Apply
        </div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 xl:mt-8 font-poppins">
        {activePromoCodes.map((item, index) => (
          <div
            key={index}
            onClick={async () => { await handlePromoCodeSelection(item?.promo_code); }}
            className={`${item?.promo_code === promoCode ? 'from-[#BDFFE5] to-white border-[#27A590]' : 'from-[#FDD059] to-white border-[#B57A12]'} flex justify-start items-center rounded-xl bg-gradient-to-r relative border overflow-hidden cursor-pointer hover:shadow-lg duration-300`}
          >
            <div className='flex justify-center items-center'>
              <div className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] ml-[20px] flex justify-center items-center p-2'>
                <Image
                  alt="Seedy"
                  src={Seedy}
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className={`${item?.promo_code === promoCode ? 'bg-[#27A590]' : 'bg-[#D89918]'} w-[20px] h-full absolute left-0`}/>
            <div className='flex flex-col justify-center p-4 w-full h-full border-l border-dashed border-[#B57A12]'>
              <div className='font-semibold text-base md:text-xl'>
                {item?.promo_code}
              </div>
              {
                item?.min_transaction > 0 &&
                  <div className='text-sm'>
                    {t('promo.minimumPurchase')} {`${userInfo?.preferredCurrency ?? 'IDR'}`}{`${standartCurrency(item?.min_transaction ?? 0).replace('Rp', '')}`}
                  </div>
              }
              {
                item?.end_date !== '0001-01-01T00:00:00Z' &&
                  <div className='text-[#7C7C7C] text-sm'>
                    {getRemainingTime(item?.end_date)}
                  </div>
              }
            </div>
            <div className={`${item?.promo_code === promoCode ? 'bg-[#27A590]' : 'bg-[#FDBA22]'} absolute right-[-10px] bottom-[10px] text-white text-sm md:text-base lg:text-sm px-4 rounded-full`}>
              {item?.quantity}x
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mx-auto my-4">
        <TournamentPagination
          currentPage={promoParams.page}
          totalPages={metadata?.totalPage ?? 0}
          onPageChange={page => {
            setPromoParams({ ...promoParams, page });
          }}
        />
      </div>

      <button
        disabled={(promoCode === '') || (promoCode === undefined)}
        onClick={async() => await router.push(`/play/tournament/${id as string}`)}
        className={`${((promoCode === '') || (promoCode === undefined)) ? 'bg-[#BDBDBD]' : 'bg-seeds-button-green cursor-pointer'} flex w-full rounded-full justify-center items-center text-white text-lg py-4 mt-8`}
      >
        Use Promo
      </button>
    </div>
  );
};

export default PromoCodeTournament;
