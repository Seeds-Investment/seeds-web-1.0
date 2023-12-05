import PageGradient from '@/components/ui/page-gradient/PageGradient';
import {
  Card,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography
} from '@material-tailwind/react';
import { useRouter } from 'next/router';

const Follow: React.FC = () => {
  const router = useRouter();
  const { type } = router.query;
  const followData = [
    { name: 'sdasd', tag: 'asdsad' },
    { name: 'sdasd', tag: 'asdsad' },
    { name: 'sdasd', tag: 'asdsad' },
    { name: 'sdasd', tag: 'asdsad' },
    { name: 'sdasd', tag: 'asdsad' },
    { name: 'sdasd', tag: 'asdsad' },
    { name: 'sdasd', tag: 'asdsad' },
    { name: 'sdasd', tag: 'asdsad' }
  ];

  const followingData = [
    { name: 'sdasd', tag: 'asdsad' },
    { name: 'sdasd', tag: 'asdsad' },
    { name: 'sdasd', tag: 'asdsad' },
    { name: 'sdasd', tag: 'asdsad' },
    { name: 'sdasd', tag: 'asdsad' },
    { name: 'sdasd', tag: 'asdsad' },
    { name: 'sdasd', tag: 'asdsad' },
    { name: 'sdasd', tag: 'asdsad' }
  ];
  const data = [
    {
      label: 'Followers',
      value: 'followers',
      content: (
        <section className="flex gap-8 justify-between flex-wrap">
          {followData.map((item, index) => {
            return (
              <div
                className="flex flex-row bg-red-700 w-[400px] items-center"
                key={index}
              >
                <div className="w-12 h-12 rounded-full bg-black"></div>
                <div className="flex flex-col">
                  <Typography>{item.name}</Typography>
                  <Typography>{item.tag}</Typography>
                </div>
              </div>
            );
          })}
        </section>
      )
    },
    {
      label: 'Following',
      value: 'following',
      content: (
        <section className="flex gap-8 justify-between flex-wrap">
          {followingData.map((item, index) => {
            return (
              <div
                className="flex flex-row bg-red-700 w-[400px] items-center"
                key={index}
              >
                <div className="w-12 h-12 rounded-full bg-black"></div>
                <div className="flex flex-col">
                  <Typography>{item.name}</Typography>
                  <Typography>{item.tag}</Typography>
                </div>
              </div>
            );
          })}
        </section>
      )
    }
  ];

  return (
    <PageGradient defaultGradient className="w-full">
      <Card shadow={false}>
        <Tabs value={type}>
          <TabsHeader
            className="p-0 bg-transparent h-12 border-b border-[#BDBDBD] rounded-none"
            indicatorProps={{
              className:
                'bg-transparent border-b-4 border-[#27A590] shadow-none rounded-sm'
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={async () => {
                  await router.push({
                    pathname: `/my-profile/follow-list`,
                    query: {
                      type: `${
                        value === 'followers' ? 'followers' : 'following'
                      }`
                    }
                  });
                }}
                className={`${
                  type === value ? 'text-[#27A590]' : 'text-[#7C7C7C]'
                } mx-[40px] text-base font-poppins font-semibold z-10`}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, content }) => (
              <TabPanel key={value} value={value} className="px-5 py-8">
                {content}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </Card>
    </PageGradient>
  );
};

export default Follow;
