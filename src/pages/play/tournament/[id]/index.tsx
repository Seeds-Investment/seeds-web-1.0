/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import IconCopy from '@/assets/play/tournament/copyLink.svg';
import IconWarning from '@/assets/play/tournament/miniWarning.svg';
import IconPrizes from '@/assets/play/tournament/seedsPrizes.svg';
import IconCircle from '@/assets/play/tournament/seedsPrizesCircle.svg';
import CountdownTimer from '@/components/play/CountdownTimer';
import ModalShareTournament from '@/components/popup/ModalShareTournament';
import PromoCodeSelection from '@/containers/promo-code';
import { isGuest } from '@/helpers/guest';
import withRedirect from '@/helpers/withRedirect';
import { getPlayById } from '@/repository/play.repository';
import { getUserInfo } from '@/repository/profile.repository';
import LanguageContext from '@/store/language/language-context';
import { type IDetailTournament } from '@/utils/interfaces/tournament.interface';
import { ShareIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ThirdMedal from '../../../../assets/play/quiz/bronze-medal.png';
import FirstMedal from '../../../../assets/play/quiz/gold-medal.png';
import SecondMedal from '../../../../assets/play/quiz/silver-medal.png';

const TournamentDetail = (): React.ReactElement => {
  const router = useRouter();
  const id = router.query.id;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [detailTournament, setDetailTournament] = useState<IDetailTournament>();
  const [userInfo, setUserInfo] = useState<any>();
  const [isShareModal, setIsShareModal] = useState<boolean>(false);
  const languageCtx = useContext(LanguageContext);
  const [_, setDiscount] = useState<any>(null);
  console.log(_);
  

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const dataInfo = await getUserInfo();
        setUserInfo(dataInfo);
      } catch (error: any) {
        toast.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);

  const getDetail = useCallback(async () => {
    try {
      setLoading(true);
      const resp: IDetailTournament = await getPlayById(id as string);
      setDetailTournament(resp);
    } catch (error) {
      toast(`ERROR fetch tournament ${error as string}`);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id !== null && userInfo !== undefined) {
      getDetail();
    }
  }, [id, userInfo]);

  if (detailTournament === undefined && loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="animate-spinner w-10 h-10" />
      </div>
    );
  }

  const handleCopyClick = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const textToCopy = `${detailTournament?.play_id}`;
    await navigator.clipboard.writeText(textToCopy).then(() => {
      toast('Play ID copied!');
    });
  };

  const handleDiscountChange = (discount: any): void => {
     setDiscount(discount);
   };

  return (
    <>
      {isShareModal && (
        <ModalShareTournament
          onClose={() => {
            setIsShareModal(prev => !prev);
          }}
          url={detailTournament?.id ?? ''}
          playId={detailTournament?.play_id ?? ''}
        />
      )}
      <div className="bg-gradient-to-bl from-[#50D4B2] to-[#E2E2E2] flex flex-col justify-center items-center relative overflow-hidden h-[420px] rounded-xl font-poppins">
        <div className="absolute bottom-[-25px] text-center">
          <Typography className="text-[26px] font-semibold font-poppins">
            {detailTournament?.name}
          </Typography>
          <div className="text-[14px] flex justify-center items-center gap-2 py-2">
            <Typography className="font-poppins">
              Play ID : {detailTournament?.play_id}
            </Typography>
            <button onClick={handleCopyClick}>
              <Image alt="" src={IconCopy} className="w-[20px]" />
            </button>
          </div>
          <Typography className="text-xl font-semibold font-poppins">
            {t('tournament.detailBannerTotalRewards')}
          </Typography>
          <Typography className="text-[34px] text-white font-semibold font-poppins">
            {detailTournament?.fixed_prize === 0
              ? t('tournament.free')
              : detailTournament?.fixed_prize?.toLocaleString('id-ID', {
                  currency:
                    userInfo?.preferredCurrency?.length > 0
                      ? userInfo?.preferredCurrency
                      : 'IDR',
                  style: 'currency'
                })}
          </Typography>
          <Image alt="" src={IconPrizes} className="w-[250px]" />
        </div>
        <Image
          alt=""
          src={IconCircle}
          className="hidden xl:flex w-[250px] absolute bottom-[-20px] left-[-20px]"
        />
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 mt-4 font-poppins">
        <div className="col-span-2 w-full bg-white rounded-xl px-8 py-4">
          <div className="mt-4 flex justify-between">
            <div className="flex flex-col">
              <div className="text-lg font-semibold">
                {t('tournament.detailRemaining')}
              </div>
              <CountdownTimer
                deadline={
                  detailTournament?.end_time
                    ? detailTournament.end_time.toString()
                    : ''
                }
              />
            </div>
            <button className="bg-[#DCFCE4] rounded-full w-fit h-fit p-2">
              <ShareIcon
                onClick={() => {
                  setIsShareModal(true);
                }}
                width={24}
                height={24}
                className="text-[#3AC4A0]"
              />
            </button>
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">
              {t('tournament.detailPeriod')}
            </div>
            <div className="text-lg text-[#7C7C7C]">
              {moment(detailTournament?.play_time).format('D MMM YYYY, h a')}{' '}
              Jakarta -{' '}
              {moment(detailTournament?.end_time).format('D MMM YYYY, h a')}{' '}
              Jakarta
            </div>
          </div>
          <div className="mt-4 flex flex-row gap-8">
            {detailTournament?.sponsorship?.image_url ? (
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="text-lg font-semibold">{'Sponsor(s)'}</div>
                <Image
                  src={detailTournament?.sponsorship?.image_url}
                  alt=""
                  width={200}
                  height={200}
                  className="object-contain max-h-16 max-w-16"
                />
              </div>
            ) : null}
            {detailTournament?.community?.image_url ? (
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="text-lg font-semibold">{'Community'}</div>
                <Image
                  src={detailTournament?.community?.image_url}
                  alt=""
                  width={200}
                  height={200}
                  className="object-contain max-h-16 max-w-16"
                />
              </div>
            ) : null}
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">
              {t('tournament.detailPrize')}
            </div>
            <table className="mt-2">
              {detailTournament?.prize?.map((item, index) => (
                <tr key={index}>
                  <td className="inline-flex gap-2 border p-3 w-full">
                    <Image
                      src={
                        index === 0
                          ? FirstMedal
                          : index === 1
                          ? SecondMedal
                          : ThirdMedal
                      }
                      alt={`${index}-medal`}
                      width={200}
                      height={200}
                      className="object-contain max-h-5 max-w-5"
                    />
                    {t(
                      `tournament.${
                        index === 0 ? 'first' : index === 1 ? 'second' : 'third'
                      }`
                    )}
                  </td>
                  <td className="border p-3 w-full">
                    {item?.toLocaleString('id-ID', {
                      currency:
                        userInfo?.preferredCurrency?.length > 0
                          ? userInfo?.preferredCurrency
                          : 'IDR',
                      style: 'currency'
                    })}
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold">
              {t('tournament.detailTerms')}
            </p>
            {languageCtx.language === 'ID' ? (
              <p className="text-[#7C7C7C]">{detailTournament?.tnc?.id}</p>
            ) : (
              <p className="text-[#7C7C7C]">{detailTournament?.tnc?.en}</p>
            )}
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold">
              {t('tournament.detailResponsibility')}
            </p>
            <p className="text-[#7C7C7C]">
              • {t('tournament.seedsResponsibility1')}
            </p>
            <p className="text-[#7C7C7C]">
              • {t('tournament.seedsResponsibility2')}
            </p>
          </div>
        </div>
        <div className="w-full h-[300px] bg-white rounded-xl p-2">
          <PromoCodeSelection
            detailTournament={detailTournament}
            onDiscountChange={handleDiscountChange}
          />
          <div className="text-sm text-[#7C7C7C] mt-2.5">
            {t('tournament.entranceFee')}
          </div>
          <div className="font-semibold text-xl">
            {detailTournament?.admission_fee === 0
              ? t('tournament.free')
              : detailTournament?.admission_fee?.toLocaleString('id-ID', {
                  currency:
                    userInfo?.preferredCurrency?.length > 0
                      ? userInfo?.preferredCurrency
                      : 'IDR',
                  style: 'currency'
                })}
          </div>
          <button
            onClick={async () => {
              if (localStorage.getItem('accessToken') !== null) {
                if (detailTournament?.is_joined === true) {
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  router.push(`/play/tournament/${id}/home`);
                } else {
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  router.push(`/play/tournament/${id}/payment`);
                }
              } else if (
                localStorage.getItem('accessToken') === null &&
                isGuest()
              ) {
                router.push('/auth');
              } else {
                withRedirect(router, { quizId: id as string }, '/auth');
              }
            }}
            className="bg-seeds-button-green text-white px-10 py-2 rounded-full font-semibold mt-4 w-full"
          >
            {detailTournament?.participant_status === 'JOINED'
              ? t('tournament.start')
              : t('tournament.join')}
          </button>
          <div className="flex gap-2 mt-4">
            <Image alt="" src={IconWarning} className="w-[14px]" />
            <Typography className="text-[#3C49D6] text-[14px] font-poppins">
              {t('tournament.detailCurrency')}{' '}
              {userInfo?.preferredCurrency?.length > 0
                ? userInfo?.preferredCurrency
                : 'IDR'}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default TournamentDetail;
