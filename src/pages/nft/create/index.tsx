import useFilePreview from '@/hooks/useFilePreview';
import { Button, Card, Dialog, DialogBody } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { FiImage } from 'react-icons/fi';
import * as DiamSdk from 'diamnet-sdk';
import {
  loadAccount,
  signAndSubmitTransaction,
  createPassiveSellOffer
} from '../../../lib/diamnet';
import Image from 'next/image';

const API_BASE_URL =
  process.env.SERVER_URL ?? 'https://seeds-dev-gcp.seeds.finance';

interface CreateNFTResponse {
  path?: string;
}

const CreateNFT = (): ReactElement => {
  const router = useRouter();
  const [image, setImage] = useState<FileList | null>(null);
  const [imagePreview] = useFilePreview(image as FileList);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const handleDialogToggle = (): void => {
    setDialogOpen((prev) => !prev);
  };

  const handleCreateNFT = async (): Promise<void> => {
    try {
      const ownerAddress = sessionStorage.getItem('walletSession') ?? '';

      if (ownerAddress.trim() === '') {
        setDialogMessage('Session wallet habis. Silakan login ulang.');
        setDialogOpen(true);
        void router.push('/nft');
        return;
      }

      // Explicit check untuk file NFT
      if (image === null || image.length === 0) {
        throw new Error('File NFT belum dipilih');
      }

      const media = image[0];
      const account = await loadAccount(ownerAddress);
      const sellingAsset = new DiamSdk.Asset(name, ownerAddress);
      const buyingAsset = DiamSdk.Asset.native();
      const amount = '1';
      const xdr = await createPassiveSellOffer(
        account,
        sellingAsset,
        buyingAsset,
        amount,
        price
      );
      const passphrase = 'Diamante Testnet 2024';

      await signAndSubmitTransaction(xdr, passphrase);

      const accessToken = localStorage.getItem('accessToken') ?? '';
      if (accessToken === '') {
        throw new Error('Access token tidak ditemukan');
      }

      const uploadForm = new FormData();
      uploadForm.append('file', media);
      uploadForm.append('type', 'OTHER_URL');

      const uploadResponse = await fetch(`${API_BASE_URL}/v1/storage/cloud`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: uploadForm
      });

      if (!uploadResponse.ok) {
        throw new Error('Gagal upload file ke /v1/storage/cloud');
      }

      const uploadResult = (await uploadResponse.json()) as CreateNFTResponse;
      const imageUrl = uploadResult?.path ?? '';

      // Cek null/empty string secara eksplisit
      if (imageUrl === '') {
        throw new Error(
          'File berhasil diupload, tapi "path" tidak ditemukan di response'
        );
      }

      const metadataCid = '';
      const creatorAddress = ownerAddress;
      const status = 'TRUE';

      const swaggerPayload = {
        name,
        description,
        metadata_cid: metadataCid,
        image_url: imageUrl,
        price: Number.isNaN(Number(price)) ? 0 : Number(price),
        owner_address: ownerAddress,
        creator_address: creatorAddress,
        status
      };

      const swaggerResponse = await fetch(`${API_BASE_URL}/nft/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(swaggerPayload)
      });

      if (!swaggerResponse.ok) {
        throw new Error('Gagal mengirim data ke backend Swagger API');
      }

      setDialogMessage(
        'NFT berhasil dibuat dan passive sell offer berhasil dibuat!'
      );
      setDialogOpen(true);
      void router.push('/my-profile');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Terjadi kesalahan tidak diketahui';
      setDialogMessage(`Gagal membuat NFT: ${errorMessage}`);
      setDialogOpen(true);
    }
  };

  return (
    <Card className="p-5 flex flex-col gap-4">
      <div>
        <label htmlFor="file">
          {/* Explicit check pada imagePreview agar tidak null, undefined, atau string kosong */}
          {(imagePreview !== null && imagePreview !== undefined && imagePreview !== '') ? (
            <div className="w-full aspect-video rounded-2xl overflow-hidden">
              <Image
                src={imagePreview}
                alt="nft-create-preview"
                className="object-cover"
                width={800}
                height={600}
              />
            </div>
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
          onChange={(e) => {
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
        {/* Tambah curly braces agar tidak dianggap return "void expression" */}
        <input
          type="text"
          id="name"
          className="rounded-xl border border-[#E9E9E9] h-[52px] placeholder:font-normal placeholder:text-base placeholder:text-[#BDBDBD] placeholder:font-poppins font-poppins text-neutral-medium text-base p-4"
          placeholder="Nature"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-4">
        <label
          htmlFor="description"
          className="font-semibold text-neutral-medium text-base font-poppins"
        >
          Bio / Description{' '}
          <span className="font-normal font-poppins text-xs">(optional)</span>
        </label>
        <input
          type="text"
          id="description"
          className="rounded-xl border border-[#E9E9E9] h-[101px] placeholder:font-normal placeholder:text-base placeholder:text-[#BDBDBD] placeholder:font-poppins font-poppins text-neutral-medium text-base p-4"
          placeholder="Let people know about your creativity..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-4">
        <label
          htmlFor="price"
          className="font-semibold text-neutral-medium text-base font-poppins"
        >
          Price
        </label>
        <CurrencyInput
          disableAbbreviations
          placeholder="Enter DIAM amount"
          suffix=" DIAM"
          className="rounded-xl border border-[#E9E9E9] h-[52px] placeholder:font-normal placeholder:text-base placeholder:text-[#BDBDBD] placeholder:font-poppins font-poppins text-neutral-medium text-base p-4"
          value={price}
          onValueChange={(value) => {
            setPrice(value ?? '');
          }}
        />
      </div>

      <Button
        className="text-lg font-semibold text-white bg-[#3AC4A0] rounded-full w-full normal-case font-poppins"
        onClick={() => {
          void handleCreateNFT();
        }}
      >
        Post For Sale
      </Button>

      <Dialog
        open={dialogOpen}
        handler={handleDialogToggle}
        className="p-2.5"
        size="sm"
      >
        <DialogBody className="flex flex-col gap-4 p-0 justify-center items-center">
          <p className="font-poppins font-semibold text-sm text-black">
            {dialogMessage}
          </p>
          <hr className="text-[#BDBDBD] w-full" />
          <p
            className="font-poppins font-semibold text-sm text-[#7555DA] cursor-pointer"
            onClick={() => {
              handleDialogToggle();
            }}
          >
            OK
          </p>
        </DialogBody>
      </Dialog>
    </Card>
  );
};

export default CreateNFT;
