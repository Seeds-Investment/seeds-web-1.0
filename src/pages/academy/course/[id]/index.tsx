import CustomProgressBar from '@/components/academy/CustomProgressBar';
import PaymentPopup from '@/components/academy/PaymentPopup';
import ShortDescription from '@/components/academy/ShortDescription';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { Switch } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const DetailCourse: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(true);
  const [showTitle, setShowTitle] = useState(true);

  const togglePopup = (): void => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    const handlePlay = (): void => {
      setIsPlaying(true);
      setTimeout(() => {
        setShowPlayIcon(false);
      }, 1000);
      setTimeout(() => {
        setShowTitle(false);
      }, 1000);
    };
    const handlePause = (): void => {
      setIsPlaying(false);
      setShowPlayIcon(true);
      setShowTitle(true);
    };

    if (videoElement !== null) {
      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
    }

    return () => {
      if (videoElement !== null) {
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
      }
    };
  }, []);

  const handlePlayPause = (): void => {
    const videoElement = videoRef.current;
    if (videoElement !== null) {
      if (document.fullscreenElement === null) {
        if (videoElement.paused) {
          void videoElement.play();
        } else {
          videoElement.pause();
        }
      }
    }
  };

  return (
    <>
      <PageGradient defaultGradient className="w-full">
        <div className="bg-white p-3 rounded-xl shadow-md flex flex-col gap-5">
          <div className="video-container relative w-full aspect-video">
            <video
              ref={videoRef}
              id="video"
              width="100%"
              height="100%"
              src="https://dev-assets.seeds.finance/quiz/cb1a51db-f455-4ae4-a1e4-5683820cacde.mp4"
              className="w-full h-full cursor-pointer"
              onClick={handlePlayPause}
              controlsList="nodownload"
              onContextMenu={e => {
                e.preventDefault();
              }}
            >
              Your browser does not support the video tag.
            </video>
            {showPlayIcon && !isPlaying && (
              <div
                className="play-icon absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white opacity-80 hover:opacity-100 cursor-pointer z-10"
                onClick={handlePlayPause}
              >
                <Image
                  src={'/assets/academy/play-icon.svg'}
                  width={100}
                  height={100}
                  alt="play-icon"
                  className="w-10 sm:w-16 md:w-16 lg:w-24 xl:w-32"
                />
              </div>
            )}
            {showPlayIcon && isPlaying && (
              <div
                className="pause-icon absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white opacity-80 hover:opacity-100 cursor-pointer z-10"
                onClick={handlePlayPause}
              >
                <Image
                  src="/assets/academy/pause-icon.svg"
                  width={100}
                  height={100}
                  alt="pause-icon"
                  className="w-10 sm:w-16 md:w-16 lg:w-24 xl:w-32"
                />
              </div>
            )}
            {showTitle && (
              <div
                onClick={handlePlayPause}
                className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 text-white p-4 text-2xl font-bold z-0"
              >
                Learn Investing From 0
              </div>
            )}
            <CustomProgressBar videoElement={videoRef.current} />
          </div>
          <div className="font-bold text-2xl">Learn Investing From 0</div>
          <div className="flex flex-row gap-5">
            <div className="flex flex-row items-center gap-2">
              <Image
                src={'/assets/academy/participants-icon.svg'}
                alt="icon-participants"
                width={100}
                height={100}
                className="w-7"
              />
              100 Participants
            </div>
            <div className="flex flex-row items-center gap-2">
              <Image
                src={'/assets/academy/share-icon.svg'}
                alt="icon-participants"
                width={100}
                height={100}
                className="w-7"
              />
              Share
            </div>
          </div>
          <div className="text-lg">
            <ShortDescription
              text={
                'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus expedita quos eaque. Cumque, magni impedit laudantium dicta quos fugiat sequi debitis tempore natus ullam unde iure vel ipsum sed dolorum.Optio doloremque temporibus ratione nemo reprehenderit, totam eius ad deserunt tempore earum enim eaque qui nesciunt, minus quos praesentium perspiciatis. Perspiciatis aliquam maiores delectus in dolorum eveniet similique ratione beatae? Illum hic vitae soluta animi, porro sed vel fugiat similique delectus itaque minima harum, reprehenderit libero inventore quidem sequi iure provident cum perspiciatis. Suscipit aperiam illo nisi cupiditate asperiores veniam Officiis illum facilis cupiditate deserunt cum ipsam ipsa nam temporibus odio tempore perferendis ducimus inventore labore quas, explicabo tempora voluptatibus necessitatibus, neque incidunt iure id blanditiis, eligendi repudiandae molestias. Quasi? Laudantium consectetur inventore cum, consequuntur temporibus dolore unde accusantium ducimus iste non ea vel quo rerum enim exercitationem minus aut illo corporis rem ipsum fugit, ipsa aperiam. Consequatur, quos eos?'
              }
            />
          </div>
          <button className="p-3 bg-[#7555DA] rounded-3xl w-full text-white font-bold">
            Try Pre-Test!
          </button>
        </div>
        <div className="bg-white p-3 rounded-xl mt-4 shadow-md flex flex-col gap-5">
          <div className="flex flex-row items-center justify-between p-2 rounded-xl bg-[#F0FFF4] border border-[#3AC4A0] shadow-md cursor-pointer">
            <div className="flex flex-row items-center">
              <Image
                src={'/assets/academy/voucher-icon.svg'}
                alt="voucher-icon"
                width={100}
                height={100}
                className="w-10"
              />
              Voucher & Promo
            </div>
            <Image
              src={'/assets/academy/arrow-icon.svg'}
              alt="arrow-icon"
              width={100}
              height={100}
              className="w-7"
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <Image
                src={'/assets/images/goldHome.svg'}
                alt="seeds-coin-icon"
                width={100}
                height={100}
                className="w-10"
              />
              Redeem 2000 Seeds Coin
            </div>
            <Switch />
          </div>
          <div>
            <div className="text-xs text-[#7C7C7C]">Entrance Fee</div>
            <div className="font-bold">IDR 100.000</div>
          </div>
          <button
            className="p-3 bg-[#3AC4A0] rounded-3xl w-full text-white font-bold"
            onClick={togglePopup}
          >
            Enroll Course
          </button>
        </div>
        <PaymentPopup isOpen={showPopup} onClose={togglePopup} />
      </PageGradient>
    </>
  );
};

export default DetailCourse;
