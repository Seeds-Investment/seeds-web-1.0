import type { IRegisterPaging } from '@/pages/circle/auth/register';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { SuccessRegister } from 'public/assets/images';
import { useTranslation } from 'react-i18next';

const SuccessRegisterPage = ({
  setPage,
  formdata,
  setFormdata
}: IRegisterPaging): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-3/4 flex flex-col items-center justify-center gap-4">
          <div className="rounded-full w-[10rem] h-[10rem] relative">
            <Image
              src={SuccessRegister}
              className="object-cover object-[bottom_center] w-full h-auto"
              quality={60}
              width="0"
              height="0"
              sizes="100vw"
              alt="img-avatar"
            />
          </div>
          <Typography variant="small" color="black" className="font-bold">
            {t('registerPage.title.success')}
          </Typography>
          <Typography variant="small" color="black" className="text-center">
            {t('registerPage.description.success')}
          </Typography>
        </div>
      </div>
      <div className="my-8">
        <Button
          fullWidth
          className="border bg-[#3AC4A0] rounded-full border-[#3AC4A0]"
        >
          {t('registerPage.nextButton')}
        </Button>
      </div>
    </>
  );
};

export default SuccessRegisterPage;
