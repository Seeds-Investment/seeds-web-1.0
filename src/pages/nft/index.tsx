import NFTTabs from '@/components/nft/tabs';
import withAuth from '@/helpers/withAuth';
import { Button, Card, Dialog, DialogBody } from '@material-tailwind/react';
import Image from 'next/image';
import logo from 'public/assets/logo-seeds.png';
import checklist from 'public/assets/nft/checklist.svg';
import diam from 'public/assets/vector/diam.svg';
import React, { useState, useEffect } from 'react';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { FiChevronRight, FiSearch } from 'react-icons/fi';
import { connectWallet } from '@/lib/diamnet';

const NFTDashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpen = () => setOpen(!open);
  const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token tidak ditemukan');
    }

const API_BASE_URL = process.env.SERVER_URL ?? 'https://seeds-dev-gcp.seeds.finance';
  const handleConnectWallet = async () => {
    if (walletAddress) {
      setOpen(true);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await connectWallet();
      if (result.success) {
        const publicKey = result.publicKey;
        setWalletAddress(publicKey);
        sessionStorage.setItem('walletSession', publicKey);
        setOpen(true);
      } else {
        setErrorMessage(result.error || 'Failed to connect wallet');
      }
  const publicKeyy = sessionStorage.getItem('walletSession')
  const walletconnect = {
    wallet_address: publicKeyy, 
  };

  // Panggil endpoint POST /nft/diamante/connect
  const swaggerResponse = await fetch(`${API_BASE_URL}/nft/diamante/connect`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken ?? ''}`, 
    },
    body: JSON.stringify(walletconnect),
  });
    } catch (error) {
      setErrorMessage('An unexpected error occurred');
      console.error('Wallet connection error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    const sessionWallet = sessionStorage.getItem('walletSession');
    if (sessionWallet) setWalletAddress(sessionWallet);

    const cleanupSession = () => sessionStorage.removeItem('walletSession');
    window.addEventListener('beforeunload', cleanupSession);
    return () => window.removeEventListener('beforeunload', cleanupSession);
  }, []);

  return (
    <section className="flex flex-col gap-2 md:gap-4">
      {/* Search Card */}
      <Card className="md:p-5 rounded-none md:rounded-xl">
        <div className="flex flex-row-reverse md:flex-col gap-4 bg-gradient-to-b from-[#3AC4A0] to-[#94CCBD] w-full p-4 md:px-8 md:py-6">
          <div className="flex justify-between items-center">
            <Image src={logo} alt="seeds-logo" className="w-16 hidden md:block" />
            <FaClockRotateLeft className="text-black" />
          </div>
          <div className="relative w-full">
            <FiSearch
              className="absolute top-1/2 -translate-y-1/2 md:left-3 right-3 w-4 h-4 md:w-5 md:h-5"
              color="#1A857D"
            />
            <input
              className="bg-[#F9F9F9] border border-[#E9E9E9] w-full rounded-xl h-10 md:ps-16 ps-3 md:pe-3 pe-8 py-3 outline-none font-poppins placeholder:font-normal placeholder:text-xs placeholder:text-[#BDBDBD]"
              placeholder="Search NFT"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Wallet Connection & Tabs Card */}
      <Card className="flex flex-col gap-9 md:p-5 rounded-none md:rounded-xl">
        <Button
          className="flex justify-between items-center bg-[#94CCBD] border border-[#4FE6AF] px-4 py-1.5 md:px-7 md:py-2 rounded-[10px]"
          onClick={handleConnectWallet}
          disabled={isLoading}
        >
          <div className="flex items-center gap-5">
            <Image src={diam} alt="diam-logo" />
            <p className="font-poppins font-semibold text-white text-sm">
              {isLoading
                ? "Connecting..."
                : walletAddress
                ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : "Connect to DIAM Wallet"}
            </p>
          </div>
          <FiChevronRight color="white" size={18} />
        </Button>
        
        {errorMessage && (
          <p className="text-red-500 text-sm px-4">{errorMessage}</p>
        )}

        <NFTTabs searchQuery={searchQuery} />
      </Card>

      {/* Connection Status Dialog */}
      <Dialog open={open} handler={handleOpen} className="p-2.5" size="sm">
        <DialogBody className="flex flex-col gap-4 p-0 justify-center items-center">
          <Image src={checklist} alt="checklist" />
          <div className="flex flex-col gap-3.5 items-center justify-center">
            <p className="font-poppins font-semibold text-sm text-black text-center">
              {walletAddress 
                ? `Successfully connected to wallet:\n${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : "Wallet connection successful!"}
            </p>
            <hr className="text-[#BDBDBD] w-full" />
            <p
              className="font-poppins font-semibold text-sm text-[#7555DA] cursor-pointer"
              onClick={handleOpen}
            >
              OK
            </p>
          </div>
        </DialogBody>
      </Dialog>
    </section>
  );
};

export default withAuth(NFTDashboard);