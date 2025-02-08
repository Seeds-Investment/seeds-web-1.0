import {
  Button,
  Card,
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Asset } from 'diamnet-sdk';
import * as DiamSdk from 'diamnet-sdk';
import {
  loadAccount,
  createTrustline,
  createBuyOffer,
  signAndSubmitTransaction,
} from '@/lib/diamnet';

type TransactionStatus = {
  type: 'success' | 'error' | 'warning' | 'info' | 'loading';
  message: string;
};

const passphrase = 'Diamante Testnet 2024';

type NFT = {
  id: string;
  name: string;
  description: string;
  metadata_cid: string;
  image_url: string;
  price: number;
  owner: {
    wallet_address: string;
    avatar: string;
  };
  creator: {
    wallet_address: string;
    avatar: string;
  };
};

const NFTDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [nftDetail, setNftDetail] = useState<NFT | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_BASE_URL = 'https://seeds-dev-gcp.seeds.finance';

  useEffect(() => {
    const sessionWallet = sessionStorage.getItem('walletSession');
    if (sessionWallet) {
      setWalletAddress(sessionWallet);
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
      } catch (error) {
        console.error('Error fetching NFT details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNFTDetail();
  }, [id]);

  const handleBuy = async () => {
  if (!walletAddress || !nftDetail || !id) {
    setTransactionStatus({
      type: 'error',
      message: 'Wallet not connected or NFT data missing'
    });
    setIsModalOpen(true);
    return;
  }

  try {
    setIsModalOpen(true);
    setTransactionStatus({ type: 'loading', message: 'Initializing transaction...' });

    // 1. Load buyer account
    setTransactionStatus({ type: 'loading', message: 'Loading account details...' });
    const account = await loadAccount(walletAddress);

    // 2. Create Trustline
    setTransactionStatus({ type: 'loading', message: 'Setting up trustline...' });
    const buyingAsset = new Asset(nftDetail.name, nftDetail.creator.wallet_address);
    console.log(nftDetail.creator.wallet_address)
    const trustlineXDR = await createTrustline(account, nftDetail.name, nftDetail.creator.wallet_address);
    const trustlineResult = await signAndSubmitTransaction(trustlineXDR, passphrase);

    // 3. Create Buy Offer
    setTransactionStatus({ type: 'loading', message: 'Creating buy offer...' });
    const sellingAsset = Asset.native();
    const buyOfferXDR = await createBuyOffer(
      account,
      sellingAsset,
      buyingAsset,
      "1",
      nftDetail.price
    );

    // 4. Submit Buy Offer
    const buyOfferResult = await signAndSubmitTransaction(buyOfferXDR, passphrase);

    if (!buyOfferResult.success || !buyOfferResult.message?.data) {
      throw new Error('Transaction signing failed');
    }

    // 5. Update backend API
    setTransactionStatus({ type: 'loading', message: 'Updating ownership records...' });
    const apiResponse = await fetch(`${API_BASE_URL}/nft/buy/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      throw new Error(errorData.message || 'API update failed');
    }

    // Final success
    setTransactionStatus({
      type: 'success',
      message: `NFT purchased successfully!\nBlockchain and backend updated!\nTransaction Hash: ${buyOfferResult.message.data}`
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    setTransactionStatus({
      type: 'error',
      message: `Transaction failed: ${errorMessage}`
    });
    console.error('Transaction Error:', error);
  } finally {
    setIsModalOpen(false);
  }
};

  const getStatusStyles = () => {
    switch (transactionStatus?.type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-400',
          text: 'text-green-800',
          icon: '✅'
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-400',
          text: 'text-red-800',
          icon: '❌'
        };
      case 'loading':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-400',
          text: 'text-blue-800',
          icon: '⏳'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-400',
          text: 'text-gray-800',
          icon: 'ℹ️'
        };
    }
  };

  const statusStyles = getStatusStyles();

  if (isLoading) {
    return <p className="text-center mt-10">Loading NFT details...</p>;
  }

  if (!nftDetail) {
    return (
      <p className="text-red-500 text-center mt-10">
        NFT not found. Please check the ID and try again.
      </p>
    );
  }

  return (
    <div className="relative">
      {/* Transaction Status Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${statusStyles.bg} ${statusStyles.border} ${statusStyles.text} rounded-lg p-6 max-w-md w-full shadow-lg transition-all duration-300`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{statusStyles.icon}</span>
              <h3 className="text-lg font-semibold capitalize">
                {transactionStatus?.type || 'status'}
              </h3>
            </div>
            <p className="whitespace-pre-wrap">{transactionStatus?.message}</p>
            <button
              className={`mt-4 px-4 py-2 rounded-md ${
                transactionStatus?.type === 'loading' 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } transition-colors`}
              onClick={() => {
                if (transactionStatus?.type !== 'loading') {
                  setIsModalOpen(false);
                  setTransactionStatus(null);
                }
              }}
              disabled={transactionStatus?.type === 'loading'}
            >
              {transactionStatus?.type === 'loading' ? 'Processing...' : 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* NFT Content */}
      <Card className="flex flex-col md:gap-4 p-0 md:p-5">
        <Image
          src={nftDetail.image_url}
          alt={nftDetail.name}
          className="w-full object-cover aspect-[16/9] md:rounded-2xl"
          width={600}
          height={400}
          priority
        />
        <div className="flex flex-col gap-2 md:gap-4 p-3 md:p-0">
          <Button 
            className="bg-[#3AC4A0] hover:bg-[#2FA387] p-2.5 font-poppins font-semibold text-sm rounded-full transition-colors"
            onClick={handleBuy}
            disabled={isModalOpen && transactionStatus?.type === 'loading'}
          >
            {transactionStatus?.type === 'loading' ? 'Processing Purchase...' : 'BUY'}
          </Button>
          
          <div className="flex flex-col gap-3 bg-[#F3F4F8] border border-[#E9E9E9] rounded-lg py-2 px-3.5">
            <div className="flex flex-col gap-3.5">
              <div className="flex gap-1.5 items-center">
                <Image
                  src={nftDetail.creator?.avatar}
                  alt="Creator Avatar"
                  className="w-5 h-5 rounded-full"
                  width={32}
                  height={32}
                />
                <p className="font-poppins font-semibold text-sm md:text-base text-[#3AC4A0]">
                  {nftDetail.creator?.wallet_address}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold font-poppins text-base md:text-lg text-neutral-medium">
                  {nftDetail.name}
                </p>
                <p className="font-poppins font-normal text-xs md:text-sm text-neutral-soft">
                  Owned By {nftDetail.owner?.wallet_address}
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
        </div>
      </Card>
    </div>
  );
};

export default NFTDetail; 