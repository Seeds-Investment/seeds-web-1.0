import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import FilterIcon from '../../components/svgs/filterIcon';
import GoldRank from '../../components/svgs/rank1';
import SilverRank from '../../components/svgs/rank2';
import BronzeRank from '../../components/svgs/rank3';
import TopIcon from '../../components/svgs/topIcon';

interface LeaderboardData {
  user_id: string;
  points: number;
  avatar_url: string;
  user_full_name: string;
  user_seeds_tag: string;
  current_rank: number;
}
interface playList {
  id: string;
  play_id: string;
  name: string;
  gain_percentage: number;
  status: string;
  prize_fix_amount: number;
  prize_fix_percentages: [number];
  prize_pool_amount: number;
  prize_pool_percentages: [number];
  admission_fee: number;
  play_time: string;
  end_time: string;
  is_joined: true;
  type: string;
  participants: [
    {
      photo_url: string;
      id: string;
    }
  ];
  min_participant: number;
  max_participant: number;
  tnc: string;
  created_by: {
    photo_url: string;
    name: string;
  };
}

const baseUrl = 'https://seeds-dev-gcp.seeds.finance';

const Player = (): React.ReactElement => {
  const [leader, setLeader] = useState<LeaderboardData[]>([]);
  const [playList, setPlayList] = useState<playList[]>([]);

  useEffect(() => {
    fetchLeaderboardData()
      .then()
      .catch(() => {});
    fetchPlayList()
      .then()
      .catch(() => {});
  }, []);

  const fetchPlayList = async (): Promise<void> => {
    try {
      const response = await axios.get(`${baseUrl}/play/v1/list`);
      const playList: playList[] = response.data.playList;
      setPlayList(playList);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchLeaderboardData = async (): Promise<void> => {
    try {
      const response = await axios.get(`${baseUrl}/play/v1/leaderboard`);
      const leaderboardData: LeaderboardData[] = response.data.playLeaderboards;
      setLeader(leaderboardData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function getFormattedDate(day: string): string {
    const today = new Date(day);
    const date = String(today.getDate()).padStart(2, '0');
    const monthIndex = today.getMonth();
    const year = String(today.getFullYear());

    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ];
    const month = monthNames[monthIndex];

    return date + ' ' + month + ' ' + year;
  }
  const filteredLeader = leader.filter(player => player.current_rank < 4);
  const filteredAllCompetition = playList.filter((competition, i) => i < 3);
  const filteredStatusCompetition = playList.filter(
    (competition, i) => competition.status === 'ACTIVE' && i < 3
  );
  // const filteredAllCompetition = playList.filter((competition, i) => i < 4);

  return (
    <div className="grid lg:grid-cols-7 mx-5 gap-2">
      <div className="rounded-2xl p-3 lg:col-span-5  border">
        <div className="grid lg:grid-cols-7 gap-2">
          <div className="rounded-2xl lg:col-span-3 ">
            <div className="relative mb-4 lg:flex">
              <input
                type="search"
                className="relative m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary w-full flex-wrap"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
            </div>
          </div>
          <div className="rounded-2xl lg:col-span-4 lg:ms-auto ">
            <div className="lg:flex gap-1">
              <div className="mb-2">
                <button
                  type="button"
                  className="border flex shadow-lg border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2  transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                >
                  <div className="mt-1 me-3">
                    <FilterIcon />
                  </div>
                  Filter
                </button>
              </div>
              <div className="mb-2">
                <button
                  type="button"
                  className="border flex shadow-lg border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2  transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                >
                  Kompetisi Sedang Aktif
                </button>
              </div>
              <div className="mb-2">
                <button
                  type="button"
                  className="border flex shadow-lg border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2  transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                >
                  Kompetisi sebelumnya
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mx-2">
          <div className="font-bold my-3">Daftar Kompetisi</div>
          <a className="my-3 text-seeds-green" href="#">
            Lihat Semua
          </a>
        </div>
        <div className="rounded-2xl p-3 grid lg:grid-cols-6 gap-2">
          {filteredAllCompetition.map(play => (
            <div
              className="border p-3 rounded-3xl shadow-md lg:col-span-2 sm:col-span-1"
              key={play.id}
            >
              <div className="flex justify-between my-3 font-bold">
                <div>{play.name}</div>
                <div className="border flex shadow-lg border-seeds-green-2 bg-seeds-green-2 text-seeds-green rounded-full px-3 ">
                  <Image
                    className="me-3 w-auto h-auto"
                    src="/assets/vector/suprise.svg"
                    alt="img"
                    height={0}
                    width={0}
                  />
                  Rp {play.prize_fix_amount}
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="flex">
                    <Image
                      src="/assets/vector/userPlay.svg"
                      alt="img"
                      height={0}
                      width={0}
                      className="w-auto h-auto"
                    />
                    <div className="mx-3">{play.min_participant} peserta</div>
                  </div>
                  <div className="flex">
                    <Image
                      src="/assets/vector/clock.svg"
                      alt="img"
                      height={0}
                      width={0}
                      className="w-auto h-auto"
                    />
                    <div className="mx-3">
                      {getFormattedDate(play.play_time)}
                    </div>
                  </div>
                  <div className="flex">
                    <Image
                      src="/assets/vector/dolar.svg"
                      alt="img"
                      height={0}
                      width={0}
                      className="w-auto h-auto"
                    />
                    <div className="mx-3">Rp {play.admission_fee}</div>
                  </div>
                  <div className="flex">
                    <Image
                      src="/assets/vector/warning.svg"
                      alt="img"
                      height={0}
                      width={0}
                      className="w-auto h-auto"
                    />
                    <div className="mx-3">{play.type}</div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="border flex shadow-lg border-gray-200 bg-seeds-green text-white rounded-full mt-5 px-4 py-2  transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                    >
                      Dapatkan Tiket
                    </button>
                  </div>
                </div>
                <div>
                  <Image
                    src="/assets/images/listimage.png"
                    alt="img"
                    height={120}
                    width={120}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mx-2">
          <div className="font-bold my-3">Kompetisi Sedang Aktif</div>
          <a className="my-3 text-seeds-green" href="#">
            Lihat Semua
          </a>
        </div>
        <div className="rounded-2xl p-3 grid lg:grid-cols-6 gap-2">
          {filteredStatusCompetition.map(play => (
            <div
              className="border p-3 rounded-3xl shadow-md col-span-2 "
              key={play.id}
            >
              <div className="flex justify-between my-3 font-bold">
                <div>{play.name}</div>
                <div className="border flex shadow-lg border-seeds-green-2 bg-seeds-green-2 text-seeds-green rounded-full px-3 ">
                  <Image
                    className="me-3 w-auto h-auto"
                    src="/assets/vector/suprise.svg"
                    alt="img"
                    height={0}
                    width={0}
                  />
                  Rp {play.prize_fix_amount}
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="flex">
                    <Image
                      src="/assets/vector/userPlay.svg"
                      alt="img"
                      height={0}
                      width={0}
                      className="w-auto h-auto"
                    />
                    <div className="mx-3">{play.min_participant} peserta</div>
                  </div>
                  <div className="flex">
                    <Image
                      src="/assets/vector/clock.svg"
                      alt="img"
                      height={0}
                      width={0}
                      className="w-auto h-auto"
                    />
                    <div className="mx-3">
                      {getFormattedDate(play.play_time)}
                    </div>
                  </div>
                  <div className="flex">
                    <Image
                      src="/assets/vector/dolar.svg"
                      alt="img"
                      height={0}
                      width={0}
                      className="w-auto h-auto"
                    />
                    <div className="mx-3">Rp {play.admission_fee}</div>
                  </div>
                  <div className="flex">
                    <Image
                      src="/assets/vector/warning.svg"
                      alt="img"
                      height={0}
                      width={0}
                      className="w-auto h-auto"
                    />
                    <div className="mx-3">{play.type}</div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="border flex shadow-lg border-gray-200 bg-seeds-green text-white rounded-full mt-5 px-4 py-2  transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                    >
                      Dapatkan Tiket
                    </button>
                  </div>
                </div>
                <div>
                  <Image
                    src="/assets/images/listimage.png"
                    alt="img"
                    height={120}
                    width={120}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mx-2">
          <div className="font-bold my-3">Kompetisi Sebelumnya</div>
          <a className="my-3 text-seeds-green" href="#">
            Lihat Semua
          </a>
        </div>
        <div className="rounded-2xl p-3 grid lg:grid-cols-6 gap-2">
          {filteredStatusCompetition.map(play => (
            <div
              className="border p-3 rounded-3xl shadow-md col-span-2"
              key={play.id}
            >
              <div className="flex justify-between my-3 font-bold">
                <div>{play.name}</div>
                <div className="border flex shadow-lg border-seeds-green-2 bg-seeds-green-2 text-seeds-green rounded-full px-3 ">
                  <Image
                    className="me-3 w-auto h-auto"
                    src="/assets/vector/suprise.svg"
                    alt="img"
                    height={0}
                    width={0}
                  />
                  Rp {play.prize_fix_amount}
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="flex">
                    <Image
                      src="/assets/vector/userPlay.svg"
                      alt="img"
                      height={0}
                      width={0}
                      className="w-auto h-auto"
                    />
                    <div className="mx-3">{play.min_participant} peserta</div>
                  </div>
                  <div className="flex">
                    <Image
                      src="/assets/vector/clock.svg"
                      alt="img"
                      height={0}
                      width={0}
                      className="w-auto h-auto"
                    />
                    <div className="mx-3">
                      {getFormattedDate(play.play_time)}
                    </div>
                  </div>
                  <div className="flex">
                    <Image
                      src="/assets/vector/dolar.svg"
                      alt="img"
                      height={0}
                      width={0}
                      className="w-auto h-auto"
                    />
                    <div className="mx-3">Rp {play.admission_fee}</div>
                  </div>
                  <div className="flex">
                    <Image
                      src="/assets/vector/warning.svg"
                      alt="img"
                      height={0}
                      width={0}
                      className="w-auto h-auto"
                    />
                    <div className="mx-3">{play.type}</div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="border flex shadow-lg border-gray-200 bg-seeds-green text-white rounded-full mt-5 px-4 py-2  transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                    >
                      Dapatkan Tiket
                    </button>
                  </div>
                </div>
                <div>
                  <Image
                    src="/assets/images/listimage.png"
                    alt="img"
                    height={120}
                    width={120}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2 h-auto border rounded-2xl p-3">
        <div className="flex justify-between m-10">
          <div className="font-bold text-lg">Peringkat Pemain</div>
          <div className="text-blue-500">
            <a href="#">Lihat Detail</a>
          </div>
        </div>
        <div className="m-10">
          <button
            type="button"
            className="border flex shadow-lg border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
          >
            <div className="mt-1 me-3">
              <FilterIcon />
            </div>
            Filter
          </button>
        </div>
        <div>
          <ul>
            {filteredLeader.map((player, i) => (
              <div className="flex mx-7 my-10" key={player.user_id}>
                <div>
                  <div className="text-2xl mx-2">{i + 1}</div>
                  <div className="ms-3 mt-2">
                    <TopIcon />
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="flex">
                    <div>
                      <Image
                        className="h-[3rem] w-[3rem] rounded-full mx-2"
                        src={player.avatar_url}
                        alt="img"
                        height={20}
                        width={20}
                      />
                    </div>
                    <div>
                      <div className="mx-2">{player.user_full_name}</div>
                      <div className="mx-2 text-gray-600 ">
                        @{player.user_seeds_tag}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="ms-auto">
                      {i + 1 === 1 ? <GoldRank /> : null}
                    </div>
                    <div className="ms-auto">
                      {i + 1 === 2 ? <SilverRank /> : null}
                    </div>
                    <div className="ms-auto">
                      {i + 1 === 3 ? <BronzeRank /> : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Player;
