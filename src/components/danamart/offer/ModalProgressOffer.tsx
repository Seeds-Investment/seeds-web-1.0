import { XMarkIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../ui/modal/Modal';

interface Props {
  setIsShowModalProgress: React.Dispatch<React.SetStateAction<boolean>>;
  isShowModalProgress: boolean;
}

const ModalProgressOffer: React.FC<Props> = ({
  setIsShowModalProgress,
  isShowModalProgress
}) => {
  const { t } = useTranslation();
	const pathTranslation = 'danamart.offers.detail.progress.popup'

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed top-[50%] left-0 transform -translate-x-1/2 -translate-y-1/2 lg:left-[25%] lg:right-[-25%] xl:left-[30%] xl:right-[-30%] 2xl:left-[35%] 2xl:right-[-35%] lg:top-[50%] mt-[-17rem] w-full h-[550px] overflow-y-auto lg:w-[550px] p-6 rounded-lg bg-white"
    >
      <Typography className="font-poppins font-semibold text-lg text-[#262626] mb-2">
        {t(`${pathTranslation}.title`)}
      </Typography>
      <button
        onClick={() => { setIsShowModalProgress(!isShowModalProgress); }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>
      <a
        href="https://dev.danamart.id/development/webapp/vendor/assets/img/progres-penawaran.png"
        target="_blank"
        rel="noopener noreferrer"
        className='mt-4'
      >
        <img
          src={'https://dev.danamart.id/development/webapp/vendor/assets/img/progres-penawaran.png'}
          alt={'ProgressOffer'}
          className="w-full h-auto object-cover"
          width={1000}
          height={1000}
        />
      </a>
      <div className='mt-4'>
        <ul>
          <li
            className="font-poppins text-md"
            dangerouslySetInnerHTML={{
              __html: t(`${pathTranslation}.text1`) ?? ''
            }}
          />
          <li
            className="font-poppins text-md"
            dangerouslySetInnerHTML={{
              __html: t(`${pathTranslation}.text2`) ?? ''
            }}
          />
        </ul>
      </div>
    </Modal>
  );
};

export default ModalProgressOffer;
