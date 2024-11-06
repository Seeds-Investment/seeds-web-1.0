import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuth from '@/helpers/withAuth';
import { getFollowList, getUserInfo } from '@/repository/profile.repository';
import { type DetailFollowing } from '@/utils/interfaces/chat.interface';
import { type UserInfo } from '@/utils/interfaces/user.interface';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Avatar, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowBackwardIconWhite, DeleteIconX } from 'public/assets/vector';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const CreateGroup: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [followingsList, setFollowingsList] = useState<DetailFollowing[]>([]);
  const [selectedMember, setSelectedMember] = useState<string[]>([]);
  const [displayMembers, setDisplayMembers] = useState<DetailFollowing[]>([]);

  const fetchUserFollowings = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const userInfo: UserInfo = await getUserInfo();
      if (userInfo !== undefined) {
        const response = await getFollowList(userInfo.id, 'followings');
        setFollowingsList(response.data);
      }
    } catch (error) {
      toast.error(`Error fetching data following: ${error as string}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchUserFollowings();
  }, []);

  const handleSelectMember = (
    userId: string,
    isSelected: boolean,
    member: DetailFollowing
  ): void => {
    if (isSelected) {
      setSelectedMember([...selectedMember, userId]);
      setDisplayMembers(prev => [...prev, member]);
    } else {
      setSelectedMember(selectedMember.filter(member => member !== userId));
      setDisplayMembers(prev => prev.filter(member => member.id !== userId));
    }
  };

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="w-full bg-white">
        <div
          style={{ backgroundImage: "url('/assets/chat/bg-chat.svg')" }}
          className="w-full bg-cover rounded-t-xl lg:h-[150px] h-[130px] flex items-center"
        >
          <div className="w-full flex justify-between items-center mx-[18px]">
            <Image
              src={ArrowBackwardIconWhite}
              alt="icon"
              width={24}
              height={24}
              className="text-white cursor-pointer hover:scale-110 duration-150"
              onClick={() => {
                router.back();
              }}
            />
            <Typography className="flex-1 text-center font-poppins font-semibold text-lg text-white">
              {t('chat.newChat')}
            </Typography>
          </div>
        </div>
        <div className="bg-white w-full h-[680px] mt-[-20px] rounded-t-3xl">
          {displayMembers.length > 0 && (
            <div className="flex justify-start items-center gap-2 py-2 px-3 overflow-x-auto w-[calc(100%-28px)] ml-2">
              {displayMembers.map(member => (
                <div key={member.id} className="relative flex shrink-0">
                  <Avatar
                    className="block"
                    src={member?.avatar}
                    width={32}
                    height={32}
                  />
                  <Image
                    className="absolute bottom-0 right-0 cursor-pointer"
                    src={DeleteIconX}
                    alt="icon"
                    width={16}
                    height={16}
                    onClick={() => {
                      handleSelectMember(member?.id, false, member);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="py-5 px-6">
            <div className="relative w-full">
              <input
                // ref={searchRef}
                id="search"
                type="text"
                // onKeyDown={handleSearch}
                name="search"
                placeholder={t('chat.search') ?? ''}
                className="block w-full text-[#262626] text-sm h-10 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-2 pl-4 rounded-xl border border-[#BDBDBD]"
              />
              <MagnifyingGlassIcon className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            </div>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center my-4">
              <div className="animate-spinner w-14 h-14 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
            </div>
          ) : (
            <div className="h-[550px] overflow-y-auto">
              {followingsList.length > 0 &&
                followingsList.map(following => (
                  <div
                    key={following?.id}
                    className="flex justify-between items-center mx-[22px] py-4 border-b border-b-[#E9E9E9]"
                  >
                    <div className="flex flex-row items-center gap-[6px]">
                      <Avatar src={following?.avatar} width={32} height={32} />
                      <div className="flex flex-col gap-2">
                        <Typography className="font-semibold font-poppins text-black text-sm">
                          {following?.name}
                        </Typography>
                        <Typography className="font-normal font-poppins text-black text-xs">
                          {following?.seeds_tag !== undefined &&
                          following?.seeds_tag.length > 15
                            ? `@${following.seeds_tag.slice(0, 15)}...`
                            : `@${following.seeds_tag}`}
                        </Typography>
                      </div>
                    </div>
                    <input
                      className="cursor-pointer w-5 h-5 appearance-none rounded-full border-2 border-gray-500 checked:bg-seeds-green checked:border-[#1A857D]"
                      type="checkbox"
                      checked={selectedMember.includes(following?.id)}
                      onChange={e => {
                        handleSelectMember(
                          following?.id,
                          e.target.checked,
                          following
                        );
                      }}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </PageGradient>
  );
};

export default withAuth(CreateGroup);
