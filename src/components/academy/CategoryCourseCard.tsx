import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';

interface CategoryCourseCardI {
  data: {
    title: string;
    level: string;
    image: string;
  };
}

const CategoryCourseCard: React.FC<CategoryCourseCardI> = ({ data }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#DCFCE4] rounded-2xl py-6">
      <Typography className="font-semibold text-sm lg:text-lg">
        {data.title}
      </Typography>
      <Typography className="text-xs lg:text-base text-[#7C7C7C]">
        {data.level} levels
      </Typography>
      <Image
        src={data.image}
        alt={data.title}
        className="w-[100px] h-[100px] lg:w-[125px] lg:h-[125px]"
      />
    </div>
  );
};

export default CategoryCourseCard;
