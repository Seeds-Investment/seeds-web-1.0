import PageGradient from '@/components/ui/page-gradient/PageGradient';
import CirclePostSection1 from '@/containers/circle/[id]/CirclePostSection1';
import CirclePostSection2 from '@/containers/circle/[id]/CirclePostSection2';
import Image from 'next/image';
import { WrongGirl } from 'public/assets/circle';

interface props {
  children: React.ReactNode;
  circleId: any;
  dataPost: any;
  dataRecommend: any;
  openModalDelete: any;
  openModalLeave: any;
  openModalReport: any;
  handleEdit: any;
  isEdit: boolean;
  isJoined: boolean;
  setIsJoined: any;
  dataCircle: any;
  setIsLoading: any;
  isLoading: boolean;
  setDataPost: any;
  setDataRecommend: any;
  fetchCirclePost: any;
  fetchCircleRecommend: any;
}

const MainPostLayout: React.FC<props> = ({
  children,
  circleId,
  dataPost,
  dataRecommend,
  openModalDelete,
  openModalLeave,
  openModalReport,
  handleEdit,
  isEdit,
  isJoined,
  setIsJoined,
  dataCircle,
  setIsLoading,
  isLoading,
  setDataPost,
  setDataRecommend,
  fetchCirclePost,
  fetchCircleRecommend
}) => {
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
      {/* main component */}
      <div className="flex justify-center">
        <div className="bg-transparent relative top-10 md:w-[95vw] w-[100vw]">
          <div className="flex md:gap-8 flex-col">
            <div className="relative">
              <CirclePostSection1
                dataCircle={dataCircle}
                setIsLoading={setIsLoading}
                openModalDelete={openModalDelete}
                openModalLeave={openModalLeave}
                openModalReport={openModalReport}
                handleEdit={handleEdit}
                isJoined={isJoined}
                setIsJoined={setIsJoined}
              />
              {dataCircle.type !== 'free' && !isJoined ? (
                <div className="h-[80vh] rounded-xl bg-white mb-10">
                  <div className="flex justify-center">
                    <Image
                      src={WrongGirl}
                      alt="image"
                      className="w-[250px] h-[250px]"
                    />
                  </div>
                  <div className="flex justify-center">
                    <div className="flex flex-col gap-2">
                      <h1 className="font-poppins font-semibold text-base text-center">
                        This circle is private
                      </h1>
                      <h1 className="font-poppins font-light text-base text-center">
                        Only members are able to access circles.
                      </h1>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {children}
                  {isEdit ? (
                    <></>
                  ) : (
                    <CirclePostSection2
                      setIsLoading={setIsLoading}
                      circleId={circleId}
                      dataPost={dataPost}
                      dataRecommend={dataRecommend}
                      dataCircle={dataCircle}
                      setDataPost={setDataPost}
                      setDataRecommend={setDataRecommend}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* finish */}
    </PageGradient>
  );
};
export default MainPostLayout;
