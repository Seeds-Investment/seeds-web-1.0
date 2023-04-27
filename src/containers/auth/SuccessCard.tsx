import success from '@/assets/success.png';
import SliderCard from '@/components/SlideCard';
import type { ISlider } from '@/utils/interfaces/components.interfaces';
import { Button } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';

const SuccessCard = ({
  onSubmit
}: {
  onSubmit: (props: any) => void;
}): React.ReactElement => {
  const { t } = useTranslation();

  const successScreen: ISlider = {
    image: success,
    text: t(`forgot.success.text`),
    title: t(`forgot.success.title`)
  };

  return (
    <div className=" flex flex-col items-center justify-center">
      <SliderCard slide={successScreen} />
      <br className="lg:hidden" />
      <br className="lg:hidden" />
      <br className="lg:hidden" />
      <br className="lg:hidden" />
      <br className="lg:hidden" />
      <br className="lg:hidden" />
      <br className="lg:hidden" />
      <br className="lg:hidden" />
      <br className="lg:hidden" />
      <br className="lg:hidden" />

      <br />
      <br />
      <Button
        type="submit"
        color="green"
        className="bg-seeds-button-green w-full rounded-full"
      >
        {t('button.next')}
      </Button>
    </div>
  );
};

export default SuccessCard;
