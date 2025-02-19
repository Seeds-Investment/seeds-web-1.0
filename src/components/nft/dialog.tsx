import { Button, Dialog, DialogBody } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface TransactionStatus {
  type: 'success' | 'error' | 'warning' | 'info' | 'loading';
  message: string;
}

interface NFT {
  id: string;
  name: string;
  price: number;
  image_url: string;
  creator: {
    wallet_address: string;
    avatar: string;
  };
  owner: {
    wallet_address: string;
  };
}

interface NFTDialogProps {
  open: { open: boolean; state: number };
  handleOpen: () => void;
  handleChange: (state: number) => void;
  transactionStatus?: TransactionStatus;
  nftDetail?: NFT;
  handleBuy: () => Promise<void>;
  walletAddress?: string | null;
}

const NFTDialog = ({
  open,
  handleOpen,
  handleChange,
  transactionStatus,
  nftDetail,
  handleBuy,
  walletAddress
}: NFTDialogProps): React.ReactElement => {
  const router = useRouter();

  const renderTransactionContent = (): React.ReactElement => {
    if (transactionStatus !== undefined) {
      return (
        <div
          className={`p-4 rounded-lg text-center ${
            transactionStatus.type === 'success'
              ? 'bg-green-50 text-green-800'
              : transactionStatus.type === 'error'
              ? 'bg-red-50 text-red-800'
              : 'bg-blue-50 text-blue-800'
          }`}
        >
          <p className="font-semibold mb-2">
            {transactionStatus.type.toUpperCase()}
          </p>
          <p className="whitespace-pre-wrap text-sm">
            {transactionStatus.message}
          </p>
          <Button
            className="mt-4 bg-[#3AC4A0] text-white"
            onClick={handleOpen}
            disabled={transactionStatus.type === 'loading'}
          >
            {transactionStatus.type === 'loading' ? 'Processing...' : 'Close'}
          </Button>
        </div>
      );
    }

    switch (open.state) {
      case 0:
        return (
          <div className="py-8 px-4 md:px-9 flex flex-col gap-4 items-center justify-center">
            <Image
              src={nftDetail?.image_url ?? '/placeholder-nft.png'}
              alt="nft-logo"
              className="rounded-xl w-40 h-40 object-cover"
              width={160}
              height={160}
            />
            <div className="w-full md:w-7/12 border border-[#E9E9E9] bg-[#F9F9F9] flex flex-col gap-6 p-4 rounded-lg font-poppins">
              <div className="flex justify-between items-center font-semibold text-sm">
                <p className="text-[#BDBDBD]">Price</p>
                <p className="text-neutral-medium">{nftDetail?.price} DIAM</p>
              </div>
              <div className="w-full pt-4 flex flex-col-reverse md:flex-row gap-4">
                <Button
                  className="w-full rounded-full text-white bg-[#DD2525]"
                  onClick={handleOpen}
                >
                  Cancel
                </Button>
                <Button
                  className="w-full rounded-full bg-[#3AC4A0] text-white"
                  onClick={() => {
                    handleChange(1);
                  }}
                >
                  Buy
                </Button>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="py-11 px-4 md:px-9 flex flex-col gap-4 items-center justify-center">
            <p className="pb-3.5 px-10 border-b border-[#BDBDBD] font-semibold text-base text-center">
              Send Transaction
            </p>
            <div className="w-full border border-[#E9E9E9] bg-[#F9F9F9] grid grid-cols-2 gap-6 p-4 rounded-lg text-sm">
              <p className="text-[#BDBDBD]">From</p>
              <p className="text-[#262626] truncate">
                {nftDetail?.owner.wallet_address}
              </p>
              <p className="text-[#BDBDBD]">To</p>
              <p className="text-[#262626] truncate">{walletAddress}</p>
              <p className="text-[#BDBDBD]">Type</p>
              <p className="text-[#262626] px-8 py-1.5 bg-[#9adfcd] rounded-md">
                NFT BUY
              </p>
              <p className="text-[#BDBDBD]">Amount</p>
              <p className="text-[#262626] px-7 py-1.5 bg-[#f1f1f1] rounded-md">
                {nftDetail?.price} DIAM
              </p>
            </div>
            <div className="w-full pt-4 flex flex-col-reverse md:flex-row gap-4">
              <Button
                className="w-full rounded-full bg-[#DD2525] text-white"
                onClick={handleOpen}
              >
                Cancel
              </Button>
              <Button
                className="w-full rounded-full bg-[#3AC4A0] text-white"
                onClick={handleBuy}
              >
                Confirm Transaction
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="py-11 px-4 md:px-9 flex flex-col gap-4 items-center justify-center">
            <p className="pb-3.5 border-b border-[#BDBDBD] font-semibold text-base text-center">
              Purchase Successful! 🎉
            </p>
            <Image
              src={nftDetail?.image_url ?? '/placeholder-nft.png'}
              alt="nft-logo"
              className="rounded-xl w-40 h-40 object-cover"
              width={160}
              height={160}
            />
            <div className="flex flex-col items-center">
              <p className="text-sm text-neutral-medium">
                Congratulations! Your NFT
              </p>
              <p className="text-sm text-neutral-medium text-center">
                <span className="font-bold">{nftDetail?.name}</span> has been
                successfully purchased
              </p>
            </div>
            <div className="w-full pt-4 flex flex-col md:flex-row gap-4">
              <Button
                className="w-full rounded-full border-[#3AC4A0] text-[#3AC4A0] bg-white"
                onClick={() => {
                  router.back();
                }}
              >
                Back to Marketplace
              </Button>
              <Button
                className="w-full rounded-full bg-[#3AC4A0] text-white"
                onClick={() => {
                  void router.push('/my-profile');
                }}
              >
                Go to Profile
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="py-11 px-4 md:px-9 flex flex-col gap-4 items-center justify-center">
            <p className="pb-3.5 border-b border-[#BDBDBD] font-semibold text-base text-center text-red-500">
              Purchase or Sell Failed! ❌
            </p>
            <Image
              src={nftDetail?.image_url ?? '/placeholder-nft.png'}
              alt="nft-logo"
              className="rounded-xl w-40 h-40 object-cover"
              width={160}
              height={160}
            />
            <div className="flex flex-col items-center">
              <p className="text-sm text-neutral-medium text-center">
                Sorry, your transaction could not be completed.
              </p>
            </div>
            <div className="w-full pt-4 flex flex-col md:flex-row gap-4">
              <Button
                className="w-full rounded-full bg-red-600 text-white"
                onClick={handleOpen}
              >
                Close
              </Button>
            </div>
          </div>
        );

      default:
        return <></>;
    }
  };

  return (
    <Dialog
      open={open.open}
      handler={handleOpen}
      size="md"
      className="rounded-xl font-poppins"
    >
      <DialogBody className="p-0">{renderTransactionContent()}</DialogBody>
    </Dialog>
  );
};

export default NFTDialog;
