import { Typography } from '@material-tailwind/react';
import Image from 'next/image';

import {
  BronzeMedalIcon,
  GoldMedalIcon,
  SilverMedalIcon,
  XIcon
} from 'public/assets/vector';
import Button from '../ui/button/Button';
import Modal from '../ui/modal/Modal';

interface Props {
  playerId: string;
  onClose: () => void;
}

interface AchievementCardProps {
  title: string;
  subtitle: string;
  icon: string;
  alt: string;
}

const PlayerAchievement: React.FC<Props> = ({ playerId, onClose }) => {
  const name = 'Katharina Delitha Putri';
  const seedsTag = playerId;
  const avatar =
    'https://seeds-bucket-new.s3.ap-southeast-3.amazonaws.com/avatar/3D/Compressed/PNG/male/Avatar-12.png';

  const achievementList = [
    {
      icon: GoldMedalIcon,
      alt: 'gold-medal',
      title: 'Dapat 3 Gold',
      subtitle: 'Wow, sedikit lagi dan Anda akan mendapatkan lencana eksklusif.'
    },
    {
      icon: SilverMedalIcon,
      alt: 'silver-medal',
      title: 'Dapat 2 Sliver',
      subtitle: 'Kumpulkan Silver lencana sebanyak mungkin.'
    },
    {
      icon: BronzeMedalIcon,
      alt: 'bronze-medal',
      title: 'Dapat 2 Bronze',
      subtitle: 'Kumpulkan Bronze lencana sebanyak mungkin.'
    }
  ];

  const renderAchievementCard: React.FC<AchievementCardProps> = ({
    title,
    subtitle,
    icon,
    alt
  }) => (
    <div className="mt-3 bg-[#F9F9F9] p-3 flex rounded-xl outline outline-[#E9E9E9] shadow-md">
      <div className="flex items-center mr-2">
        <Image src={icon} alt={alt} width={45} height={45} />
      </div>
      <div className="flex flex-col justify-center">
        <Typography className="font-bold text-xs text-left text-neutral-medium">
          {title}
        </Typography>
        <Typography className="text-left text-[12px] text-neutral-soft">
          {subtitle}
        </Typography>
      </div>
    </div>
  );

  return (
    <Modal onClose={onClose} modalStyle={{ maxHeight: '80%' }}>
      <div className="flex justify-end">
        <Image
          src={XIcon}
          alt="X"
          width={30}
          height={30}
          onClick={onClose}
          className="hover:scale-110 transition ease-out cursor-pointer"
        />
      </div>

      <div className="flex justify-evenly">
        <Image
          src={avatar}
          alt="AVATAR"
          width={100}
          height={100}
          className="outline outline-seeds-green-2 rounded-2xl"
        />
      </div>

      <div className="flex flex-col justify-center  px-8 pt-2 items-center text-center">
        <Typography className="font-bold text-lg text-neutral-500">
          {name}
        </Typography>

        <Typography className="text-sm text-neutral-soft">
          {seedsTag}
        </Typography>
      </div>

      <Button
        label={'Follow'}
        extraClasses="gap-5 mt-2 w-40"
        variant="dark"
        props={{ onClick: () => {} }}
      />

      <div className="mt-2">
        <Typography className="font-bold text-xs text-left text-seeds-button-green">
          Prestasi
        </Typography>
        <div className="p-1">{achievementList.map(renderAchievementCard)}</div>
      </div>
    </Modal>
  );
};

export default PlayerAchievement;
