'use client';
import { useState } from 'react';
import PostSection from './PostSection';
interface props {
  circleId: string;
  isLoading: boolean;
  renderLoading: any;
  setIsLoading: any;
  dataPost: any;
  dataRecommend: any;
}

const CirclePostSection2: React.FC<props> = ({
  setIsLoading,
  circleId,
  isLoading,
  renderLoading,
  dataPost,
  dataRecommend
}) => {
  const [tabs, setTabs] = useState<string>('post');

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
    }
  };

  const active: string =
    'text-seeds-green font-poppins font-semibold text-xs md:text-base pb-2 border-b border-seeds-green';
  const inActive: string =
    'text-neutral-soft font-poppins font-normal text-xs md:text-base pb-2';
  return (
    <>
      {isLoading ? (
        renderLoading()
      ) : (
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
      )}
    </>
  );
};

export default CirclePostSection2;
