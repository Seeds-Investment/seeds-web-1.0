import useFilePreview from '@/hooks/useFilePreview';
import {
  createPassiveSellOffer,
  loadAccount,
  signAndSubmitTransaction
} from '@/lib/diamnet';
import { Button, Card, Dialog, DialogBody } from '@material-tailwind/react';
import * as DiamSdk from 'diamnet-sdk';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { FiImage } from 'react-icons/fi';
const API_BASE_URL =
  process.env.SERVER_URL ?? 'https://seeds-dev-gcp.seeds.finance';

const CreateNFT = (): ReactElement => {
  const router = useRouter();
  const [image, setImage] = useState<FileList | null>(null);
  const [imagePreview] = useFilePreview(image as FileList);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<string>('');

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>('');

  const handleDialogToggle = (): void => {
    setDialogOpen(!dialogOpen);
  };

  const handleCreateNFT = async (): Promise<void> => {
    try {
      // 1) Pastikan user punya wallet session
      const ownerAddress = sessionStorage.getItem('walletSession') ?? '';
      if (ownerAddress.length > 0) {
        setDialogMessage('Session wallet habis. Silakan login ulang.');
        setDialogOpen(true);
        void router.push('/nft');
        return;
      }

      // 2) Pastikan file NFT ada
      if (image === null || image.length === 0) {
        throw new Error('File NFT belum dipilih');
      }
      const media = image[0]; // Ambil file pertama

      // 3) Lakukan transaksi di Diamante
      const account = await loadAccount(ownerAddress);
      const sellingAsset = new DiamSdk.Asset(name, ownerAddress);
      const buyingAsset = DiamSdk.Asset.native();
      const amount = '1'; // asumsikan NFT = 1 unit
      const xdr = await createPassiveSellOffer(
        account,
        sellingAsset,
        buyingAsset,
        amount,
        price
      );
      const passphrase = 'Diamante Testnet 2024';
      await signAndSubmitTransaction(xdr, passphrase);

      const accessToken = localStorage.getItem('accessToken');
      if (accessToken === null) {
        throw new Error('Access token tidak ditemukan');
      }

      const uploadForm = new FormData();
      uploadForm.append('file', media);
      uploadForm.append('type', 'OTHER_URL');

      const uploadResponse = await fetch(`${API_BASE_URL}/v1/storage/cloud`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken ?? ''}`
        },
        body: uploadForm
      });

      if (!uploadResponse.ok) {
        throw new Error('Gagal upload file ke /v1/storage/cloud');
      }

      const uploadResult = await uploadResponse.json();
      const imageUrl = uploadResult?.path;
      if (imageUrl === undefined) {
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
        price: Number(price),
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
    } catch (error: any) {
      setDialogMessage(`Gagal membuat NFT: ${error.message as string}`);
      setDialogOpen(true);
    }
  };

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
          value={name}
          onChange={e => {
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
          onChange={e => {
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
          onValueChange={value => {
            setPrice(value ?? '');
          }}
        />
      </div>
      <Button
        className="text-lg font-semibold text-white bg-[#3AC4A0] rounded-full w-full normal-case font-poppins"
        onClick={handleCreateNFT}
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
            onClick={handleDialogToggle}
          >
            OK
          </p>
        </DialogBody>
      </Dialog>
    </Card>
  );
};

export default CreateNFT;
