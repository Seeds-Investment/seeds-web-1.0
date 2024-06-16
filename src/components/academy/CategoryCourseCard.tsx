import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';

interface CategoryCourseCardProps {
  title: string;
  level: number;
  image: string;
}

const CategoryCourseCard: React.FC<CategoryCourseCardProps> = ({
  title,
  level,
  image
}) => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#DCFCE4] rounded-2xl py-6">
      <Typography className="font-semibold">{title}</Typography>
      <Typography className="text-sm text-[#7C7C7C]">{level} levels</Typography>
      <Image src={image} alt={title} width={125} height={125} />
    </div>
  );
};

export default CategoryCourseCard;
