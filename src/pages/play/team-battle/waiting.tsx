import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { IoArrowBack, IoTriangleSharp } from 'react-icons/io5';
import WaitingLogo from '../../../../public/assets/team-battle/waiting-battle.svg';

const WaitingBattle: React.FC = () => {
  const router = useRouter();
  const [selectedSponsor, setSelectedSponsor] = useState('');
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
          <div className="text-center text-xl sm:text-2xl col-span-2 lg:col-span-1 font-poppins">
            Battle Competition
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            src={WaitingLogo}
            alt="waiting-logo"
            width={500}
            height={500}
            className="w-2/3 lg:w-1/4"
          />
          <div className="font-light text-lg lg:text-xl text-center">
            You&#39;re successfully registered for the competition.
          </div>
          <div className="font-semibold text-lg lg:text-xl">
            The competition will begin in:
          </div>
          <div className="text-3xl font-semibold text-[#407F74]">
            23d : 40h : 12m : 10s
          </div>
          <div className="text-base lg:text-lg font-semibold">Sponsor</div>
          <div className="flex flex-row flex-wrap gap-3 w-full sm:w-8/12 lg:w-1/2 2xl:w-2/5 justify-center">
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
                      selectedSponsor === item.name ? 'border-8' : 'border-4'
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
          <button className="transform scale-100 hover:scale-105 transition-transform duration-300 cursor-pointer py-3 w-full sm:w-8/12 md:w-1/2 lg:w-1/3 rounded-3xl bg-[#2934b2] text-base lg:text-lg text-white border-2 border-white">
            Back to Play Center
          </button>
        </div>
      </div>
    </>
  );
};

export default WaitingBattle;
