import CAccordion from '@/components/CAccordion';
import LanguageContext from '@/store/language/language-context';
import { type UserProfile } from '@/utils/interfaces/danamart.interface';
import {
  type BankData,
  type BankList
} from '@/utils/interfaces/danamart/incoming-funds.interface';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Modal from '../../ui/modal/Modal';

interface Props {
  setIsShowDetailBank: React.Dispatch<React.SetStateAction<boolean>>;
  isShowDetailBank: boolean;
  bankList: BankList[];
  selectedBankIndex: number;
  userProfileData: UserProfile;
  bankData: BankData;
}

const ModalDetailBank: React.FC<Props> = ({
  setIsShowDetailBank,
  isShowDetailBank,
  bankList,
  selectedBankIndex,
  userProfileData,
  bankData
}) => {
  const { t } = useTranslation();
  const languageCtx = useContext(LanguageContext);
  const pathTranslation = 'danamart.incomingFunds.modal.detailBank';

  const handleCopyVANumber = async (vaNumber: string): Promise<void> => {
    await navigator.clipboard.writeText(vaNumber).then(() => {
      toast.success(t(`${pathTranslation}.text1`));
    });
  };

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 top-[40%] md:top-[50%] md:left-[35%] md:right-[-35%] mt-[-17rem] w-full h-fit max-h-[70vh] md:w-[550px] p-6 rounded-lg bg-white overflow-y-scroll"
    >
      <button
        onClick={() => {
          setIsShowDetailBank(!isShowDetailBank);
        }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <Typography className="font-bold text-lg font-poppins md:w-[90%]">
        {t(`${pathTranslation}.text2`)} {bankList[selectedBankIndex]?.name}{' '}
        {t(`${pathTranslation}.text3`)}
      </Typography>

      <div className="p-4">
        <div className="flex mt-4">
          <div className="w-full">
            <Typography className="font-poppins text-seeds-button-green font-semibold">
              {t(`${pathTranslation}.text4`)}
            </Typography>
            <Typography className="font-poppins text-[rgb(38,38,38)] font-semibold">
              {userProfileData?.detailUser[0]?.nama}
            </Typography>
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-4 gap-6 md:gap-4">
          <div className="w-full">
            <Typography className="font-poppins text-seeds-button-green font-semibold">
              {t(`${pathTranslation}.text5`)}{' '}
              {languageCtx?.language === 'EN'
                ? bankList[selectedBankIndex]?.name === 'LAIN'
                  ? 'Other'
                  : bankList[selectedBankIndex]?.name
                : bankList[selectedBankIndex]?.name}{' '}
              {t(`${pathTranslation}.text6`)} {t(`${pathTranslation}.text9`)}
            </Typography>
            <Typography
              onClick={async () => {
                await handleCopyVANumber(
                  bankList[selectedBankIndex]?.name === 'BCA'
                    ? userProfileData?.detailUser[0]?.paymentcode_bca
                    : bankList[selectedBankIndex]?.name === 'BNI'
                    ? userProfileData?.detailUser[0]?.paymentcode_bni
                    : bankList[selectedBankIndex]?.name === 'BRI'
                    ? userProfileData?.detailUser[0]?.paymentcode_bri
                    : userProfileData?.detailUser[0]?.paymentcode_mandiri
                );
              }}
              className="font-poppins text-[#262626] font-semibold cursor-pointer"
            >
              {bankList[selectedBankIndex]?.name === 'BCA'
                ? userProfileData?.detailUser[0]?.paymentcode_bca
                : bankList[selectedBankIndex]?.name === 'BNI'
                ? userProfileData?.detailUser[0]?.paymentcode_bni
                : bankList[selectedBankIndex]?.name === 'BRI'
                ? userProfileData?.detailUser[0]?.paymentcode_bri
                : userProfileData?.detailUser[0]?.paymentcode_mandiri}
              <FaRegCopy />
            </Typography>
          </div>
          <div className="w-full">
            <Typography className="font-poppins text-seeds-button-green font-semibold">
              {t(`${pathTranslation}.text7`)}
            </Typography>
            <Typography className="font-poppins text-[#262626] font-semibold">
              {bankList[selectedBankIndex]?.name === 'PERMATA'
                ? 'IDR 9,000,000'
                : 'IDR 50,000,000'}
            </Typography>
          </div>
        </div>
      </div>

      <div className="mt-2">
        {bankData?.map((item, index) => (
          <CAccordion
            key={index}
            title={item?.title}
            description={
              <div
                className="font-poppins leading-8 text-[#7C7C7C] text-md font-medium"
                dangerouslySetInnerHTML={{ __html: item?.body }}
              />
            }
          />
        ))}
      </div>

      <div className="w-full mt-6 flex justify-center md:justify-end">
        <Button
          onClick={() => {
            setIsShowDetailBank(!isShowDetailBank);
          }}
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.text8`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDetailBank;
