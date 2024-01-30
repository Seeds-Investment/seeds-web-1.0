import ChevronLeft from '@/assets/setting/ChevronLeft.svg';
import { Button, Card, Typography } from '@material-tailwind/react';
import Image from 'next/image';

const MenuCard: React.FC<any> = ({ menuList }: any) => {
  return (
    <Card shadow={false} className="md:py-7 md:px-28 p-4">
      {menuList.map((value: any, index: any) => {
        return (
          <Button
            key={index}
            onClick={value.link}
            className="flex justify-between items-center p-3 bg-white w-full shadow-none hover:shadow-none hover:bg-black/10"
          >
            <div className="flex gap-4">
              <Image src={value.src} alt={`${value.name as string}`} />
              <Typography className="font-poppins font-normal text-sm text-[#262626] capitalize">
                {value.name}
              </Typography>
            </div>
            <div className="flex gap-3">
              {value.extra !== '' ? (
                <Typography className="font-poppins font-normal text-sm text-[#BDBDBD]">
                  {value.extra}
                </Typography>
              ) : null}
              <Image src={ChevronLeft} alt="ChevronLeft" />
            </div>
          </Button>
        );
      })}
    </Card>
  );
};

export default MenuCard;
