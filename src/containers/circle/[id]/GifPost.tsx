import back_nav from '@/assets/circle-page/back_nav.svg';
import {
  getGifFromGhipy,
  searchGifFromGhipy
} from '@/repository/circleDetail.repository';
import { type GiphyI } from '@/utils/interfaces/chat.interface';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useState } from 'react';
interface form {
  content_text: string;
  privacy?: string;
  media_urls: string[];
}
interface props {
  setPages: any;
  form: form;
  isTooMuch: boolean;
  setErrorMessage: any;
  setIsError: any;
}

const GifPost: React.FC<props> = ({
  setPages,
  form,
  isTooMuch,
  setErrorMessage,
  setIsError
}) => {
  const [dataGif, setData]: any = useState();
  const [search, setSearch] = useState({
    searchGif: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const cancelHandler = (): void => {
    setPages('text');
  };

  const fetchGif = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { data } = (await getGifFromGhipy()) as GiphyI;
      setData(data);
    } catch (error: any) {
      console.error('Error fetching Gif from ghipy', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoading = (): JSX.Element => (
    <div className="h-72 flex justify-center">
      <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
    </div>
  );

  useEffect(() => {
    void fetchGif();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePostGif = (url: any): any => {
    if (isTooMuch) {
      setIsError(true);
      setErrorMessage('You can only post maximum 4 images, video and gif');
    } else {
      form.media_urls.push(url);
    }
    setPages('text');
  };

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): any => {
    const { name, value } = event.target;
    setSearch(prevSearch => ({ ...prevSearch, [name]: value }));
  };

  const searchGhipy = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { data } = await searchGifFromGhipy(search.searchGif);
      setData(data);
    } catch (error: any) {
      console.error('Error Search Gif from ghipy', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      void searchGhipy();
    }
  };

  return (
    <div className="block bg-white w-full">
      <div className="flex flex-row items-center justify-between">
        <button type="button" onClick={cancelHandler}>
          <Image alt="Back" src={back_nav} className="h-6 w-6 object-cover" />
        </button>
        <h1 className="flex-1 text-center font-poppins font-semibold text-lg">
          Choose GIF
        </h1>
      </div>
      <div className="relative w-full mt-8">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" />
        <form>
          <input
            type="text"
            name="searchGif"
            value={search.searchGif}
            onChange={handleFormChange}
            className="block w-full text-[#262626] text-sm h-10 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-2 pl-10 rounded-full border border-[#BDBDBD]"
            placeholder="Search GIF"
            onKeyDown={handleKeyDown}
          />
        </form>
      </div>
      {isLoading ? (
        renderLoading()
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-8">
          {dataGif?.map((el: any, i: number) => {
            return (
              <div
                className="max-h-[230px]"
                onClick={() => {
                  handlePostGif(el.images.preview_gif.url);
                }}
                key={`${i} + 'GHIPHY'`}
              >
                <img
                  alt="gif"
                  src={el?.images?.preview_gif.url}
                  className="h-full w-full object-cover cursor-pointer"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default GifPost;
