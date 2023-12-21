import { getTrendingAssets } from '@/repository/asset.repository';
import { trackEvent } from '@phntms/next-gtm';
import DeviceDetector from 'device-detector-js';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import AssetTrendingCard from './AssetsTrendingCard';
import AssetTrendingCardSkeleton from './skeleton/AssetsCardSkeleton';

export interface AssetsInterface {
  id: string;
  quote: string;
  currency: string;
  image: string;
  name: string;
  price: number;
  regularPercentage: number;
  assetType: string;
}

export default function AssetsPage({ userInfo }: any): React.ReactElement {
  const deviceDetector = new DeviceDetector();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [assets, setAssets] = useState<AssetsInterface[]>([]);
  async function fetchArticles(): Promise<void> {
    try {
      setIsLoading(true);
      const response = await getTrendingAssets({
        page: 1,
        limit: 3
      });
      if (response.status === 200) {
        setAssets(response.result);
      } else {
        console.error('Failed to fetch assets:', response);
      }
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await fetchArticles();
    };

    fetchData().catch(error => {
      console.error('Error in fetchData:', error);
    });
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        {!isLoading
          ? assets.length !== 0 &&
            assets?.map((data, idx) => (
              <div key={idx} className="w-full">
                <AssetTrendingCard data={data} isClick={true} />
              </div>
            ))
          : Array.from({ length: 3 }, (_, idx) => (
              <AssetTrendingCardSkeleton key={idx} />
            ))}
      </div>
      <div className="text-center justify-center mt-3">
        <Link
          href={'/homepage/trending-assets'}
          className="text-md mt-3 font-normal text-[#3AC4A0]"
          onClick={() => {
            trackEvent({
              event: `Seeds_view_asset_list_web`,
              data: {
                user_id: userInfo?.id,
                page_name: 'Asset List',
                created_at: new Date().toString(),
                user_device: deviceDetector.parse(navigator.userAgent).device
                  ?.type
              }
            });
          }}
        >
          See More
        </Link>
      </div>
    </>
  );
}
