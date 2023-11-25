import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuth from '@/helpers/withAuth';
import { getBlocklist } from '@/repository/user.repository';
import React, { useEffect, useState } from 'react';

// Buat komponen Card untuk menampilkan data blocklist
const BlockListCard: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="border rounded-md p-4 mb-4">
      <h2 className="text-lg font-semibold">User Information</h2>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      {/* Tambahkan informasi lain dari data blocklist sesuai kebutuhan */}
    </div>
  );
};

const BlockList: React.FC = () => {
  const [blocklistData, setBlocklistData] = useState<any>(null);

  useEffect(() => {
    // Memanggil fungsi getBlocklist saat komponen dimount
    const fetchData = async (): Promise<void> => {
      try {
        const response = await getBlocklist();
        console.log(response, 'kf');

        setBlocklistData(response.data); // Mengatur data blocklist ke state
      } catch (error) {
        console.error('Error fetching blocklist:', error);
      }
    };

    void fetchData();
  }, []);

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="w-full justify-center items-center text-center cursor-default">
        <h1 className="text-center text-lg font-semibold">Block List</h1>
        <div className="w-full mx-auto lg:w-[70%] bg-white rounded-3xl flex border-black border-[1px] px-[8px] justify-between">
          <input
            type="search"
            className="text-[#7C7C7C] w-full border-none rounded-3xl lg:w-[340px] px-[8px] focus:outline-none lg:h-[38px]"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            onChange={e => {}}
          />
          <svg
            className="mt-2 me-3"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
              fill="#262626"
            />
          </svg>
        </div>

        {/* Menampilkan data blocklist menggunakan Card */}
        {blocklistData.length > 0 && (
          <div className="mt-8">
            {blocklistData.map((item: any, index: number) => (
              <BlockListCard key={index} data={item} />
            ))}
          </div>
        )}
      </div>
    </PageGradient>
  );
};

export default withAuth(BlockList);
