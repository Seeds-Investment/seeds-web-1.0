/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import Bullish from '@/assets/play/tournament/bullish.svg';
import CoinLogo from '@/assets/play/tournament/coinLogo.svg';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
// import { useTranslation } from 'react-i18next';

const DetailPortfolio = (): React.ReactElement => {
  // const { t } = useTranslation();

  return (
    <>
      <div className='w-full flex flex-col justify-center items-center rounded-xl p-5 bg-white'>
        <div className='flex justify-start w-full'>
          <Typography className='text-xl font-semibold font-poppins'>
            Detail Portfolio
          </Typography>
        </div>
        <div className='w-full flex justify-between items-center p-4 mt-4 bg-[#F9F9F9] border border-[#E9E9E9] md:border-none rounded-lg font-poppins'>
          <div className='flex gap-2 md:gap-4'>
            <Image alt="" src={CoinLogo} className='w-[30px] md:w-[40px]'/>
            <div className='flex flex-col justify-center items-start'>
              <div className='flex gap-1'>
                <Typography className='text-sm md:text-lg text-black font-poppins font-semibold'>
                  ETH /
                </Typography>
                <Typography className='text-sm md:text-lg text-black font-poppins'>
                  BIDR
                </Typography>
              </div>
              <Typography className='text-sm md:text-lg text-[#7C7C7C] font-poppins'>
                Ethereum
              </Typography>
            </div>
          </div>
          <div className='flex flex-col justify-end items-end'>
            <Typography className='text-sm md:text-lg text-black font-poppins font-semibold'>
              IDR 3.575.000
            </Typography>
            <div className='flex justify-center gap-2'>
              <Image alt="" src={Bullish} className='w-[20px]'/>
              <Typography className='text-[#3AC4A0] font-poppins text-sm md:text-md'>
                (47%)
              </Typography>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-2 p-4 mt-4 bg-[#F9F9F9] border border-[#E9E9E9] md:border-none rounded-lg'>
          <div className='w-full flex justify-between'>
            <Typography className='text-sm md:text-lg text-[#7C7C7C] font-poppins'>
              Total Value
            </Typography>
            <Typography className='text-sm md:text-lg font-semibold text-black font-poppins'>
              IDR 4.575.000
            </Typography>
          </div>
          <div className='w-full flex justify-between'>
            <Typography className='text-sm md:text-lg text-[#7C7C7C] font-poppins'>
              Invested
            </Typography>
            <Typography className='text-sm md:text-lg text-black font-poppins'>
              IDR 3.575.000
            </Typography>
          </div>
          <div className='w-full flex justify-between'>
            <Typography className='text-sm md:text-lg text-[#7C7C7C] font-poppins'>
              Return
            </Typography>
            <Typography className='text-sm md:text-lg text-[#DA2D1F] font-poppins'>
              -IDR 92.000
            </Typography>
          </div>
          <div className='w-full flex justify-between'>
            <Typography className='text-sm md:text-lg text-[#7C7C7C] font-poppins'>
              Return Percentage
            </Typography>
            <Typography className='text-sm md:text-lg text-[#DA2D1F] font-poppins'>
              -3.16%
            </Typography>
          </div>
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-2 p-4 mt-4 bg-[#F9F9F9] border border-[#E9E9E9] md:border-none rounded-lg'>
          <div className='w-full flex justify-between'>
            <Typography className='text-sm md:text-lg text-[#7C7C7C] font-poppins'>
              Owned Lot
            </Typography>
            <Typography className='text-sm md:text-lg text-black font-poppins'>
              10
            </Typography>
          </div>
          <div className='w-full flex justify-between'>
            <Typography className='text-sm md:text-lg text-[#7C7C7C] font-poppins'>
              Average Price
            </Typography>
            <Typography className='text-sm md:text-lg text-black font-poppins'>
              IDR 375.500
            </Typography>
          </div>
          <div className='w-full flex justify-between'>
            <Typography className='text-sm md:text-lg text-[#7C7C7C] font-poppins'>
              Current Price
            </Typography>
            <Typography className='text-sm md:text-lg text-black font-poppins'>
              IDR 385.500
            </Typography>
          </div>
        </div>
        <div className='flex justify-between items-center w-full mt-4'>
          <Typography className='text-lg font-semibold font-poppins'>
            Matched Order
          </Typography>
          <Typography className='text-sm text-seeds-button-green font-poppins cursor-pointer'>
            See More
          </Typography>
        </div>
        <div className='w-full flex flex-col gap-2 mt-4'>
          <div className='flex justify-between w-full border boder-[#E9E9E9] rounded-lg p-4'>
            <div className='flex flex-col justify-start items-start'>
              <Typography className='text-xs md:text-md text-black font-poppins font-semibold'>
                04 December 2023
              </Typography>
              <Typography className='text-xs md:text-md text-[#7C7C7C] font-poppins'>
                11:59
              </Typography>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <Typography className='text-xs md:text-md text-[#4DA81C] font-poppins'>
                Buy
              </Typography>
              <Typography className='text-xs md:text-md text-[#7C7C7C] font-poppins'>
                1 Lot
              </Typography>
            </div>
            <div className='flex flex-col justify-end items-end'>
              <Typography className='text-xs md:text-md text-black font-poppins font-semibold'>
                IDR 365.000
              </Typography>
              <Typography className='text-xs md:text-md text-[#7C7C7C] font-poppins'>
                IDR 365.000
              </Typography>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col gap-2 mt-4'>
          <div className='flex justify-between w-full border boder-[#E9E9E9] rounded-lg p-4'>
            <div className='flex flex-col justify-start items-start'>
              <Typography className='text-xs md:text-md text-black font-poppins font-semibold'>
                04 December 2023
              </Typography>
              <Typography className='text-xs md:text-md text-[#7C7C7C] font-poppins'>
                11:59
              </Typography>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <Typography className='text-xs md:text-md text-[#4DA81C] font-poppins'>
                Buy
              </Typography>
              <Typography className='text-xs md:text-md text-[#7C7C7C] font-poppins'>
                1 Lot
              </Typography>
            </div>
            <div className='flex flex-col justify-end items-end'>
              <Typography className='text-xs md:text-md text-black font-poppins font-semibold'>
                IDR 365.000
              </Typography>
              <Typography className='text-xs md:text-md text-[#7C7C7C] font-poppins'>
                IDR 365.000
              </Typography>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col gap-2 mt-4'>
          <div className='flex justify-between w-full border boder-[#E9E9E9] rounded-lg p-4'>
            <div className='flex flex-col justify-start items-start'>
              <Typography className='text-xs md:text-md text-black font-poppins font-semibold'>
                04 December 2023
              </Typography>
              <Typography className='text-xs md:text-md text-[#7C7C7C] font-poppins'>
                11:59
              </Typography>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <Typography className='text-xs md:text-md text-[#4DA81C] font-poppins'>
                Buy
              </Typography>
              <Typography className='text-xs md:text-md text-[#7C7C7C] font-poppins'>
                1 Lot
              </Typography>
            </div>
            <div className='flex flex-col justify-end items-end'>
              <Typography className='text-xs md:text-md text-black font-poppins font-semibold'>
                IDR 365.000
              </Typography>
              <Typography className='text-xs md:text-md text-[#7C7C7C] font-poppins'>
                IDR 365.000
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-center items-center rounded-xl p-5 bg-white gap-4 mt-4'>
        <Button className='w-full rounded-full bg-[#DD2525] font-poppins'>
          Sell
        </Button>
        <Button className='w-full rounded-full bg-seeds-button-green font-poppins'>
          Buy
        </Button>
      </div>
    </>
  );
};

export default DetailPortfolio;
