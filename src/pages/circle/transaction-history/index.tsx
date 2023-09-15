import CCard from '@/components/CCard';
import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
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
        <div className="flex items-center justify-center rounded-xl md:mx-8 lg:mx-20 xl:mx-[13rem]">
          <CCard className="p-9 border-none rounded-none shadow-none w-full bg-white md:mx-8 lg:mx-20 xl:mx-[13rem]">
            <Card className="bg-[#8a70e0] h-full">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Circle Balance
                </Typography>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  100.000
                </Typography>
              </CardBody>
            </Card>
            <Tabs value={activeTab}>
              <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                indicatorProps={{
                  className:
                    'bg-transparent border-b-2 border-gray-900 shadow-none rounded-none'
                }}
              >
                {data.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => {
                      setActiveTab(value);
                    }}
                    className={activeTab === value ? 'text-gray-900' : ''}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    {desc}
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
