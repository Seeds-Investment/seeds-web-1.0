import { loginSSO } from '@/repository/auth.repository';
import { Button, Typography } from '@material-tailwind/react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';

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
  const { data } = useSession();
  console.log(data?.accessToken);
  console.log(data?.provider);
  const handleLoginSSO = async (): Promise<void> => {
    try {
      if (data !== null) {
        const response = await loginSSO({
          identifier: data?.accessToken,
          provider: data?.provider
        });
        console.log(response);
      }
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };
  useEffect(() => {
    handleLoginSSO()
      .then()
      .catch(() => {});
  }, [data]);
  return (
    <Button
      onClick={async () => {
        await signIn('google');
      }}
      className="flex gap-2 p-3 w-full items-center bg-transparent shadow-none hover:shadow-none border border-[#E9E9E9]"
    >
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
