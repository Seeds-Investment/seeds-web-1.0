import VideoPlayer from '@/components/academy/VideoPlayer';
import ModalShareCourse from '@/components/popup/ModalShareCourse';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const LearnCourse: React.FC = () => {
  const [isShareModal, setIsShareModal] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      {isShareModal && (
        <ModalShareCourse
          onClose={() => {
            setIsShareModal(prev => !prev);
          }}
          url={'1'}
        />
      )}
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
            <div
              onClick={() => {
                setIsShareModal(prev => !prev);
              }}
              className="flex flex-row items-center gap-2 cursor-pointer"
            >
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
          <div className="flex flex-row items-center bg-[#F7F7F7] border border-2 border-[#3AC4A0] p-3 rounded-lg justify-between">
            <div className="text-lg">Your Pre-Test Score</div>
            <div className="text-2xl font-bold text-[#27A590]">90</div>
          </div>
          <div className="text-lg">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
            expedita quos eaque. Cumque, magni impedit laudantium dicta quos
            fugiat sequi debitis tempore natus ullam unde iure vel ipsum sed
            dolorum.Optio doloremque temporibus ratione nemo reprehenderit,
            totam eius ad deserunt tempore earum enim eaque qui nesciunt, minus
            quos praesentium perspiciatis. Perspiciatis aliquam maiores delectus
            in dolorum eveniet similique ratione beatae? Illum hic vitae soluta
            animi, porro sed vel fugiat similique delectus itaque minima harum,
            reprehenderit libero inventore quidem sequi iure provident cum
            perspiciatis. Suscipit aperiam illo nisi cupiditate asperiores
            veniam Officiis illum facilis cupiditate deserunt cum ipsam ipsa nam
            temporibus odio tempore perferendis ducimus inventore labore quas,
            explicabo tempora voluptatibus necessitatibus, neque incidunt iure
            id blanditiis, eligendi repudiandae molestias. Quasi? Laudantium
            consectetur inventore cum, consequuntur temporibus dolore unde
            accusantium ducimus iste non ea vel quo rerum enim exercitationem
            minus aut illo corporis rem ipsum fugit, ipsa aperiam. Consequatur,
            quos eos?
          </div>
        </div>
        <div
          className="bg-white p-3 rounded-xl mt-4 shadow-md flex flex-col gap-5"
          onClick={async () =>
            await router.push(`/academy/course/${id as string}/posttest`)
          }
        >
          <button className="p-3 bg-[#3AC4A0] rounded-3xl w-full text-white font-bold">
            Post-Test
          </button>
        </div>
      </PageGradient>
    </>
  );
};

export default LearnCourse;
