
import FloatingIdea from '@/assets/play/tournament/floatingIdea.svg';
import FloatingUsers from '@/assets/play/tournament/floatingUsers.svg';
import FloatingVideo from '@/assets/play/tournament/floatingVideo.svg';
import ModalTutorialTournament from '@/components/popup/ModalTutorialTournament';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import ModalGuidanceTournament from '../popup/ModalGuidanceTournament';

const FloatingButton: React.FC = () => {

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isTutorialModal, setIsTutorialModal] = useState<boolean>(false);
  const [isGuidanceModal, setIsGuidanceModal] = useState<boolean>(false);

  return (
    <div onClick={() => {setIsExpanded(!isExpanded)}} className='flex w-fit h-fit fixed right-0 md:right-[55px] bottom-[30vh] z-10'>
        {isTutorialModal && (
            <ModalTutorialTournament
                onClose={() => {
                    setIsTutorialModal(prev => !prev);
                }}
            />
        )}
        {isGuidanceModal && (
            <ModalGuidanceTournament
                onClose={() => {
                    setIsGuidanceModal(prev => !prev);
                }}
            />
        )}
        <div className={`relative w-[20px] h-[40px] ${isExpanded ? "block" : "hidden"}`}>
            <div onClick={() => {isExpanded && setIsTutorialModal(true)}} className='absolute right-0 top-[-55px] w-[45px] h-[45px] rounded-full bg-[#3AC4A0] flex justify-center items-center cursor-pointer'>
                <Image
                    width={100}
                    height={100}
                    alt=""
                    src={FloatingVideo}
                    className="w-[25px] h-[25px]"
                />
            </div>
            <div className='absolute right-[20px] top-0 bottom-0 m-auto w-[45px] h-[45px] rounded-full bg-[#3AC4A0] flex justify-center items-center cursor-pointer'>
                <Image
                    width={100}
                    height={100}
                    alt=""
                    src={FloatingUsers}
                    className="w-[25px] h-[25px]"
                />
            </div>
            <div onClick={() => {isExpanded && setIsGuidanceModal(true)}} className='absolute right-0 bottom-[-55px] w-[45px] h-[45px] rounded-full bg-[#3AC4A0] flex justify-center items-center cursor-pointer'>
                <Image
                    width={100}
                    height={100}
                    alt=""
                    src={FloatingIdea}
                    className="w-[25px] h-[25px]"
                />
            </div>
        </div>
        <div className='w-[50px] h-[40px] pr-[20px] bg-[#BAFBD0] hover:bg-[#8fffb4] duration-300 p-2 rounded-l-full cursor-pointer'>
            {
            isExpanded ?
                <ChevronRightIcon className="w-full h-full text-[#3AC4A0] font-bold" />
                :
                <ChevronLeftIcon className="w-full h-full text-[#3AC4A0] font-bold" />
            }
        </div>
    </div>
  );
};

export default FloatingButton;
