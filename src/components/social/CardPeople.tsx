import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Avatar, Card, CardBody, Typography } from '@material-tailwind/react';
import FollowButton from '../FollowButton';

interface props {
  data: any;
}

const CardPeople: React.FC<props> = ({ data }) => {
  return (
    <Card shadow={false} className="w-full my-3 border border-[#E9E9E9]">
      <CardBody className="p-3 h-auto flex items-center">
        <Avatar
          size="md"
          variant="circular"
          src={data.avatar}
          alt="tania andrew"
        />
        <div className="flex ml-5 w-1/2 flex-col gap-0.5">
          <div className="flex flex-row">
            <Typography className="font-semibold mr-2 text-base text-[#262626]">
              {data.name}
            </Typography>
            <CheckBadgeIcon width={20} height={20} color="#5E44FF" />
          </div>
          <Typography className="font-normal text-sm text-[#7C7C7C]">
            @{data.seedsTag}
          </Typography>
          <Typography className="font-normal text-sm text-[#262626]">
            {data.followers} Followers
          </Typography>
        </div>
        <div className="ml-auto flex flex-col gap-0.5">
          <FollowButton
            userId={data.id}
            isFollowed={data.is_followed ?? false}
            customClass="font-semibold text-xs rounded-2xl text-white"
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default CardPeople;
