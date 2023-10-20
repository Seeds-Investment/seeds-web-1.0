import Loading from '@/components/popup/Loading';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import PostSection from '@/containers/circle/[id]/PostSection';
import { getDetailCirclePost } from '@/repository/circleDetail.repository';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowBackwardIcon } from 'public/assets/vector';
import { useEffect, useState } from 'react';

const Comment: React.FC = () => {
  const router = useRouter();
  const postId: string | any = router.query.postId;
  const [dataPost, setDataPost] = useState<null | any[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDetailCirclePost = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { data } = await getDetailCirclePost({ postId });

      setDataPost(data);
    } catch (error: any) {
      console.error('Error fetching Circle Detail:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchDetailCirclePost();
  }, [postId]);

  const customGradient = (
    <>
      <span className="-z-10 absolute bottom-10 -left-10 w-60 h-48 bg-seeds-green-2 blur-[90px] rotate-45" />
      <span className="-z-10 absolute bottom-0 left-0 w-24 h-24 bg-seeds-green-2 blur-[90px]" />
      <span className="-z-10 absolute -bottom-28 left-16 w-48 h-32 bg-seeds-purple-2 blur-[90px] rotate-45" />
      <span className="-z-10 absolute top-64 -right-4 w-60 h-48 bg-seeds-green-2 blur-[90px] rotate-45 rounded-full" />
      <span className="-z-10 absolute bottom-36 right-0 w-32 h-32 bg-seeds-purple-2 blur-[90px] rotate-90 rounded-full" />
    </>
  );
  return (
    <PageGradient
      customGradient={customGradient}
      className="md:p-10 absolute overflow-hidden w-full"
    >
      {isLoading && <Loading />}
      <div className="flex justify-center">
        <div className="bg-transparent relative top-10 md:w-[90vw] w-[100vw]">
          <div className="flex md:gap-8 flex-col">
            <div className="relative">
              <div className="bg-white my-8 rounded-xl shadow-sm">
                <div className="flex justify-start pl-16 gap-10 pt-4">
                  <Image
                    src={ArrowBackwardIcon}
                    alt="Back"
                    width={30}
                    height={30}
                  />
                  <Typography className="text-xl font-semibold font-poppins">
                    Comment
                  </Typography>
                </div>
                <div className="h-fit w-full py-8 px-14 md:ml-0">
                  <div className="flex flex-col">
                    {dataPost !== null && (
                      <PostSection dataPost={dataPost} setData={setDataPost} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageGradient>
  );
};

export default Comment;
