import NFTTabs from '@/components/nft/tabs';
import withAuth from '@/helpers/withAuth';
import { connectWallet } from '@/lib/diamnet';
import { type Data, getNftList } from '@/repository/nft.repository';
import { Button, Card, Dialog, DialogBody } from '@material-tailwind/react';
import Image from 'next/image';
import logo from 'public/assets/logo-seeds.png';
import checklist from 'public/assets/nft/checklist.svg';
import diam from 'public/assets/vector/diam.svg';
import React, { useCallback, useEffect, useState } from 'react';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { FiChevronRight, FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';

const NFTDashboard: React.FC = () => {
  const [open, setOpen] = useState<{ open: boolean; connect: boolean }>({
    open: false,
    connect: true
  });
  const [data, setData] = useState<Data[]>();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const handleOpen = (): void => {
    setOpen(prev => ({ ...prev, open: !prev.open }));
  };
  const handleConnect = async (): Promise<void> => {
    if ('diam' in window) {
      const res = await connectWallet();
      if (res?.status === 200) {
        handleOpen();
      }
    } else {
      toast.error('Please download Diam Wallet first, then refresh this tab');
    }
  };

  const fetchData = useCallback(async () => {
    if (!loading && hasMore) {
      setLoading(true);
      try {
        const res = await getNftList({ page, limit: 10, search: '' });
        const data = res.data;
        // filter(
        //   val => val.metadata_cid !== ''
        //   && val.status === 'TRUE'
        // );
        setData(prev =>
          page === 1 || prev === undefined ? data : [...prev, ...data]
        );
        if (res.metadata.current_page === res.metadata.total_page)
          setHasMore(false);
        setPage(prevPage => prevPage + 1);
      } catch (error) {
        toast.error(`Error fetching data: ${String(error)}`);
      } finally {
        setLoading(false);
      }
    }
  }, [page]);

  useEffect(() => {
    void fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight;

      if (isBottom && hasMore) {
        void fetchData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchData]);
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
          disabled={sessionStorage.getItem('diamPublicKey') !== null}
          className={`flex justify-between items-center ${
            sessionStorage.getItem('diamPublicKey') !== null
              ? 'bg-[#F9F9F9] border-[#3AC4A0] disabled:opacity-100'
              : 'bg-[#94CCBD] border-[#4FE6AF]'
          } border px-4 py-1.5 md:px-7 md:py-2 rounded-[10px]`}
          onClick={handleConnect}
        >
          <div className="flex items-center gap-5">
            <Image src={diam} alt="diam-logo" />
            <p
              className={`font-poppins font-semibold ${
                sessionStorage.getItem('diamPublicKey') !== null
                  ? `text-[#444444]`
                  : 'text-white'
              } text-sm`}
            >
              {sessionStorage.getItem('diamPublicKey') !== null
                ? `${String(sessionStorage.getItem('diamBalance'))} DIAM`
                : 'Connect to DIAM Wallet'}
            </p>
          </div>
          <FiChevronRight color="white" size={18} />
        </Button>
        <NFTTabs data={data} />
      </Card>
      <Dialog handler={handleOpen} open={open.open} className="p-2.5" size="xs">
        {/* {open.connect ? ( */}
        <DialogBody className="flex flex-col gap-4 p-0 justify-center items-center">
          <Image src={checklist} alt="checklist" />
          <div className="flex flex-col gap-3.5 items-center justify-center">
            <p className="font-poppins font-semibold text-sm text-black">
              Successfull connect DIAM wallet !
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
        {/* ) : (
          <DialogBody className="flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
              <div className="bg-gradient-to-tr from-[#96F7C1] to-[#3AC4A0] rounded-full w-fit p-0.5">
                <Image src={copylink} alt="copylink" className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2 justify-center items-center text-black">
                <p className="font-semibold font-poppins text-sm">
                  Connect to DIAM Wallet
                </p>
                <p className="font-normal font-poppins text-xs text-black text-center">
                  Login into your account by connecting your with one of the
                  digitals wallets
                </p>
              </div>
            </div>
            <hr className="text-[#BDBDBD] w-full" />
            <Link
              href={
                'https://chromewebstore.google.com/detail/diam-wallet/ghncoolaiahphiaccmhdofdfkdokbljk'
              }
              target="_blank"
            >
              <Button className="rounded-full bg-[#3AC4A0] capitalize font-poppins font-semibold text-sm w-[220px]">
                Download Diam Wallet
              </Button>
            </Link>
            <Button
              onClick={handleConnect}
              className="rounded-full bg-[#3AC4A0] capitalize font-poppins font-semibold text-sm w-[220px]"
            >
              Connect Diam Wallet
            </Button>
            <p className="font-semibold font-poppins text-sm text-[#7555DA] cursor-pointer">
              Set up later
            </p>
          </DialogBody>
        )} */}
      </Dialog>
    </section>
  );
};

export default withAuth(NFTDashboard);
