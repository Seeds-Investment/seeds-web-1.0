/* eslint-disable react/display-name */
import Image from 'next/image';
import { memo } from 'react';

interface Props {
  icon: any;
  title?: string;
  selected: boolean;
  onClick: () => void;
}

const HelpBox = memo<Props>(({ icon, title, selected, onClick }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <button
        className={`bg-white bg-opacity-20 rounded-3xl p-6 ${
          selected ? 'border border-white' : ''
        }`}
        onClick={onClick}
      >
        <Image
          src={icon}
          alt={title as string}
          width={100}
          height={100}
          className="object-contain w-12 h-12"
        />
      </button>
      {title !== undefined && <div className="text-sm">{title}</div>}
    </div>
  );
});

export default HelpBox;
