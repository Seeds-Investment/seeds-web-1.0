'use client';

import PDFViewerCertificate from '@/pages/homepage/event/[id]/section/pdf-viewer-certificate';
import { type CertificateI, type EventList, type TicketData } from '@/utils/interfaces/event.interface';
import Image from 'next/image';
import { DownloadIcon, XIconWhite } from 'public/assets/vector';
import { useState } from 'react';
import Modal from '../ui/modal/Modal';
import ModalCheckOption from './ModalCheckOption';

interface Props {
  onClose: () => void;
  ticketData: TicketData;
  eventData: EventList;
  isCheckAble: boolean;
  certificateData: CertificateI;
  file: string;
}

const ModalShowCertificate: React.FC<Props> = ({
  onClose,
  ticketData,
  eventData,
  isCheckAble,
  certificateData,
  file
}) => {
  const [preview, setPreview] = useState<boolean>(false);
  const [isCheckInModal, setIsCheckInModal] = useState<boolean>(false);
  const modalDefaultClasses = `
    z-50 animate-slide-down fixed
    h-screen w-screen text-center
    shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white`
  ;

  return (
    <>
      {isCheckInModal && (
        <ModalCheckOption
          onClose={() => {
            setIsCheckInModal(prev => !prev);
          }}
          ticketId={ticketData?.id ?? ''}
          ticketStatus={ticketData?.status ?? ''}
        />
      )}
      <Modal
        onClose={onClose}
        modalClasses={modalDefaultClasses}
        backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/50 flex justify-start items-start"
      >
        <div className='w-screen h-screen flex flex-col'>
          <div className='bg-seeds-button-green h-fit'>
            <div className='py-4 font-semibold font-poppins text-white'>
              {eventData?.name ?? 'Seeds Event'}
            </div>
            <div className='px-8 pb-4'>
              <div className='flex justify-between items-center'>
                <div className='w-[24px] h-[24px] flex justify-center items-center'>
                  <Image
                    src={XIconWhite}
                    alt="X"
                    width={100}
                    height={100}
                    onClick={onClose}
                    className="hover:scale-110 transition ease-out cursor-pointer w-full h-full"
                  />
                </div>
                <div
                  onClick={() => {
                    setPreview(true);
                  }}
                  className='flex justify-center items-center w-[24px] h-[24px]'
                >
                  <Image
                    src={DownloadIcon}
                    alt="X"
                    width={100}
                    height={100}
                    className="hover:scale-110 transition ease-out cursor-pointer w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
          {
            certificateData !== undefined &&
              <PDFViewerCertificate file={file} preview={preview} setPreview={setPreview}/>
          }
        </div>
      </Modal>
    </>
  );
};

export default ModalShowCertificate;