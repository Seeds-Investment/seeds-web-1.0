'use client';
import likeCircle from '@/assets/my-profile/circle/likeCircle.svg';
import memberCircle from '@/assets/my-profile/circle/memberCircle.svg';
import postCircle from '@/assets/my-profile/circle/postCircle.svg';
import info from '@/assets/my-profile/play/info.svg';
import CCard from '@/components/CCard';
import { chrownCirclePremium } from '@/constants/assets/icons';
import PostSection from '@/containers/circle/[id]/PostSection';
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DataItem {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface Params {
  userData: any;
  circleData: any;
  playData: any;
  postData: any;
  setPostData: any;
}

interface Item {
  cover?: string;
  type?: string;
  avatar?: string;
  name?: string;
  total_like?: any;
  total_member?: any;
  total_post?: any;
  percentage?: number;
  logo?: any;
  ticker?: any;
  exchange?: any;
}

interface MyStyle extends React.CSSProperties {
  '--image-url': string;
}

const UnderLineTab = ({
  userData,
  circleData,
  playData,
  postData,
  setPostData
}: Params): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('circle');
  const data: DataItem[] = [
    {
      label: 'Post',
      value: 'post',
      content: (
        <CCard className="flex p-8 md:mt-5 md:rounded-lg border-none rounded-none pb-10">
          <div className="flex justify-start w-full border border-neutral-ultrasoft" />
          {postData?.data?.map((el: any, idx: number) => {
            console.log(postData);
            return (
              <div className="flex flex-col" key={`${el.id as string} ${idx}`}>
                {el.circle !== undefined && (
                  <div
                    className={`flex justify-between p-2 rounded-t-2xl px-4 ${
                      el?.circle?.status_joined === true
                        ? 'bg-[#E9E9E9]'
                        : 'bg-[#DCFCE4]'
                    } mt-5`}
                  >
                    <div className="flex items-center">
                      <img
                        src={el?.circle?.avatar}
                        alt="image"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <Typography
                        className={`text-sm text-black px-2 py-1 font-bold`}
                      >
                        {el?.circle?.name}
                      </Typography>
                    </div>
                    <button
                      className={`${
                        el?.circle?.status_joined === true
                          ? 'bg-[#BDBDBD] cursor-not-allowed'
                          : 'bg-seeds-button-green'
                      } rounded-full`}
                    >
                      <Typography
                        className={`text-sm ${
                          el?.circle?.status_joined === true
                            ? 'text-neutral-soft'
                            : 'text-white'
                        } px-2 py-1 font-bold`}
                        onClick={() => {
                          if (el?.circle?.status_joined === false) {
                            router
                              .push(`/connect/post/${el?.circle_id as string}`)
                              .catch((err: any) => {
                                console.error(err);
                              });
                          }
                        }}
                      >
                        {el?.circle?.status_joined === true
                          ? t('circleDetail.statusJoined')
                          : t('circleDetail.statusNotJoined')}
                      </Typography>
                    </button>
                  </div>
                )}
                <PostSection dataPost={el} setData={setPostData} />
              </div>
            );
          })}
        </CCard>
      )
    },
    {
      label: 'Circle',
      value: 'circle',
      content: (
        // <div className="flex flex-col  justify-center items-center">
        //   <Image
        //     src={Maintenance.src}
        //     alt={Maintenance.alt}
        //     width={120}
        //     height={120}
        //     className="w-auto h-auto aspect-square"
        //   />
        //   <Typography variant="h3" className="font-bold text-black">
        //     Oops
        //   </Typography>
        //   <Typography className="text-xl text-gray-500">
        //     Sorry, we are still developing this feature
        //   </Typography>
        // </div>
        <div className="flex flex-wrap gap-x-3 gap-y-4 justify-center lg:justify-start">
          {circleData?.data?.map((item: Item, index: any) => {
            console.log(circleData);
            const myStyle: MyStyle = {
              '--image-url': `url(${item.cover ?? ''})`
            };
            return (
              <Card
                shadow={false}
                className="lg:w-[292px] lg:h-[152.81px] w-[343px] h-[177px]"
                key={index}
              >
                <CardHeader
                  shadow={false}
                  color="transparent"
                  style={myStyle}
                  className={`absolute m-0 h-full w-full bg-cover bg-center bg-[image:var(--image-url)] py-[13.46px] px-[16.87px]`}
                >
                  {item.type !== 'free' ? (
                    <div className="flex w-[65.63px] h-[19.35px] absolute top-0 right-0 mr-[16.87px] mt-[13.46px] bg-white rounded-full gap-[3.37px] items-center justify-center">
                      <Image
                        src={chrownCirclePremium.src}
                        alt="crown"
                        width={10}
                        height={10}
                      />
                      <Typography className="text-[6.73px] leading-[13.46px] text-[#3AC4A0] font-semibold font-poppins">
                        Premium
                      </Typography>
                    </div>
                  ) : null}
                </CardHeader>
                <CardBody className="p-0 relative flex flex-col items-center my-auto gap-1.5">
                  <Avatar
                    alt="circleAvatar"
                    className="border-[1.68px] border-white w-16 h-16 bg-cover"
                    src={`${item.avatar ?? ''}`}
                  />
                  <Typography className="text-white text-sm font-poppins font-semibold">
                    {item.name}
                  </Typography>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-[1.68px]">
                      <Image src={likeCircle} alt="likeCircle" />
                      <Typography className="text-white text-[10px] font-poppins font-normal leading-[13.46px]">
                        {item.total_like}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-[1.68px]">
                      <Image src={memberCircle} alt="memberCircle" />
                      <Typography className="text-white text-[10px] font-poppins font-normal leading-[13.46px]">
                        {item.total_member}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-[1.68px]">
                      <Image src={postCircle} alt="postCircle" />
                      <Typography className="text-white text-[10px] font-poppins font-normal leading-[13.46px]">
                        {item.total_post}
                      </Typography>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )
    },
    {
      label: 'Play',
      value: 'play',
      content: (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Typography className="text-lg text-[#262626] font-semibold font-poppins">
              Total Play :{' '}
              <span className="text-sm text-[#7C7C7C] font-normal font-poppins">
                {`${playData?.data?.play_total as string} tournament`}
              </span>
            </Typography>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {playData?.data?.win_percentages?.map(
                (item: Item, index: any) => {
                  return (
                    <Card
                      shadow={false}
                      className={`flex justify-center border border-[#3AC4A0] bg-[#DCFCE4] sm:w-[164px] h-[92px] ${
                        item?.type === 'ALL' ? 'w-[192px]' : 'w-[164px]'
                      }`}
                      key={index}
                    >
                      <CardBody className="p-0 flex flex-col items-center gap-2">
                        <div className="flex gap-[5px]">
                          <Image src={info} alt="information" />
                          <Typography className="text-[#3AC4A0] text-xs font-normal font-poppins">
                            {`${
                              item?.type === 'ALL'
                                ? 'Win Percentage'
                                : `${
                                    item?.type?.charAt(0).toUpperCase() ?? ''
                                  }${item?.type?.slice(1).toLowerCase() ?? ''}`
                            }`}
                          </Typography>
                        </div>

                        <Typography className="text-[#3AC4A0] text-3xl font-semibold font-poppins">
                          {`${item.percentage ?? ''}%`}
                        </Typography>
                      </CardBody>
                    </Card>
                  );
                }
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Typography className="text-lg text-[#262626] font-semibold font-poppins">
              Top 3 Assets Returns
            </Typography>
            <div className="flex gap-[16.28px] flex-wrap">
              {playData?.data?.asset_returns
                ?.sort((a: any, b: any) => b.percentage - a.percentage)
                .slice(0, 3)
                .map((item: Item, index: any) => {
                  return (
                    <div
                      className="flex justify-between p-[12.21px] w-[286.15px] bg-[#F9F9F9] border border-[#E9E9E9] rounded-lg"
                      key={index}
                    >
                      <div className="flex h-[40.69px] gap-[12.21px]">
                        <img
                          src={item?.logo}
                          alt={item?.name}
                          width={40.69}
                          height={40.69}
                        />
                        <div className="flex flex-col gap-[9.42px] justify-center">
                          <Typography className="font-montserrat text-[12.21px] leading-[14.88px] font-bold text-[#424242]">
                            {item?.ticker}/
                            <span className="font-normal text-[#585858]">
                              {item?.exchange}
                            </span>
                          </Typography>
                          <Typography className="text-[12.21px] leading-[16.28px] text-[#BDBDBD] font-poppins font-normal">
                            {(item?.name?.length ?? 0) >= 20
                              ? `${item?.name?.slice(0, 20) ?? ''}...`
                              : item.name}
                          </Typography>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Typography className="text-[#3AC4A0] text-[14.24px] leading-[20.35px] font-poppins font-semibold">
                          {item?.percentage}%
                        </Typography>
                        <Typography className="text-[#7555DA] text-[12.21px] leading-[16.28px] font-poppins font-normal">
                          {`${item?.type?.charAt(0).toUpperCase() ?? ''}${
                            item?.type?.slice(1).toLowerCase() ?? ''
                          }`}
                        </Typography>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )
    }
  ];
  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="bg-transparent"
        indicatorProps={{
          className:
            'bg-transparent mt-2 border-b-4 border-[#3AC4A0] shadow-none rounded-sm'
        }}
      >
        <div className="flex w-1/2 mx-auto">
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => {
                setActiveTab(value);
              }}
              className={`${activeTab === value ? 'text-[#3AC4A0]' : ''}`}
            >
              {label}
            </Tab>
          ))}
        </div>
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, content }) => (
          <TabPanel key={value} value={value} className="px-0">
            {content}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default UnderLineTab;
