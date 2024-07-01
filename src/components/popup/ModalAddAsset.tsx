/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client';
import { calculatePercentageChange } from '@/helpers/assetPercentageChange';
import { standartCurrency } from '@/helpers/currency';
import { type AssetItemType } from '@/pages/homepage/play/[id]';
import { getMarketList } from '@/repository/market.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { XIcon } from 'public/assets/vector';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from '../ui/modal/Modal';

interface Props {
  onClose: () => void;
  setAssetList: (text: string[]) => void;
  assetList: string[];
}

const ModalAddAsset: React.FC<Props> = ({
  onClose,
  setAssetList,
  assetList
}) => {
  const { t } = useTranslation();
  const [checkboxState, setCheckboxState] = useState<string[]>(assetList);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [assets, setAssets] = useState<AssetItemType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filter, setFilter] = useState({
    search: searchQuery,
    limit: 5,
    page: 1,
    type: 'ALL',
    currency: ''
  });

  const handleCheckboxChange = (id: string, checked: boolean): void => {
    if (checked) {
      setCheckboxState([...checkboxState, id]);
    } else {
      setCheckboxState(checkboxState.filter((item: string) => item !== id));
    }
  };

  const handleSave = (): void => {
    setAssetList(checkboxState);
    onClose();
  };

  useEffect(() => {
    fetchData()
      .then()
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (userInfo !== undefined) {
      setFilter(prevState => ({
        ...prevState,
        currency: userInfo?.preferredCurrency ?? 'IDR'
      }));
    }
  }, [userInfo]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const fetchData = async (): Promise<void> => {
    try {
      const dataInfo = await getUserInfo();
      setUserInfo(dataInfo);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };

  const fetchDataAssets = async (): Promise<void> => {
    try {
      const response = await getMarketList({
        ...filter,
        search: searchQuery
      });
      if (response.result === null) {
        setAssets([]);
      } else {
        setAssets(response.marketAssetList);
      }
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };

  useEffect(() => {
    if (userInfo !== undefined && filter.currency !== '') {
      const fetchData = async (): Promise<void> => {
        await fetchDataAssets();
      };

      fetchData().catch(error => {
        toast.error('Error fetching data:', error);
      });
    }
  }, [filter, userInfo, searchQuery]);

  return (
    <Modal
      onClose={onClose}
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed bottom-0 md:top-[40%] md:left-[10%] md:right-[-10%] xl:left-[22.5%] xl:right-[-22.5%] mt-[-12.35rem] w-full md:w-[80%] xl:w-[60%] h-[70vh] md:h-[50vh] p-4 rounded-3xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white overflow-y-scroll"
    >
      <div className="flex justify-between">
        <Typography className="font-bold text-lg text-[#3AC4A0]">
          {t('tournament.watchlist.addAsset')}
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
      <div className="w-full flex gap-2 mt-4">
        <input
          id="search"
          type="text"
          name="search"
          value={searchQuery}
          onChange={e => {
            handleSearch(e);
          }}
          placeholder={`${t('tournament.watchlist.search')}`}
          className="block w-full text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-3 pl-8 rounded-xl border border-[#BDBDBD]"
        />
      </div>
      <div className="w-full gap-4 mt-4">
        {assets.map(item => (
          <div
            key={item.id}
            className="w-full h-fit py-2 mb-2 bg-[#F7FBFA] flex justify-between pl-2 pr-4 md:pl-4"
          >
            <div className="flex justify-start items-center gap-2 md:gap-4">
              <div className="h-[30px] w-[30px]">
                <img src={item?.logo} className="w-full h-full" />
              </div>
              <div>
                <div>
                  {item?.seedsTicker} / {item?.exchangeCurrency}
                </div>
                <div className="hidden md:flex">{item?.name}</div>
                <div className="md:hidden">
                  {item?.name?.length < 12
                    ? item?.name
                    : `${item?.name?.slice(0, 11)}...`}
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col justify-end items-end">
                <div>
                  {userInfo?.preferredCurrency !== undefined
                    ? userInfo?.preferredCurrency
                    : 'IDR'}
                  {standartCurrency(item?.priceBar?.close ?? 0).replace(
                    'Rp',
                    ''
                  )}
                </div>
                {item?.priceBar !== undefined && (
                  <div
                    className={`${
                      item?.priceBar?.close >= item?.priceBar?.open
                        ? 'text-[#3AC4A0]'
                        : 'text-[#DD2525]'
                    } text-base`}
                  >
                    {`(${calculatePercentageChange(
                      item?.priceBar?.open ?? 0,
                      item?.priceBar?.close ?? 0
                    )}%)`}
                  </div>
                )}
              </div>
              <input
                className="ml-4"
                type="checkbox"
                checked={!!checkboxState.includes(item?.id)}
                onChange={e => {
                  handleCheckboxChange(item?.id, e.target.checked);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 gap-2 w-full">
        <button
          onClick={() => {
            handleSave();
          }}
          className="bg-[#3AC4A0] rounded-lg text-white mt-4 py-2 px-4 w-full"
        >
          {t('tournament.watchlist.save')}
        </button>
      </div>
    </Modal>
  );
};

export default ModalAddAsset;
