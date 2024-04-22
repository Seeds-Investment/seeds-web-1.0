import ChatList from '@/components/chat/ChatList';
import type {
  Chat,
  GetListChatParams
} from '@/utils/interfaces/chat.interface';
import Image from 'next/image';
import { filterSearch } from 'public/assets/chat';
import { SearchMember } from 'public/assets/circle';

interface props {
  data: Chat[];
  filter: GetListChatParams;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterUnreadChange: () => void;
  handleListClick: () => void;

  isLoading: boolean;
}

const ContactList: React.FC<props> = ({
  data,
  filter,
  handleFormChange,
  handleListClick,
  handleFilterUnreadChange
}) => {
  return (
    <div className={`flex flex-col`}>
      <div className="flex justify-start gap-2">
        <div className="flex justify-center flex-col absolute left-2 pt-2">
          <Image
            alt="Search"
            src={SearchMember}
            className="h-6 w-6 object-cover"
          />
        </div>
        <input
          type="text"
          value={filter.search}
          onChange={handleFormChange}
          className="h-10 pl-10 focus:outline-none placeholder:text-neutral-soft rounded-xl w-full border border-neutral-ultrasoft text-xs"
          placeholder="search"
        />
        <div
          onClick={handleFilterUnreadChange}
          className="flex items-center cursor-pointer"
        >
          <Image alt="Search" src={filterSearch} width={24} height={24} />
        </div>
      </div>
      <div
        onClick={handleListClick}
        className={`flex flex-col max-h-[40vh] overflow-auto mt-4`}
      >
        {data?.map((el: Chat) => {
          return <ChatList data={el} key={el.id} />;
        })}
      </div>
    </div>
  );
};

export default ContactList;
