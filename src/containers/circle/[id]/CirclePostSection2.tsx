'use client';
import { getMemberCircle } from '@/repository/circleDetail.repository';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { Sprout } from 'public/assets/images';
import { Search, TripleDots } from 'public/assets/vector';
import { useEffect, useState } from 'react';
import PostSection from './PostSection';
interface props {
  circleId: string;
  isLoading: boolean;
  setIsLoading: any;
  dataPost: any;
  dataRecommend: any;
  dataCircle: any;
}

interface HashtagProps {
  name: string;
  onClose: () => void;
}

const Hashtag: React.FC<HashtagProps> = ({ name, onClose }) => {
  return (
    <span className="flex items-center bg-seeds-button-green rounded-full px-3 py-1 mr-2 mb-2">
      <Typography className="text-sm font-poppins text-white font-medium">
        {name}
      </Typography>
      {/* <button onClick={onClose} className="text-xs font-poppins text-white">
        <Image src={XIcon.src} alt={XIcon.alt} width={20} height={20} />
      </button> */}
    </span>
  );
};

const CirclePostSection2: React.FC<props> = ({
  setIsLoading,
  circleId,
  isLoading,
  dataPost,
  dataRecommend,
  dataCircle
}) => {
  const [tabs, setTabs] = useState<string>('post');
  const [member, setMember] = useState<any[]>([]);
  const [searchMember, setSearchMember] = useState<string>('');

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): any => {
    const { value } = event.target;
    setSearchMember(value);
  };

  const fetchCircleMember = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const { data } = await getMemberCircle({ circleId });

      setMember(data);
    } catch (error: any) {
      console.error('Error fetching Circle Recommend:', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const newData = member.filter(el => {
    if (searchMember === '') return true;
    return el.name.toLowerCase().includes(searchMember.toLowerCase());
  });

  useEffect(() => {
    void fetchCircleMember();
  }, []);

  const handlePages = (): any => {
    if (tabs === 'post') {
      return (
        <>
          {dataPost !== undefined &&
          dataPost !== null &&
          dataPost.length > 0 ? (
            dataPost?.map((el: any) => {
              return <PostSection dataPost={el} key={el.id} />;
            })
          ) : (
            <></>
          )}
        </>
      );
    } else if (tabs === 'recommended') {
      return (
        <>
          {dataRecommend !== undefined &&
          dataRecommend !== null &&
          dataRecommend.length > 0 ? (
            dataRecommend?.map((el: any) => {
              return <PostSection dataPost={el} key={el.id} />;
            })
          ) : (
            <></>
          )}
        </>
      );
    } else if (tabs === 'members') {
      return (
        <div className="flex flex-col">
          <div className="flex justify-between w-full md:max-w-[340px]">
            <Typography className="text-black font-semibold font-poppins">
              Participants
            </Typography>
            <Typography className="text-black font-normal font-poppins">
              {member.length} Participants
            </Typography>
          </div>
          <div className="flex justify-start mt-8 relative right-6">
            <div className="flex justify-center flex-col relative left-10">
              <Image
                alt="Search"
                src={Search}
                className="h-6 w-6 object-cover"
              />
            </div>
            <input
              type="text"
              value={searchMember}
              onChange={handleFormChange}
              className="h-10 pl-12 focus:outline-none focus:outline focus:outline-seeds-green placeholder:text-neutral-soft rounded-xl w-[350px] border border-neutral-ultrasoft"
              placeholder="Search Member"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10 pt-10">
            {newData.map((el: any) => {
              return (
                <div className="flex gap-5" key={el.id}>
                  <div className="hidden md:flex">
                    <div>
                      <Image
                        src={el.avatar}
                        alt="AVATAR"
                        width={48}
                        height={48}
                        className=" w-15 h-15 aspect-square rounded-full outline outline-black"
                      />
                    </div>
                  </div>
                  <div className="md:hidden flex">
                    <div>
                      <Image
                        src={el?.avatar}
                        alt="AVATAR"
                        width={48}
                        height={48}
                        className=" w-11 h-11  rounded-full outline outline-black"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <Typography className="font-bold md:text-lg">
                          {el?.name}
                        </Typography>
                        <Image
                          src={Sprout.src}
                          alt={Sprout.alt}
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="flex p-2 rounded-full px-4 hover:bg-seeds-green/75 bg-seeds-green/20 cursor-pointer">
                        <Image
                          src={TripleDots.src}
                          alt={TripleDots.alt}
                          height={8}
                          width={8}
                          className="w-auto h-auto relative"
                        />
                      </div>
                    </div>
                    <div className="flex gap-1 items-center text-neutral-soft">
                      <Typography className="text-xs md:text-sm">
                        @{el?.username}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else if (tabs === 'about') {
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-base font-semibold font-poppins">
              About this Circle
            </h1>
            <p className="text-neutral-medium font-normal font-poppins">
              {dataCircle.description}
            </p>
          </div>
          <div className="space-y-4">
            <h1 className="text-base font-semibold font-poppins">
              Circle Rules
            </h1>
            <p className="text-neutral-medium font-normal font-poppins">
              {dataCircle.description_rules}
            </p>
          </div>
          <div className="flex flex-wrap">
            <h1 className="text-base font-semibold mb-4 w-full font-poppins">
              Hashtag
            </h1>
            {dataCircle?.hashtags?.map((el: any) => {
              return <Hashtag name={el.name} onClose={() => {}} key={el.id} />;
            })}
            {/* ...tambahkan hashtag lainnya sesuai kebutuhan */}
          </div>
        </div>
      );
    }
  };

  const active: string =
    'text-seeds-green font-poppins font-semibold text-xs md:text-base pb-2 border-b border-seeds-green';
  const inActive: string =
    'text-neutral-soft font-poppins font-normal text-xs md:text-base pb-2';
  return (
    <>
      <div className="bg-white my-8 rounded-xl">
        <div className="h-fit w-full py-8 px-14 md:ml-0">
          {/* navigation */}
          <div className="flex justify-start border-b border-neutral-soft w-fit gap-8 mb-8 ml-5 md:ml-0">
            <button
              onClick={(): any => {
                setTabs('post');
              }}
              className={tabs === 'post' ? active : inActive}
            >
              Post
            </button>
            <button
              onClick={(): any => {
                setTabs('recommended');
              }}
              className={tabs === 'recommended' ? active : inActive}
            >
              Recommended
            </button>
            <button
              onClick={(): any => {
                setTabs('members');
              }}
              className={tabs === 'members' ? active : inActive}
            >
              Members
            </button>
            <button
              onClick={(): any => {
                setTabs('about');
              }}
              className={tabs === 'about' ? active : inActive}
            >
              About
            </button>
          </div>
          {handlePages()}
        </div>
      </div>
    </>
  );
};

export default CirclePostSection2;
