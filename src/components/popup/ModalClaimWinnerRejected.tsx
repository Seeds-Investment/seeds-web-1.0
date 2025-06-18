'use client';
import { postWithdrawAnswer, resubmitWithdrawAnswer } from '@/repository/earning.repository';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { XIcon } from 'public/assets/vector';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from '../ui/modal/Modal';

interface Props {
  onClose: () => void;
  rejectReason: string;
  source: string;
  playId: string;
  sourceId: string;
  sourceName: string;
  status: string;
}

const ModalWithdrawRejected: React.FC<Props> = ({
  onClose,
  rejectReason,
  source,
  playId,
  sourceId,
  sourceName,
  status
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleWithdrawPrize = async (id: string, playType: string): Promise<void> => {
    try {
      if (status === 'rejected') {
        const response = await resubmitWithdrawAnswer(sourceId ?? '');
				if (response?.message === 'Earning submission succesfully resubmitted') {
          toast.success(t('earning.withdrawQuestion.text17'));
          setTimeout(() => {
            void router.push('/my-profile/my-earnings');
          }, 3000);
        }
      } else {
        const response = await postWithdrawAnswer(id, playType);
        if (response?.status === 'pending') {
          toast.success(t('earning.withdrawQuestion.text4'));
          setTimeout(() => {
            void router.push('/my-profile/my-earnings');
          }, 3000);
        }
      }
    } catch (error: any) {
      if (error?.response?.data?.message === 'reward has already been submitted') {
        toast.error(t('earning.withdrawQuestion.text5'));
      } else {
        toast.error(`Failed to submit answers: ${error?.response?.data?.message as string}`);
      }
    } finally {
      onClose();
    }
  };      

  return (
    <>
      <Modal
        onClose={onClose}
        backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/75 flex justify-start items-start"
        modalClasses="z-50 animate-slide-down fixed bottom-0 md:top-[45%] md:left-[22.5%] md:right-[-10%] xl:left-[22.5%] xl:right-[-22.5%] mt-[-12.35rem] w-full md:w-[60%] h-fit p-4 pb-12 rounded-xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white"
      >
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

        <div className='px-4 md:px-8 flex flex-col justify-center items-center'>
          <Typography className="w-full text-left font-bold text-lg text-[#262626] mt-8 mb-4">
            {t('earning.withdrawKyc.text39')}
          </Typography>

          <div className='w-full min-h-[100px] bg-[#F9F9F9] rounded-lg border border-[#E9E9E9] p-4'>
            <Typography className='font-poppins text-[#7C7C7C]'>
              {rejectReason}
            </Typography>
          </div>
          <Button
            onClick={async() => {
              if (source === 'QUIZ') {
                await router.push(`/play/withdraw/${playId}?playType=QUIZ&resubmit=true&sourceId=${sourceId}`)
              } else if (source === 'TOURNAMENT') {
                void handleWithdrawPrize(playId, 'ARENA')
              } else if (sourceName === 'Refund Withdraw My Earning') {
                await router.push('/my-profile/my-earnings/withdraw')
              }
            }}
            className="w-full md:w-[275px] py-2 md:py-4 flex justify-center items-center bg-seeds-button-green hover:shadow-lg text-white duration-300 cursor-pointer rounded-full font-poppins text-md capitalize mt-6"
          >
            {t('earning.withdrawKyc.text40')}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalWithdrawRejected;
