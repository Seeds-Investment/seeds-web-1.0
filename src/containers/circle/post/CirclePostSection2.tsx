import avatar from '@/assets/bg-hello.png';
import dot_menu from '@/assets/circle-page/3dot.svg';
import dot from '@/assets/circle-page/onedot.svg';
import plants from '@/assets/plants.png';
import Image from 'next/image';
interface props {
  CIRCLE_ID: string;
  isLoading: boolean;
  renderLoading: any;
  dataCircle: any;
}

const CirclePostSection2: React.FC<props> = ({
  dataCircle,
  CIRCLE_ID,
  isLoading,
  renderLoading
}) => {
  // function formatDate(inputDateString: any): string {
  //   const date = new Date(inputDateString);
  //   const day = date.getUTCDate().toString().padStart(2, '0');
  //   const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getUTCFullYear().toString();

  //   return `${day}/${month}/${year}`;
  // }
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
              <button className={inActive}>Post</button>
              <button className={active}>Recommended</button>
              <button className={inActive}>Members</button>
              <button className={inActive}>About</button>
            </div>
            {/* post section */}
            <div className="flex justify-between">
              {/* profile section */}
              <div className="flex justify-start gap-3">
                <Image
                  alt="bg-avatar-sm"
                  src={avatar}
                  className="h-[48px] w-[48px] rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <div className="flex h-fit gap-2">
                    <h1 className="text-[#262626] font-semibold font-poppins text-base">
                      @aguswarewolf
                    </h1>
                    <Image
                      alt="bg-plants"
                      src={plants}
                      className="h-[16px] w-[16px] mt-1 object-fit"
                    />
                    <div className=" bg-[#DCFCE4] rounded-full px-2 flex justify-center flex-col">
                      <h1 className="text-[#3AC4A0] font-normal font-poppins text-xs">
                        Admin
                      </h1>
                    </div>
                  </div>
                  {/* timelaps section */}
                  <div className="flex">
                    <h1 className="text-[#7C7C7C] font-normal font-poppins text-sm">
                      09/03/2022
                    </h1>
                    <Image
                      alt="dot"
                      src={dot}
                      className="h-[24px] w-[24px] object-cover"
                    />
                    <h1 className="text-[#7C7C7C] font-normal font-poppins text-sm">
                      12.39 PM
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <button type="button">
                  <Image
                    alt="menu_dot"
                    src={dot_menu}
                    className="h-[24px] w-[24px] object-cover"
                  />
                </button>
              </div>
            </div>
            {/* detail section */}
            <div className="flex justify-start pl-5 pt-5">
              <div className="flex flex-col">
                <div className="flex gap-1">
                  <h1 className="font-montserrat text-seeds-purple text-xs">
                    #NFT3d
                  </h1>
                  <h1 className="font-montserrat text-seeds-purple text-xs">
                    #NFTPostedArt
                  </h1>
                </div>
                <h1 className="font-montserrat text-[#262626] text-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                  quasi enim obcaecati eligendi repellat deserunt. Sit corporis
                  illo necessitatibus voluptatem itaque eligendi, similique sint
                  dolores assumenda asperiores iusto! Quas, provident!
                </h1>
              </div>
            </div>
            {/* finish */}
          </div>
        </div>
      )}
    </>
  );
};

export default CirclePostSection2;
