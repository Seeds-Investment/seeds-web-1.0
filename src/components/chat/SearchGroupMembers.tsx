import { getGroupMember } from '@/repository/chat.repository';
import { type GroupMemberData } from '@/utils/interfaces/chat.interface';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Avatar, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { ArrowBackwardIconWhite } from 'public/assets/vector';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface SearchGroupMembersProps {
  setIsOpenSearchMembers: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenSearchMembers: boolean;
  groupMembers: GroupMemberData[];
  groupId: string;
}

const SearchGroupMembers: React.FC<SearchGroupMembersProps> = ({
  setIsOpenSearchMembers,
  isOpenSearchMembers,
  groupMembers,
  groupId
}) => {
  const { t } = useTranslation();
  const searchRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<{
    search: string;
    page: number;
    limit: number;
    sortBy: string;
  }>({
    search: ' ',
    page: 1,
    limit: 10,
    sortBy: ''
  });
  const [userList, setUserList] = useState<GroupMemberData[]>([]);

  const fetchSearchUser = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getGroupMember(groupId, searchParams);
      const filteredUsers: GroupMemberData[] = response.data;
      setUserList(filteredUsers);
    } catch (error) {
      toast.error(`Error fetching data following: ${error as string}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchSearchUser();
  }, [searchParams]);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    let keyword = searchRef.current?.value;

    if (keyword === '') {
      keyword = ' ';
    }

    if (event.key === 'Enter' && keyword !== undefined) {
      event.preventDefault();
      setSearchParams({
        ...searchParams,
        page: 1,
        limit: 9,
        search: keyword
      });
    }
  };
  return (
    <div
      className={`w-full bg-white ${isOpenSearchMembers ? 'block' : 'hidden'}`}
    >
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
              setIsOpenSearchMembers(prev => !prev);
            }}
          />
          <Typography className="flex-1 text-center font-poppins font-semibold text-lg text-white">
            {t('chat.searchMember')}
          </Typography>
        </div>
      </div>
      <div className="bg-white w-full lg:h-[660px] h-[490px] mt-[-20px] rounded-t-3xl mb-5">
        <div className="py-5 px-6">
          <div className="relative w-full">
            <input
              ref={searchRef}
              id="search"
              type="text"
              onKeyDown={handleSearch}
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
          <div className="flex flex-col gap-4 px-2">
            {userList?.map((item: GroupMemberData, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-5">
                    <Avatar
                      src={item?.user_avatar}
                      alt="Avatar"
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                    <Typography className="text-md font-semibold text-[#262626] font-poppins">
                      {item?.user_name}
                    </Typography>
                  </div>
                  {item?.role === 'admin' && (
                    <Typography className="text-sm text-[#3AC4A0] font-normal font-poppins bg-[#EDFCD3] rounded-md p-2 w-fit">
                      Admin
                    </Typography>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchGroupMembers;
