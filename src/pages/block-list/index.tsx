import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuth from '@/helpers/withAuth';

const BlockList: React.FC = () => {
  return (
    <PageGradient defaultGradient className="w-full">
      <div className="w-full h-auto justify-center text-center cursor-default">
        <h1 className="text-center text-lg font-semibold">Block List</h1>
        <div className="w-full lg:w-[70%] lg:h-[60px] bg-white rounded-3xl flex border-black border-[1px] px-[8px] justify-between ">
          <input
            type="search"
            className=" text-[#7C7C7C] w-full border-none rounded-3xl lg:w-[340px] px-[8px] focus:outline-none lg:h-[38px] "
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            onChange={e => {}}
          />
          <svg
            className="mt-2 me-3"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
              fill="#262626"
            />
          </svg>
        </div>
      </div>
    </PageGradient>
  );
};

export default withAuth(BlockList);
