import PageGradient from '@/components/ui/page-gradient/PageGradient';
import CirclePostSection1 from '@/containers/circle/post/CirclePostSection1';
import CirclePostSection2 from '@/containers/circle/post/CirclePostSection2';
import { getDetailCircle } from '@/repository/circleDetail.repository';
import { useEffect, useState } from 'react';

interface props {
  children: React.ReactNode;
  CIRCLE_ID: any;
}

const MainPostLayout: React.FC<props> = ({ children, CIRCLE_ID }) => {
  const [dataCircle, setData]: any = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const renderLoading = (): JSX.Element => (
    <div className="h-72">
      <div className="animate-spinner relative top-1/2 left-1/2 -mt-8 -ml-8 w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
    </div>
  );

  const fetchDetailCircle = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const { data } = await getDetailCircle({ CIRCLE_ID });

      setData(data);
    } catch (error: any) {
      console.error('Error fetching Circle Detail:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchDetailCircle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CIRCLE_ID]);

  console.log(dataCircle);

  const customGradient = (
    <>
      <span className="z-0 fixed bottom-10 -left-10 w-60 h-48 bg-seeds-green-2 blur-[90px] rotate-45" />
      <span className="z-0 fixed bottom-0 left-0 w-24 h-24 bg-seeds-green-2 blur-[90px]" />
      <span className="z-0 fixed -bottom-28 left-16 w-48 h-32 bg-seeds-purple-2 blur-[90px] rotate-45" />
      <span className="z-0 fixed top-64 -right-4 w-60 h-48 bg-seeds-green-2 blur-[90px] rotate-45 rounded-full" />
      <span className="z-0 fixed bottom-36 right-0 w-32 h-32 bg-seeds-purple-2 blur-[90px] rotate-90 rounded-full" />
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
                CIRCLE_ID={CIRCLE_ID}
                isLoading={isLoading}
                renderLoading={renderLoading}
              />
              {children}
              <CirclePostSection2
                dataCircle={dataCircle}
                CIRCLE_ID={CIRCLE_ID}
                isLoading={isLoading}
                renderLoading={renderLoading}
              />
            </div>
          </div>
        </div>
      </div>
      {/* finish */}
    </PageGradient>
  );
};
export default MainPostLayout;
