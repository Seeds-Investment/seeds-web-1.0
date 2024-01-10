import close from '@/assets/more-option/close.svg';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { getTrendingCircle } from '@/repository/asset.repository';
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { DocumentSVG, LikeSVG, MemberSVG } from 'public/assets/images';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import CCard from '../CCard';
interface props {
  open: boolean;
  handleOpen: () => void;
}
const ReccomendationCirclePopup: React.FC<props> = ({ open, handleOpen }) => {
  const router = useRouter();
  const width = useWindowInnerWidth();
  const [circle, setCircle] = useState<any[]>([]);
  async function fetchTrending(): Promise<void> {
    try {
      const response = await getTrendingCircle({
        page: 1,
        limit: 3
      });
      if (response.status === 200) {
        setCircle(response.result);
      } else {
        console.error('Failed to fetch circles:', response);
      }
    } catch (error) {
      console.error('Error fetching circles:', error);
    }
  }

  useEffect(() => {
    void fetchTrending();
  }, []);

  const sliderSettings = {
    className: 'rounded-2xl',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          slidesToShow: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <Dialog
      dismiss={{
        outsidePress: false
      }}
      open={open}
      size={'xs'}
      handler={handleOpen}
      className="text-center p-5 m-0 max-w-full sm:max-w-xs self-end sm:self-center md:self-center lg:self-center rounded-none rounded-t-2xl sm:rounded-2xl"
    >
      <DialogHeader className="p-0 font-poppins my-4">
        <div className="flex flex-col w-full gap-1">
          <div className="flex justify-between w-full">
            <Typography className="text-lg font-poppins font-semibold text-black">
              One Step Closer to the Win!
            </Typography>
            <div className="flex items-center">
              <Image
                src={close}
                alt="close"
                className="cursor-pointer"
                onClick={() => {
                  handleOpen();
                }}
              />
            </div>
          </div>
          <div className="flex justify-start">
            <Typography className="text-sm text-start font-poppins font-normal text-[#7C7C7C">
              Our recommended circle that will boost your performance in your
              tournament!
            </Typography>
          </div>
        </div>
      </DialogHeader>
      <DialogBody className="p-0 mb-6 font-poppins">
        <div className="flex flex-col gap-4">
          {width !== undefined && width > 540 ? (
            <Slider {...sliderSettings}>
              {circle?.map((el: any, i: number) => {
                return (
                  <CCard
                    className="flex w-full px-4 py-3 border rounded-xl shadow-none bg-[#F9F9F9]"
                    key={el?.id}
                  >
                    <div className="flex justify-start gap-3 md:gap-4 w-full">
                      <div className="bg-white rounded-full p-1 flex items-center">
                        <img
                          src={el?.image}
                          alt="circle"
                          style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            minHeight: '100px',
                            minWidth: '100px'
                          }}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <Typography className="text-xs text-start md:text-sm font-poppins font-semibold text-[#3AC4A0]">
                          {el?.name}
                        </Typography>
                        <div className="flex flex-col w-fit">
                          <div className="flex flex-row text-center mt-2 border-b pb-1 border-[#DADADA]">
                            <div className="flex flex-row items-center mr-2 pr-2 border-r border-[#3AC4A0]">
                              <Image
                                src={LikeSVG}
                                alt="member"
                                className="w-5 h-5 mr-1"
                              />
                              <Typography className="text-xs font-normal text-black">
                                +{el?.totalRating}
                              </Typography>
                            </div>
                            <div className="flex flex-row items-center mr-2 pr-2 border-r border-[#3AC4A0]">
                              <Image
                                src={DocumentSVG}
                                alt="member"
                                className="w-5 h-5 mr-1"
                              />
                              <Typography className="text-xs font-normal text-black">
                                {el?.totalPost}
                              </Typography>
                            </div>
                            <div className="flex flex-row items-center">
                              <Image
                                src={MemberSVG}
                                alt="member"
                                className="w-5 h-5 mr-1"
                              />
                              <Typography className="text-xs font-normal text-black">
                                {el?.totalMember}
                              </Typography>
                            </div>
                          </div>
                          {el.type !== 'free' && (
                            <div className="flex justify-between">
                              <div className="flex items-center">
                                <Typography className="text-xs font-normal text-[#777]">
                                  Rp 40.000
                                </Typography>
                              </div>
                              <Typography className="text-base font-semibold text-[#3AC4A0]">
                                Rp 20.000
                              </Typography>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col justify-end h-full">
                          <Button
                            className="rounded-full capitalize font-semibold text-sm bg-[#3AC4A0] text-white font-poppins py-2"
                            onClick={() => {
                              router
                                .push(`/connect/post/${el?.id as string}`)
                                .catch(err => {
                                  console.log(err);
                                });
                            }}
                          >
                            Join Circle +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CCard>
                );
              })}
            </Slider>
          ) : (
            <>
              {circle?.map((el: any, i: number) => {
                return (
                  <CCard
                    className="flex w-full px-4 py-3 border rounded-xl shadow-none bg-[#F9F9F9]"
                    key={el?.id}
                  >
                    <div className="flex justify-start gap-3 md:gap-4 w-full">
                      <div className="bg-white rounded-full p-1 flex items-center">
                        <img
                          src={el?.image}
                          alt="circle"
                          style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            minHeight: '100px',
                            minWidth: '100px'
                          }}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <Typography className="text-xs text-start md:text-sm font-poppins font-semibold text-[#3AC4A0]">
                          {el?.name}
                        </Typography>
                        <div className="flex flex-col w-fit">
                          <div className="flex flex-row text-center mt-2 border-b pb-1 border-[#DADADA]">
                            <div className="flex flex-row items-center mr-2 pr-2 border-r border-[#3AC4A0]">
                              <Image
                                src={LikeSVG}
                                alt="member"
                                className="w-5 h-5 mr-1"
                              />
                              <Typography className="text-xs font-normal text-black">
                                +{el?.totalRating}
                              </Typography>
                            </div>
                            <div className="flex flex-row items-center mr-2 pr-2 border-r border-[#3AC4A0]">
                              <Image
                                src={DocumentSVG}
                                alt="member"
                                className="w-5 h-5 mr-1"
                              />
                              <Typography className="text-xs font-normal text-black">
                                {el?.totalPost}
                              </Typography>
                            </div>
                            <div className="flex flex-row items-center">
                              <Image
                                src={MemberSVG}
                                alt="member"
                                className="w-5 h-5 mr-1"
                              />
                              <Typography className="text-xs font-normal text-black">
                                {el?.totalMember}
                              </Typography>
                            </div>
                          </div>
                          {el.type !== 'free' && (
                            <div className="flex justify-between">
                              <div className="flex items-center">
                                <Typography className="text-xs font-normal text-[#777]">
                                  Rp 40.000
                                </Typography>
                              </div>
                              <Typography className="text-base font-semibold text-[#3AC4A0]">
                                Rp 20.000
                              </Typography>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col justify-end h-full">
                          <Button
                            className="rounded-full capitalize font-semibold text-sm bg-[#3AC4A0] text-white font-poppins py-2"
                            onClick={() => {
                              router
                                .push(`/connect/post/${el?.id as string}`)
                                .catch(err => {
                                  console.log(err);
                                });
                            }}
                          >
                            Join Circle +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CCard>
                );
              })}
            </>
          )}
        </div>
      </DialogBody>
    </Dialog>
  );
};
export default ReccomendationCirclePopup;
