import { Typography, Input } from '@material-tailwind/react';
import SubmitButton from '@/components/SubmitButton';

const WalletForm = (): JSX.Element => {
  const renderPhoneInput = (): JSX.Element => (
    <div className="mb-2">
      <Typography className="mb-2 text-[#B9B7B7] font-semibold">
        GoPay Number
      </Typography>
      <div className='flex mb-2 border-[#E0E0E0] border rounded-xl'>
        <Typography
          className="font-normal text-[#B9B7B7] flex h-10 items-center pr-0 pl-3"
          >
          +62
        </Typography>
        <Input
          type="tel"
          placeholder="Mobile Number"
          className="!border-0 font-normal"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{
            className: "min-w-0",
          }}
          />
      </div>
      <Typography className="text-[#3C49D6] font-normal">
        Pay before 25 October 2022 10;08pm
      </Typography>
    </div>
  );


  return (
     <div className=''>
      {renderPhoneInput()}
      <div className="flex justify-between mb-2">
        <Typography className="text-[#201B1C] font-normal">
          Circle Membership
        </Typography>
        <Typography className="text-[#201B1C] font-normal">
          IDR 100.000
        </Typography>
      </div>
      <div className="flex justify-between mb-4">
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
      <SubmitButton disabled className='my-4'>
        Pay
      </SubmitButton>
    </div>
  );
};

export default WalletForm;
