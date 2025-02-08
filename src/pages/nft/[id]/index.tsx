import NFTDialog from '@/components/nft/dialog';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from 'public/assets/logo-seeds.png';
import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiChevronRight } from 'react-icons/fi';
import { Asset } from 'diamnet-sdk';
import {
  loadAccount,
  createTrustline,
  createBuyOffer,
  createPassiveSellOffer,
  signAndSubmitTransaction,
  createSellOffer,
} from '@/lib/diamnet';

const passphrase = 'Diamante Testnet 2024';

type NFT = {
  id: string;
  name: string;
  description: string;
  metadata_cid: string;
  image_url: string;
  price: number;
  status: string;
  owner: {
    wallet_address: string;
    avatar: string;
  };
  creator: {
    wallet_address: string;
    avatar: string;
  };
};

type TransactionStatus = {
  type: 'success' | 'error' | 'warning' | 'info' | 'loading';
  message: string;
};

const NFTDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = useState<{ open: boolean; state: number }>({
    open: false,
    state: 0
  });
  const [detail, setDetail] = useState(false);
  const [transaction, setTransaction] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [nftDetail, setNftDetail] = useState<NFT | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

const API_BASE_URL = process.env.SERVER_URL ?? 'https://seeds-dev-gcp.seeds.finance';

  useEffect(() => {
    const sessionWallet = sessionStorage.getItem('walletSession');
    if (sessionWallet) {
      setWalletAddress(sessionWallet);
      setWallet(true);
    }
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchNFTDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/nft/${id}`);
        if (!response.ok) throw new Error(`Failed to fetch NFT: ${response.status}`);
        const data: NFT = await response.json();
        setNftDetail(data);
        setIsOwner(data.owner.wallet_address === sessionStorage.getItem('walletSession'));
      } catch (error) {
        console.error('Error fetching NFT details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNFTDetail();
  }, [id]);

  useEffect(() => {
    // Update isOwner whenever nftDetail or walletAddress change
    if (nftDetail && walletAddress) {
      setIsOwner(nftDetail.owner.wallet_address === walletAddress);
    }
  }, [nftDetail, walletAddress]);

  const handleBuy = async () => {
    if (!walletAddress || !nftDetail || !id) {
      setTransactionStatus({
        type: 'error',
        message: 'Wallet not connected or NFT data missing'
      });
      setOpen({ open: true, state: 0 });
      return;
    }

    try {
      setOpen({ open: true, state: 1 });
      setTransactionStatus({ type: 'loading', message: 'Initializing transaction...' });

      const account = await loadAccount(walletAddress);

      // Create Trustline
      setTransactionStatus({ type: 'loading', message: 'Setting up trustline...' });
      const buyingAsset = new Asset(nftDetail.name, nftDetail.creator.wallet_address);
      const trustlineXDR = await createTrustline(
        account,
        nftDetail.name,
        nftDetail.creator.wallet_address
      );
      await signAndSubmitTransaction(trustlineXDR, passphrase);

      // Create Buy Offer
      setTransactionStatus({ type: 'loading', message: 'Creating buy offer...' });
      const sellingAsset = Asset.native();
      const buyOfferXDR = await createBuyOffer(
        account,
        sellingAsset,
        buyingAsset,
        "1",
        nftDetail.price
      );

      // Submit Buy Offer
      const buyOfferResult = await signAndSubmitTransaction(buyOfferXDR, passphrase);
      if (!buyOfferResult.message.data) {
        throw new Error('Transaction signing failed');
      }

      // Update backend API
      setTransactionStatus({ type: 'loading', message: 'Updating ownership records...' });
      const accessToken = localStorage.getItem('accessToken');
      const apiResponse = await fetch(`${API_BASE_URL}/nft/buy/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({}),
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(errorData.message || 'API update failed');
      }

      setTransactionStatus({
        type: 'success',
        message: `NFT purchased successfully!\nTransaction Hash: ${buyOfferResult.message?.data || ''}`
      });
      setOpen({ open: true, state: 2 });

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setTransactionStatus({
        type: 'error',
        message: `Transaction failed: ${errorMessage}`
      });
      setOpen({ open: true, state: 3 });
      console.error('Transaction Error:', error);
    }
  };


const handleResell = async (newPrice: number) => {
  if (!walletAddress || !nftDetail) {
    setTransactionStatus({
      type: 'error',
      message: 'Wallet not connected or NFT data missing'
    });
    setOpen({ open: true, state: 0 });
    return;
  }
  console.log('Handling resell with price:', newPrice);
  
  try {

    const account = await loadAccount(walletAddress);
    const sellingAsset = new Asset(nftDetail.name, nftDetail.creator.wallet_address);
    const buyingAsset = Asset.native();

    const sellOfferXDR = await createSellOffer(
      account,
      sellingAsset,
      buyingAsset,
      "1",
      newPrice,
    );

    const signedTransaction = await signAndSubmitTransaction(sellOfferXDR, passphrase);

    console.log(sellingAsset, buyingAsset, newPrice, sellOfferXDR, signedTransaction);

    console.log('Signed transaction response:', signedTransaction);

    if (!signedTransaction.message.data) {
      throw new Error('Passive Sell Offer: Transaction signing failed!');
    }

    const accessToken = localStorage.getItem('accessToken');  
    const updateResponse = await fetch(`${API_BASE_URL}/nft/sell/${nftDetail?.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ price: newPrice })
    });

    console.log('Update response:', updateResponse);

    if (!updateResponse.ok) {
      throw new Error('Failed to update NFT status');
    }

    setTransactionStatus({
      type: 'success',
      message: 'NFT successfully listed for sale!'
    });

    setOpen({ open: true, state: 2 });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Error during resell:', errorMessage);
    setTransactionStatus({
      type: 'error',
      message: `Resell failed: ${errorMessage}`
    });
    setOpen({ open: true, state: 3 });
  }
};


  const getButtonState = () => {
    if (isOwner) {
      if (nftDetail?.status === 'TRUE') {
        return {
          text: 'Cannot buy or cancel your own NFT',
          disabled: true,
          action: () => {}
        };
      }
      return {
        text: 'Sell NFT',
        disabled: false,
        action: () => {
          const newPrice = parseFloat(prompt("Enter new price in DIAM") as string);
          if (!isNaN(newPrice)) {
            handleResell(newPrice);
          } else {
            alert('Invalid price entered!');
          }
        }
      };
    }
    return {
      text: 'BUY NFT',
      disabled: false,
      action: () => setOpen({ open: true, state: 0 })
    };
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading NFT details...</p>;
  }

  if (!nftDetail || !nftDetail.status || !nftDetail.owner.wallet_address || !nftDetail.price || !nftDetail.name || !nftDetail.image_url) {
    return (
      <p className="text-red-500 text-center mt-10">
        NFT not found. Please check the ID and try again.
      </p>
    );
  }

  const buttonState = getButtonState();

  return (
    <>
      <Card className="flex flex-col md:gap-4 p-0 md:p-5">
        <div className="flex justify-between items-center py-5 px-4 md:hidden font-semibold text-base text-neutral-medium font-poppins">
          <FiArrowLeft
            size={24}
            onClick={() => router.back()}
            className="cursor-pointer"
          />
          <p>Detail NFT</p>
          <div className="w-6 aspect-square" />
        </div>
        <Image
          src={nftDetail.image_url}
          alt={nftDetail.name}
          className="w-full object-cover aspect-[16/9] md:rounded-2xl"
          width={600}
          height={400}
        />
        <div className="flex flex-col gap-2 md:gap-4 p-3 md:p-0">
          <Button
            className="bg-[#3AC4A0] p-2.5 font-poppins font-semibold text-sm rounded-full normal-case"
            onClick={buttonState.action}
            disabled={buttonState.disabled || transactionStatus?.type === 'loading'}
          >
            {transactionStatus?.type === 'loading' ? 'Processing...' : buttonState.text}
          </Button>

          <div className="flex flex-col gap-3 bg-[#F3F4F8] border border-[#E9E9E9] rounded-lg py-2 px-3.5">
            <div className="flex flex-col gap-3.5">
              <div className="flex gap-3 items-center">
                <div className="flex gap-1.5 items-center">
                  <Image
                    src={nftDetail.creator.avatar}
                    alt="creator"
                    className="w-5 h-5 rounded-full"
                    width={32}
                    height={32}
                  />
                  <p className="font-poppins font-semibold text-sm md:text-base text-[#3AC4A0]">
                    {nftDetail.owner.wallet_address.slice(0, 6)}...{nftDetail.owner.wallet_address.slice(-4)}
                  </p>
                </div>
                <p className={`${
                  nftDetail.status === 'TRUE' 
                    ? 'bg-[#FFE9D4] text-[#B81516]' 
                    : 'bg-[#E9E9E9] text-neutral-soft'
                } rounded-full py-1 w-20 text-center font-semibold font-poppins text-xs`}>
                  {nftDetail.status === 'TRUE' ? 'On Sale' : 'Not Listed'}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-semibold font-poppins text-base md:text-lg text-neutral-medium">
                  {nftDetail.name}
                </p>
                <p className="font-poppins font-normal text-xs md:text-sm text-neutral-soft">
                  Owned By {nftDetail.owner.wallet_address.slice(0, 6)}...{nftDetail.owner.wallet_address.slice(-4)}
                </p>
                <p className="bg-[#3AC4A0] py-0.5 px-6 font-poppins font-normal text-[10px] leading-4 md:text-xs text-[#1A857D] w-fit rounded">
                  {nftDetail.price} DIAM
                </p>
              </div>
            </div>
            <p className="font-poppins font-normal text-[10px] leading-4 md:text-xs text-neutral-medium text-justify">
              {nftDetail.description}
            </p>
          </div>

          <Accordion
            open={detail}
            icon={<FiChevronRight className={`${detail ? 'rotate-90' : '-rotate-90 md:rotate-0'} transition-all`} size={24} />}
            className="py-2.5 ps-3.5 pe-5 bg-[#F3F4F8] border border-[#E9E9E9] rounded-lg"
          >
            <AccordionHeader
              onClick={() => setDetail(!detail)}
              className="p-0 font-semibold text-lg text-neutral-medium font-poppins border-none"
            >
              Token Detail
            </AccordionHeader>
            <AccordionBody className="flex flex-col gap-2.5 md:gap-4 py-4 md:py-5">
              <div className="flex justify-between items-center">
                <p className="text-neutral-medium text-xs md:text-sm font-normal font-poppins">
                  NFT Address
                </p>
                <u className="rounded px-3 md:px-7 bg-[#4FE6AF] text-[#1A857D] font-poppins font-normal text-[10px] leading-4">
                  {nftDetail.id.slice(0, 12)}
                </u>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-neutral-medium text-xs md:text-sm font-normal font-poppins">
                  Creator Address
                </p>
                <u className="rounded px-3 md:px-7 bg-[#4FE6AF] text-[#1A857D] font-poppins font-normal text-[10px] leading-4">
                  {nftDetail.creator.wallet_address.slice(0, 6)}...{nftDetail.creator.wallet_address.slice(-4)}
                </u>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-neutral-medium text-xs md:text-sm font-normal font-poppins">
                  Owner Address
                </p>
                <u className="rounded px-3 md:px-7 bg-[#4FE6AF] text-[#1A857D] font-poppins font-normal text-[10px] leading-4">
                  {nftDetail.owner.wallet_address.slice(0, 6)}...{nftDetail.owner.wallet_address.slice(-4)}
                </u>
              </div>
            </AccordionBody>
          </Accordion>
        </div>
      </Card>

      <NFTDialog
        open={open}
        nftDetail={nftDetail}
        handleBuy={handleBuy}
        walletAddress={walletAddress}
        handleOpen={() => setOpen({ open: false, state: 0 })}
        handleChange={(state) => setOpen({ open: true, state: state })}
      />
    </>
  );
};

export default NFTDetail;

