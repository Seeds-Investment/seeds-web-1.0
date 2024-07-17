import NoDataSeedy from '@/assets/academy/no-data-category.svg';
import TagPrice from '@/assets/academy/tag-price.svg';
import { type DetailClassI } from '@/utils/interfaces/academy.interface';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const CourseCard: React.FC<{
  item: DetailClassI;
  preferredCurrency: string | undefined;
}> = ({ item, preferredCurrency }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-4 gap-4 w-full">
        <div className="flex flex-col gap-2 col-span-2">
          <Typography className="text-base lg:text-sm font-semibold line-clamp-1 break-words">
            {item?.title?.length > 35
              ? item?.title.slice(0, 35) + '...'
              : item?.title}
          </Typography>
          <div className="flex items-center gap-2">
            {!item?.is_owned && item?.price !== 0 && (
              <>
                <Image src={TagPrice} alt="tag" />
                <Typography className="text-xs">
                  <span className="font-semibold">
                    {t('academy.courseFee')}
                  </span>{' '}
                  :{' '}
                  {item?.price?.toLocaleString('id-ID', {
                    currency: preferredCurrency ?? 'IDR',
                    style: 'currency'
                  })}
                </Typography>
              </>
            )}
          </div>
          <button
            onClick={async () => {
              await router.push(`/academy/course/${item?.id}`);
            }}
            className="text-xs text-white bg-[#3AC4A0] py-1 px-4 rounded-full self-start"
          >
            {item?.is_owned
              ? item?.is_post_test_done
                ? t('academy.courseButtonDetail')
                : t('academy.courseButtonOpenClass')
              : item?.price === 0
              ? t('academy.detailCourse.free')
              : t('academy.courseButtonBuy')}
          </button>
        </div>
        <div className="flex justify-end col-span-2">
          <Image
            src={item?.banner === '' ? NoDataSeedy : item?.banner}
            alt="course-image"
            width={90}
            height={90}
            className="w-24 h-24"
          />
        </div>
        {item?.is_owned && item?.is_post_test_done && (
          <div className="absolute top-0 right-0 bg-white rounded-bl-lg rounded-tr-2xl px-3 border-[1.5px] border-[#3AC4A0]">
            <Typography className="text-[10px] text-[#3AC4A0] font-semibold">
              {`${t('academy.courseScore')} : ${
                item?.post_test_score as number
              }`}
            </Typography>
          </div>
        )}
        {item?.is_owned && item?.is_post_test_done && (
          <div className="absolute bottom-0 left-0 w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-[#3AC4A0] h-1 rounded-full"
              style={{ width: `${item?.post_test_score as number}%` }}
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseCard;
