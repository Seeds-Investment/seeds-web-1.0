import admission from '@/assets/admission_tournament.svg';
import duration from '@/assets/duration_tournament.svg';
import GrayArrow from '@/assets/product/GrayArrow.svg';
import WhiteArrow from '@/assets/product/WhiteArrow.svg';
import share from '@/assets/share_tournament.svg';
import user from '@/assets/usericon_toptournament.svg';
import { getTrendingPlayList } from '@/repository/play.repository';
import { type TopTournament } from '@/utils/interfaces/tournament.interface';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography
} from '@material-tailwind/react';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
export const SlideTournament: React.FC = () => {
  const [tournament, setTournament] = useState<any>([]);
  const [buttonChange, setButtonChange] = useState(true);
  const router = useRouter();

  const HandlePrev: React.FC = () => {
    const swiper = useSwiper();
    return (
      <button
        onClick={() => {
          swiper.slidePrev();
          setButtonChange(false);
        }}
        className={`${
          buttonChange
            ? 'bg-transparent '
            : 'bg-gradient-to-tr from-[#9A76FE] to-[#4FE6AF]'
        } rounded-full h-9 w-9 border cursor-pointer flex justify-center items-center`}
      >
        <Image
          src={buttonChange ? GrayArrow : WhiteArrow}
          alt="prevBtn"
          className={buttonChange ? '' : 'rotate-180'}
        />
      </button>
    );
  };

  const HandleNext: React.FC = () => {
    const swiper = useSwiper();
    return (
      <button
        onClick={() => {
          swiper.slideNext();
          setButtonChange(true);
        }}
        className={`${
          buttonChange
            ? 'bg-gradient-to-tr from-[#9A76FE] to-[#4FE6AF]'
            : 'bg-transparent'
        } rounded-full h-9 w-9 border cursor-pointer flex justify-center items-center`}
      >
        <Image
          src={buttonChange ? WhiteArrow : GrayArrow}
          alt="nextBtn"
          className={buttonChange ? '' : 'rotate-180'}
        />
      </button>
    );
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const tournamentResponse = await getTrendingPlayList();
        console.log(tournamentResponse);
        setTournament(tournamentResponse);
      } catch (error: any) {
        console.log('error fetching data: ', error.message);
      }
    };
    fetchData()
      .then()
      .catch(() => {});
  }, []);

  const classNameSwiper =
    '!lg:w-full !lg:flex-col !lg:flex !flex !flex-col w-[1500px] lg:gap-3 gap-3 justify-center';
  const breakpointsSwiper = {
    320: { slidesPerView: 1, centeredSlides: true },
    480: { slidesPerView: 1, centeredSlides: true },
    640: { slidesPerView: 2, centeredSlides: true },
    1024: { slidesPerView: 3, centeredSlides: true }
  };
  const coverFlowEffectSwiper = {
    rotate: 0,
    modifier: 3,
    depth: 50,
    stretch: 20,
    slideShadows: false
  };

  return (
    <div className="lg:flex-col lg:flex lg:items-center lg:justify-center justify-center lg:w-full flex flex-col">
      <div className="flex flex-col lg:flex-col gap-5 mt-[25px] lg:w-full w-full">
        <Swiper
          centeredSlides={true}
          grabCursor={true}
          pagination={true}
          slidesPerView={3}
          className={classNameSwiper}
          breakpoints={breakpointsSwiper}
          effect={'coverflow'}
          modules={[EffectCoverflow, Autoplay]}
          spaceBetween={250}
          coverflowEffect={coverFlowEffectSwiper}
          loop={true}
          autoplay={{ delay: 1000 }}
          speed={1000}
        >
          {tournament?.length !== 0
            ? tournament?.data?.map((item: TopTournament, idx: any) => {
                const formatDate = (isoDate: string): string => {
                  return moment(isoDate).format('D MMM YYYY, HH:mm');
                };
                const formatPublishMonth = (isoDate: string): string => {
                  return moment(isoDate).format('MMM');
                };
                const formatPublishDay = (isoDate: string): string => {
                  return moment(isoDate).format('DD');
                };
                const durationTimeTournament = (playTime: string): string => {
                  const Duration = moment.duration(
                    moment().diff(moment(playTime))
                  );
                  return `${Math.floor(Duration.asDays())} day`;
                };
                return (
                  <SwiperSlide key={idx}>
                    <div className="flex items-start gap-5 justify-center lg:w-full">
                      <div className="flex flex-col text-center items-center gap-2">
                        <Typography>{`${formatPublishMonth(
                          item.publish_time
                        )}`}</Typography>
                        <Typography className="text-[45px] font-bold font-sans">
                          {`${formatPublishDay(item.publish_time)}`}
                        </Typography>
                      </div>
                      <Card
                        className={`flex justify-center items-center lg:rounded-t-[13.37px] lg:rounded-b-none rounded-t-[13.37px] rounded-b-none lg:w-[420px] lg:p-3 w-[340px] gap-[13.37px] lg:h-[309px] h-[310px]`}
                      >
                        <CardHeader
                          floated={false}
                          shadow={false}
                          color="transparent"
                          className="lg:w-full lg:p-0 lg:m-0 flex w-full h-full justify-center items-center p-0 m-0"
                        >
                          <Image
                            src={item.banner}
                            alt={item.name}
                            width={300}
                            height={300}
                          />
                        </CardHeader>
                        <CardBody className="flex flex-col m-0 p-0 gap-3 justify-center items-center">
                          <div className="lg:flex lg:justify-end lg:w-full flex w-[300px] gap-16 p-0">
                            <div className="flex w-full flex-col overflow-hidden">
                              <Typography className="font-bold m-0 text-[#262626]">
                                {item.name}
                              </Typography>
                              <Typography className="text-[#BDBDBD] w-full text-[11.59px]">
                                {`${formatDate(item.created_at.split('T')[0])}`}{' '}
                                - {`${formatDate(item.end_time.split('T')[0])}`}
                              </Typography>
                            </div>
                            <button className="capitalize w-[75px] h-[25px] rounded-[4.64px] bg-[#F7F7F7] text-[#553BB8]">
                              {item.type.toLocaleLowerCase()}
                            </button>
                          </div>
                          <div className="lg:w-full w-[400px] flex justify-center">
                            <div className="flex flex-col lg:w-[130px] w-[115px] border rounded-l-[15px] p-2 bg-[#F5F5F5]  items-center">
                              <div className="flex justify-center gap-1">
                                <Image src={duration} alt="duration" />
                                <Typography>duration</Typography>
                              </div>
                              <Typography className="font-bold text-[#262626]">
                                {`${
                                  durationTimeTournament(item.play_time).split(
                                    'T'
                                  )[0]
                                }`}
                              </Typography>
                            </div>
                            <div className="flex lg:w-[100px] flex-col items-center border p-2 bg-[#F5F5F5]">
                              <div className="flex justify-center gap-1">
                                <Image src={user} alt="usericon" />
                                <Typography>joined</Typography>
                              </div>
                              <Typography className="font-bold text-[#262626]">
                                {item.participants === null
                                  ? '0'
                                  : `${item.participants?.length}`}
                              </Typography>
                            </div>
                            <div className="flex lg:w-[130px] w-[115px] flex-col justify-start items-start border rounded-r-[15px] p-2 bg-[#F5F5F5]">
                              <div className="flex gap-1">
                                <Image src={admission} alt="admission_fee" />
                                <Typography>fee</Typography>
                              </div>
                              <Typography className="font-bold text-[#262626]">
                                {item.admission_fee.toLocaleString('id-ID', {
                                  style: 'currency',
                                  currency: item.currency
                                })}
                              </Typography>
                            </div>
                          </div>
                          <div className="flex justify-between gap-10 lg:w-full p-0">
                            <div className="flex lg:gap-3 gap-2 items-center">
                              <button className="border flex items-center justify-center rounded-[10px] w-[90px] h-[30px] p-2 bg-[#DCFCE4]">
                                <Typography className="text-[#27A590]">
                                  {item.category}
                                </Typography>
                              </button>
                              <div
                                className="flex gap-2 items-center cursor-pointer"
                                onClick={async () => {
                                  await navigator.clipboard.writeText(
                                    item.id === null
                                      ? `Arena's over`
                                      : `https://seeds.finance/play/tournament`
                                  );
                                }}
                              >
                                <button
                                  onClick={() => {
                                    toast.success(
                                      `${item.name} succesful copied`,
                                      {
                                        position: 'top-center',
                                        draggable: true,
                                        autoClose: 2000
                                      }
                                    );
                                  }}
                                  className="border flex justify-center items-center p-2 rounded-full h-[30px] bg-[#DCFCE4]"
                                >
                                  <Image src={share} alt="share_button" />
                                </button>
                                <Typography className="text-[#262626] text-[18px] capitalize">
                                  share
                                </Typography>
                              </div>
                            </div>
                            <Button
                              color="green"
                              className="w-[110px] h-[35px] flex items-center justify-center border rounded-[30px] bg-[#3AC4A0]"
                              onClick={async () => {
                                await router.push(
                                  `${
                                    process.env.NEXT_PUBLIC_DOMAIN ??
                                    'https://user-dev-gcp.seeds.finance'
                                  }/play/tournament/${item.id}`
                                );
                              }}
                            >
                              open
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </SwiperSlide>
                );
              })
            : null}
          <div className="flex gap-3 justify-center items-center w-full">
            <HandlePrev />
            <HandleNext />
          </div>
        </Swiper>
      </div>
    </div>
  );
};
