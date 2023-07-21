import { Typography } from '@material-tailwind/react';
import SubmitButton from '@/components/SubmitButton';

const WalletForm = (): JSX.Element => {
  return (
     <div>
      <div className="flex justify-between mb-2">
        <Typography className="text-[#201B1C] font-normal">
          Circle Membership
        </Typography>
        <Typography className="text-[#201B1C] font-normal">
          IDR 100.000
        </Typography>
      </div>
      <div className="flex justify-between mb-2">
        <Typography className="text-[#201B1C] font-normal">
          Circle MembershipAdmin
        </Typography>
        <Typography className="text-[#201B1C] font-normal">
          IDR 100.000
        </Typography>
      </div>
      <hr />
      <Typography className="text-3xl text-[#3AC4A0] font-semibold text-right my-5">
        IDR 100.000
      </Typography>
      <hr />
      <SubmitButton>
        Pay
      </SubmitButton>
    </div>
  );
};

export default WalletForm;
