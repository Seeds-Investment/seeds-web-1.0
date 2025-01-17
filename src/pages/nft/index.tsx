import NFTTabs from '@/components/nft/tabs';
import withAuth from '@/helpers/withAuth';
import { Button, Card } from '@material-tailwind/react';
import Image from 'next/image';
import logo from 'public/assets/logo-seeds.png';
import diam from 'public/assets/vector/diam.svg';
import React, { useState, useEffect } from 'react';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { FiChevronRight, FiSearch } from 'react-icons/fi';
import { connectWallet } from '@/lib/diamnet';

const NFTDashboard: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    if (walletAddress) {
      alert(`Already connected to wallet: ${walletAddress}`);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await connectWallet();
      if (result.success) {
        const publicKey = result.publicKey;
        setWalletAddress(publicKey);
        localStorage.setItem('walletAddress', publicKey); 
      } else {
        setErrorMessage(`Failed to connect: ${result.error}`);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred while connecting.");
      console.error("Error during wallet connection:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
    }
  }, []);

  return (
    <section className="flex flex-col gap-2 md:gap-4">
      <Card className="md:p-5 rounded-none md:rounded-xl">
        <div className="flex flex-row-reverse md:flex-col gap-4 bg-gradient-to-b from-[#3AC4A0] to-[#94CCBD] w-full p-4 md:px-8 md:py-6">
          <div className="flex justify-between items-center">
            <Image
              src={logo}
              alt="seeds-logo"
              className="w-16 hidden md:block"
            />
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
            />
          </div>
        </div>
      </Card>
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
                ? `Welcome ${walletAddress}`
                : "Connect to DIAM Wallet"}
            </p>
          </div>
          <FiChevronRight color="white" size={18} />
        </Button>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
        <NFTTabs />
      </Card>
    </section>
  );
};

export default withAuth(NFTDashboard);
