import {
  addAssetToWatchlist,
  checkAssetInWatchlist,
  getWatchlistById
} from '@/repository/market.repository';
import {
  type AssetWatchlist,
  type Watchlist
} from '@/utils/interfaces/watchlist.interface';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { XIcon } from 'public/assets/vector';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from '../ui/modal/Modal';
import ModalSuccessAddAsset from './ModalSuccessAddAsset';

interface Props {
  onClose: () => void;
  assetId: string;
  assetName: string;
  watchlists: Watchlist[];
}

const ModalWatchlist: React.FC<Props> = ({
  onClose,
  assetId,
  assetName,
  watchlists
}) => {
  const { t } = useTranslation();
  const [checkboxState, setCheckboxState] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedWatchlists, setFetchedWatchlists] = useState<AssetWatchlist[]>(
    []
  );
  const [isOpenModalSuccessAddAsset, setIsOpenModalSuccessAddAsset] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchWatchlists = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const watchlistData: AssetWatchlist[] = await Promise.all(
          watchlists.map(
            async watchlist => await getWatchlistById(watchlist.id)
          )
        );
        setFetchedWatchlists(watchlistData);
        const initialCheckboxState = await Promise.all(
          watchlistData.map(async watchlist => {
            try {
              const response = await checkAssetInWatchlist(
                watchlist.watchlist.id,
                assetId
              );
              return response.is_watch === true ? watchlist.watchlist.id : null;
            } catch (error) {
              toast.error(
                `Error checking asset in watchlist ${watchlist.watchlist.id}: ${
                  error as string
                }`
              );
              return null;
            }
          })
        );
        setCheckboxState(initialCheckboxState.filter(Boolean) as string[]);
      } catch (error) {
        toast.error(`Error fetching watchlists ${error as string}`);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchWatchlists();
  }, [watchlists, assetId]);

  const handleCheckboxChange = (
    watchlistId: string,
    isChecked: boolean
  ): void => {
    if (isChecked) {
      setCheckboxState([...checkboxState, watchlistId]);
    } else {
      setCheckboxState(checkboxState.filter(id => id !== watchlistId));
    }
  };

  const handleAddToWatchlist = async (): Promise<void> => {
    for (const watchlistId of checkboxState) {
      try {
        await addAssetToWatchlist(watchlistId, assetId);
        toast.success(`Asset added to watchlist ${watchlistId}`);
      } catch (error) {
        toast.error(
          `Error adding asset to watchlist ${watchlistId}: ${error as string}`
        );
      }
    }
    onClose();
  };

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/75 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed bottom-0 md:top-[50%] md:left-[20%] md:right-[-20%] xl:left-[30%] xl:right-[-30%] mt-[-12.35rem] w-full md:w-[60%] xl:w-[40%] h-[380px] p-4 lg:rounded-2xl rounded-t-2xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white"
    >
      {isLoading ? (
        <div className="flex items-center justify-center my-4">
          <div className="animate-spinner w-14 h-14 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center round mb-6">
            <Typography className="flex-1 text-center font-poppins font-semibold text-base">
              {t('tournament.watchlist.modalHeader')}
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
          <div className="h-[150px] overflow-y-auto px-6 flex flex-col gap-2 mb-8">
            {fetchedWatchlists.map(data => (
              <div
                key={data?.watchlist?.id}
                className="flex justify-between items-center bg-[#F9F9F9] p-2 rounded-lg sc"
              >
                <Typography className="font-poppins font-normal text-base">
                  {data?.watchlist?.name}
                </Typography>
                <input
                  className="cursor-pointer w-5 h-5"
                  type="checkbox"
                  checked={checkboxState.includes(data?.watchlist?.id)}
                  onChange={e => {
                    handleCheckboxChange(data?.watchlist?.id, e.target.checked);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-4 px-6">
            <Button
              onClick={() => {
                setIsOpenModalSuccessAddAsset(true);
              }}
              className="w-full rounded-full font-poppins font-semibold text-sm bg-seeds-button-green"
            >
              {t('tournament.watchlist.addToWatchlist')}
            </Button>
            <Button className="w-full rounded-full font-poppins font-semibold text-sm bg-white border-2 border-[#3ac4a0] text-seeds-button-green">
              {t('tournament.watchlist.newWatchlist')}
            </Button>
          </div>
          {isOpenModalSuccessAddAsset && (
            <ModalSuccessAddAsset
              onClose={() => {
                setIsOpenModalSuccessAddAsset(prev => !prev);
              }}
              assetName={assetName}
            />
          )}
        </>
      )}
    </Modal>
  );
};

export default ModalWatchlist;
