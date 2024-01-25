import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';

interface IAssociatedAccountButton {
  image: any;
  alternative: string;
  text: string;
  imageClassName: string;
}

const AssociatedAccountButton: React.FC<IAssociatedAccountButton> = ({
  image,
  alternative,
  text,
  imageClassName
}: IAssociatedAccountButton) => {
  return (
    <Button className="flex gap-2 p-3 w-full items-center bg-transparent shadow-none hover:shadow-none border border-[#E9E9E9]">
      <Image src={image} alt={alternative} className={`${imageClassName}`} />
      <div className="flex flex-col gap-1 w-full text-left">
        <Typography className="capitalize font-poppins font-semibold text-sm text-[#262626]">
          {text}
        </Typography>
        <Typography className="capitalize font-poppins font-light text-xs text-[#7C7C7C]">
          Linked
        </Typography>
      </div>
      <Typography className="capitalize font-poppins font-semibold text-sm text-[#DD2525]">
        Unlink
      </Typography>
    </Button>
  );
};

export default AssociatedAccountButton;
