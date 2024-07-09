import Seedy from '@/assets/promo/seedy.svg';
import { type IDetailTournament } from '@/utils/interfaces/tournament.interface';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';

interface PromoCodeSelectionProps {
  detailTournament: IDetailTournament | undefined;
}

const PromoCodeSelection: React.FC<PromoCodeSelectionProps> = ({
  detailTournament
}) => {

  const data = [
    {
      id: '1',
      name: 'data 1'
    },
    {
      id: '2',
      name: 'data 2'
    },
    {
      id: '3',
      name: 'data 3'
    },
    {
      id: '4',
      name: 'data 4'
    },
    {
      id: '5',
      name: 'data 5'
    },
    {
      id: '6',
      name: 'data 6'
    },
  ]

  return (
    <div className="flex flex-col justify-center items-center rounded-xl font-poppins p-5 bg-white">
      <Typography className='font-poppins text-2xl lg:text-3xl text-center font-semibold'>
        Choose Voucher & Promo
      </Typography>
      <div className='flex flex-col md:flex-row gap-4 w-full justify-center items-center mt-4'>
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Have a promo code? Enter it here!"
          className="block w-full md:w-[300px] text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-3 pl-4 rounded-xl border border-[#BDBDBD]"
        />
        <div className='bg-[#BDBDBD] w-full md:w-[100px] py-2 rounded-full text-white px-8 flex justify-center items-center'>
          Apply
        </div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 xl:mt-8 font-poppins">
        {data.map((item, index) => (
          <div key={item.id} className="flex rounded-xl bg-gradient-to-r from-[#FDD059] to-white relative border border-[#B57A12] overflow-hidden">
            <div className='flex justify-center items-center'>
              <div className='w-[100px] h-[100px] ml-[20px] flex justify-center items-center p-2'>
                <Image
                  alt="Seedy"
                  src={Seedy}
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className='bg-[#D89918] w-[20px] h-full absolute left-0'/>
            <div className='p-4 border-l border-dashed border-[#B57A12]'>
              <div className='font-semibold text-xl'>
                Diskon 60% s/d 50RB
              </div>
              <div>
                Min Pembelian Rp 50RB
              </div>
              <div className='text-[#7C7C7C]'>
                Berakhir dalam 12 jam
              </div>
            </div>
            <div className='absolute right-[-10px] bottom-[10px] bg-[#FDBA22] text-white px-4 rounded-full'>
              7x
            </div>
          </div>
        ))}
      </div>
      <div className='flex w-full rounded-full bg-[#BDBDBD] justify-center items-center text-white text-lg py-4 mt-8'>
        Use Promo
      </div>
    </div>
  );
};

export default PromoCodeSelection;
