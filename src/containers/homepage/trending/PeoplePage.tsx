import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getTrendingPeople } from '../../../repository/asset.repository';
import CircleTrendingCard from './CircleTrendingCard';

export interface PeopleInterface {
  avatar: string;
  followers: number;
  followings: number;
  id: string;
  isFollowed: boolean;
  label: string;
  name: string;
  rank: number;
  seedsTag: string;
  verified: boolean;
}

export default function PeoplePage(): React.ReactElement {
  const [people, setPeople] = useState<PeopleInterface[]>([]);
  async function fetchArticles(): Promise<void> {
    try {
      const response = await getTrendingPeople({
        page: 1,
        limit: 3
      });
      console.log(response, 'k');

      if (response.status === 200) {
        setPeople(response.result);
      } else {
        console.error('Failed to fetch circles:', response);
      }
    } catch (error) {
      console.error('Error fetching circles:', error);
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
      <div className="flex flex-wrap w-full">
        {people.length !== 0 &&
          people?.map((data, idx) => (
            <div key={idx} className="w-full sm:w-1/2 lg:w-1/3 mb-5">
              <CircleTrendingCard
                data={data}
                cover={data.banner}
                isResponsive
              />
            </div>
          ))}
      </div>
      <div className="text-center justify-center mt-3">
        <Link
          href={'/homepage/trending-people'}
          className="text-md mt-3 font-normal text-[#3AC4A0]"
        >
          See More
        </Link>
      </div>
    </>
  );
}
