import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { IoArrowBack } from 'react-icons/io5';
import { LuDot } from 'react-icons/lu';
import { RiGiftFill } from 'react-icons/ri';
import Second from '../../../../public/assets/team-battle/2nd-battle.svg';
import Third from '../../../../public/assets/team-battle/3rd-battle.svg';
import Crown from '../../../../public/assets/team-battle/battle-crown.svg';

const BattleInformation: React.FC = () => {
  const [showTnc, setShowTnc] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const router = useRouter();

  const handleShowTnc = (): void => {
    setShowTnc(!showTnc);
  };

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-5 my-10">
          <div className="col-span-2 border-2 border-white rounded-2xl p-1 lg:p-3 bg-white/50 relative">
            <RiGiftFill
              size={50}
              className="text-[#27a590] p-2 bg-white/50 rounded-xl absolute right-2 top-2 transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
            <div className="lg:hidden font-semibold text-xl text-center mt-3">
              Prize
            </div>
            <div className="grid grid-cols-3">
              <div></div>
              <div className="flex flex-col gap-2 items-center justify-center">
                <div className="lg:flex flex-row items-end justify-end hidden">
                  <Image src={Crown} alt="1st" />{' '}
                  <span className="text-xl font-medium">1st</span>
                </div>
                <div className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl lg:block hidden">
                  10.0000.000
                </div>
              </div>
              <div></div>
              <div className="flex flex-col items-center justify-end">
                <div className="flex flex-col gap-2 items-center justify-end lg:border-none border-e-2 h-fit w-full">
                  <div className="flex flex-row items-end justify-end">
                    <Image src={Second} alt="2nd" />{' '}
                    <span className="text-xl font-medium">2nd</span>
                  </div>
                  <div className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
                    5.000.000
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center">
                <div className="flex flex-row items-end justify-end lg:hidden">
                  <Image src={Crown} alt="1st" />{' '}
                  <span className="text-xl font-medium">1st</span>
                </div>
                <div className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl lg:hidden">
                  10.0000.000
                </div>
              </div>
              <div className="flex flex-col items-center justify-end">
                <div className="flex flex-col gap-2 items-center justify-end w-full lg:border-none border-s-2">
                  <div className="flex flex-row items-end justify-end">
                    <Image src={Third} alt="3rd" />{' '}
                    <span className="text-xl font-medium">3rd</span>
                  </div>
                  <div className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
                    5.000.000
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="text-lg sm:text-xl font-semibold text-[#3D3D3D]">
                Periode Game
              </div>
              <table className="w-fit border-collapse border-none my-4 text-[#3D3D3D]">
                <tbody className="text-sm sm:text-lg font-semibold">
                  <tr>
                    <td className="flex items-center space-x-1">
                      <LuDot size={30} />
                      <span>Periode</span>
                    </td>
                    <td>: 12 April 2024 - 30 Agustus 2023</td>
                  </tr>
                  <tr>
                    <td className="flex items-center space-x-1">
                      <LuDot size={30} />
                      <span>Registration</span>
                    </td>
                    <td>: 12 April 2024 - 30 Agustus 2023</td>
                  </tr>
                  <tr>
                    <td className="flex items-center space-x-1">
                      <LuDot size={30} />
                      <span>Elimination</span>
                    </td>
                    <td>: 12 April 2024 - 30 Agustus 2023</td>
                  </tr>
                  <tr>
                    <td className="flex items-center space-x-1">
                      <LuDot size={30} />
                      <span>Semifinal</span>
                    </td>
                    <td>: 12 April 2024 - 30 Agustus 2023</td>
                  </tr>
                  <tr>
                    <td className="flex items-center space-x-1">
                      <LuDot size={30} />
                      <span>Final</span>
                    </td>
                    <td>: 12 April 2024 - 30 Agustus 2023</td>
                  </tr>
                </tbody>
              </table>
              <div className="font-semibold text-lg sm:text-xl mb-4 text-[#3D3D3D]">
                Participants
              </div>
              <div className="flex flex-row text-[#407F74]">
                <FaUserGroup size={50} />
                <span className="text-2xl">20</span>
              </div>
            </div>
          </div>
          <div
            className="my-5 flex lg:hidden flex-row items-center gap-3 col-span-3 text-lg sm:text-xl font-semibold justify-center transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer"
            onClick={() => {
              handleShowTnc();
            }}
          >
            <div>Term & Condition</div>
            {showTnc ? (
              <FaChevronUp
                size={25}
                className="text-white p-1 bg-[#407f74] rounded"
              />
            ) : (
              <FaChevronDown
                size={25}
                className="text-white p-1 bg-[#407f74] rounded"
              />
            )}
          </div>
          <div
            className={`${
              (showTnc && windowWidth <= 959) || windowWidth >= 960
                ? 'flex'
                : 'hidden'
            } col-span-1 border-2 border-white rounded-2xl p-3 bg-white/50 flex-col`}
          >
            <div className="hidden lg:block font-semibold text-lg sm:text-xl mb-4 text-[#3D3D3D] text-center">
              Term & Condition
            </div>
            <div className="h-[500px] overflow-y-auto tnc-battle-custom-scroll">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloribus, quibusdam fugit dolore dolores velit natus enim facilis
              ea facere fuga aliquid ex eligendi reprehenderit amet nemo quam
              porro modi odit. Ipsum tempore fugit aspernatur, unde quam vel?
              Sint temporibus ipsa, aspernatur sed officiis, fugiat quibusdam
              rem veritatis modi cumque porro deleniti placeat excepturi commodi
              tempore numquam distinctio eligendi earum. Quia. Ea corporis
              aspernatur et est temporibus nisi modi exercitationem voluptatem.
              Porro incidunt perferendis fugit, amet ea ad magnam hic repellat
              recusandae cumque quisquam dolor blanditiis illum laudantium nobis
              repellendus? Laborum? Ipsa possimus, deleniti, nihil eaque
              repellendus dolorem tempore excepturi quisquam autem doloribus
              rerum enim a soluta illo consectetur, quae voluptate saepe.
              Repellat ullam similique nihil dolor eos reprehenderit aliquam
              perspiciatis!
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BattleInformation;
