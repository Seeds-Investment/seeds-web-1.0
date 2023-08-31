import dot_menu from '@/assets/circle-page/3dot.svg';
import notification from '@/assets/circle-page/notification.svg';
import pencil from '@/assets/circle-page/pencil.svg';
import Image from 'next/image';
interface props {
  circleId: string;
  isLoading: boolean;
  renderLoading: any;
  dataCircle: any;
}

const CirclePostSection1: React.FC<props> = ({
  dataCircle,
  circleId,
  isLoading,
  renderLoading
}) => {
  return (
    <>
      {isLoading ? (
        renderLoading()
      ) : (
        <div className="flex flex-col bg-white rounded-xl">
          <div className="flex flex-col rounded-b-3xl px-14 py-8">
            <button className="sm:block hidden bg-white rounded-full relative top-10 w-fit left-[90%] md:left-[92%] lg:left-[93%] xl:left-[94%] 2xl:left-[95%] p-1">
              <Image
                alt="pencil-edit"
                src={pencil}
                className="h-[13px] w-[14px]"
              />
            </button>
            <img
              alt="bg-circle"
              src={dataCircle?.cover}
              className="md:max-h-[300px] max-h-[200px] 2xl:w-[100%] object-cover sm:rounded-t-3xl"
            />
            <div className="bg-white left-5 rounded-full relative bottom-14 w-fit">
              <img
                alt="bg-circle-avatar"
                src={dataCircle?.avatar}
                className="h-[100px] w-[100px] rounded-full object-cover border-2 border-white"
              />
            </div>
            <div className="md:hidden flex justify-end h-fit gap-4 relative bottom-20">
              <button className="bg-neutral-ultrasoft w-[30%] lg:w-[260px] py-2 rounded-full font-poppins font-semibold text-xs text-neutral-soft">
                Joined
              </button>
              <div className="flex flex-col justify-center">
                <div className="flex">
                  <Image
                    alt="notification"
                    src={notification}
                    className="h-[24px] w-[24px] object-cover"
                  />
                  <button type="button">
                    <Image
                      alt="menu_dot"
                      src={dot_menu}
                      className="h-[24px] w-[24px] object-cover"
                    />
                  </button>
                </div>
              </div>
            </div>
            {/* detail section */}
            <div className="flex justify-between w-[100%] md:pl-10 md:px-0 px-3 relative bottom-12 md:bottom-0 rounded-b-3xl border-b border-neutral-ultrasoft">
              <div className="flex flex-col">
                <h1 className="font-semibold text-3xl font-poppins">
                  {dataCircle?.name}
                </h1>
                <div className="flex flex-col md:max-w-[360px] xl:max-w-[500px] py-5">
                  <h1 className="text-[#262626] font-normal font-poppins text-base">
                    {dataCircle?.description}
                  </h1>
                </div>
                {/* avatar and members section */}
                <div className="flex justify-between md:max-w-[360px] xl:max-w-[500px] pb-8">
                  <div className="flex justify-start">
                    <img
                      alt="bg-avatar-sm"
                      src={dataCircle?.owner?.avatar}
                      className="md:h-6 md:w-6 w-5 h-5 rounded-full object-cover"
                    />
                    <h1 className="text-seeds-purple font-normal font-poppins text-xs md:text-base pl-2">
                      @{dataCircle?.owner?.seedsTag}
                    </h1>
                  </div>
                  <div className="flex justify-center flex-col">
                    <h1 className="text-neutral-soft text-xs font-normal font-poppins pl-2">
                      {dataCircle?.total_member}
                    </h1>
                  </div>
                </div>
              </div>
              {/* notification button */}
              <div className="md:flex hidden h-fit gap-4">
                <button className="bg-neutral-ultrasoft w-[150px] lg:w-[260px] py-2 rounded-full font-poppins font-semibold text-xs text-neutral-soft">
                  Joined
                </button>
                <div className="flex flex-col justify-center">
                  <div className="flex">
                    <Image
                      alt="notification"
                      src={notification}
                      className="h-[24px] w-[24px] object-cover"
                    />
                    <button type="button">
                      <Image
                        alt="menu_dot"
                        src={dot_menu}
                        className="h-[24px] w-[24px] object-cover"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CirclePostSection1;
