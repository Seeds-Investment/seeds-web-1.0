import {
  CardCalendar,
  CardClock,
  CardCoins,
  CardTag,
  CardUser,
  Clock
} from '@/assets/danamart';
import { type OfferList } from '@/utils/interfaces/danamart/offers.interface';
import { ShareIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface Props {
  offer: OfferList;
  setIsOpenModalDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShareModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowFinanceInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedIndex: (value: number) => void;
  setFinancingType: (value: string) => void;
  isOpenModalDetail: boolean;
  index: number;
}

const OfferListCard: React.FC<Props> = ({
  offer,
  setIsOpenModalDetail,
  isOpenModalDetail,
  setIsShareModal,
  setIsShowFinanceInfo,
  setSelectedIndex,
  setFinancingType,
  index
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.dashboard.offerCard';
  return (
    <div
      key={offer.pinjaman_id}
      className="w-full relative h-fit rounded-lg shadow-md hover:shadow-lg duration-100"
    >
      <div className="relative h-[150px] w-full">
        <Image
          alt="Offer Image"
          src={offer?.gbr_sektor_usaha ?? offer?.gbr_sektor_usaha_square}
          width={1000}
          height={1000}
          className="object-cover w-full h-full rounded-t-lg"
        />
      </div>
      <div className="p-2">
        <div className="w-full flex justify-between">
          <div className="flex gap-2">
            <Image alt="Clock" src={Clock} width={16} height={16} />
            <div
              className="font-poppins text-xs"
              dangerouslySetInnerHTML={{ __html: offer.days.listingDays }}
            />
          </div>
          <div className="flex gap-2">
            <Image alt="CardUser" src={CardUser} width={16} height={16} />
            <Typography className="font-poppins text-xs">
              2 {t(`${pathTranslation}.text1`)}
            </Typography>
          </div>
        </div>
        <Typography className="font-poppins font-bold text-md my-3">
          {offer?.nama_perusahaan}
        </Typography>
        <div className="w-full flex flex-wrap justify-between items-center bg-[#F7F7F7] p-2 rounded-sm">
          <div className="flex items-center gap-2 w-1/2">
            <Image alt="CardClock" src={CardClock} width={18} height={18} />
            <div>
              <p className="text-gray-600 text-sm">
                {t(`${pathTranslation}.text2`)}
              </p>
              <p className="font-semibold text-black text-sm">
                {offer?.jenisEfek}
              </p>
            </div>
          </div>
          {offer?.dm_pem_05001 !== 'Modal Usaha' ? (
            <div className="flex items-center gap-2 w-1/2">
              <Image alt="CardCoins" src={CardCoins} width={20} height={20} />
              <div
                onClick={() => {
                  setIsShowFinanceInfo(true);
                  setFinancingType(offer?.dm_pem_05001);
                }}
              >
                <p className="text-gray-600 text-sm">
                  {t(`${pathTranslation}.text3`)}
                </p>
                {offer?.dm_pem_05001 === 'Invoice Financing' ? (
                  <p className="font-semibold text-white bg-[#04AF93] rounded-md py-1 px-2 text-xs">
                    Invoice Financing
                  </p>
                ) : offer?.dm_pem_05001 === 'Project Financing' ? (
                  <p className="font-semibold text-white bg-[#FF5B5C] rounded-md py-1 px-2 text-xs">
                    Project Financing
                  </p>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-1/2"></div>
          )}
          <div className="flex items-center gap-2 w-1/2 mt-4">
            <Image alt="CardTag" src={CardTag} width={18} height={18} />
            <div>
              <p className="text-gray-600 text-sm">
                {t(`${pathTranslation}.text4`)}
              </p>
              <p className="font-semibold text-black text-sm">{offer?.kupon}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-1/2 mt-4">
            <Image
              alt="CardCalendar"
              src={CardCalendar}
              width={18}
              height={18}
            />
            <div>
              <p className="text-gray-600 text-sm">
                {t(`${pathTranslation}.text5`)}
              </p>
              <p className="font-semibold text-black text-sm">{offer?.tenor}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col mt-2 p-2 bg-[#F7F7F7] rounded-sm">
          <Typography className="font-poppins font-semibold text-seeds-button-green">
            {offer?.jml_pinjaman_terbit}
          </Typography>
          <div className="flex justify-center items-center gap-4">
            <div className="w-[75%] flex h-[8px] bg-gray-200 rounded-full">
              <div
                className="bg-[#4FE6AF] transition-all duration-300 relative"
                style={{ width: `${offer?.progresEfek}%` }}
              >
                <div className="rounded-full w-[16px] h-[16px] bg-[#4FE6AF] absolute right-[-15px] top-1/2 transform -translate-y-1/2 z-10" />
              </div>
              <div
                className="bg-[#4FE6AF] opacity-20 transition-all duration-300"
                style={{ width: `${100 - offer?.progresEfek}%` }}
              ></div>
            </div>
            <div className="w-[25%] text-center">
              {offer?.progresEfek % 10 === 0
                ? offer?.progresEfek
                : offer?.progresEfek > 99.999999999
                ? (Math.floor(offer?.progresEfek * 10000) / 10000).toFixed(4)
                : offer?.progresEfek?.toFixed(1)}
              %
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between my-4 h-[36px]">
          <Button
            onClick={() => {
              setIsOpenModalDetail(!isOpenModalDetail);
              setSelectedIndex(index);
            }}
            className="rounded-full w-[130px] p-0 capitalize font-semibold text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
          >
            {t(`${pathTranslation}.text6`)}
          </Button>
          <div
            onClick={() => {
              setIsShareModal(true);
            }}
            className="flex justify-center items-center"
          >
            <ShareIcon
              width={30}
              height={30}
              className="mr-2 text-[#3AC4A0] bg-[#DCFCE4] w-[24px] h-[24px] p-1 rounded-full"
            />
            <Typography className="text-sm font-poppins font-semibold text-[#262626]">
              {t(`${pathTranslation}.text7`)}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferListCard;
