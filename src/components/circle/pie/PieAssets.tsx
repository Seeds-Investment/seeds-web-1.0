import { SearchCircle } from '@/components/forms/searchCircle';
import { assetAll } from '@/repository/asset.repository';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { Avatar, Button, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import CardAsset from './CardAsset';

interface props {
  changeToAsset: any;
  handleSelectedAsset: any;
  selectedAsset: any[];
  removeSelectedAsset: any;
}

interface AssetInterface {
  id: string;
  quote: string;
  currency: string;
  image: string;
  name: string;
  price: number;
  regularPercentage: number;
}

const initialFilterAsset = {
  limit: 10,
  page: 1,
  sortBy: '',
  search: ''
};

const tabValue = [
  {
    label: 'Overview',
    value: ''
  },
  {
    label: 'Stocks',
    value: 'stock'
  },
  {
    label: 'Cryptos',
    value: 'crypto'
  }
];

const PieAssets: React.FC<props> = ({
  changeToAsset,
  selectedAsset,
  handleSelectedAsset,
  removeSelectedAsset
}) => {
  const [asset, setAsset] = useState<AssetInterface[]>();
  const [filterAsset, setFilterAsset] = useState(initialFilterAsset);
  const [isLoadingAsset, setIsLoadingAsset] = useState<boolean>(false);

  const handleChangeFilter = (event: any): void => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFilterAsset(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const fetchTopAsset = async (): Promise<void> => {
    try {
      setIsLoadingAsset(true);
      assetAll(filterAsset)
        .then(res => {
          setAsset(res.result);
          setIsLoadingAsset(false);
        })
        .catch(err => {
          setIsLoadingAsset(false);
          console.log(err);
        });
    } catch (error: any) {
      setIsLoadingAsset(false);
      console.error('Error fetching asset data:', error.message);
    }
  };

  useEffect(() => {
    fetchTopAsset()
      .then()
      .catch(() => {});
  }, [filterAsset]);

  return (
    <div>
      <div>
        <h1 className="font-bold text-xl text-black">Select Asset</h1>
      </div>
      <button className="absolute top-5 right-5 text-gray-600 hover:text-gray-800 text-md">
        <XMarkIcon className="cursor-pointer" width={30} height={30} />
      </button>

      <div className="flex flex-row mb-5">
        {selectedAsset.length !== 0
          ? selectedAsset.map((data, idx) => (
              <div
                className="relative flex flex-col mr-5 items-center justify-center"
                key={idx}
              >
                <Avatar
                  size="md"
                  variant="circular"
                  src={data.image}
                  alt="Avatar"
                  className="mb-2"
                />
                <XCircleIcon
                  className="w-6 h-6 z-10 absolute transform top-[-20px] text-[#9E9E9E] border-white translate-x-1/2 translate-y-1/2"
                  onClick={() => removeSelectedAsset(idx)}
                />
              </div>
            ))
          : null}
      </div>

      <div>
        <div className="flex flex-row w-full gap-2 items-center justify-start my-2 text-sm">
          {tabValue.map((data, idx) => (
            <Button
              variant={
                filterAsset.sortBy === data.value ? 'filled' : 'outlined'
              }
              name="sortBy"
              value={data.value}
              className={`${
                filterAsset.sortBy === data.value
                  ? 'bg-[#3AC4A0] text-white'
                  : 'border-[#3AC4A0] text-[#3AC4A0]'
              }`}
              key={idx}
              onClick={handleChangeFilter}
            >
              {data.label}
            </Button>
          ))}
        </div>

        <SearchCircle
          name="search"
          type="outline"
          prefix={<MagnifyingGlassIcon className="w-5 h-5 text-[#262626]" />}
          onChange={e => {
            handleChangeFilter(e);
          }}
          placeholder="Search"
          value={filterAsset.search}
        />

        {!isLoadingAsset ? (
          asset?.length !== 0 ? (
            asset?.map((data, idx) => (
              <CardAsset
                data={data}
                key={idx}
                handleSelectedAsset={handleSelectedAsset}
              />
            ))
          ) : (
            <Typography className="text-base w-full font-semibold text-[#262626] text-center items-center my-3">
              Data Not Found
            </Typography>
          )
        ) : (
          <Typography className="text-base w-full font-semibold text-[#262626] text-center items-center my-3">
            Loading...
          </Typography>
        )}
      </div>

      <div className="flex items-center justify-center">
        <button
          className="text-white font-semibold font-poppins bg-seeds-button-green p-2 rounded-full mt-2 w-1/2"
          onClick={changeToAsset}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PieAssets;
