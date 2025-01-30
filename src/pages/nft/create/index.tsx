import useFilePreview from '@/hooks/useFilePreview';
import { Button, Card } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { FiImage } from 'react-icons/fi';

const CreateNFT = (): ReactElement => {
  const router = useRouter();
  const [image, setImage] = useState<FileList | null>(null);
  const [imagePreview] = useFilePreview(image as FileList);
  return (
    <Card className="p-5 flex flex-col gap-4">
      <div>
        <label htmlFor="file">
          {imagePreview !== undefined ? (
            <img
              src={imagePreview}
              alt="nft-create-logo"
              className="w-full aspect-video rounded-2xl"
            />
          ) : (
            <div className="w-full aspect-video bg-[#F3F4F8] rounded-2xl p-8">
              <div className="border-dashed border border-[#7555DA80] w-full aspect-video rounded-xl flex flex-col items-center justify-center gap-2">
                <FiImage className="text-[#9533E680] w-10 h-10" />
                <p className="font-poppins text-[#3AC4A0] font-semibold text-base">
                  Upload Photo/Video
                </p>
              </div>
            </div>
          )}
        </label>
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={e => {
            setImage(e.target.files);
          }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <label
          htmlFor="name"
          className="font-semibold text-neutral-medium text-base font-poppins"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          className="rounded-xl border border-[#E9E9E9] h-[52px] placeholder:font-normal placeholder:text-base placeholder:text-[#BDBDBD] placeholder:font-poppins font-poppins text-neutral-medium text-base p-4"
          placeholder="Nature"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label
          htmlFor="name"
          className="font-semibold text-neutral-medium text-base font-poppins"
        >
          Bio / Description{' '}
          <span className="font-normal font-poppins text-xs">{`(optional)`}</span>
        </label>
        <input
          type="text"
          id="name"
          className="rounded-xl border border-[#E9E9E9] h-[101px] placeholder:font-normal placeholder:text-base placeholder:text-[#BDBDBD] placeholder:font-poppins font-poppins text-neutral-medium text-base p-4"
          placeholder="Let people know about your creativity..."
        />
      </div>
      <div className="flex flex-col gap-4">
        <label
          htmlFor="name"
          className="font-semibold text-neutral-medium text-base font-poppins"
        >
          Price
        </label>
        <CurrencyInput
          disableAbbreviations
          placeholder="Enter DIAM amount"
          suffix=" DIAM"
          className="rounded-xl border border-[#E9E9E9] h-[52px] placeholder:font-normal placeholder:text-base placeholder:text-[#BDBDBD] placeholder:font-poppins font-poppins text-neutral-medium text-base p-4"
        />
      </div>
      <Button
        className="text-lg font-semibold text-white bg-[#3AC4A0] rounded-full w-full normal-case font-poppins"
        onClick={async () => {
          await router.push('/my-profile');
        }}
      >
        Post For Sale
      </Button>
    </Card>
  );
};

export default CreateNFT;
