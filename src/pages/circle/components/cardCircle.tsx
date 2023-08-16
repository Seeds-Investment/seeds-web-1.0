import { DocumentIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Avatar, Card, CardBody, Typography } from '@material-tailwind/react';

interface Circle {
  id: string;
  name: string;
  avatar: string;
  cover: string;
  description: string;
  description_rules: string;
  type: string;
  premium_fee: number;
  admin_fee: number;
  monthly_time: number;
  total_rating: number;
  total_member: number;
  total_post: number;
  created_at: string;
  updated_at: string;
}

export default function CardCircle({
  data,
  cover
}: {
  data: Circle;
  cover: string;
}): React.ReactElement {
  return (
    <Card
      shadow={false}
      className="h-[250px] max-w-full rounded-3xl overflow-hidden shadow-lg mr-3 relative"
    >
      {data?.cover !== undefined && (
        <>
          <div
            style={{
              backgroundImage: `url(${cover})`,
              width: '100%',
              height: '100%'
            }}
            color="transparent"
            // className="absolute inset-0 m-0 h-[250px] w-full rounded-none bg-[url('https://dev-assets.seeds.finance/circle/cover/8b08b9a2-1697-466a-969f-4866622ab58f.jpeg')] bg-cover bg-center"
            className="absolute inset-0 m-0 h-[250px] w-full rounded-none bg-cover bg-center"
          >
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
          </div>
          <CardBody className="flex justify-center items-center relative py-14 px-3 md:px-12">
            <div className="flex flex-col items-center justify-center">
              <Avatar
                size="xl"
                variant="circular"
                alt="tania andrew"
                className="border-2 border-white"
                src={data.avatar}
              />
              <Typography className="text-base font-semibold text-white text-center mt-4">
                {data.name}
              </Typography>

              <div className="flex flex-row text-center">
                <div className="flex flex-row mr-3">
                  <UserGroupIcon className="w-5 h-5 text-[#27A590] mr-2" />
                  <Typography className="text-xs font-normal text-white">
                    {data.total_rating}
                  </Typography>
                </div>
                <div className="flex flex-row mr-3">
                  <UserGroupIcon className="w-5 h-5 text-[#27A590] mr-2" />
                  <Typography className="text-xs font-normal text-white">
                    {data.total_member}
                  </Typography>
                </div>
                <div className="flex flex-row mr-3">
                  <DocumentIcon className="w-5 h-5 text-[#27A590] mr-2" />
                  <Typography className="text-xs font-normal text-white">
                    {data.total_post}
                  </Typography>
                </div>
              </div>
            </div>
          </CardBody>
        </>
      )}
    </Card>
  );
}
