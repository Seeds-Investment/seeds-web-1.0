import ALeaderBoardCard from '@/components/ALeaderboardCard';
import AssetsCard from '@/components/AssetsCard';
import React from 'react';
import { BiBarChartSquare } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { FiGrid, FiSliders } from 'react-icons/fi';

const Player = (): React.ReactElement => {
  return (
    <div className="mainContainer py-12 px-10 flex flex-col mx-auto bg-blue-gray-900 w-[90%] h-auto font-poppins">
      <section className="flex flex-row justify-between">
        <section className="flex flex-row w-[70%] bg-[#39C5A0] rounded-[9px] justify-start gap-[40px] py-[55px] px-[55px]">
          <section className="flex flex-col text-white border-r border-[#27A590] pr-10">
            <small className="text-base font-normal text-white">
              Seeds Coin
            </small>
            <h1 className="text-2xl font-semibold">Rp 10.200.000</h1>
          </section>
          <section className="flex flex-col text-white border-r border-[#27A590] pr-10">
            <small className="text-base font-normal text-white">
              Cash Balance
            </small>
            <h1 className="text-2xl font-semibold">Rp 10.200.000</h1>
          </section>
          <section className="flex flex-col text-white">
            <small className="text-base font-normal text-white">
              Portofolio
            </small>
            <h1 className="text-2xl font-semibold">Rp 10.200.000</h1>
          </section>
        </section>
        <section className="bg-white flex flex-col shadow-lg w-[25%] rounded-[9px] justify-center items-center">
          <p className="text-[#262626] text-base font-normal">
            Waktu yang tersisa
          </p>
          <h1 className="text-[#FF4A2B] text-2xl font-semibold mt-3">
            03h : 12j: 60m
          </h1>
        </section>
      </section>
      <section className="flex flex-col bg-white rounded-[17px] shadow-lg mt-8 w-full h-auto p-[16px] gap-6">
        <section>
          <section className="flex flex-row w-full self-center">
            <img src="/assets/assets.png" className="w-5 h-5" alt="" />
            <h1 className="text-[#262626] text-base font-semibold ml-2">
              Asset
            </h1>
          </section>
          <p className="text-[#7C7C7C] text-xs font-light">
            Analisa Asset Anda
          </p>
        </section>
        <section className="flex flex-row gap-3">
          <button className="py-[8px] px-[12px] text-white bg-[#3AC4A0] text-xs font-semibold rounded-lg flex flex-row self-center align-middle items-center gap-[10px]">
            <FiGrid className="text-md" />
            Overview
          </button>
          <button className="py-[8px] px-[12px] text-[#3AC4A0] border-[#3AC4A0] border bg-transparent text-xs font-semibold rounded-lg flex flex-row self-center align-middle items-center gap-[10px]">
            <BiBarChartSquare className="text-lg" />
            Stocks
          </button>
          <button className="py-[8px] px-[12px] text-[#3AC4A0] border-[#3AC4A0] border bg-transparent text-xs font-semibold rounded-lg flex flex-row self-center align-middle items-center gap-[10px]">
            <BiBarChartSquare className="text-lg" />
            Cryptos
          </button>
          <button className="py-[8px] px-[12px] text-[#3AC4A0] border-[#3AC4A0] border bg-transparent text-xs font-semibold rounded-lg flex flex-row self-center align-middle items-center gap-[10px]">
            <BiBarChartSquare className="text-lg" />
            Fractional Band
          </button>
        </section>
        <section>
          <BsSearch className="text-2xl absolute align-middle self-center mt-2 ml-2" />
          <input
            type="text"
            className="border border-[#BDBDBD] rounded-xl w-[343px] h-[40px] p-3 pl-10"
            placeholder="Cari di sini"
          />
        </section>
        <section className="grid grid-cols-3 gap-3">
          <AssetsCard />
          <AssetsCard />
          <AssetsCard />
          <AssetsCard />
          <AssetsCard />
          <AssetsCard />
          <AssetsCard />
          <AssetsCard />
          <AssetsCard />
        </section>
      </section>
      <section className="flex flex-row w-full mt-8 justify-between">
        <section className="bg-white rounded-[10px] shadow-md w-[50%] px-[23px] py-[16px]">
          <h1 className="text-[#262626] text-sm font-semibold">
            Arena Leaderboard
          </h1>
          <button className="py-[8px] px-[12px] text-[#7C7C7C] bg-transparent text-xs font-semibold border border-[#7C7C7C] rounded-lg flex flex-row self-center align-middle items-center gap-[10px] my-[20px]">
            <FiSliders className="text-md" />
            Filter
          </button>
          <section className="overflow-scroll h-[30vh]">
            <ALeaderBoardCard />
            <ALeaderBoardCard />
            <ALeaderBoardCard />
            <ALeaderBoardCard />
            <ALeaderBoardCard />
            <ALeaderBoardCard />
            <ALeaderBoardCard />
          </section>
        </section>
        <section className="flex flex-col w-[45%] bg-white rounded-2xl p-4 h-auto shadow-lg">
          <section className="flex flex-row gap-4">
            <img
              src="/assets/assets.png"
              className="w-5 h-5 self-center align-middle"
              alt=""
            />
            <h1 className="text-[#262626] text-base font-semibold">
              Watchlist
            </h1>
          </section>
          <p className="text-[#7C7C7C] text-xs font-light mt-2">
            Periksa Watchlist Anda
          </p>
          <section className="flex flex-row gap-3 mt-4">
            <section className="bg-[#F9F9F9] rounded-xl cursor-pointer w-[120px] px-[15px] py-[15px]">
              <section className="bg-[#DCFCE4] flex rounded-full w-[60px] h-[60px] p-3 mx-auto">
                <img
                  src="/assets/add-watchlist.png"
                  className="w-10 items-center align-middle self-center justify-center mx-auto"
                  alt=""
                />
              </section>
              <p className="text-[#262626] text-sm font-normal mt-2 text-center  mx-auto w-[70%]">
                Add Watchlist
              </p>
            </section>
            <section className="bg-[#F9F9F9] rounded-xl cursor-pointer w-[120px] px-[15px] py-[15px]">
              <section className="bg-[#DCFCE4] flex rounded-full w-[60px] h-[60px] p-3 mx-auto">
                <img
                  src="/assets/crypto.png"
                  className="w-10 items-center align-middle self-center justify-center mx-auto"
                  alt=""
                />
              </section>
              <p className="text-[#262626] text-sm font-normal mt-2 text-center  mx-auto w-[70%]">
                Crypto
              </p>
            </section>
            <section className="bg-[#F9F9F9] rounded-xl cursor-pointer w-[120px] px-[15px] py-[15px]">
              <section className="bg-[#DCFCE4] flex rounded-full w-[60px] h-[60px] p-3 mx-auto">
                <img
                  src="/assets/focus-assets.png"
                  className="w-10 items-center align-middle self-center justify-center mx-auto"
                  alt=""
                />
              </section>
              <p className="text-[#262626] text-sm font-normal mt-2 text-center  mx-auto w-[70%]">
                Focus Assets
              </p>
            </section>
            <section className="bg-[#F9F9F9] rounded-xl cursor-pointer w-[120px] px-[15px] py-[15px]">
              <section className="bg-[#ECF3F1] flex rounded-full w-[60px] h-[60px] p-3 mx-auto">
                <img
                  src="/assets/chill.png"
                  className="w-10 items-center align-middle self-center justify-center mx-auto"
                  alt=""
                />
              </section>
              <p className="text-[#262626] text-sm font-normal mt-2 text-center  mx-auto w-[70%]">
                Chill
              </p>
            </section>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Player;
