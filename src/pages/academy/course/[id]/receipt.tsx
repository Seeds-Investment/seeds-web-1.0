import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { Button, Card, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Receipt: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  //   const toggleDropdown = (): void => {
  //     // Implementasi fungsi toggleDropdown
  //   };

  return (
    <div className="pt-10">
      <PageGradient defaultGradient className="w-full">
        <div className="bg-white p-2 rounded-xl shadow-md flex flex-col gap-5">
          <div className="flex items-center justify-center rounded-xl w-full ">
            <Card
              className="py-3 px-4 xl:px-24 border rounded-xl shadow-none w-full md:w-2/3 lg:w-1/2 h-full"
              style={{
                backgroundImage: "url('/assets/academy/top-bg-receipt.svg')",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top'
              }}
            >
              <div className="flex items-center justify-center mb-4 mt-3">
                {/* Placeholder untuk gambar */}
                <div className="rounded-full bg-[#74d5bc] p-2">
                  <div className="text-2xl rounded-full border p-2 bg-[#efe7fc]">
                    <FaCheck />
                  </div>
                </div>
              </div>
              <Typography className="text-2xl font-semibold text-white text-center">
                Successful
              </Typography>
              <Typography className="text-sm font-normal text-white text-center">
                Your payment was successful
              </Typography>
              <Typography className="text-sm font-normal text-white text-center">
                Now you can start learning
              </Typography>

              <Card className="px-5 py-2 mt-8 bg-white w-full">
                <Typography className="text-sm font-semibold text-[#BDBDBD] text-center">
                  Payment Method
                </Typography>
                <div className="flex items-center justify-center mb-9 mt-3">
                  {/* Placeholder untuk gambar */}
                  <img
                    src="/placeholder-image.png"
                    alt="logo"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <hr className="border-t-2 border-dashed" />
                <div className="flex justify-between relative bottom-3 z-50">
                  <div className="bg-[#3AC4A0] h-6 rounded-full w-6 -mx-8 outline-none" />
                  <div className="bg-[#38be9b] h-6 rounded-full w-6 -mx-8 outline-none" />
                </div>

                <div className="flex flex-row justify-between my-5">
                  <Typography className="text-sm font-semibold text-[#BDBDBD]">
                    Cost Seeds Academy
                  </Typography>
                  <Typography className="text-sm font-semibold text-[#262626]">
                    $120.00
                  </Typography>
                </div>
                <div className="flex flex-row justify-between mb-5">
                  <Typography className="text-sm font-semibold text-[#BDBDBD]">
                    Discount
                  </Typography>
                  <Typography className="text-sm font-semibold text-[#262626]">
                    $120.00
                  </Typography>
                </div>
                <hr className="mb-5 border border-t-3" />
                <div className="flex flex-row justify-between mb-5">
                  <Typography className="text-sm font-semibold text-[#BDBDBD]">
                    Total Amount
                  </Typography>
                  <Typography className="text-sm font-semibold text-[#262626]">
                    $120.00
                  </Typography>
                </div>
                <div className="flex flex-row justify-between mb-5">
                  <Typography className="text-sm font-semibold text-[#BDBDBD]">
                    Transaction ID
                  </Typography>
                  <Typography className="text-sm font-semibold text-[#262626]">
                    $120.00
                  </Typography>
                </div>
              </Card>

              <div className="w-full flex items-center justify-center">
                <Button
                  className="w-full text-sm font-semibold bg-[#3AC4A0] mt-20 rounded-full capitalize"
                  onClick={() => {
                    void router.replace(`/academy/course/${id as string}`);
                  }}
                >
                  Close
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </PageGradient>
    </div>
  );
};

export default Receipt;
