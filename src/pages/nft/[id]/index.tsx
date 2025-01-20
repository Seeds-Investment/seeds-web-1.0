import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card,
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';

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
  const { id } = router.query; // Get dynamic ID from URL
  const [nftDetail, setNftDetail] = useState<NFT | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<boolean>(false);

  const API_BASE_URL = 'https://seeds-dev-gcp.seeds.finance';

  // Fetch NFT details based on ID
  useEffect(() => {
    if (!id) return;

    const fetchNFTDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/nft/${id}`);
        if (!response.ok) throw new Error('Failed to fetch NFT details');
        const data = await response.json();
        setNftDetail(data.data[0]); // Use the first object in "data"
      } catch (error) {
        console.error('Error fetching NFT details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNFTDetail();
  }, [id]);

  if (isLoading) {
    return <p>Loading NFT details...</p>;
  }

  if (!nftDetail) {
    return <p>NFT not found</p>;
  }

  return (
    <Card className="flex flex-col md:gap-4 p-0 md:p-5">
      <Image
        src={
          nftDetail.image_url.startsWith('http')
            ? nftDetail.image_url
            : `https://${nftDetail.image_url}`
        }
        alt={nftDetail.name}
        className="w-full object-cover aspect-[16/9] md:rounded-2xl"
        width={600}
        height={400}
      />
      <div className="flex flex-col gap-2 md:gap-4 p-3 md:p-0">
        <Button className="bg-[#3AC4A0] p-2.5 font-poppins font-semibold text-sm rounded-full">
          GET
        </Button>
        <div className="flex flex-col gap-3 bg-[#F3F4F8] border border-[#E9E9E9] rounded-lg py-2 px-3.5">
          <div className="flex flex-col gap-3.5">
            <div className="flex gap-1.5 items-center">
              <Image
                src={nftDetail.creator?.avatar || '/default-avatar.png'}
                alt="Creator Avatar"
                className="w-5 h-5 rounded-full"
                width={32}
                height={32}
              />
              <p className="font-poppins font-semibold text-sm md:text-base text-[#3AC4A0]">
                {nftDetail.creator?.wallet_address || 'Unknown Creator'}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold font-poppins text-base md:text-lg text-neutral-medium">
                {nftDetail.name}
              </p>
              <p className="font-poppins font-normal text-xs md:text-sm text-neutral-soft">
                Owned By {nftDetail.owner?.wallet_address || 'Unknown Owner'}
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
          icon={
            <FiChevronRight
              className={`${
                detail ? 'rotate-90' : '-rotate-90 md:rotate-0'
              } transition-all`}
              size={24}
            />
          }
          className="py-2.5 ps-3.5 pe-5 bg-[#F3F4F8] border border-[#E9E9E9] rounded-lg"
        >
          <AccordionHeader
            onClick={() => {
              setDetail(!detail);
            }}
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
                {nftDetail.id}
              </u>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-neutral-medium text-xs md:text-sm font-normal font-poppins">
                Creator Address
              </p>
              <u className="rounded px-3 md:px-7 bg-[#4FE6AF] text-[#1A857D] font-poppins font-normal text-[10px] leading-4">
                {nftDetail.creator?.wallet_address || 'Unknown'}
              </u>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-neutral-medium text-xs md:text-sm font-normal font-poppins">
                Owner Address
              </p>
              <u className="rounded px-3 md:px-7 bg-[#4FE6AF] text-[#1A857D] font-poppins font-normal text-[10px] leading-4">
                {nftDetail.owner?.wallet_address || 'Unknown'}
              </u>
            </div>
          </AccordionBody>
        </Accordion>
      </div>
    </Card>
  );
};

export default NFTDetail;
