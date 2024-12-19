import { type GroupMemberData } from '@/utils/interfaces/chat.interface';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Avatar, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { ArrowBackwardIconWhite } from 'public/assets/vector';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchGroupMembersProps {
  setIsOpenSearchMembers: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenSearchMembers: boolean;
  filteredMember: GroupMemberData[];
}

const SearchGroupMembers: React.FC<SearchGroupMembersProps> = ({
  setIsOpenSearchMembers,
  isOpenSearchMembers,
  filteredMember
}) => {
  const { t } = useTranslation();
  const searchRef = useRef<HTMLInputElement>(null);
  const [groupMembers, setGroupMembers] =
    useState<GroupMemberData[]>(filteredMember);

  useEffect(() => {
    setGroupMembers(filteredMember);
  }, [filteredMember]);

  const handleSearch = (): void => {
    const keyword = searchRef.current?.value?.toLowerCase() ?? '';

    if (keyword === '') {
      setGroupMembers(filteredMember ?? []);
    } else {
      const filtered = filteredMember.filter(member =>
        member.user_name.toLowerCase().includes(keyword)
      );
      setGroupMembers(filtered ?? []);
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
      <div className="bg-white w-full mt-[-20px] rounded-t-3xl mb-5">
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
        <div className="flex flex-col gap-4 px-4 lg:h-[450px] h-[390px] overflow-y-auto team-battle-scroll">
          {groupMembers
            ?.sort((a, b) => {
              if (a?.role === 'admin' && b?.role !== 'admin') return -1;
              if (a?.role !== 'admin' && b?.role === 'admin') return 1;
              return 0;
            })
            ?.map((item: GroupMemberData, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-center px-4">
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
      </div>
    </div>
  );
};

export default SearchGroupMembers;
