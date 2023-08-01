'use client';
import { Typography } from '@material-tailwind/react';

const InlineText = ({
  label,
  value,
  className
}: {
  label: string;
  value: string;
  className?: string;
}): JSX.Element => {
  return (
    <div className={`flex justify-between ${className ?? ''}`}>
      <Typography className="text-[#BDBDBD] font-semibold text-sm">{label}</Typography>
      <Typography className="text-[#262626] font-semibold text-sm">{value}</Typography>
    </div>
  );
};

export default InlineText;
