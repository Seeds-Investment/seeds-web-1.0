import PopUpJoinBattle from '@/components/team-battle/PopUpJoinBattle';
import Triangle from '@/components/team-battle/triangle.component';
import withAuth from '@/helpers/withAuth';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import BlueSeedy from 'public/assets/team-battle/blueseedy.svg';
import Versus from 'public/assets/team-battle/vsicon.svg';
import YellowSeedy from 'public/assets/team-battle/yellowseedy.svg';
import {
  ArrowTailessDown,
  ArrowTailessUp,
  BronzeMedal,
  GoldCrown,
  GreenGift,
  GroupIcon,
  SilverMedal
} from 'public/assets/vector';
import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import Amar from './../../../../assets/play/battle/amar.png';
import Jago from './../../../../assets/play/battle/jago.png';
import WeBull from './../../../../assets/play/battle/webull.png';

const MainTeamBattle = (): React.ReactElement => {
  const router = useRouter();
  const { id } = router.query;
  const [showTnc, setShowTnc] = useState<boolean>(false);
  const [showPopUpJoinBattle, setShowPopUpJoinBattle] =
    useState<boolean>(false);

  const handleShowPopUpJoinBattle = (): void => {
    setShowPopUpJoinBattle(!showPopUpJoinBattle);
  };

  return (
    <>
      <div className="w-full h-full p-4">
        <div className="flex justify-center items-center relative">
          <div
            className="absolute text-white left-0 lg:w-[50px] lg:h-[50px] w-[24px] h-[24px] hover:opacity-80 transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer"
            onClick={() => {
              router.back();
            }}
          >
            <IoArrowBack size={30} />
          </div>
          <Typography className="text-white font-poppins text-2xl">
            Battle Competition
          </Typography>
        </div>

        <div className="flex lg:hidden justify-center items-end gap-2 border-2 border-white rounded-lg py-8 px-2 bg-white/50 relative mt-4">
          <div className="flex flex-col justify-center items-center">
            <div className="flex gap-2">
              <div className="flex justify-center items-center">
                <Image
                  className="w-[20px] h-[20px]"
                  src={SilverMedal}
                  width={100}
                  height={100}
                  alt={'SilverMedal'}
                />
              </div>
              <div>2nd</div>
            </div>
            <div className="font-semibold">5.000.000</div>
          </div>
          <div className="flex flex-col justify-center items-center border-x-2 border-white px-2">
            <div className="flex gap-2 justify-center items-end">
              <div className="flex justify-center items-center">
                <Image
                  className="w-[35px] h-[35px]"
                  src={GoldCrown}
                  width={100}
                  height={100}
                  alt={'GoldCrown'}
                />
              </div>
              <div>1st</div>
            </div>
            <div className="font-semibold">10.000.000</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex gap-2">
              <div className="flex justify-center items-center">
                <Image
                  className="w-[20px] h-[20px]"
                  src={BronzeMedal}
                  width={100}
                  height={100}
                  alt={'BronzeMedal'}
                />
              </div>
              <div>3rd</div>
            </div>
            <div className="font-semibold">3.000.000</div>
          </div>
          <div className="absolute right-[10px] top-[10px] flex justify-center items-center bg-white bg-opacity-35 w-[30px] h-[30px] rounded-md cursor-pointer hover:bg-opacity-70 duration-300">
            <Image
              className="w-[20px] h-[20px]"
              src={GreenGift}
              width={100}
              height={100}
              alt={'GreenGift'}
            />
          </div>
        </div>

        <div className="lg:flex lg:gap-8 lg:mt-4">
          <div className="flex flex-col lg:w-full justify-center items-center gap-2 border-2 mt-28 lg:mt-24 border-white rounded-b-2xl py-8 px-2 bg-white/50 relative">
            <div className="absolute w-full left-0 -top-20 flex justify-center items-center">
              <Triangle />
              <Image
                src={Versus}
                alt="versus-icon"
                width={300}
                height={300}
                className="absolute -top-6 lg:-top-6 w-52"
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
            <div className="flex flex-col justify-center items-center">
              <Typography className="text-[#3D3D3D] font-poppins text-xl font-semibold">
                It`s time to
              </Typography>
              <Typography className="text-[#407F74] font-poppins text-5xl font-bold">
                Battle!
              </Typography>
            </div>
            <div className="text-xs lg:text-lg text-[#3D3D3D] font-semibold">
              <div className="w-full">
                <div className="flex gap-2 justify-between">
                  <div className="w-[70px] lg:w-[110px]">Periode</div>
                  <div>: 12/04/2024 - 30/08/2023</div>
                </div>
                <div className="flex gap-2 justify-between">
                  <div className="w-[70px] lg:w-[110px]">Registration</div>
                  <div>: 12/04/2024 - 30/08/2023</div>
                </div>
                <div className="flex gap-2 justify-between">
                  <div className="w-[70px] lg:w-[110px]">Elimination</div>
                  <div>: 12/04/2024 - 30/08/2023</div>
                </div>
                <div className="flex gap-2 justify-between">
                  <div className="w-[70px] lg:w-[110px]">Semifinal</div>
                  <div>: 12/04/2024 - 30/08/2023</div>
                </div>
                <div className="flex gap-2 justify-between">
                  <div className="w-[70px] lg:w-[110px]">Final</div>
                  <div>: 12/04/2024 - 30/08/2023</div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center text-sm mt-4">
                <div>Participants</div>
                <div className="flex justify-center items-start gap-1 mt-2">
                  <div className="w-[30px] h-[30px]">
                    <Image
                      className="w-full h-full"
                      src={GroupIcon}
                      width={100}
                      height={100}
                      alt={'GroupIcon'}
                    />
                  </div>
                  <div>20</div>
                </div>
              </div>
              <div className="mt-4 hidden lg:flex">
                <Button
                  onClick={handleShowPopUpJoinBattle}
                  className="w-full rounded-full border-[2px] bg-[#2934B2] border-white text-sm font-semibold font-poppins"
                >
                  Join
                </Button>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-col w-[400px] justify-center items-center gap-2 border-2 border-white rounded-lg py-8 px-2 bg-white/50 relative mt-4">
            <div className="w-full flex flex-col justify-center items-center px-2">
              <div className="flex gap-2 justify-center items-end">
                <div className="flex justify-center items-center">
                  <Image
                    className="w-[35px] h-[35px]"
                    src={GoldCrown}
                    width={100}
                    height={100}
                    alt={'GoldCrown'}
                  />
                </div>
                <div>1st</div>
              </div>
              <div className="font-bold text-lg">10.000.000</div>
            </div>
            <div className="w-full flex justify-between px-2">
              <div className="flex flex-col justify-center items-center">
                <div className="flex gap-2">
                  <div className="flex justify-center items-center">
                    <Image
                      className="w-[20px] h-[20px]"
                      src={SilverMedal}
                      width={100}
                      height={100}
                      alt={'SilverMedal'}
                    />
                  </div>
                  <div>2nd</div>
                </div>
                <div className="font-bold text-lg">5.000.000</div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="flex gap-2">
                  <div className="flex justify-center items-center">
                    <Image
                      className="w-[20px] h-[20px]"
                      src={BronzeMedal}
                      width={100}
                      height={100}
                      alt={'BronzeMedal'}
                    />
                  </div>
                  <div>3rd</div>
                </div>
                <div className="font-bold text-lg">3.000.000</div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="text-lg text-[#3D3D3D] font-semibold">
                Sponsor
              </div>
              <div className="flex gap-2 justify-center items-center">
                <div className="flex justify-center items-center border boder-[#76A5D0] w-[65px] h-[65px] bg-white rounded-lg">
                  <Image
                    className="w-[50px] h-auto"
                    src={Amar}
                    width={100}
                    height={100}
                    alt={'Amar'}
                  />
                </div>
                <div className="flex justify-center items-center border boder-[#76A5D0] w-[65px] h-[65px] bg-white rounded-lg">
                  <Image
                    className="w-[50px] h-auto"
                    src={WeBull}
                    width={100}
                    height={100}
                    alt={'WeBull'}
                  />
                </div>
                <div className="flex justify-center items-center border boder-[#76A5D0] w-[65px] h-[65px] bg-white rounded-lg">
                  <Image
                    className="w-[50px] h-auto"
                    src={Jago}
                    width={100}
                    height={100}
                    alt={'Jago'}
                  />
                </div>
              </div>
            </div>

            <div
              onClick={() => {
                setShowTnc(!showTnc);
              }}
              className="flex flex-col gap-2 justify-center items-center mt-4 border-2 rounded-lg p-2 border-dashed border-[#2934B2]"
            >
              <div>Term and Condition</div>
              <div className="flex flex-col justify-start items-start gap-2 mt-2 text-xs overflow-y-scroll h-[100px]">
                <div>
                  1. Single competition, participants compete for prizes.
                </div>
                <div>2. Start with 50 million virtual capital.</div>
                <div>3. Winner based on highest equity score.</div>
                <div>4. Participants must follow Instagram @seeds_finance.</div>
                <div>5. Ticket fee: 100,000/entry (no promo code).</div>
              </div>
            </div>

            <div className="absolute right-[10px] top-[10px] flex justify-center items-center bg-white bg-opacity-35 w-[30px] h-[30px] rounded-md cursor-pointer hover:bg-opacity-70 duration-300">
              <Image
                className="w-[20px] h-[20px]"
                src={GreenGift}
                width={100}
                height={100}
                alt={'GreenGift'}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:hidden">
          <div className="flex flex-col justify-center items-center gap-2 mt-4">
            <div className="text-md text-[#3D3D3D] font-semibold">Sponsor</div>
            <div className="flex gap-2 justify-center items-center">
              <div className="flex justify-center items-center border boder-[#76A5D0] w-[65px] h-[65px] bg-white rounded-lg">
                <Image
                  className="w-[50px] h-auto"
                  src={Amar}
                  width={100}
                  height={100}
                  alt={'Amar'}
                />
              </div>
              <div className="flex justify-center items-center border boder-[#76A5D0] w-[65px] h-[65px] bg-white rounded-lg">
                <Image
                  className="w-[50px] h-auto"
                  src={WeBull}
                  width={100}
                  height={100}
                  alt={'WeBull'}
                />
              </div>
              <div className="flex justify-center items-center border boder-[#76A5D0] w-[65px] h-[65px] bg-white rounded-lg">
                <Image
                  className="w-[50px] h-auto"
                  src={Jago}
                  width={100}
                  height={100}
                  alt={'Jago'}
                />
              </div>
            </div>
          </div>

          <div
            onClick={() => {
              setShowTnc(!showTnc);
            }}
            className="flex gap-2 justify-center items-center mt-4"
          >
            <div>Term and Condition</div>
            <div className="bg-[#407F74] w-[25px] h-[25px] flex justify-center items-center rounded-md cursor-pointer hover:bg-opacity-70 duration-300">
              <Image
                className="w-[15px] h-[15px]"
                src={showTnc ? ArrowTailessUp : ArrowTailessDown}
                width={100}
                height={100}
                alt={showTnc ? 'ArrowTailessUp' : 'ArrowTailessDown'}
              />
            </div>
          </div>

          {showTnc && (
            <div className="flex flex-col justify-center items-start gap-2 border-2 mt-4 text-xs border-white rounded-2xl py-4 px-8 bg-white/50 relative">
              <div>1. Single competition, participants compete for prizes.</div>
              <div>2. Start with 50 million virtual capital.</div>
              <div>3. Winner based on highest equity score.</div>
              <div>4. Participants must follow Instagram @seeds_finance.</div>
              <div>5. Ticket fee: 100,000/entry (no promo code).</div>
            </div>
          )}

          <div className="mt-6">
            <Button
              onClick={handleShowPopUpJoinBattle}
              className="w-full rounded-full border-[2px] bg-[#2934B2] border-white text-sm font-semibold font-poppins"
            >
              Join
            </Button>
          </div>
        </div>
      </div>
      <PopUpJoinBattle
        isOpen={showPopUpJoinBattle}
        onClose={handleShowPopUpJoinBattle}
        battleId={id as string}
      />
    </>
  );
};

export default withAuth(MainTeamBattle);
