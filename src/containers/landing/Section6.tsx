import type { ISeedsInformationItem } from '@/utils/interfaces/data.interfaces';
import { downloadOurApp, seedsInformation, socialMedia } from '@/utils/_static';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Section6(): React.ReactElement {
  return (
    <>
      <div className=" bg-gradient-to-tr from-seeds-green to-seeds-purple grid grid-cols-3 p-20 tracking-wide cursor-default">
        <div>
          <div className="text-[4.5rem] font-semibold text-seeds-green -mt-7">
            Seeds
          </div>
          <div className="text-[2rem] font-semibold text-white tracking-widest">
            Investing, together
          </div>
          <br />
          <div className=" text-[1.1rem] text-gray-200 tracking-widest text-base font-thin">
            Nothing on this site is a recommendation to invest. Seeds does not
            offer financial advice. If you are unsure about investing we
            encourage you to speak to a financial advisor. Your capital is at
            risk.
          </div>
          <br />
          <div className="flex">
            {socialMedia.map((item, key) => (
              <Link
                key={key}
                href={item.url}
                className="mr-3 last:mr-0 cursor-pointer"
              >
                <Image alt="" src={item.icon} />
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 pl-16 ml-10">
          {Object.entries(seedsInformation).map(([key, value]) => (
            <div key={key} className="w-full text-white tracking-widest">
              <div className="mb-3 last:mb-0">{key}</div>
              {value.map(
                (
                  data: ISeedsInformationItem,
                  key: number
                ): React.ReactElement => {
                  const dataIcon =
                    data?.icon != null ? (
                      <Image alt="" src={data.icon} className="mr-3" />
                    ) : (
                      ''
                    );
                  return (
                    <Link key={key} href={data.url}>
                      <div className="font-thin opacity-80 text-xs mb-3 flex items-center">
                        {dataIcon}
                        {data.name}
                      </div>
                    </Link>
                  );
                }
              )}
            </div>
          ))}
        </div>
        <div className="px-10 ml-24">
          <div className="text-white text-[1.4rem]">Download Our App</div>\
          <br />
          <div className="grid grid-cols-2 gap-5 w-fit">
            {downloadOurApp
              .filter((data, i) => i <= 1)
              .map((data, key) => (
                <Link key={key} href={data.url}>
                  <Image alt="" src={data.icon} />
                </Link>
              ))}
          </div>
          <br />
          <div className="flex">
            {downloadOurApp
              .filter((data, i) => i > 1)
              .map((data, key) => (
                <Link key={key} href={data.url}>
                  <Image className="mr-5" alt="" src={data.icon} />
                </Link>
              ))}
          </div>
          <br />
          <div className="text-[1.1rem] text-gray-200 tracking-widest text-sm font-thin opacity-80 cursor-pointer">
            PT. Benih Investasi Teknologi
          </div>
        </div>
      </div>
    </>
  );
}
