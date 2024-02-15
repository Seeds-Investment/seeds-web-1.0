import Dropdown from '@/assets/play/quiz/Dropdown.svg';
import RewardClaimed from '@/assets/play/quiz/rewards-claimed.png';
import ModalAccountList from '@/components/quiz/ModalAccountList';
import ModalClaimMethod from '@/components/quiz/ModalClaimMethod';
import SettingCommonInput from '@/components/setting/accountInformation/SettingCommonInput';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { Button, Card, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
interface IIndexWithdrawal {
  setSelect: any;
  className: string;
}

const IndexWithdrawal: React.FC<IIndexWithdrawal> = ({
  setSelect,
  className
}: IIndexWithdrawal) => {
  const { t } = useTranslation();
  const [methodList, setMethodList] = useState('');
  const [open, setOpen] = useState(false);
  const [openAccountList, setOpenAccountList] = useState(false);
  const handleOpen = (): void => {
    setOpen(!open);
  };
  const handleOpenAccountList = (): void => {
    setOpenAccountList(!openAccountList);
  };

  return (
    <PageGradient defaultGradient className="w-full">
      <ModalClaimMethod
        open={open}
        handleOpen={handleOpen}
        setMethodList={setMethodList}
      />
      <ModalAccountList
        open={openAccountList}
        handleOpen={handleOpenAccountList}
        methodList={methodList}
      />
      <Card shadow={false} className={`${className} p-5 gap-4 items-center`}>
        <div className="flex flex-col items-center gap-6">
          <Typography className="font-poppins font-semibold md:text-3xl text-2xl text-[#262626]">
            {t('quiz.congratulation')}
          </Typography>
          <Image
            src={RewardClaimed}
            alt="RewardClaimed"
            className="md:w-[298.46px] md:h-[255.18px] w-[233.92px] h-[200px]"
          />
          <Typography className="font-poppins font-normal md:text-lg text-sm text-[#7C7C7C]">
            {t('quiz.cashOut')}
          </Typography>
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
            label={t('quiz.claimMethod')}
            name=""
            placeholder={`${t('quiz.placeholderMethod')}`}
            value={''}
            onChange={() => {}}
            className="!text-[#7C7C7C] !text-base !font-poppins !font-normal"
            readOnly={true}
            onClick={handleOpen}
          />
          <SettingCommonInput
            divClassName="relative flex flex-col w-full"
            extraClassesTop={
              <Image
                src={Dropdown}
                alt="Dropdown"
                className="absolute right-0 p-0 pb-[7px] pt-[14px]"
              />
            }
            label={t('quiz.account')}
            name=""
            placeholder={`${t('quiz.placeholderAccount')}`}
            value={''}
            onChange={() => {}}
            className="!text-[#7C7C7C] !text-base !font-poppins !font-normal"
            readOnly={true}
            onClick={handleOpenAccountList}
          />
          <SettingCommonInput
            divClassName="w-full"
            label={t('quiz.accountName')}
            name=""
            placeholder={`${t('quiz.placeholderAccountName')}`}
            value={''}
            onChange={() => {}}
            className="!text-[#7C7C7C] !text-base !font-poppins !font-normal"
          />
          <SettingCommonInput
            divClassName="w-full"
            label={t('quiz.accountNumber')}
            name=""
            placeholder={`${t('quiz.placeholderAccountNumber')}`}
            value={''}
            onChange={() => {}}
            className="!text-[#7C7C7C] !text-base !font-poppins !font-normal"
          />
        </div>
        <Button
          onClick={() => {
            setSelect(1);
          }}
          disabled={/* Please disable this button if all form not fill */ false}
          className="capitalize disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-[#FFFFFF] rounded-full font-poppins font-semibold text-sm md:w-[343px] w-full"
        >
          {t('quiz.submit')}
        </Button>
      </Card>
    </PageGradient>
  );
};

export default IndexWithdrawal;
