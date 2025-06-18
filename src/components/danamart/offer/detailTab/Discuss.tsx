import { TabDiscussGroup } from '@/assets/danamart';
import Loading from '@/components/popup/Loading';
import { postDiscussion } from '@/repository/danamart/offers.repository';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface Props {
  idPembiayaan: string;
}

const Discuss: React.FC<Props> = ({ idPembiayaan }) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.detail.tab.discuss';
  const [isiKomentar, setIsiKomentar] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setIsiKomentar(e.target.value);
  };

  const handlePostDiscussion = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('idPembiayaan', idPembiayaan);
      formData.append('isiKomentar', isiKomentar);

      const response = await postDiscussion(formData);

      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setIsiKomentar('');
      } else {
        toast.error('Failed to post comment');
      }
    } catch (error) {
      toast.error(`Error posting comment: ${error as string}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="w-full flex flex-col">
        <a
          href="https://chat.whatsapp.com/IUjsiVn82UaCPo8vNkZ4Tc"
          target="_blank"
          className="w-full flex gap-4 justify-start items-center"
          rel="noopener noreferrer"
        >
          <div className="flex justify-center items-center w-[25px] h-[25px] flex-shrink-0">
            <Image
              src={TabDiscussGroup}
              alt="TabDiscussGroup"
              className="w-full h-auto"
              width={1000}
              height={1000}
            />
          </div>
          <Typography className="font-poppins text-seeds-button-green">
            {t(`${pathTranslation}.text1`)}
          </Typography>
        </a>
        <div className="w-full mt-4">
          <textarea
            id="comments"
            rows={6}
            value={isiKomentar}
            placeholder={`${t(`${pathTranslation}.text2`)}`}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4FE6AF]"
          />
        </div>
        <div className="w-full flex justify-center md:justify-end items-end">
          <Button
            onClick={async () => {
              await handlePostDiscussion();
            }}
            disabled={isiKomentar === '' || isLoading}
            className="w-full md:w-[200px] text-sm font-semibold bg-seeds-button-green mt-4 rounded-full capitalize"
          >
            {t(`${pathTranslation}.text3`)}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Discuss;
