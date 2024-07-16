import IconNoData from '@/assets/play/tournament/noData.svg';
import Seedy from '@/assets/promo/seedy.svg';
import SeedyBNW from '@/assets/promo/seedy_bnw.svg';
import TournamentPagination from '@/components/TournmentPagination';
import { standartCurrency } from '@/helpers/currency';
import { getDetailCircle } from '@/repository/circleDetail.repository';
import { getPlayById } from '@/repository/play.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { getPromocodeActive, promoValidate } from '@/repository/promo.repository';
import { getQuizById } from '@/repository/quiz.repository';
import { getDetailPostSocial } from '@/repository/social.respository';
import { selectPromoCodeValidationResult, setPromoCodeValidationResult } from '@/store/redux/features/promo-code';
import { type IDetailQuiz } from '@/utils/interfaces/quiz.interfaces';
import { type IDetailTournament, type UserInfo } from '@/utils/interfaces/tournament.interface';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowBackwardIcon } from 'public/assets/vector';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface IPromoCode {
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

interface IDetailPost {
  circle_id: string;
  content_text: string;
  created_at: string;
  id: string;
  is_pinned: boolean;
  media_urls: {
    id: string;
  }
  owner: {
    avatar: string;
    name: string;
    username: string;
    verified: boolean;
  }
  parent_id: string;
  pie_amount: number;
  pie_title: string;
  play_id: string;
  polling_date: string;
  polling_multiple: boolean;
  polling_new_option: boolean;
  premium_fee: number;
  privacy: string;
  quiz_id: string;
  slug: string;
  status_like: boolean;
  status_payment: boolean;
  status_saved: boolean;
  status_unlike: boolean;
  total_comment: number;
  total_downvote: number;
  total_polling: number;
  total_upvote: number;
  updated_at: string;
  user_id: string;
}

interface Metadata {
  currentPage: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface CircleData {
  admin_fee: number;
  avatar: string;
  categories: string[];
  cover: string;
  created_at: string;
  description: string;
  description_rules: string;
  id: string;
  is_liked: boolean;
  name: string;
  premium_fee: number;
  type: string;
  user_id: string;
}

interface PromoProps {
  spotType: string;
}

const PromoCode: React.FC<PromoProps> = ({
  spotType
}) => {
  const router = useRouter();
  const id = router.query.id;
  const circleId = router.query.circleId;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [detailPost, setDetailPost] = useState<IDetailPost>();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [promoCode, setPromoCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [addPromo, setAddPromo] = useState<string>('');
  const [activePromoCodes, setActivePromoCodes] = useState<IPromoCode[]>([]);
  const [dataCircle, setDataCircle] = useState<CircleData>();
  const [detailQuiz, setDetailQuiz] = useState<IDetailQuiz>();
  const [detailTournament, setDetailTournament] = useState<IDetailTournament>();

  const handleAddPromo = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAddPromo(event.target.value);
  };

  const [promoParams, setPromoParams] = useState({
    page: 1,
    limit: 10
  });
  const [metadata, setMetadata] = useState<Metadata>();
  
  const promoCodeValidationResult = useSelector(
    selectPromoCodeValidationResult
  );

  useEffect(() => {
    fetchData()
      .then()
      .catch(() => {});

    setPromoCode(promoCodeValidationResult?.response?.promo_code)
  }, []);

  useEffect(() => {
    if (spotType === 'Paid Tournament') {
      if (id !== null) {
        void getDetailTournament();
      }
    } else if (spotType === 'Paid Quiz') {
      void getDetailQuiz(userInfo?.preferredCurrency ?? 'IDR')
    } else if (spotType === 'Premium Circle') {
      void fetchDetailCircle(circleId as string)
    } else if (spotType === 'Premium Content') {
      void fetchDetailPost()
    }
    void fetchPromoData();
  }, [id, circleId, userInfo, promoParams]);

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
      setLoading(true)
      const activePromoCodesResponse = await getPromocodeActive(
        promoParams.page, 
        promoParams.limit, 
        spotType, 
        (
          (spotType === 'Paid Quiz')
          || (spotType === 'Paid Tournament') 
            ? id as string : circleId as string
        )
      );
      setActivePromoCodes(activePromoCodesResponse?.data);
      setMetadata(activePromoCodesResponse?.metadata)
    } catch (error) {
      toast.error('Error fetching promo codes:');
    } finally {
      setLoading(false)
    }
  };

  const getDetailTournament = useCallback(async () => {
    try {
      const resp: IDetailTournament = await getPlayById(id as string);
      setDetailTournament(resp);
    } catch (error) {
      toast(`Error fetch tournament ${error as string}`);
    }
  }, [id]);

  const getDetailQuiz = useCallback(async (currency: string) => {
    try {
      const resp: IDetailQuiz = await getQuizById({
        id: id as string,
        currency
      });
      setDetailQuiz(resp);
    } catch (error) {
      toast(`Error fetch quiz: ${error as string}`);
    }
  }, [id]);

  const fetchDetailCircle = async (circleId: string): Promise<void> => {
    try {
      const { data } = await getDetailCircle({ circleId });
      setDataCircle(data);
    } catch (error) {
      toast(`Error fetching Circle Post: ${error as string}`);
    }
  };

  const fetchDetailPost = async (): Promise<void> => {
    try {
      if (typeof id === 'string') {
        const response = await getDetailPostSocial(id);
        setDetailPost(response.data);
      }
    } catch (error) {
      toast(`${error as string}`);
    }
  };

  const handlePromoCodeSelection = async (promoCode: string): Promise<void> => {
    setPromoCode(promoCode);
    try {
      let response;
      if (spotType === 'Paid Tournament') {
        response = await promoValidate({
          promo_code: promoCode,
          spot_type: spotType,
          item_price: detailTournament?.admission_fee,
          item_id: detailTournament?.id,
          currency: detailTournament?.currency
        });
      } else if (spotType === 'Paid Quiz') {
        response = await promoValidate({
          promo_code: promoCode,
          spot_type: spotType,
          item_price: detailQuiz?.admission_fee,
          item_id: detailQuiz?.id
        });
      } else if (spotType === 'Premium Circle') {
        response = await promoValidate({
          promo_code: promoCode,
          spot_type: spotType,
          item_price: dataCircle?.premium_fee,
          item_id: dataCircle?.id
        });
      } else if (spotType === 'Premium Content') {
        response = await promoValidate({
          promo_code: promoCode,
          spot_type: spotType,
          item_price: detailPost?.premium_fee,
          item_id: detailPost?.id
        });
      }

      if (promoCodeValidationResult.response?.promo_code === promoCode) {
        setPromoCode('');
        toast.success(t(`promo.unApplied`))
        dispatch(setPromoCodeValidationResult(0));
      } else if (response.total_discount !== undefined) {
        setPromoCode(promoCode);
        if (spotType === 'Premium Circle') {
          dispatch(setPromoCodeValidationResult({ circleId, response }));
        } else {
          dispatch(setPromoCodeValidationResult({ id, response }));
        }
        toast.success(t('promo.applied'))
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

  const routeOptions = (spotType: string, id: string): string => {
    if (spotType === 'Paid Tournament') {
      return `/play/tournament/${id}`;
    } else if (spotType === 'Paid Quiz') {
      return `/play/quiz/${id}`
    } else if (spotType === 'Premium Circle') {
      return `/connect/payment/${circleId as string}`
    } else if (spotType === 'Premium Content') {
      return `/social/payment/${id}`
    }
    return '';
  };

  return (
    <div className="flex flex-col justify-center items-center rounded-xl font-poppins p-5 bg-white">
      <div className='w-full relative'>
        <Typography className='font-poppins text-2xl lg:text-3xl text-center font-semibold'>
          Choose Voucher & Promo
        </Typography>
        <div
          onClick={async() => await router.push(routeOptions(spotType, id as string))}
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
          id="addPromo"
          type="text"
          name="addPromo"
          value={addPromo}
          onChange={e => {
            handleAddPromo(e);
          }}
          placeholder="Have a promo code? Enter it here!"
          className="block w-full md:w-[300px] text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-3 pl-4 rounded-xl border border-[#BDBDBD]"
        />
        <button
          disabled={addPromo === ''}
          onClick={() => { void handlePromoCodeSelection(addPromo); }}
          className={`${addPromo === '' ? 'bg-[#BDBDBD]' : 'bg-seeds-button-green cursor-pointer'} w-full md:w-[100px] py-2 rounded-full text-white px-8 flex justify-center items-center`}
        >
          {t('promo.apply')}
        </button>
      </div>

      {!loading ? (
        activePromoCodes?.length !== 0 ? (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 xl:mt-8 font-poppins">
            {activePromoCodes?.map((item, index) => (
              <div
                key={index}
                onClick={async () => { await handlePromoCodeSelection(item?.promo_code); }}
                className={`
                  ${item?.promo_code === promoCode
                    ? 'bg-gradient-to-r from-[#BDFFE5] to-white border-[#27A590]'
                    : spotType === 'Paid Tournament'
                      ? ((detailTournament?.admission_fee ?? 0) < (item?.min_transaction ?? 0))
                        ? 'bg-white border-[#BDBDBD]'
                        : 'bg-gradient-to-r from-[#FDD059] to-white border-[#B57A12]'
                      : spotType === 'Paid Quiz'
                      ? ((detailQuiz?.admission_fee ?? 0) < (item?.min_transaction ?? 0))
                        ? 'bg-white border-[#BDBDBD]'
                        : 'bg-gradient-to-r from-[#FDD059] to-white border-[#B57A12]'
                      : spotType === 'Premium Circle'
                      ? ((dataCircle?.premium_fee ?? 0) < (item?.min_transaction ?? 0))
                        ? 'bg-white border-[#BDBDBD]'
                        : 'bg-gradient-to-r from-[#FDD059] to-white border-[#B57A12]'
                      : spotType === 'Premium Content'
                      ? ((detailPost?.premium_fee ?? 0) < (item?.min_transaction ?? 0))
                        ? 'bg-white border-[#BDBDBD]'
                        : 'bg-gradient-to-r from-[#FDD059] to-white border-[#B57A12]'
                      : ''}
                  flex justify-start items-center rounded-xl relative border overflow-hidden cursor-pointer hover:shadow-lg duration-300`
                }
              >
                <div className='flex justify-center items-center'>
                  <div className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] ml-[20px] flex justify-center items-center p-2'>
                    <Image
                      alt="Seedy"
                      src={
                        spotType === 'Paid Tournament'
                        ? ((detailTournament?.admission_fee ?? 0) < (item?.min_transaction ?? 0))
                          ? SeedyBNW
                          : Seedy
                        : spotType === 'Paid Quiz'
                        ? ((detailQuiz?.admission_fee ?? 0) < (item?.min_transaction ?? 0))
                          ? SeedyBNW
                          : Seedy
                        : spotType === 'Premium Circle'
                        ? ((dataCircle?.premium_fee ?? 0) < (item?.min_transaction ?? 0))
                          ? SeedyBNW
                          : Seedy
                        : spotType === 'Premium Content'
                        ? ((detailPost?.premium_fee ?? 0) < (item?.min_transaction ?? 0))
                          ? SeedyBNW
                          : Seedy
                        : ''
                      }
                      className="w-full h-full"
                    />
                  </div>
                </div>
                <div
                  className={`
                    ${item?.promo_code === promoCode
                      ? 'bg-[#27A590]'
                      : spotType === 'Paid Tournament'
                        ? ((detailTournament?.admission_fee ?? 0) < (item?.min_transaction ?? 0))
                          ? 'bg-[#BDBDBD]'
                          : 'bg-[#D89918]'
                        : spotType === 'Paid Quiz'
                        ? ((detailQuiz?.admission_fee ?? 0) < (item?.min_transaction ?? 0))
                          ? 'bg-[#BDBDBD]'
                          : 'bg-[#D89918]'
                        : spotType === 'Premium Circle'
                        ? ((dataCircle?.premium_fee ?? 0) < (item?.min_transaction ?? 0))
                          ? 'bg-[#BDBDBD]'
                          : 'bg-[#D89918]'
                        : spotType === 'Premium Content'
                        ? ((detailPost?.premium_fee ?? 0) < (item?.min_transaction ?? 0))
                          ? 'bg-[#BDBDBD]'
                          : 'bg-[#D89918]'
                        : ''
                      } w-[20px] h-full absolute left-0
                  `}
                />
                <div
                  className={`
                    ${item?.promo_code === promoCode
                      ? 'border-[#27A590]'
                      : spotType === 'Paid Tournament'
                        ? ((detailTournament?.admission_fee ?? 0) < (item?.min_transaction ?? 0))
                          ? 'border-[#BDBDBD]'
                          : 'border-[#D89918]'
                        : spotType === 'Paid Quiz'
                        ? ((detailQuiz?.admission_fee ?? 0) < (item?.min_transaction ?? 0))
                          ? 'border-[#BDBDBD]'
                          : 'border-[#D89918]'
                        : spotType === 'Premium Circle'
                        ? ((dataCircle?.premium_fee ?? 0) < (item?.min_transaction ?? 0))
                          ? 'border-[#BDBDBD]'
                          : 'border-[#D89918]'
                        : spotType === 'Premium Content'
                        ? ((detailPost?.premium_fee ?? 0) < (item?.min_transaction ?? 0))
                          ? 'border-[#BDBDBD]'
                          : 'border-[#D89918]'
                        : ''
                      }
                    flex flex-col justify-center p-4 w-full h-full border-l border-dashed`
                  }
                >
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
        ) : (
          <div className="bg-white flex flex-col justify-center items-center text-center lg:px-0">
            <Image alt="" src={IconNoData} className="w-[250px]" />
            <p className="font-semibold text-black">
              {t('promo.emptyVoucher1')}
            </p>
            <p className="text-[#7C7C7C]">{t('promo.emptyVoucher2')}</p>
          </div>
        )
      ) : (
        <div className="w-full flex justify-center h-fit mt-8">
          <div className="h-[60px]">
            <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
          </div>
        </div>
      )}

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
        onClick={async() => await router.push(routeOptions(spotType, id as string))}
        className={`${((promoCode === '') || (promoCode === undefined)) ? 'bg-[#BDBDBD]' : 'bg-seeds-button-green cursor-pointer'} flex w-full rounded-full justify-center items-center text-white text-lg py-4 mt-8`}
      >
        Use Promo
      </button>
    </div>
  );
};

export default PromoCode;
