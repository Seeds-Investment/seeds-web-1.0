import { Avatar, Card, Typography } from '@material-tailwind/react';

interface dataInterface {
  icon: string;
  name: string;
  price: string;
  change: string;
}

export default function CardAsset({
  datas
}: {
  datas: dataInterface[];
}): React.ReactElement {
  return (
    <>
      {datas !== undefined && (
        <>
          <Card className="flex flex-row rounded-lg p-4 bg-transparent text-[#262626] mb-5 h-[60px]">
            <Typography className="w-1/3 text-base font-semibold text-start">
              Asset Name
            </Typography>
            <Typography className="w-1/3 text-base font-semibold text-center">
              Last Price
            </Typography>
            <Typography className="w-1/3 text-base font-semibold text-end">
              24h Change
            </Typography>
          </Card>
          {datas?.length !== 0 ? (
            datas?.map((data, idx) => (
              <Card
                className="flex flex-row shadow-md rounded-xl mb-7 p-4 bg-transparent h-[80px] items-center"
                key={idx}
              >
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
                <div className=" w-1/3 text-end whitespace-nowrap text-sm">
                  <span className="bg-[#27A590] text-white p-3 rounded-lg text-base font-semibold">
                    {data.change}
                  </span>
                </div>
              </Card>
            ))
          ) : (
            <p>not found</p>
          )}
        </>
      )}
    </>
  );
}
