/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client';
import { createWatchlist } from '@/repository/market.repository';
import { Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/modal/Modal';

interface WatchlistForm {
  play_id: string;
  name: string;
  image: File | string;
  asset_list: string[];
}

interface Props {
  onClose: () => void;
  id: string;
}

const ModalAddWatchlist: React.FC<Props> = ({
  onClose,
  id,
}) => {
  const { t } = useTranslation();
  const [watchlistName, setWatchlistName] = useState<string>();
  const [assetList, setAssetList] = useState<string[]>([]);
  const [form, setForm] = useState<WatchlistForm>({
    play_id: id ?? '',
    name: watchlistName ?? '',
    image: '',
    // asset_list: assetList
    asset_list: [
      "56e5eb70-3a9a-47f1-a9ee-ad5e861c241b"
    ]
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setWatchlistName(event.target.value);
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length > 0) {
      setForm({
        ...form,
        image: event.target.files[0]
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('play_id', form.play_id);
    formData.append('name', form.name);
    if (form.image) {
      formData.append('image', form.image);
    }
    formData.append('asset_list', JSON.stringify(form.asset_list));

    
    try {
      // await createWatchlist(formData);
      await createWatchlist(watchlistFormData);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Modal
      onClose={onClose}
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/75 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed bottom-0 md:top-[40%] md:left-[10%] md:right-[-10%] xl:left-[22.5%] xl:right-[-22.5%] mt-[-12.35rem] w-full md:w-[80%] xl:w-[60%] h-[50vh] p-4 rounded-3xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white overflow-y-scroll"
    >
      <div className="flex justify-between">
        <Typography className="font-bold text-lg text-[#3AC4A0]">
          Add Watchlist
        </Typography>
      </div>
      <div className="mt-4 gap-2">
        <div className='w-full'>
          <div className='my-2'>
            Watchlist Name:
          </div>
          <div>
            <input
              id="search"
              type="text"
              value={watchlistName}
              onChange={e => {
                handleInput(e);
              }}
              name="search"
              placeholder="Enter watchlist name..."
              className="block w-full xl:w-1/3 text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-3 pl-4 rounded-lg border border-[#BDBDBD]"
            />
          </div>
        </div>
        <div className='w-full'>
          <div className='my-2'>
            Watchlist Image:
          </div>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            {/* Add other form fields */}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddWatchlist;
