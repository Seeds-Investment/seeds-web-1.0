import { Card } from '@material-tailwind/react';
import Image from 'next/image';
import SeedsLogo from '../../assets/images/SeedsTypo.png';

interface Props {
  children: React.ReactNode;
  className: string;
}

const FormCard: React.FC<Props> = ({ children, className }: Props) => {
  return (
    <Card
      className={`bg-gradient-to-br flex-col from-white  border rounded-3xl border-white ${className}`}
    >
      <div className="flex justify-between pt-10 px-10">
        <Image src={SeedsLogo} alt="seeds-typograph" />
      </div>
      {children}
    </Card>
  );
};

export default FormCard;
