import PageGradient from '@/components/ui/page-gradient/PageGradient';

const Pretest: React.FC = () => {
  return (
    <>
      <PageGradient defaultGradient className="w-full">
        <div className="relative font-bold bg-white text-[#262626] md:p-4 p-3 rounded-xl mt-5 md:mt-0 w-full text-center">
          Pre-Test
        </div>
        <div className="bg-white p-3 rounded-xl mt-5">
          <div
            style={{ backgroundImage: "url('/assets/academy/bg-pretest.png')" }}
            className="relative w-full bg-center bg-cover rounded-xl aspect-[900/1600] md:aspect-[1600/900] overflow-auto shadow-md"
          >
            <div className="p-3">
              <div className="flex flex-row justify-between text-white font-medium text-lg">
                <div>Question</div>
                <div>1/15</div>
              </div>
              <div className="text-white text-lg my-10">
                Penundaan konsumsi sekarang untuk aktifita produktif selama
                periode waktu tertentu merupakan definisi dari ...
              </div>
              <div className="text-lg flex flex-col gap-5">
                <div className="p-3 bg-white rounded-xl">
                  Lorem ipsum dolor sit amet sectetur, ipisicing elit.
                </div>
                <div className="p-3 bg-white rounded-xl">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </div>
                <div className="p-3 bg-white rounded-xl">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </div>
                <div className="p-3 bg-white rounded-xl">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button className="p-3 rounded-3xl bg-[#3AC4A0] w-full text-white text-lg font-bold">
              Next
            </button>
          </div>
        </div>
      </PageGradient>
    </>
  );
};

export default Pretest;
