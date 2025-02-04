import { Button, Dialog, DialogBody } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FiX } from 'react-icons/fi';

const NFTDialog = ({
  wallet,
  sale,
  open,
  handleSale,
  handleOpen,
  handleChange
}: {
  wallet: boolean;
  sale: boolean;
  open: { open: boolean; state: number };
  handleSale: () => void;
  handleOpen: () => void;
  handleChange: (state: number) => void;
}): React.ReactElement => {
  const router = useRouter();
  return (
    <Dialog open={open.open} handler={handleOpen} size="md">
      {wallet ? (
        sale ? (
          <DialogBody className="p-0">
            <div className="py-8 px-4 md:px-9 flex flex-col gap-4 items-center justify-center">
              <Image
                src=""
                alt="nft-logo"
                className="bg-green-500 rounded-xl w-40 h-40"
              />
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-neutral-medium text-base text-center font-poppins">
                  Monkey Nyengir tapi fungky
                </p>
                <p className="font-normal text-neutral-medium text-base text-center font-poppins">
                  Are you sure you want to cancel this sale?
                </p>
              </div>

              <div className="w-full pt-4 px-0 md:px-4 flex flex-col-reverse sm:flex-row gap-4">
                <Button
                  className="w-full rounded-full bg-white font-poppins font-semibold text-sm normal-case text-[#3AC4A0] border border-[#3AC4A0]"
                  onClick={handleOpen}
                >
                  No
                </Button>
                <Button
                  className="w-full rounded-full text-white font-poppins font-semibold text-sm normal-case bg-[#3AC4A0]"
                  onClick={() => {
                    handleSale();
                  }}
                >
                  Yes, Cancel
                </Button>
              </div>
            </div>
          </DialogBody>
        ) : (
          <DialogBody className="p-5 flex flex-col gap-5 items-center justify-center">
            <div className="flex justify-between items-center w-full">
              <p
                className="font-semibold text-neutral-medium text-lg font-poppins
"
              >
                Enter Price
              </p>
              <FiX size={30} className="text-neutral-soft" />
            </div>
            <input
              className="bg-[#F9F9F9] border border-neutral-soft placeholder:text-[#BDBDBD] placeholder:font-poppins placeholder:text-base placeholder:font-normal text-neutral-medium font-poppins text-base font-normal w-full rounded-lg p-3"
              placeholder="Enter Price"
            />
            <div className="w-full flex gap-4">
              <Button
                className="w-full rounded-full bg-white font-poppins font-semibold text-sm normal-case text-[#3AC4A0] border border-[#3AC4A0]"
                onClick={handleOpen}
              >
                Cancel
              </Button>
              <Button
                className="w-full rounded-full text-white font-poppins font-semibold text-sm normal-case bg-[#3AC4A0]"
                onClick={() => {
                  handleSale();
                }}
              >
                Confirm
              </Button>
            </div>
          </DialogBody>
        )
      ) : (
        <DialogBody className="p-0">
          {open.state === 0 ? (
            <div className="py-8 px-4 md:px-9 flex flex-col gap-4 items-center justify-center">
              <Image
                src=""
                alt="nft-logo"
                className="bg-green-500 rounded-xl w-40 h-40"
              />
              <p className="pb-3.5 border-b border-[#BDBDBD] font-semibold text-black text-sm text-center font-poppins">
                NFT Name
              </p>
              <div className="w-full md:w-7/12 border border-[#E9E9E9] bg-[#F9F9F9] flex flex-col gap-6 p-4 rounded-lg font-poppins">
                <div className="flex justify-between items-center font-semibold text-sm">
                  <p className="text-[#BDBDBD]">Price</p>
                  <p className="text-neutral-medium">100.000 DIAM</p>
                </div>
                <div className="flex justify-between items-center font-semibold text-sm">
                  <p className="text-[#BDBDBD]">Your Balance</p>
                  <p className="text-neutral-medium">300.000 DIAM</p>
                </div>
              </div>
              <div className="w-full pt-4 px-0 md:px-4 flex gap-4">
                <Button
                  className="w-full rounded-full text-white font-poppins font-semibold text-sm normal-case bg-[#DD2525]"
                  onClick={handleOpen}
                >
                  Cancel
                </Button>
                <Button
                  className="w-full rounded-full text-white font-poppins font-semibold text-sm normal-case bg-[#3AC4A0]"
                  onClick={() => {
                    handleChange(1);
                  }}
                >
                  Buy
                </Button>
              </div>
            </div>
          ) : open.state === 1 ? (
            <div className="py-11 px-4 md:px-9 flex flex-col gap-4 items-center justify-center">
              <p className="pb-3.5 px-10 border-b border-[#BDBDBD] font-semibold text-black text-base text-center font-poppins">
                Send 1 Transaction
              </p>
              <div className="w-full md:w-fit border border-[#E9E9E9] bg-[#F9F9F9] grid grid-cols-2 gap-6 p-4 rounded-lg font-poppins font-semibold text-sm">
                <p className="text-[#BDBDBD]">From</p>
                <p className="text-[#8f8f8f]">https:mns//baj.com</p>
                <p className="text-[#BDBDBD]">To</p>
                <p className="text-[#8f8f8f] px-2 py-1.5 bg-[#f1f1f1] rounded-md text-center w-fit">
                  Seeds Finance
                </p>
                <p className="text-[#BDBDBD]">Type</p>
                <p className="text-[#fcfcfc] px-8 py-1.5 bg-[#9adfcd] rounded-md text-center w-fit">
                  NFT BUY
                </p>
                <p className="text-[#BDBDBD]">Deposit</p>
                <p className="text-[#8f8f8f] px-7 py-1.5 bg-[#f1f1f1] rounded-md text-center w-fit">
                  100 DIAM
                </p>
              </div>
              <div className="w-full pt-4 px-0 md:px-4 flex flex-col-reverse md:flex-row gap-2  md:gap-4">
                <Button
                  className="w-full rounded-full text-white font-poppins font-semibold text-sm normal-case bg-[#DD2525]"
                  onClick={handleOpen}
                >
                  Cancel
                </Button>
                <Button
                  className="w-full rounded-full text-white font-poppins font-semibold text-sm normal-case bg-[#3AC4A0]"
                  onClick={() => {
                    handleChange(2);
                  }}
                >
                  Confirm Transaction
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-11 px-4 md:px-9 flex flex-col gap-4 items-center justify-center">
              <p className="pb-3.5 border-b border-[#BDBDBD] font-semibold text-black text-base text-center font-poppins">
                Purchase Successful! 🎉
              </p>
              <Image
                src=""
                alt="nft-logo"
                className="bg-green-500 rounded-xl w-40 h-40"
              />
              <div className="flex flex-col justify-center items-center">
                <p className="font-poppins font-normal text-sm text-neutral-medium">
                  Congratulations! Your NFT
                </p>
                <p className="font-poppins font-normal text-sm text-neutral-medium text-center md:w-10/12 w-full">
                  <span className="font-bold">Monkey Fungky</span> has beeen
                  successfully purchased and saved to your profile. You can view
                  and manage it anytime.
                </p>
              </div>
              <div className="w-full pt-4 px-0 md:px-4 flex flex-col-reverse md:flex-row gap-2  md:gap-4">
                <Button
                  className="w-full rounded-full text-[#3AC4A0] font-poppins font-semibold text-sm normal-case border-[#3AC4A0] border bg-white"
                  onClick={() => {
                    router.back();
                  }}
                >
                  Back to Marketplace
                </Button>
                <Button
                  className="w-full rounded-full text-white font-poppins font-semibold text-sm normal-case bg-[#3AC4A0]"
                  onClick={async () => {
                    await router.push('/my-profile');
                  }}
                >
                  Go to Profile
                </Button>
              </div>
            </div>
          )}
        </DialogBody>
      )}
    </Dialog>
  );
};

export default NFTDialog;
