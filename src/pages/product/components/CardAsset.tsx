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
          <div className="flex flex-row items-center justify-center my-10">
            <div className="whitespace-nowrap text-sm mr-2 md:mr-4 shadow-lg">
              <span className="text-white p-3 rounded-lg text-xs md:text-base font-semibold bg-gradient-to-r from-[#7555DA] to-[#4FE6AF]">
                Crypto
              </span>
            </div>
            <div className="whitespace-nowrap text-sm mr-2 md:mr-4 shadow-lg">
              <span className="text-white p-3 rounded-lg text-xs md:text-base font-semibold bg-gradient-to-r from-[#7555DA] to-[#4FE6AF]">
                ID Stocks
              </span>
            </div>
            <div className="whitespace-nowrap text-sm mr-2 md:mr-4 shadow-lg">
              <span className="text-white p-3 rounded-lg text-xs md:text-base font-semibold bg-gradient-to-r from-[#7555DA] to-[#4FE6AF]">
                US Stocks
              </span>
            </div>
            <div className="whitespace-nowrap text-sm mr-2 md:mr-4 shadow-lg">
              <span className="text-white p-3 rounded-lg text-xs md:text-base font-semibold bg-gradient-to-r from-[#7555DA] to-[#4FE6AF]">
                Commodities
              </span>
            </div>
          </div>
          <Card className="flex flex-row rounded-lg p-4 bg-transparent text-[#262626] mb-5 h-[60px]">
            <Typography className="w-1/3 text-sm md:text-base font-semibold text-start">
              Asset Name
            </Typography>
            <Typography className="w-1/3 text-sm md:text-base font-semibold text-center">
              Last Price
            </Typography>
            <Typography className="w-1/3 text-sm md:text-base font-semibold text-end">
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
                  <Typography className="text-xs font-normal text-start md:font-semibold md:text-lg">
                    {data.name}
                  </Typography>
                </div>
                <Typography className="w-1/3 text-xs font-normal text-center md:text-lg">
                  {data.price}
                </Typography>
                <div className=" w-1/3 text-end whitespace-nowrap text-sm">
                  <span className="bg-[#27A590] text-xs text-white p-3 rounded-lg font-normal md:text-base md:font-semibold">
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
