import Triangle from '@/components/team-battle/triangle.component';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaChevronRight, FaStar } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { IoArrowBack, IoTriangleSharp } from 'react-icons/io5';
import Crown from '../../../../public/assets/team-battle/battle-crown.svg';
import BlueSeedy from '../../../../public/assets/team-battle/blueseedy.svg';
import Versus from '../../../../public/assets/team-battle/vsicon.svg';
import YellowSeedy from '../../../../public/assets/team-battle/yellowseedy.svg';

const StageBattle: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>('elimination');
  const [selectedSponsor, setSelectedSponsor] = useState('');
  const categoryBattle = [
    { label: 'Elimination', key: 'elimination' },
    { label: 'Semifinal', key: 'semifinal' },
    { label: 'Final', key: 'final' }
  ];
  const dummyData = {
    id: 'c7c7d3c1-86f6-4473-8507-118161ded4f6',
    title: 'UGM vs Stanford',
    category: ['ID_STOCKS'],
    min_participant: 0,
    semifinal_participant: 50,
    final_participant: 20,
    sponsors: [
      {
        name: 'Redbull',
        logo: 'https://dev-assets.seeds.finance/storage/cloud/80ead0a5-d0b7-4e01-942a-a691697c3317.jpeg'
      },
      {
        name: 'Cocacola',
        logo: 'https://dev-assets.seeds.finance/storage/cloud/80ead0a5-d0b7-4e01-942a-a691697c3317.jpeg'
      },
      {
        name: 'Hyundai',
        logo: 'https://dev-assets.seeds.finance/storage/cloud/80ead0a5-d0b7-4e01-942a-a691697c3317.jpeg'
      },
      {
        name: 'Honda',
        logo: 'https://dev-assets.seeds.finance/storage/cloud/80ead0a5-d0b7-4e01-942a-a691697c3317.jpeg'
      },
      {
        name: 'Suzuki',
        logo: 'https://dev-assets.seeds.finance/storage/cloud/80ead0a5-d0b7-4e01-942a-a691697c3317.jpeg'
      }
    ],
    registration_start: '2024-09-04T13:30:53.807Z',
    registration_end: '2024-09-05T13:30:53.807Z',
    elimination_start: '2024-09-06T15:30:53.807Z',
    elimination_end: '2024-09-07T13:30:53.807Z',
    semifinal_start: '2024-09-08T15:30:53.807Z',
    semifinal_end: '2024-09-09T13:30:53.807Z',
    final_start: '2024-09-10T15:30:53.807Z',
    final_end: '2024-09-11T13:30:53.807Z',
    banner:
      'https://dev-assets.seeds.finance/storage/cloud/80ead0a5-d0b7-4e01-942a-a691697c3317.jpeg',
    prize: [
      {
        amount: 1000000,
        description: 'satu juta'
      }
    ],
    tnc: {
      id: 'bebas',
      en: 'bebas'
    },
    status: 'OPEN',
    initial_balance: 1000000000,
    public_max_participant: 100,
    community_max_participant: 100,
    university_max_participant: 100,
    created_at: '2024-09-04T12:59:48.691476Z',
    updated_at: '2024-09-04T12:59:48.691476Z',
    deleted_at: '0001-01-01T00:00:00Z',
    is_joined: true,
    is_eliminated: false,
    my_last_stage: 'PRE_ELIMINATION',
    participants: 3,
    type: 'UNIKOM'
  };

  const handleSelectedSponsor = (sponsor: string): void => {
    if (selectedSponsor === sponsor) {
      setSelectedSponsor('');
    } else {
      setSelectedSponsor(sponsor);
    }
  };
  const router = useRouter();
  return (
    <>
      <div className="px-2 my-5 font-poppins">
        <div className="text-xl text-white grid grid-cols-3">
          <div
            className="flex justify-start items-center transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer"
            onClick={() => {
              router.back();
            }}
          >
            <IoArrowBack size={30} />
          </div>
          <div className="text-center text-xl sm:text-2xl col-span-1 font-poppins">
            Battle Competition
          </div>
          <div className="flex justify-end items-center">
            <div
              className="rounded-full p-1 bg-[#407F74] w-8 h-8 flex items-center justify-center text-sm transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer font-medium"
              onClick={async () =>
                await router.push('/play/team-battle/information')
              }
            >
              i
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-32 mb-10 items-center">
          <div className="bg-white/50 border-l-2 border-r-2 border-b-2 border-white rounded-b-2xl col-span-1 lg:col-span-2 px-3 pt-10 pb-3 relative">
            <div className="absolute w-full left-0 -top-20 flex justify-center items-center">
              <Triangle />
              <Image
                src={Versus}
                alt="versus-icon"
                width={300}
                height={300}
                className="absolute -top-6 lg:-top-10 w-52"
              />
              <Image
                src={BlueSeedy}
                alt="blue-seedy"
                width={300}
                height={300}
                className="absolute w-28 h-32 -left-9 -bottom-14"
              />
              <Image
                src={YellowSeedy}
                alt="yellow-seedy"
                width={300}
                height={300}
                className="absolute w-28 h-32 -right-6 -bottom-14"
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="flex flex-row">
                {categoryBattle?.map((item, i) => {
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedCategory(item.key);
                      }}
                      className={`${
                        item.key === selectedCategory
                          ? 'border-b-8 border-[#65d8c3] text-[#2934B2] font-bold'
                          : 'font-semibold text-[#3D3D3D]'
                      } py-3 px-5 text-2xl mt-10 font-poppins`}
                    >
                      <p className="transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer">
                        {item.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="flex flex-col items-center justify-center gap-5">
                <div className="font-semibold text-lg lg:text-xl text-[#3D3D3D] my-10">
                  Periode Game : 12 April 2024 - 30 Agustus 2024
                </div>
                <div className="flex flex-row flex-wrap gap-3 w-full sm:w-8/12 lg:w-1/2 2xl:w-3/5 justify-center">
                  {dummyData?.sponsors?.map((item, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          handleSelectedSponsor(item.name);
                        }}
                      >
                        <Image
                          src={item.logo}
                          alt="sponsor-logo"
                          width={300}
                          height={300}
                          className={`w-24 xl:w-28 2xl:w-32 rounded-xl bg-white cursor-pointer ${
                            selectedSponsor === item.name
                              ? 'border-8'
                              : 'border-4'
                          } border-[#76a5d0]`}
                        />
                        <div
                          className={`relative flex-col justify-center items-center mt-1 ${
                            selectedSponsor === item.name ? 'flex' : 'hidden'
                          }`}
                        >
                          <IoTriangleSharp className="text-white absolute -top-2" />
                          <div className="w-auto rounded p-2 bg-white border-none text-xs">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="font-semibold text-lg sm:text-xl text-[#3D3D3D]">
                  Participants
                </div>
                <div className="flex flex-row text-[#407F74] relative">
                  <FaUserGroup size={50} />
                  <span className="text-2xl">20</span>
                  <FaChevronRight
                    size={25}
                    className="text-white bg-[#407f74] p-1 rounded absolute -right-8 bottom-2 cursor-pointer scale-100 hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <button className="transform scale-100 hover:scale-105 transition-transform duration-300 cursor-pointer py-3 w-full sm:w-8/12 md:w-1/2 rounded-3xl bg-[#2934b2] text-base lg:text-lg text-white border-2 border-white">
                  Enter
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-white/50 border-2 border-white rounded-2xl h-fit p-3">
            <div className="font-semibold text-[#3D3D3D] text-2xl font-poppins text-center">
              Leaderboard
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <Image
                src={Crown}
                width={300}
                height={300}
                alt="crown-icon"
                className="w-16"
              />
              <p className="text-sm">Your Rank</p>
              <div className="text-xl px-12 py-1 border-2 border-dashed rounded-xl border-[#3D3D3D] font-bold w-fit">
                120
              </div>
              <div className="grid grid-cols-5 items-center gap-3 mt-10">
                <div className="col-span-1">
                  <FaStar size={60} className="text-[#ffc107]" />
                </div>
                <div className="col-span-3 flex flex-col justify-center">
                  <p className="font-medium text-sm">Let&#39;s Check</p>
                  <p className="font-semibold text-xl">full leaderboard</p>
                </div>
                <div
                  className="col-span-1 flex items-center justify-center cursor-pointer scale-100 hover:scale-110 transition-transform duration-300"
                  onClick={async () =>
                    await router.push('/play/team-battle/leaderboard')
                  }
                >
                  <FaChevronRight
                    size={25}
                    className="text-white bg-[#407f74] p-1 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StageBattle;
