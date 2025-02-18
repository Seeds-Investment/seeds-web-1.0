import NFTTabs from '@/components/nft/tabs';
import withAuth from '@/helpers/withAuth';
import { Button, Card, Dialog, DialogBody } from '@material-tailwind/react';
import Image from 'next/image';
import logo from 'public/assets/logo-seeds.png';
import checklist from 'public/assets/nft/checklist.svg';
import diam from 'public/assets/vector/diam.svg';
import React, {
  useState,
  useEffect,
  useCallback,
  type ReactElement
} from 'react';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { FiChevronRight, FiSearch } from 'react-icons/fi';
import { checkBalance, connectWallet } from '@/lib/diamnet';

/**
 * Tipe response dari /user/v1/
 */
interface UserDataResponse {
  id: string;
}

/**
 * Tipe data session wallet
 */
interface WalletSessionData {
  userId: string;
  address: string;
}

/**
 * Tipe hasil connectWallet
 */
interface ConnectWalletResult {
  success: boolean;
  publicKey: string;
}

/**
 * Tipe hasil checkBalance
 */
interface CheckBalanceResult {
  success: boolean;
  balances: string[];
}

const NFTDashboard = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [popupStatus, setPopupStatus] = useState<
    'connected' | 'already_connected' | 'invalid_wallet'
  >('connected');
  const [diamBalance, setDiamBalance] = useState<string | null>(null);

  const API_BASE_URL: string =
    process.env.SERVER_URL ?? 'https://seeds-dev-gcp.seeds.finance';

  /**
   * Ambil accessToken dari localStorage (pastikan cek environment)
   */
  const accessToken: string | null =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  /**
   * Buka/tutup popup
   */
  const handleOpen = (): void => {
    setOpen((prev) => !prev);
  };

  /**
   * Bersihkan session wallet
   */
  const cleanupSession = useCallback((): void => {
    sessionStorage.removeItem('walletSession');
    localStorage.removeItem('walletSession');
    setWalletAddress(null);
    setDiamBalance(null);
  }, []);

  /**
   * Mengambil userId dari backend
   * Dibungkus useCallback agar tidak selalu re-create di setiap render
   */
  const fetchUserId = useCallback(async (): Promise<string> => {
    if (accessToken === null) {
      throw new Error('Access token tidak ditemukan');
    }
    const response = await fetch(`${API_BASE_URL}/user/v1/`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!response.ok) {
      throw new Error('Gagal mengambil User ID');
    }

    const data: UserDataResponse = await response.json();
    return data.id;
  }, [API_BASE_URL, accessToken]);

  /**
   * Fungsi untuk konek wallet
   */
  const handleConnectWallet = useCallback(async (): Promise<void> => {
    if (accessToken === null) {
      setErrorMessage('Authentication required');
      return;
    }

    // Jika walletAddress sudah ada, user dianggap sudah connect
    if (
      walletAddress !== null &&
      walletAddress !== undefined &&
      walletAddress !== ''
    ) {
      setPopupStatus('already_connected');
      setOpen(true);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const currentUserId = await fetchUserId();
      // Pastikan result kita cast ke ConnectWalletResult agar result.success bertipe boolean
      const result = (await connectWallet()) as ConnectWalletResult;

      // Di sini result.success sudah dianggap boolean oleh TS
      if (result.success) {
        const publicKey: string = result.publicKey;

        // Ambil data wallet session dari local (null jika belum ada)
        const storedData: WalletSessionData | null = JSON.parse(
          localStorage.getItem('walletSession') ?? 'null'
        );

        // Jika data sudah ada & userId sama, tapi address beda => invalid
        if (
          storedData !== null &&
          storedData.userId === currentUserId &&
          storedData.address !== publicKey
        ) {
          setPopupStatus('invalid_wallet');
          setOpen(true);
          throw new Error('Cannot connect different wallet to existing account');
        }

        // Simpan data session baru
        const newSessionData: WalletSessionData = {
          userId: currentUserId,
          address: publicKey
        };

        localStorage.setItem('walletSession', JSON.stringify(newSessionData));
        sessionStorage.setItem('walletSession', publicKey);

        setWalletAddress(publicKey);
        setPopupStatus('connected');
        setOpen(true);

        // Kirim ke backend menandakan connect
        await fetch(`${API_BASE_URL}/nft/diamante/connect`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({ wallet_address: publicKey })
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, walletAddress, fetchUserId, API_BASE_URL]);

  /**
   * Inisialisasi session wallet
   */
  const initializeSession = useCallback(async (): Promise<void> => {
    try {
      const sessionWallet = sessionStorage.getItem('walletSession');
      // Gunakan ?? 'null' untuk safe parse
      const storedData: WalletSessionData | null = JSON.parse(
        localStorage.getItem('walletSession') ?? 'null'
      );

      // Pastikan sessionWallet benar2 ada
      if (
        sessionWallet !== null &&
        sessionWallet !== undefined &&
        sessionWallet !== ''
      ) {
        // Dapatkan userId
        const currentUserId = await fetchUserId();

        // Validasi kesesuaian
        if (
          storedData !== null &&
          storedData.userId === currentUserId &&
          storedData.address === sessionWallet
        ) {
          setWalletAddress(sessionWallet);
        } else {
          cleanupSession();
        }
      }
    } catch (error: unknown) {
      cleanupSession();
    }
  }, [fetchUserId, cleanupSession]);

  /**
   * useEffect pertama:
   * - Panggil initializeSession untuk cek session wallet
   */
  useEffect(() => {
    // Hindari no-floating-promises
    void initializeSession();
  }, [initializeSession]);

  /**
   * useEffect kedua:
   * - Timer 10 menit => cleanup session
   * - Fetch balance
   */
  useEffect(() => {
    const sessionTimer = setTimeout(() => {
      cleanupSession();
    }, 10 * 60 * 1000);

    const fetchBalance = async (): Promise<void> => {
      // Cek walletAddress eksplisit
      if (
        walletAddress !== null &&
        walletAddress !== undefined &&
        walletAddress !== ''
      ) {
        try {
          // Cast result agar success bertipe boolean
          const balanceResult = (await checkBalance(
            walletAddress
          )) as CheckBalanceResult;

          if (balanceResult.success) {
            // Asumsi kita ambil index[0] => "100.00 diams"
            const nativeBalance: string = balanceResult.balances[0] ?? '';
            // Replacing "diams" => "DIAM"
            setDiamBalance(nativeBalance.replace('diams', 'DIAM'));
          }
        } catch (error) {
          console.error('Gagal mengambil balance:', error);
        }
      }
    };

    // Panggil
    void fetchBalance();

    return () => {
      clearTimeout(sessionTimer);
    };
  }, [walletAddress, cleanupSession]);

  // Short wallet display
  const shortWallet: string =
    walletAddress !== null && walletAddress !== undefined && walletAddress !== ''
      ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
      : 'No Wallet';

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
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>
        </div>
      </Card>

      {/* Wallet Connection & Tabs Card */}
      <Card className="flex flex-col gap-9 md:p-5 rounded-none md:rounded-xl">
        <Button
          className="flex justify-between items-center bg-[#94CCBD] border border-[#4FE6AF] px-4 py-1.5 md:px-7 md:py-2 rounded-[10px]"
          onClick={() => {
            void handleConnectWallet();
          }}
          disabled={isLoading}
        >
          <div className="flex items-center gap-5">
            <Image src={diam} alt="diam-logo" />
            <p className="font-poppins font-semibold text-white text-sm">
              {isLoading
                ? 'Connecting...'
                : walletAddress !== null &&
                  walletAddress !== undefined &&
                  walletAddress !== ''
                ? diamBalance !== null && diamBalance !== undefined
                  ? diamBalance
                  : '0 DIAM'
                : 'Connect to DIAM Wallet'}
            </p>
          </div>
          <FiChevronRight color="white" size={18} />
        </Button>

        {errorMessage !== null && errorMessage !== '' && (
          <p className="text-red-500 text-sm px-4">{errorMessage}</p>
        )}

        {/* Komponen Tabs */}
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
                `Already connected to:\n${shortWallet}\nCannot connect another wallet`}
              {popupStatus === 'invalid_wallet' &&
                'Cannot connect different wallet to existing account'}
            </p>
            <hr className="text-[#BDBDBD] w-full" />
            <p
              className="font-poppins font-semibold text-sm text-[#7555DA] cursor-pointer"
              onClick={() => {
                handleOpen();
              }}
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
