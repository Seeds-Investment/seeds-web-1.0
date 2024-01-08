import { getDetailCircle } from '@/repository/circleDetail.repository';
import { Typography } from '@material-tailwind/react';
import moment from 'moment';
import Image from 'next/image';
import { PlayLogo } from 'public/assets/circle';
import { ExpNotif, SuccessNotif } from 'public/assets/images';
import { useEffect, useState } from 'react';

interface props {
  logo: any;
  data: any;
  variant: string;
}

const NotificationCard: React.FC<props> = ({ data, logo, variant }) => {
  const [detailCircle, setDetailCircle] = useState<any>();
  const fetchCircleById = async (id: string): Promise<void> => {
    try {
      const circleDetail = await getDetailCircle({ circleId: id });
      setDetailCircle(circleDetail);
    } catch (error: any) {
      console.error('Error fetching data play:', error.message);
    }
  };

  useEffect(() => {
    if (data?.type === 'circle_send_invitation') {
      console.log(detailCircle);
      void fetchCircleById(data?.data?.circle_id);
    }
  }, [variant]);

  return (
    <div
      className={`flex justify-between p-3 bg-[#F9FAFD] shadow-none rounded-2xl border w-full`}
      onClick={() => {}}
    >
      <div className="flex gap-3 items-center max-w-[70%] md:max-w-[80%]">
        {(variant === 'normal' ||
          variant === 'social' ||
          variant === 'circle_send_invitation') && (
          <Image src={logo} alt="Logo" className="cursor-pointer w-7 h-7" />
        )}
        {(variant === 'play_joined' ||
          variant === 'play_winner_simulation') && (
          <Image src={PlayLogo} alt="Logo" className="cursor-pointer w-7 h-7" />
        )}
        {variant === 'discover_earn' && (
          <Image src={ExpNotif} alt="Logo" className="cursor-pointer w-7 h-7" />
        )}
        {(variant === 'play_sell_asset' || variant === 'play_buy_asset') && (
          <Image
            src={SuccessNotif}
            alt="Logo"
            className="cursor-pointer w-7 h-7"
          />
        )}
        <div className="flex flex-col">
          <Typography className="font-semibold text-xs md:text-sm font-poppins text-[#1B1314] normal-case">
            {data.data.notification.title}
          </Typography>
          <Typography className="font-light md:font-normal text-xs md:text-sm font-poppins text-[#262626] normal-case">
            {data.data.notification.body}
          </Typography>
          {/* {variant === 'social' && (
            <Typography className="font-light md:font-normal text-xs md:text-sm font-poppins text-[#262626] normal-case">
              <span className="font-semibold">
                @{data.data.notification.body.split(' ')[0]}
              </span>
              {data.data.notification.body.replace(
                data.data.notification.body.split(' ')[0],
                ''
              )}
            </Typography>
          )} */}
        </div>
      </div>
      <div className="flex items-center">
        {variant !== 'circle_send_invitation' && (
          <Typography className="font-normal text-xs font-poppins text-[#7C7C7C] normal-case">
            {moment(data.created_at).fromNow()}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
