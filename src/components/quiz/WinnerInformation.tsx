import Dropdown from '@/assets/play/quiz/Dropdown.svg';
import CompleteData from '@/assets/play/quiz/complete-data.svg';
import { type IWinnerInformationData } from '@/pages/withdrawal/quiz/[id]';
import { Button, Card, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { ArrowBackwardIcon } from 'public/assets/vector';
import React, { useState, type Dispatch, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import SettingCommonInput from '../setting/accountInformation/SettingCommonInput';
import SettingTextareaInput from '../setting/accountInformation/SettingTextareaInput';
import PageGradient from '../ui/page-gradient/PageGradient';
import ModalSocialMediaList from './ModalSocialMediaList';

interface IWinnerInformation {
  setSelect: Dispatch<SetStateAction<number>>;
  className: string;
  winnerInformationData: IWinnerInformationData | undefined;
  setWinnerInformationData: Dispatch<
    SetStateAction<IWinnerInformationData | undefined>
  >;
  handleSelectedFile: (file: File) => void;
}

const WinnerInformation: React.FC<IWinnerInformation> = ({
  setSelect,
  className,
  winnerInformationData,
  setWinnerInformationData,
  handleSelectedFile
}: IWinnerInformation) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleOpen = (): void => {
    setOpen(!open);
  };

  const handleWinnerInformation = (key: string, value: string): void => {
    setWinnerInformationData((prevState: any) => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile != null) {
      const createPreviewImage = URL.createObjectURL(selectedFile);
      handleSelectedFile(selectedFile);
      setPreviewImage(createPreviewImage);
      handleWinnerInformation('photo_url', createPreviewImage);
    }
  };

  const isFormComplete = (): boolean => {
    return (
      winnerInformationData?.social_media_type?.trim() !== '' &&
      (winnerInformationData?.social_media_username?.trim() ?? '').length >=
        5 &&
      (winnerInformationData?.testimonial?.trim() ?? '').length >= 30 &&
      winnerInformationData?.photo_url !== undefined
    );
  };

  const renderContent = (): JSX.Element => (
    <Card shadow={false} className={`${className} p-5 gap-4 items-center`}>
      <Image
        src={ArrowBackwardIcon}
        alt="arrow-backward-icon"
        onClick={() => {
          setSelect((prev: number) => prev - 1);
        }}
        className="absolute left-8 cursor-pointer"
      />
      <div className="flex flex-col items-center p-6">
        <Typography className="font-poppins font-semibold md:text-3xl text-2xl text-[#262626]">
          {t('quiz.completeYourData')}
        </Typography>
        <Image
          src={CompleteData}
          alt="CompleteData"
          className="md:w-[298.46px] md:h-[255.18px] w-[233.92px] h-[200px]"
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <SettingCommonInput
          divClassName="relative flex flex-col w-full"
          extraClassesTop={
            <Image
              src={Dropdown}
              alt="Dropdown"
              className="absolute right-0 p-0 pb-[7px] pt-[14px]"
            />
          }
          label={t('quiz.socialMedia')}
          name=""
          placeholder={`${t('quiz.placeholderSocialMedia')}`}
          value={winnerInformationData?.social_media_type ?? ''}
          onChange={() => {}}
          className="!text-[#7C7C7C] !text-base !font-poppins !font-normal"
          readOnly={true}
          onClick={handleOpen}
        />
        <SettingCommonInput
          divClassName="w-full"
          label={t('quiz.socialMediaName')}
          name=""
          placeholder={`${t('quiz.placeholderSocialMediaName')}`}
          value={winnerInformationData?.social_media_username ?? ''}
          onChange={data => {
            handleWinnerInformation('social_media_username', data.target.value);
          }}
          className="!text-[#7C7C7C] !text-base !font-poppins !font-normal"
        />
        <SettingTextareaInput
          divClassName="w-full"
          label={t('quiz.winnerTestimonial')}
          name=""
          placeholder={`${t('quiz.placeholderWinnerTestimonial')}`}
          value={winnerInformationData?.testimonial ?? ''}
          onChange={data => {
            handleWinnerInformation('testimonial', data.target.value);
          }}
          className="!text-[#7C7C7C] !text-base !font-poppins !font-normal border rounded-md mt-4 p-2"
        />
        <Typography className="!text-base !text-[#262626] !font-semibold !font-poppins">
          {t('quiz.winnerPhoto')}
        </Typography>
        <Typography className="font-poppins md:text-md text-sm text-[#262626] mt-[-10px]">
          {t('quiz.placeholderWinnerPhoto')}
        </Typography>
        <div className="flex flex-col justify-center items-center border border-[#a6a6a6] rounded-md h-[200px] p-4">
          <input
            type="file"
            accept="image/*"
            id="file-input"
            className="hidden"
            onChange={handleFileChange}
          />
          {previewImage !== null && (
            <div className="relative w-[280px] h-[150px] mb-4">
              <Image
                src={previewImage}
                alt="Image Privew"
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
          <label
            htmlFor="file-input"
            className="bg-[#3AC4A0] hover:bg-[#3AC4c0] text-white font-bold py-2 px-4 rounded-full cursor-pointer transition duration-300 ease-in-out"
          >
            {t('quiz.addPhoto')}
          </label>
        </div>
      </div>
      <Button
        onClick={() => {
          setSelect((prev: number) => prev + 1);
        }}
        disabled={!isFormComplete()}
        className="capitalize disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-[#FFFFFF] rounded-full font-poppins font-semibold text-sm md:w-[343px] w-full"
      >
        {t('quiz.submit')}
      </Button>
    </Card>
  );

  return (
    <PageGradient defaultGradient className="w-full">
      {renderContent()}
      <ModalSocialMediaList
        open={open}
        handleOpen={handleOpen}
        setSocialMedia={handleWinnerInformation}
      />
    </PageGradient>
  );
};

export default WinnerInformation;
