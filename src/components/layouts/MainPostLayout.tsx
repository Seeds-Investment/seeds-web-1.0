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
  setDataPost: any;
  setDataRecommend: any;
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
  setDataPost,
  setDataRecommend
}) => {
  return (
    <PageGradient defaultGradient className="overflow-hidden w-full">
      {/* main component */}
      <div className="flex justify-center">
        <div className="bg-transparent w-full">
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
                <div className="h-[80vh] rounded-xl bg-white mt-10 mb-10">
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
