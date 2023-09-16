import CCard from '@/components/CCard';
import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import {
  Card,
  CardBody,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography
} from '@material-tailwind/react';
import { useState } from 'react';

const TransactionHistory = (): JSX.Element => {
  const width = useWindowInnerWidth();
  const [activeTab, setActiveTab] = useState('income');
  const data = [
    {
      label: 'Income',
      value: 'income',
      desc: `It really matters and then like it really doesn't matter.
            What matters is the people who are sparked by it. And the people 
            who are like offended by it, it doesn't matter.`
    },
    {
      label: 'Outcome',
      value: 'outcome',
      desc: `Because it's about motivating the doers. Because I'm here
            to follow my dreams and inspire other people to follow their dreams, too.`
    }
  ];

  return (
    <PageGradient
      defaultGradient
      className="relative overflow-hidden flex flex-col items-center sm:p-0 sm:pb-16 w-full"
    >
      <CardGradient
        defaultGradient
        className={`relative overflow-hidden w-full sm:w-[90%] sm:rounded-[18px] sm:min-h-[36rem] bg-white sm:px-20 py-8 ${
          width !== undefined && width < 370
            ? 'min-h-[38rem]'
            : width !== undefined && width < 400
            ? 'min-h-[45rem]'
            : width !== undefined && width < 415
            ? 'min-h-[48rem]'
            : ''
        } bg-white`}
      >
        <div className="mb-4">
          <h6 className="mb-4 text-center text-lg font-poppins font-semibold">
            Transaction History
          </h6>
        </div>
        <div className="flex items-center justify-center rounded-xl">
          <CCard className="p-9 border-none rounded-none shadow-none w-full bg-white">
            <Card className="bg-[#8a70e0] h-full">
              <CardBody>
                <Typography color="white" className="text-base font-normal">
                  Circle Balance
                </Typography>
                <Typography color="white" className="text-2xl font-semibold">
                  IDR 100.000
                </Typography>
              </CardBody>
            </Card>
            <Tabs value={activeTab}>
              <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                indicatorProps={{
                  className:
                    'bg-transparent border-b-2 border-[#3AC4A0] shadow-none rounded-none'
                }}
              >
                {data.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => {
                      setActiveTab(value);
                    }}
                    className={`${activeTab === value ? 'text-[#3AC4A0]' : ''}`}
                  >
                    <Typography className="text-base font-medium">
                      {label}
                    </Typography>
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    <Card className="flex flex-row w-full p-4 rounded-none bg-[#F9F9F9]">
                      <div className="w-1/2 flex flex-row items-center justify-start">
                        <div>
                          <ArrowUpCircleIcon className="w-7 h-7 text-[#27A590] mr-2" />
                        </div>
                        <div>
                          <Typography className="text-sm text-left font-semibold text-[#262626]">
                            Pembayaran Content
                          </Typography>
                          <Typography className="text-xs text-left font-normal text-[#7C7C7C]">
                            IDR 100.000
                          </Typography>
                          <Typography className="text-[12px] text-left italic text-[#BDBDBD]">
                            ID:34567892
                          </Typography>
                        </div>
                      </div>
                      <div className="w-1/2 items-center justify-center">
                        <Typography className="text-xs text-end font-semibold mb-2 text-[#4DA81C]">
                          Success
                        </Typography>
                        <Typography className="text-xs text-end text-[#7C7C7C]">
                          09/10/2019, 19:05:50 WIB
                        </Typography>
                      </div>
                    </Card>
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </CCard>
        </div>
      </CardGradient>
    </PageGradient>
  );
};

export default TransactionHistory;
