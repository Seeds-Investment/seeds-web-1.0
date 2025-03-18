import DummyAvatar from '@/assets/play/game-decentralize/quiz/dummy-people.png';
import { Typography } from '@material-tailwind/react';
import Image, { type StaticImageData } from 'next/image';

interface CreatedBySectionProps {
  avatar?: StaticImageData | string;
  fullName: string;
  username: string;
  onFollow?: () => void;
}

const CreatedBySection: React.FC<CreatedBySectionProps> = ({
  avatar = DummyAvatar,
  fullName,
  username,
  onFollow
}) => {
  return (
    <section className="flex flex-col gap-4">
      <Typography className="text-[20px] font-extrabold text-black">
        Created By
      </Typography>
      <div className="flex flex-row justify-between items-center gap-4 px-4 py-4 border-[1px] border-gray-400 rounded-2xl bg-gray-50">
        <div className="flex flex-row gap-4">
          <Image
            src={avatar}
            alt="Creator Avatar"
            className="w-[40px] h-[40px] rounded-full"
          />
          <div className="flex flex-col justify-center">
            <Typography className="text-[16px] font-extrabold text-black">
              {fullName}
            </Typography>
            <Typography className="text-[12px] font-extrabold text-gray-400">
              @{username}
            </Typography>
          </div>
        </div>
        <button
          onClick={onFollow}
          className="px-8 py-[4px] border-[1px] h-fit border-seeds-green rounded-full bg-gray-50 hover:bg-seeds-green duration-100 text-seeds-button-green text-sm font-bold hover:text-white"
        >
          Follow
        </button>
      </div>
    </section>
  );
};

export default CreatedBySection;
