import PaymentPopup from '@/components/academy/PaymentPopup';
import ShortDescription from '@/components/academy/ShortDescription';
import VideoPlayer from '@/components/academy/VideoPlayer';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { Switch } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useState } from 'react';

const DetailCourse: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = (): void => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <PageGradient defaultGradient className="w-full">
        <div className="bg-white p-3 rounded-xl shadow-md flex flex-col gap-5">
          <VideoPlayer
            videoSrc="https://dev-assets.seeds.finance/quiz/cb1a51db-f455-4ae4-a1e4-5683820cacde.mp4"
            title="Learn Investing From 0"
          />
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
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-5">
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
        </div>
        <PaymentPopup isOpen={showPopup} onClose={togglePopup} />
      </PageGradient>
    </>
  );
};

export default DetailCourse;
