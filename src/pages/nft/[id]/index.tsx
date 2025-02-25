import NFTDialog from '@/components/nft/dialog';
import withAuth from '@/helpers/withAuth';
import {
  createBuyOffer,
  createSellOffer,
  createTrustline
} from '@/lib/diamnet';
import { type Data, getNftById, sellNft } from '@/repository/nft.repository';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card
} from '@material-tailwind/react';
import { Asset } from 'diamnet-sdk';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { FiArrowLeft, FiChevronRight } from 'react-icons/fi';

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

const NFTDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = useState<{ open: boolean; state: number }>({
    open: false,
    state: 0
  });
  const [data, setData] = useState<Data>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [detail, setDetail] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const handleOpen = (): void => {
    setOpen({ open: !open.open, state: 0 });
  };

  const handleChange = (state: number): void => {
    setOpen(prev => ({ ...prev, state }));
  };

  const handleConfirm = async (): Promise<void> => {
    if (
      sessionStorage.getItem('diamPublicKey') !== null &&
      data !== undefined &&
      id !== undefined
    ) {
      try {
        setDisabled(true);
        if (
          sessionStorage.getItem('diamPublicKey') !== data.owner.wallet_address
        ) {
          if (
            sessionStorage.getItem('diamPublicKey') !==
            data.creator.wallet_address
          ) {
            await createTrustline(
              String(sessionStorage.getItem('diamPublicKey')),
              data?.metadata_cid,
              data?.creator.wallet_address
            );
          }
          await createBuyOffer(
            String(id),
            String(sessionStorage.getItem('diamPublicKey')),
            {
              selling: Asset.native(),
              buying: new Asset(data.metadata_cid, data.creator.wallet_address),
              buyAmount: '1',
              price: String(data.price)
            }
          );
          handleChange(2);
        } else {
          if (!Number.isNaN(price) && price !== 0 && price >= data.price) {
            const status = await createSellOffer(data.owner.wallet_address, {
              selling: new Asset(
                data.metadata_cid,
                data.creator.wallet_address
              ),
              buying: Asset.native(),
              amount: '1',
              price: String(price)
            });
            if (status === 200) {
              await sellNft(data.id, { price });
              router.back();
            }
          } else {
            setError(Number.isNaN(price) || price === 0 || price < data.price);
          }
        }
      } catch (error) {
      } finally {
        setDisabled(false);
      }
    }
  };

  const handleDataId = useCallback(async () => {
    const res = await getNftById(String(id));
    setData(res);
  }, [id]);

  useEffect(() => {
    if (id !== undefined) {
      void handleDataId();
    }
  }, [handleDataId]);
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
  // const data: Render[] = [
  //   {
  //     fromImage: '',
  //     fromTag: 'Anton123',
  //     fromName: 'Anton',
  //     toImage: '',
  //     toTag: 'Budi123',
  //     toName: 'Budi',
  //     price: '100 Diam',
  //     date: '11/11/2024'
  //   },
  //   {
  //     fromImage: '',
  //     fromTag: 'Budi123',
  //     fromName: 'Budi',
  //     toImage: '',
  //     toTag: 'Dimas123',
  //     toName: 'Dimas',
  //     price: '100 Diam',
  //     date: '11/11/2024'
  //   }
  // ];
  return (
    <>
      {data !== undefined && (
        <Card className="flex flex-col md:gap-4 p-0 md:p-5">
          <div className="flex justify-between items-center py-5 px-4 md:hidden font-semibold text-base text-neutral-medium font-poppins">
            <FiArrowLeft
              size={24}
              onClick={() => {
                router.back();
              }}
              className="cursor-pointer"
            />
            <p>Detail NFT</p>
            <div className="w-6 aspect-square" />
          </div>
          <img
            src={data?.image_url}
            alt={data?.name ?? ''}
            className="w-full object-cover aspect-[16/9] md:rounded-2xl"
          />
          <div className="flex flex-col gap-2 md:gap-4 p-3 md:p-0">
            {sessionStorage.getItem('diamPublicKey') !==
            data?.owner.wallet_address
              ? data.status === 'TRUE' && (
                  <Button
                    className="bg-[#3AC4A0] p-2.5 font-poppins font-semibold text-sm rounded-full normal-case"
                    onClick={handleOpen}
                  >
                    GET
                  </Button>
                )
              : data?.status === 'FALSE' && (
                  <Button
                    className="bg-[#3AC4A0] p-2.5 font-poppins font-semibold text-sm rounded-full normal-case"
                    onClick={handleOpen}
                  >
                    List for Sale
                  </Button>
                )}
            <div className="flex flex-col gap-3 bg-[#F3F4F8] border border-[#E9E9E9] rounded-lg py-2 px-3.5">
              <div className="flex flex-col gap-3.5">
                <div className="flex gap-3 items-center">
                  <div className="flex gap-1.5 items-center">
                    <Image
                      src={data?.owner.avatar}
                      width={20}
                      height={20}
                      alt="pic-profile"
                      className="rounded-full"
                    />
                    <p className="font-poppins font-semibold text-sm md:text-base text-[#3AC4A0]">
                      {data?.owner.name}
                    </p>
                  </div>
                  {sessionStorage.getItem('diamPublicKey') ===
                    data?.owner.wallet_address && (
                    <p
                      className={`${
                        data.status === 'TRUE'
                          ? 'bg-[#FFE9D4] text-[#B81516]'
                          : 'bg-[#E9E9E9] text-neutral-soft'
                      } rounded-full py-1 w-20 text-center font-semibold font-poppins text-xs`}
                    >
                      {data.status === 'TRUE' ? 'On Sale' : 'Not Listed'}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-semibold font-poppins text-base md:text-lg text-neutral-medium">
                    {data?.name}
                  </p>
                  <p className="font-poppins font-normal text-xs md:text-sm text-neutral-soft">
                    Owned By {data?.owner.name}
                  </p>
                  <p className="bg-[#3AC4A0] py-0.5 px-6 font-poppins font-normal text-[10px] leading-4 md:text-xs text-[#1A857D] w-fit rounded">
                    {data?.price} DIAM
                  </p>
                </div>
              </div>
              <p className="font-poppins font-normal text-[10px] leading-4 md:text-xs text-neutral-medium text-justify">
                {data?.description}
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
                    Asset Token
                  </p>
                  <u
                    className="rounded px-3 md:px-7 bg-[#4FE6AF] text-[#1A857D] font-poppins font-normal text-[10px]
              leading-4"
                  >
                    {data?.metadata_cid}
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
                    {data?.creator.wallet_address.substring(0, 7)}***
                    {data?.creator.wallet_address.substring(
                      data?.creator.wallet_address.length - 7
                    )}
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
                    {data?.owner.wallet_address.substring(0, 7)}***
                    {data?.owner.wallet_address.substring(
                      data?.owner.wallet_address.length - 7
                    )}
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
                    {/* <tbody>
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
                  </tbody> */}
                  </table>
                </div>
              </AccordionBody>
            </Accordion>
          </div>
        </Card>
      )}
      {data !== undefined && (
        <NFTDialog
          open={open}
          data={data}
          error={error}
          disabled={disabled}
          setError={setError}
          setPrice={setPrice}
          handleOpen={handleOpen}
          handleChange={handleChange}
          handleConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default withAuth(NFTDetail);
