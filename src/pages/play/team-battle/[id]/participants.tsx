import Image from 'next/image';
import { useRouter } from 'next/router';
import DisplayPicture1 from 'public/assets/team-battle/display-picture1.png';
import DisplayPicture2 from 'public/assets/team-battle/display-picture2.png';
import React from 'react';
import { IoArrowBack } from 'react-icons/io5';

const BattleParticipants: React.FC = () => {
  const router = useRouter();

  const dummyParticipants = [
    {
      id: 1,
      name: 'Eleanor Pena',
      image: DisplayPicture1,
      team: 'Community Satu Jiwa Raga Satu Hati Nyata Jasya'
    },
    {
      id: 2,
      name: 'Eleanor Pena',
      image: DisplayPicture2,
      team: 'Universitas Mercuana Selalu Unggul'
    },
    {
      id: 3,
      name: 'Eleanor Pena',
      image: DisplayPicture2,
      team: 'Community Mercuana Selalu Unggul'
    },
    {
      id: 4,
      name: 'Killua ZoldcykZoldcyk',
      image: DisplayPicture1,
      team: 'Public'
    },
    {
      id: 5,
      name: 'Eleanor Pena',
      image: DisplayPicture2,
      team: 'Universitas Mercuana Selalu Unggul'
    },
    {
      id: 6,
      name: 'Eleanor Pena',
      image: DisplayPicture1,
      team: 'Community Mercuana Selalu Unggul'
    },
    {
      id: 7,
      name: 'Ismail Misbah',
      image: DisplayPicture1,
      team: 'Public'
    },
    {
      id: 8,
      name: 'Eleanor Pena',
      image: DisplayPicture1,
      team: 'Community Mercuana Selalu Unggul'
    },
    {
      id: 9,
      name: 'Eleanor Pena',
      image: DisplayPicture2,
      team: 'Universitas Mercuana Selalu Unggul'
    },
    {
      id: 10,
      name: 'Eleanor Pena',
      image: DisplayPicture1,
      team: 'Public'
    },
    {
      id: 11,
      name: 'Eleanor Pena',
      image: DisplayPicture1,
      team: 'Community Satu Jiwa Raga Satu Hati Nyata Jasya'
    },
    {
      id: 12,
      name: 'Eleanor Pena',
      image: DisplayPicture2,
      team: 'Universitas Mercuana Selalu Unggul'
    },
    {
      id: 13,
      name: 'Eleanor Pena',
      image: DisplayPicture2,
      team: 'Community Mercuana Selalu Unggul'
    },
    {
      id: 14,
      name: 'Killua Zoldcyk',
      image: DisplayPicture1,
      team: 'Public'
    },
    {
      id: 15,
      name: 'Eleanor Pena',
      image: DisplayPicture2,
      team: 'Universitas Mercuana Selalu Unggul'
    },
    {
      id: 16,
      name: 'Eleanor Pena',
      image: DisplayPicture1,
      team: 'Community Mercuana Selalu Unggul'
    },
    {
      id: 17,
      name: 'Ismail Misbah',
      image: DisplayPicture1,
      team: 'Public'
    },
    {
      id: 18,
      name: 'Eleanor Pena',
      image: DisplayPicture1,
      team: 'Community Mercuana Selalu Unggul'
    },
    {
      id: 19,
      name: 'Eleanor Pena',
      image: DisplayPicture2,
      team: 'Universitas Mercuana Selalu Unggul'
    },
    {
      id: 20,
      name: 'Eleanor Pena',
      image: DisplayPicture1,
      team: 'Public'
    },
  ]

  return (
    <>
      <div className="px-2 my-5 font-poppins w-full">
        <div className="text-xl text-white grid grid-cols-3">
          <div
            className="flex justify-start items-center transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer"
            onClick={() => {
              router.back();
            }}
          >
            <IoArrowBack size={30} />
          </div>
        </div>
        <div className='bg-white/50 border-white rounded-xl w-full h-[85vh] relative px-2 md:px-8 lg:px-16 flex justify-center items-center mt-4'>
          <div className='h-fit flex justify-center items-center absolute top-[-26px] m-auto right-0 left-0 px-8 py-4 rounded-full text-white font-semibold bg-[#2934B2] w-fit text-center lg:text-xl'>
            Final Stage
          </div>
          <div className='mt-12 md:mt-8 w-full h-[75vh] flex flex-col gap-2 lg:gap-4 overflow-y-scroll'>
            {dummyParticipants?.map((item, i) => {
              return (
                <div
                  key={i}
                  className='flex justify-start items-start lg:items-center gap-4 lg:gap-8 lg:py-1 lg:px-4 hover:bg-white/25 rounded-xl duration-300 cursor-pointer'
                >
                  <div className='flex w-fit gap-2 items-center'>
                    <div className='text-center w-[20px] lg:w-[30px]'>
                      {item?.id}.
                    </div>
                    <div className='w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]'>
                      <Image
                        alt={'item?.image}'}
                        src={item?.image}
                        width={100}
                        height={100}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <div className='flex flex-col justify-start items-start lg:flex-row lg:items-center lg:gap-4 w-full'>
                    <div className='text-sm md:text-base lg:hidden xl:flex lg:w-[40%] lg:text-lg font-semibold'>
                      {item?.name}
                    </div>
                    <div className='text-sm md:text-base hidden lg:flex xl:hidden lg:w-[40%] lg:text-lg font-semibold'>
                      {(item?.name).substring(0, 15)}{item?.name?.length > 20 ? "..." : ""}
                    </div>
                    <div className='text-xs md:text-base lg:w-[60%]'>
                      {item?.team}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BattleParticipants;
