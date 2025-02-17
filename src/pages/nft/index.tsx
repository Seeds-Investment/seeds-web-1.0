import NFTTabs from '@/components/nft/tabs';
import withAuth from '@/helpers/withAuth';
import { Button, Card, Dialog, DialogBody } from '@material-tailwind/react';
import Image from 'next/image';
import logo from 'public/assets/logo-seeds.png';
import checklist from 'public/assets/nft/checklist.svg';
import diam from 'public/assets/vector/diam.svg';
import React, { useState, useEffect, useCallback } from 'react';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { FiChevronRight, FiSearch } from 'react-icons/fi';
import { checkBalance, connectWallet } from '@/lib/diamnet';

const NFTDashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [popupStatus, setPopupStatus] = useState<
    'connected' | 'already_connected' | 'invalid_wallet'
  >('connected');
  const [diamBalance, setDiamBalance] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<{
    userId: string;
    address: string;
  } | null>(null);

  const API_BASE_URL =
    process.env.SERVER_URL ?? 'https://seeds-dev-gcp.seeds.finance';
  const accessToken = localStorage.getItem('accessToken');

  const handleOpen = () => setOpen(!open);

  const fetchUserId = async (): Promise<string> => {
    if (!accessToken) throw new Error('Access token tidak ditemukan');

    const response = await fetch(`${API_BASE_URL}/user/v1/`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!response.ok) throw new Error('Gagal mengambil User ID');
    const data = await response.json();
    return data.id;
  };

  const cleanupSession = useCallback(() => {
    sessionStorage.removeItem('walletSession');
    setWalletAddress(null);
    setDiamBalance(null);
    setSessionData(null);
  }, []);

  const handleConnectWallet = async () => {
    if (!accessToken) throw new Error('Authentication required');
    if (walletAddress) {
      setPopupStatus('already_connected');
      setOpen(true);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const currentUserId = await fetchUserId();
      const result = await connectWallet();

      if (result.success) {
        const publicKey = result.publicKey;
        const storedData = JSON.parse(
          localStorage.getItem('walletSession') || 'null'
        );

        // Cek jika user ID sama tapi address berbeda
        if (
          storedData &&
          storedData.userId === currentUserId &&
          storedData.address !== publicKey
        ) {
          setPopupStatus('invalid_wallet');
          setOpen(true);
          throw new Error(
            'Cannot connect different wallet to existing account'
          );
        }

        // Simpan session baru
        const newSessionData = { userId: currentUserId, address: publicKey };
        localStorage.setItem('walletSession', JSON.stringify(newSessionData));
        sessionStorage.setItem('walletSession', publicKey);

        setWalletAddress(publicKey);
        setSessionData(newSessionData);
        setPopupStatus('connected');
        setOpen(true);

        await fetch(`${API_BASE_URL}/nft/diamante/connect`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({ wallet_address: publicKey })
        });
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeSession = async () => {
      const sessionWallet = sessionStorage.getItem('walletSession');
      const storedData = JSON.parse(
        localStorage.getItem('walletSession') || 'null'
      );

      if (sessionWallet && storedData) {
        try {
          const currentUserId = await fetchUserId();

          // Validasi kesesuaian user ID dan address
          if (
            storedData.userId === currentUserId &&
            storedData.address === sessionWallet
          ) {
            setWalletAddress(sessionWallet);
            setSessionData(storedData);
          }
        } catch (error) {
          cleanupSession();
        }
      }
    };

    initializeSession();
  }, []);

  useEffect(() => {
    const sessionTimer = setTimeout(() => {
      cleanupSession();
    }, 10 * 60 * 1000);

    const fetchBalance = async () => {
      if (walletAddress) {
        try {
          const balanceResult = await checkBalance(walletAddress);
          if (balanceResult.success) {
            const nativeBalance = balanceResult.balances[0];
            setDiamBalance(nativeBalance.replace('diams', 'DIAM'));
          }
        } catch (error) {
          console.error('Gagal mengambil balance:', error);
        }
      }
    };

    fetchBalance();

    return () => clearTimeout(sessionTimer);
  }, [walletAddress]);

  return (
    <section className="flex flex-col gap-2 md:gap-4">
      {/* Search Card */}
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
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
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
                ? 'Connecting...'
                : walletAddress
                ? diamBalance
                  ? `${diamBalance}`
                  : `0 DIAM`
                : 'Connect to DIAM Wallet'}
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
            <p className="font-poppins font-semibold text-sm text-black text-center whitespace-pre-line">
              {popupStatus === 'connected' &&
                'Successfully connected to DIAM Wallet'}
              {popupStatus === 'already_connected' &&
                `Already connected to:\n${walletAddress?.slice(
                  0,
                  6
                )}...${walletAddress?.slice(
                  -4
                )}\nCannot connect another wallet`}
              {popupStatus === 'invalid_wallet' &&
                'Cannot connect different wallet to existing account'}
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
