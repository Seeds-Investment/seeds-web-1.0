/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client';
import { calculatePercentageChange } from '@/helpers/assetPercentageChange';
import { standartCurrency } from '@/helpers/currency';
import { type AssetItemType } from '@/pages/homepage/play-assets';
import { getWatchlistById, updateWatchlist } from '@/repository/market.repository';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { XIcon } from 'public/assets/vector';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from '../ui/modal/Modal';
import ModalAddAsset from './ModalAddAsset';

interface WatchlistForm {
  watchlistId: string;
  asset_list: string[];
}

interface Watchlist {
  id: string;
  imgUrl: string;
  name: string;
  play_id: string;
}

interface AssetList {
  id: string;
  name: string;
  exchange: string;
  logo: string;
  seedsTicker: string;
  priceBar: PriceBar;
  listedCountry: string;
}

interface PriceBar {
  close: number;
  high: number;
  low: number;
  open: number;
}

interface Props {
  onClose: () => void;
  data: Watchlist;
  userInfo: UserInfo;
}

const ModalEditWatchlist: React.FC<Props> = ({
  onClose,
  data,
  userInfo,
}) => {
  const { t } = useTranslation();
  const [isDetailModal, setIsDetailModal] = useState<boolean>(false);
  const [assets, setAssets] = useState<AssetItemType[]>([]);
  const [watchList] = useState<string[]>([]);
  const [form, setForm] = useState<WatchlistForm>({
    watchlistId: data?.id,
    asset_list: watchList
  });

  useEffect(() => {
    void fetchPlayWatchlist();
  }, []);

  const fetchPlayWatchlist = async (): Promise<void> => {
    try {
      const response = await getWatchlistById(data?.id);
      setAssets(response?.watchlist?.assetList)
      
      response?.watchlist?.assetList.forEach((asset: AssetList) => {
        watchList.push(asset?.id)
      })
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };

  const handleSubmit = async (): Promise<void> => {    
    try {
      await updateWatchlist(form);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    } finally {
      onClose()
    }
  };

  return (
    <>
      {isDetailModal && (
        <ModalAddAsset
          onClose={() => {
            setIsDetailModal(prev => !prev);
          }}
          setAssetList={(text: string[]) => {
            setForm({ ...form, asset_list: text });
          }}
          assetList={form?.asset_list}
        />
      )}

      <Modal
        onClose={onClose}
        backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/75 flex justify-start items-start"
        modalClasses="z-50 animate-slide-down fixed bottom-0 md:top-[40%] md:left-[10%] md:right-[-10%] xl:left-[22.5%] xl:right-[-22.5%] mt-[-12.35rem] w-full md:w-[80%] xl:w-[60%] h-[70vh] md:h-[50vh] p-4 rounded-3xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white overflow-y-scroll"
      >
        <div className="flex justify-between">
          <Typography className="font-bold text-lg text-[#3AC4A0]">
            {data?.name ?? 'Watchlist'}
          </Typography>
          <Image
            src={XIcon}
            alt="X"
            width={30}
            height={30}
            onClick={onClose}
            className="hover:scale-110 transition ease-out cursor-pointer"
          />
        </div>
        <div className='w-full mt-4'>
          <div onClick={() => { setIsDetailModal(true); }} className='w-full py-2 px-4 bg-[#3AC4A0] rounded-lg text-white flex justify-center items-center cursor-pointer'>
            {t('tournament.watchlist.changeAsset')}
          </div>
        </div>
        <div className='w-full gap-4 mt-4'>
          {assets?.map(item => (
            <div key={item.id} className='w-full h-fit py-2 mb-2 bg-[#F7FBFA] flex justify-between pl-2 pr-4 md:pl-4'>
              <div className='flex justify-start items-center gap-2 md:gap-4'>
                <div className='h-[30px] w-[30px]'>
                  <img
                    src={item?.logo}
                    className='w-full h-full'
                  />
                </div>
                <div>
                  <div>
                    {item?.seedsTicker} / {item?.exchangeCurrency}
                  </div>
                  <div className='hidden md:flex'>
                    {item?.name}
                  </div>
                  <div className='md:hidden'>
                    {item?.name?.length < 12 ? item?.name : `${item?.name?.slice(0, 11)}...`}
                  </div>
                </div>
              </div>
              <div className='flex'>
                <div className='flex flex-col justify-end items-end'>
                  <div>
                    {userInfo?.preferredCurrency !== undefined ? userInfo?.preferredCurrency : 'IDR'}{standartCurrency(item?.priceBar?.close ?? 0).replace('Rp', '')}
                  </div>
                  {
                    item?.priceBar !== undefined &&
                      <div className={`${item?.priceBar?.close >= item?.priceBar?.open ? 'text-[#3AC4A0]' : 'text-[#DD2525]'} text-base`}>
                        {`(${calculatePercentageChange(item?.priceBar?.open ?? 0, item?.priceBar?.close ?? 0)}%)`}
                      </div>
                  }
                </div>
              </div>
            </div>
          ))}
        </div> 
        <div className='w-full flex justify-center items-center'>
          <button className='w-full md:w-[200px] bg-[#3AC4A0] rounded-lg text-white mt-4 py-2 px-4' onClick={ async() => { await handleSubmit() }}>{t('tournament.watchlist.save')}</button>  
        </div>
      </Modal>
    </>
  );
};

export default ModalEditWatchlist;
