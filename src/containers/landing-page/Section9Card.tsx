import type { IEventHighlightLandingPage } from '@/utils/interfaces/components.interfaces';
import Image from 'next/image';

export default function Section9Card({
  data
}: {
  data: IEventHighlightLandingPage;
}): React.ReactElement {
  return (
    <div className="relative max-w-sm h-[380px] font-poppins overflow-hidden mr-5">
      <div className="bg-[#F3F3F3] h-[380px] rounded-lg shadow-md p-6">
        <div className="flex">
          {/* Profile Picture */}
          <div className=" w-1/4 items-center justify-center my-auto  rounded-full overflow-hidden">
            <Image
              src={data.image}
              alt="Profile Picture"
              className="object-scale-down h-12 w-12"
            />
          </div>

          {/* Name and Occupation */}
          <div className="ml-4 w-3/4">
            <p className="text-md font-semibold">{data.name}</p>
            <p className="text-[#106B6E] font-light text-xs">{data.title}</p>
          </div>
        </div>

        {/* Review Text */}
        <p className="mt-4 text-gray-700 text-md">
          {data.comment.substring(0, 200)}.....
        </p>

        {/* Star Ratings */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-black">
            {/* Display the rating like "5/5" or "4/5" */}
            5/5
          </span>

          <div className="text-yellow-500">
            {/* Static star ratings */}★ ★ ★ ★ ★
          </div>
        </div>
      </div>
    </div>
  );
}
