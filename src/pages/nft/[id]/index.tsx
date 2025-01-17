import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card
} from '@material-tailwind/react';
import Image from 'next/image';
import logo from 'public/assets/logo-seeds.png';
import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';

const NFTDetail: React.FC = () => {
  const [detail, setDetail] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<boolean>(false);
  return (
    <Card className="flex flex-col md:gap-4 p-0 md:p-5">
      <Image
        src={logo}
        alt="seeds-logo"
        className="w-full object-cover aspect-[16/9] md:rounded-2xl"
      />
      <div className="flex flex-col gap-2 md:gap-4 p-3 md:p-0">
        <Button className="bg-[#3AC4A0] p-2.5 font-poppins font-semibold text-sm rounded-full">
          GET
        </Button>
        <div className="flex flex-col gap-3 bg-[#F3F4F8] border border-[#E9E9E9] rounded-lg py-2 px-3.5">
          <div className="flex flex-col gap-3.5">
            <div className="flex gap-1.5 items-center">
              <Image
                src={logo}
                alt="pic-profile"
                className="w-5 h-5 bg-green-500 rounded-full"
              />
              <p className="font-poppins font-semibold text-sm md:text-base text-[#3AC4A0]">
                Name
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold font-poppins text-base md:text-lg text-neutral-medium">
                Nft Title
              </p>
              <p className="font-poppins font-normal text-xs md:text-sm text-neutral-soft">
                Owned By Name
              </p>
              <p className="bg-[#3AC4A0] py-0.5 px-6 font-poppins font-normal text-[10px] leading-4 md:text-xs text-[#1A857D] w-fit rounded">
                100 DIAM
              </p>
            </div>
          </div>
          <p className="font-poppins font-normal text-[10px] leading-4 md:text-xs text-neutral-medium text-justify">
            Ilustrasi monkey funky sedang unjuk gigi tapi berhati peri dan
            bergaya anak pantai., Ilustrasi monkey funky sedang unjuk gigi tapi
            berhati peri dan bergaya anak pantai.
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
                detail ? 'rotate-90' : '-rotate-90 md:rotate-0'
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
            <p> What is Material Tailwind?</p>
          </AccordionHeader>
          <AccordionBody className="py-5">
            We&apos;re not always in the position that we want to be at.
            We&apos;re constantly growing. We&apos;re constantly making
            mistakes. We&apos;re constantly trying to express ourselves and
            actualize our dreams.
          </AccordionBody>
        </Accordion>
      </div>
    </Card>
  );
};

export default NFTDetail;
