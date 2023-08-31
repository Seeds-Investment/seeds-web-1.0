import { Avatar, Card, Typography } from '@material-tailwind/react';

interface dataInterface {
  icon: string;
  name: string;
  price: string;
  change: string;
}

export default function CardAsset({
  data
}: {
  data: dataInterface;
}): React.ReactElement {
  return (
    <Card className="flex flex-row shadow-md rounded-xl mb-7 p-4 bg-transparent h-[80px] items-center">
      {data !== undefined && (
        <>
          <div className="flex flex-row justify-start items-center w-1/3">
            <Avatar
              size="md"
              variant="circular"
              src={data.icon}
              className="mr-4"
              alt="ngehe"
            />
            <Typography className="text-lg font-semibold text-start">
              {data.name}
            </Typography>
          </div>
          <Typography className="w-1/3 text-lg font-normal text-center">
            {data.price}
          </Typography>
          <td className=" w-1/3 text-end whitespace-nowrap text-sm">
            <span className="bg-[#27A590] text-white p-3 rounded-lg text-base font-semibold">
              {data.change}
            </span>
          </td>
        </>
      )}
    </Card>
  );
}
