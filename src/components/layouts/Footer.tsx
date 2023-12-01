'use client';
import SeedLogo from '@/assets/landing-page/header/SeedsLogo.svg';
import { downloadOurApp, seedsInformation, socialMedia } from '@/utils/_static';
import type { ISeedsInformationItem } from '@/utils/interfaces/data.interfaces';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
// import { useTranslation } from 'react-i18next';
export default function Footer(): React.ReactElement {
  // const { t } = useTranslation();
  return (
    <section className="flex gap-10 justify-center items-center h-[444px]">
      <div className="flex flex-col gap-5 max-w-[403px]">
        <div className="flex flex-col gap-2">
          <Image src={SeedLogo} alt="SeedLogo" height={56} />
          <Typography className="font-semibold font-poppins text-3xl text-[#106B6E]">
            Investing, together
          </Typography>
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="font-semibold font-poppins text-lg text-[#201B1C]">
            PT. Benih Investasi Teknologi
          </Typography>
          <Typography className="font-normal font-poppins text-base text-[#7C7C7C]">
            Nothing on this site is a recommendation to invest. Seeds does not
            offer financial advice. If you are unsure about investing we
            encourage you to speak to a financial advisor. Your capital is at
            risk.
          </Typography>
        </div>
        <div className="flex gap-4">
          {socialMedia.map((item, key) => (
            <Link
              target="_blank"
              key={key}
              href={item.url}
              className="cursor-pointer"
            >
              <Image alt="" src={item.icon} />
            </Link>
          ))}
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col gap-4 w-[219.5px]">
          {Object.entries(seedsInformation)
            .filter(([key]) => key === 'Company' || key === 'Support')
            .map(([key, value]) => (
              <div key={key} className="flex flex-col gap-4">
                <Typography className="font-semibold font-poppins text-xl text-[#106B6E]">
                  {key}
                </Typography>
                {value.map(
                  (
                    data: ISeedsInformationItem,
                    key: number
                  ): React.ReactElement => {
                    const dataIcon =
                      data?.icon != null ? (
                        <Image alt="" src={data.icon} />
                      ) : (
                        ''
                      );
                    return (
                      <Link key={key} href={data.url}>
                        <Typography className="font-normal font-poppins text-lg text-[#262626] flex gap-2">
                          {dataIcon}
                          {data.name}
                        </Typography>
                      </Link>
                    );
                  }
                )}
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-4 w-[219.5px]">
          {Object.entries(seedsInformation)
            .filter(([key]) => key === 'Legal' || key === 'Contact Us')
            .map(([key, value]) => (
              <div key={key} className="flex flex-col gap-4">
                <Typography className="font-semibold font-poppins text-xl text-[#106B6E]">
                  {key}
                </Typography>
                {value.map(
                  (
                    data: ISeedsInformationItem,
                    key: number
                  ): React.ReactElement => {
                    const dataIcon =
                      data?.icon != null ? (
                        <Image alt="" src={data.icon} />
                      ) : (
                        ''
                      );
                    return (
                      <Link key={key} href={data.url}>
                        <Typography className="font-normal font-poppins text-lg text-[#262626] flex gap-2">
                          {dataIcon}
                          {data.name}
                        </Typography>
                      </Link>
                    );
                  }
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2.5">
          <Typography className="font-semibold font-poppins text-xl text-[#106B6E]">
            Download Our App
          </Typography>
          <div className="flex gap-4">
            {downloadOurApp
              .filter((data, i) => i <= 1)
              .map((data, key) => (
                <Link target="_blank" key={key} href={data.url}>
                  <Image alt="" src={data.icon} />
                </Link>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Typography className="font-semibold font-poppins text-xl text-[#106B6E]">
            Registered in
          </Typography>
          <div className="flex gap-4 justify-center">
            {downloadOurApp
              .filter((data, i) => i > 1)
              .map((data, key) => (
                <Link
                  target="_blank"
                  key={key}
                  href={data.url}
                  className="mx-[35.5px] self-end"
                >
                  <Image alt="" src={data.icon} />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
