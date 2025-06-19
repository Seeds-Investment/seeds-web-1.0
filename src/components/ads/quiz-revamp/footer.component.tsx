'use client';
import { downloadOurApp } from '@/utils/_static';
import type {
    ISeedsInformationItem,
    ISeedsInformationList
} from '@/utils/interfaces/data.interfaces';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import email from 'public/assets/ads/email.svg';
import fb from 'public/assets/ads/fb.png';
import hukum from 'public/assets/ads/hukum.png';
import igs from 'public/assets/ads/igs.png';
import kominfo from 'public/assets/ads/kominfo.png';
import linkedin from 'public/assets/ads/linkedin.png';
import telegram from 'public/assets/ads/telegram.png';
import tiktok from 'public/assets/ads/tiktok.png';
import waf from 'public/assets/ads/waf.svg';
import SeedLogo from 'public/assets/ads/whiteLogo.png';
import x from 'public/assets/ads/x.png';
import youtube from 'public/assets/ads/youtube.png';
import React from 'react';
import { useTranslation } from 'react-i18next';

const categories = [
  'Company',
  'Legal',
  'Products',
  'Support',
  'Contact Us'
] as const;

const regist=[
    {
      url: 'https://pse.kominfo.go.id/tdpse-detail/3709',
      icon: kominfo
    },
    {
      url: '',
      icon: hukum
    }
  ]

  export const socialMedia = [
    {
      icon: linkedin,
      url: 'https://www.linkedin.com/company/finance-seeds/'
    },
    {
      icon: telegram,
      url: '/'
    },
    {
      icon: igs,
      url: 'https://instagram.com/seeds_finance'
    },
    {
      icon: fb,
      url: 'https://facebook.com/seeds.finance'
    },
    {
      icon: x,
      url: 'https://twitter.com/seeds_finance'
    },
    {
      icon: tiktok,
      url: 'https://www.tiktok.com/@seeds_finance'
    },
    {
      icon: youtube,
      url: 'https://www.youtube.com/@seeds_id'
    }
  ];

const renderCategory = (
  key: string,
  items: ISeedsInformationItem[]
): React.ReactElement => (
  <div key={key} className="flex flex-col gap-4">
    <Typography className="font-normal text-base font-poppins text-white">
      {items[0].name}
    </Typography>
    {items.slice(1).map((data, idx) => {
      const dataIcon =
        data?.icon !== null && data?.icon !== undefined ? (
          <Image alt="icon" src={data.icon} />
        ) : null;
      const target =
        data.name === 'Career' || data.name === 'Karir' ? '_blank' : undefined;

      return (
        <Link prefetch={false} key={idx} href={data.url} target={target}>
          <Typography className="font-normal font-poppins text-sm text-[#FFFFFFB8] flex gap-2 items-center">
            {dataIcon}
            {data.name}
          </Typography>
        </Link>
      );
    })}
  </div>
);

export default function Footer(): React.ReactElement {
  const { t } = useTranslation();
  const seedsInformation: ISeedsInformationList = {
    Company: [
      { name: `${t('footer.company.title')}`, url: '' },
      {
        name: `${t('footer.company.list1')}`,
        url: '/about-us'
      },
      {
        name: `${t('footer.company.list2')}`,
        url: 'mailto:recruitment@seeds.finance'
      }
    ],
    Legal: [
      { name: `${t('footer.legal.title')}`, url: '' },
      {
        name: `${t('footer.legal.list1')}`,
        url: '/faq-submenu/terms-condition'
      },
      {
        name: `${t('footer.legal.list2')}`,
        url: '/faq-submenu/privacy-policy'
      },
      {
        name: `${t('footer.legal.list3')}`,
        url: '/faq-submenu/social-media-guide'
      }
    ],
    Products: [
      { name: `Products`, url: '' },
      { name: `Workflows`, url: '' },
      {
        name: 'ActionKit',
        url: ''
      }
    ],
    Support: [
      { name: `${t('footer.support.title')}`, url: '' },
      {
        name: 'FAQs',
        url: '/faq'
      }
    ],
    'Contact Us': [
      { name: `${t('footer.contactUs.title')}`, url: '' },
      {
        icon: email,
        name: 'info@seeds.finance',
        url: 'mailto:info@seeds.finance'
      },
      {
        icon: waf,
        name: '081387473392',
        url: 'https://api.whatsapp.com/send?phone=6281387473392'
      }
    ]
  };
  return (
    <section className="flex flex-col gap-8 md:gap-[100px] bg-radial from-[#161B27] to-[#060311] md:px-20 px-4 py-6 drop-shadow-[0_-10px_40px_#3AC4A040]">
      <div className="flex gap-8 lg:flex-row flex-col">
        <div className="flex lg:flex-col gap-8 w-full xl:w-1/3">
          <div className="flex flex-col gap-7 sm:w-1/2 lg:w-auto">
            <div className="flex flex-col gap-3">
              <Image src={SeedLogo} alt="SeedLogo" />
              <div className="flex flex-col font-semibold text-xs text-[#FFFFFFB8]">
                <p>Investing, together</p>
                <p>PT. Benih Investasi Teknologi</p>
              </div>
              <Typography className="font-normal font-poppins text-xs text-[#FFFFFFB8] text-justify">
                {t('footer.description')}
              </Typography>
            </div>
            <div className="flex flex-col bg-[#0603110A] py-5 px-4 shadow-[inset_0_32px_64px_0_var(--tw-shadow-color)] shadow-seeds-button-green/[15%] rounded-2xl border border-seeds-button-green/20">
              <p className="font-semibold text-xs text-seeds-green">
                {t('footer.disclaimer')}
              </p>
              <p className="font-normal text-xs text-[#FFFFFFB8] text-justify">
                Seeds.finance {t('footer.disclaimerContain')}
              </p>
            </div>
          </div>
          <div className="sm:flex flex-col lg:flex-row gap-8 hidden xl:hidden">
            <div className="flex flex-col gap-5">
              <Typography className="font-poppins">
                {t('footer.regist')}
              </Typography>
              <div className="flex gap-4">
                {downloadOurApp
                  .filter((data, i) => i > 1)
                  .map((data, key) => (
                    <Link
                      prefetch={false}
                      target="_blank"
                      key={key}
                      href={data.url}
                      className={`${
                        data.url === '' ? 'pointer-events-none' : ''
                      }`}
                    >
                      <Image alt="icon" src={data.icon} />
                    </Link>
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Typography className="font-poppins">
                {t('footer.download')}
              </Typography>
              <div className="flex flex-col-reverse lg:flex-row gap-4">
                {downloadOurApp
                  .filter((data, i) => i <= 1)
                  .map((data, key) => (
                    <Link
                      prefetch={false}
                      target="_blank"
                      key={key}
                      href={data.url}
                    >
                      <Image alt="icon" src={data.icon} />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-8 w-full">
            {categories.map(category =>
              seedsInformation[category] !== null &&
              seedsInformation[category] !== undefined
                ? renderCategory(category, seedsInformation[category])
                : null
            )}
            <div className="hidden xl:flex gap-8 col-span-3">
              <div className="flex flex-col gap-5">
                <Typography className="flex font-poppins">
                  {t('footer.regist')}
                </Typography>
                <div className="flex gap-4">
                  {regist.map((data, key) => (
                    <Link
                      prefetch={false}
                      target="_blank"
                      key={key}
                      href={data.url}
                      className={`${
                        data.url === '' ? 'pointer-events-none' : ''
                      }`}
                    >
                      <Image alt="icon" src={data.icon} />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <Typography className="font-poppins">
                  {t('footer.download')}
                </Typography>
                <div className="flex flex-row-reverse gap-4 justify-end">
                  {downloadOurApp
                    .filter((data, i) => i <= 1)
                    .map((data, key) => (
                      <Link
                        prefetch={false}
                        target="_blank"
                        key={key}
                        href={data.url}
                      >
                        <Image alt="icon" src={data.icon} />
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 sm:hidden">
          <div className="flex flex-col gap-5">
            <Typography className="flex font-poppins">
              {t('footer.regist')}
            </Typography>
            <div className="flex gap-4">
              {regist.map((data, key) => (
                <Link
                  prefetch={false}
                  target="_blank"
                  key={key}
                  href={data.url}
                  className={`${data.url === '' ? 'pointer-events-none' : ''}`}
                >
                  <Image alt="icon" src={data.icon} />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Typography className="font-poppins">
              {t('footer.download')}
            </Typography>
            <div className="flex flex-row-reverse gap-4 justify-end">
              {downloadOurApp
                .filter((data, i) => i <= 1)
                .map((data, key) => (
                  <Link
                    prefetch={false}
                    target="_blank"
                    key={key}
                    href={data.url}
                  >
                    <Image alt="icon" src={data.icon} />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 pt-10 border-t border-t-[#FFFFFF29]">
        {socialMedia.map((item, key) => (
          <Link
            prefetch={false}
            target="_blank"
            key={key}
            href={item.url}
            className="cursor-pointer"
          >
            <Image alt="icon" src={item.icon} />
          </Link>
        ))}
      </div>
    </section>
  );
}
