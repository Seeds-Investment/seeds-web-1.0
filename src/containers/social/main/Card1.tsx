import CCard from '@/components/CCard';
import FilterIcon from '@/components/svgs/filterIcon';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Tab,
  Tabs,
  TabsHeader
} from '@material-tailwind/react';
import { useRouter } from 'next/router';

const dataTab = [
  { label: 'Following', value: 'following' },
  { label: 'For You', value: 'for_you' },
  { label: 'Space', value: 'space' }
];

interface props {
  activeTab: string;
  setActiveTab: any;
}

const optionsFilter = [
  { title: 'All', subtitle: 'Everyone' },
  { title: 'Personal', subtitle: 'Your only friend' },
  { title: 'Post by Circle', subtitle: 'Create a post in circle' }
];

const Card1: React.FC<props> = ({ activeTab, setActiveTab }) => {
  const router = useRouter();

  return (
    <CCard className="flex p-2 md:mt-5 md:rounded-lg border-none rounded-none">
      <div className="flex flex-row items-center justify-center w-full mb-2">
        <div className="mr-2 w-1/2">
          <div
            className="relative"
            onClick={() => {
              void router.push('/social/search');
            }}
          >
            <input
              type="text"
              // onChange={handleChange}
              placeholder="Search"
              readOnly={false}
              disabled={false}
              className="block w-full text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-3 rounded-lg border border-[#BDBDBD]"
            />

            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-[#262626]" />
            </div>
          </div>
        </div>
        <Menu>
          <MenuHandler>
            <Button className="flex flex-row gap-2 border-[#E9E9E9] bg-[#FFF] rounded-md text-[#7C7C7C]">
              <FilterIcon />
              Filter
            </Button>
          </MenuHandler>
          <MenuList>
            {optionsFilter.map((data, idx) => (
              <MenuItem key={idx}>
                <h1 className="font-semibold">{data.title}</h1>
                <p className="font-normal">{data.subtitle}</p>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>

      <Tabs value={activeTab}>
        <TabsHeader
          className="bg-transparent flex justify-between w-full rounded-none border-b border-blue-gray-50"
          indicatorProps={{
            className:
              'bg-transparent border-b-2 border-[#3AC4A0] shadow-none rounded-none'
          }}
        >
          {dataTab.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={`${
                activeTab === value ? 'text-[#3AC4A0]' : 'text-[#7C7C7C]'
              } text-base font-semibold`}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
      </Tabs>
    </CCard>
  );
};

export default Card1;
