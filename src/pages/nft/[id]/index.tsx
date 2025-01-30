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
import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';

interface Render {
  fromImage: string;
  fromTag: string;
  fromName: string;
  toImage: string;
  toTag: string;
  toName: string;
  price: string;
  date: string;
}

interface Column {
  fieldId: string;
  label: string;
  render?: (value: Render) => React.ReactElement | string;
}

interface NFT {
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
}

const NFTDetail: React.FC = () => {
  const [open, setOpen] = useState<{ open: boolean; state: number }>({
    open: false,
    state: 0
  });
  const [detail, setDetail] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<boolean>(false);
  const handleOpen = (): void => {
    setOpen({ open: !open.open, state: 0 });
  };
  const handleChange = (state: number): void => {
    setOpen(prev => ({ ...prev, state }));
  };
  const columns: Column[] = [
    {
      fieldId: 'from',
      label: 'From',
      render: (value: Render) => (
        <div className="flex gap-3">
          <Image
            src={value.fromImage}
            alt="fromImage"
            className="w-10 h-10 bg-green-500 rounded-full"
          />
          <div>
            <p className="font-poppins font-semibold text-sm text-neutral-medium">
              @{value.fromTag}
            </p>
            <p className="font-poppins font-normal text-xs text-neutral-soft">
              {value.fromName}
            </p>
          </div>
        </div>
      )
    },
    {
      fieldId: 'to',
      label: 'To',
      render: (value: Render) => (
        <div className="flex gap-3">
          <Image
            src={value.toImage}
            alt="toImage"
            className="w-10 h-10 bg-green-500 rounded-full"
          />
          <div>
            <p className="font-poppins font-semibold text-sm text-neutral-medium">
              @{value.toTag}
            </p>
            <p className="font-poppins font-normal text-xs text-neutral-soft">
              {value.toName}
            </p>
          </div>
        </div>
      )
    },
    { fieldId: 'price', label: 'Price' },
    { fieldId: 'date', label: 'Date' }
  ];
  const data: Render[] = [
    {
      fromImage: '',
      fromTag: 'Anton123',
      fromName: 'Anton',
      toImage: '',
      toTag: 'Budi123',
      toName: 'Budi',
      price: '100 Diam',
      date: '11/11/2024'
    },
    {
      fromImage: '',
      fromTag: 'Budi123',
      fromName: 'Budi',
      toImage: '',
      toTag: 'Dimas123',
      toName: 'Dimas',
      price: '100 Diam',
      date: '11/11/2024'
    }
  ];
  const router = useRouter();
  const { id } = router.query;
  const [nftDetail, setNftDetail] = useState<NFT | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchNFTDetail = async (): Promise<void> => {
    setIsLoading(true);
    try {
      console.log('Fetching NFT with ID:', id);
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
        }/nft/${id as string}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch NFT: ${response.status}`);
      }
      const data = await response.json();
      console.log('Data from API:', data);
      setNftDetail(data);
    } catch (error) {
      console.error('Error fetching NFT details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchNFTDetail();
  }, [id]);

  if (isLoading) {
    return <p>Loading NFT details...</p>;
  }

  if (nftDetail == null) {
    return (
      <p className="text-red-500 text-center mt-10">
        NFT not found. Please check the ID and try again.
      </p>
    );
  }
  return (
    <>
      <Card className="flex flex-col md:gap-4 p-0 md:p-5">
        <Image
          src={nftDetail.image_url}
          alt={nftDetail.name}
          className="w-full object-cover aspect-[16/9] md:rounded-2xl"
        />
        <div className="flex flex-col gap-2 md:gap-4 p-3 md:p-0">
          <Button
            className="bg-[#3AC4A0] p-2.5 font-poppins font-semibold text-sm rounded-full"
            onClick={handleOpen}
          >
            GET
          </Button>
          <div className="flex flex-col gap-3 bg-[#F3F4F8] border border-[#E9E9E9] rounded-lg py-2 px-3.5">
            <div className="flex flex-col gap-3.5">
              <div className="flex gap-1.5 items-center">
                <Image
                  src={nftDetail.creator.avatar}
                  alt="pic-profile"
                  className="w-5 h-5 bg-green-500 rounded-full"
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
                <u
                  className="rounded px-3 md:px-7 bg-[#4FE6AF] text-[#1A857D] font-poppins font-normal text-[10px]
              leading-4"
                >
                  oxnssbdwudbw
                </u>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-neutral-medium text-xs md:text-sm font-normal font-poppins">
                  Creator Address
                </p>
                <u
                  className="rounded px-3 md:px-7 bg-[#4FE6AF] text-[#1A857D] font-poppins font-normal text-[10px]
              leading-4"
                >
                  oxnssbdwudbw
                </u>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-neutral-medium text-xs md:text-sm font-normal font-poppins">
                  Owner Address
                </p>
                <u
                  className="rounded px-3 md:px-7 bg-[#4FE6AF] text-[#1A857D] font-poppins font-normal text-[10px]
              leading-4"
                >
                  oxnssbdwudbw
                </u>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion
            open={transaction}
            icon={
              <FiChevronRight
                className={`${
                  transaction ? 'rotate-90' : '-rotate-90 md:rotate-0'
                } transition-all`}
                size={24}
              />
            }
            className="py-2.5 ps-3.5 pe-5 bg-[#F3F4F8] border border-[#E9E9E9] rounded-lg"
          >
            <AccordionHeader
              onClick={() => {
                setTransaction(!transaction);
              }}
              className="p-0 font-semibold text-lg text-neutral-medium font-poppins border-none"
            >
              Transaction Activity
            </AccordionHeader>
            <AccordionBody className="flex flex-col gap-2.5 md:gap-4 py-4 md:py-5">
              <div className="overflow-auto max-w-full">
                <table className="min-w-[600px] w-full">
                  <thead>
                    <tr>
                      {columns.map((column, index) => (
                        <th
                          key={index}
                          className="text-left font-poppins text-sm font-semibold p-2 text-neutral-medium"
                        >
                          {column.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((rowData, rowIndex) => (
                      <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                          <td
                            key={colIndex}
                            className="p-2 font-poppins font-semibold text-neutral-medium text-sm"
                          >
                            {column.render !== undefined
                              ? column.render(rowData)
                              : rowData[column.fieldId as keyof Render]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AccordionBody>
          </Accordion>
        </div>
      </Card>
      <NFTDialog
        open={open}
        handleOpen={handleOpen}
        handleChange={handleChange}
      />
    </>
  );
};

export default NFTDetail;
