import { useState } from 'react';
import { Typography, Input } from '@material-tailwind/react';

import SubmitButton from '@/components/SubmitButton';
import InlineText from './components/InlineText';

const WalletForm = (): JSX.Element => {
  const [phone, setPhone] = useState('')

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
          value={phone}
          onChange={(e) => {

            setPhone(e.target.value);
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
      <InlineText
        key='Circle Membership'
        value='IDR 100.000'
        className='mb-2'
      />
      <InlineText
        key='Admin'
        value='IDR 0'
        className='mb-4'
      />
      <hr />
      <Typography className="text-3xl text-[#3AC4A0] font-semibold text-right my-5">
        IDR 100.000
      </Typography>
      <hr />
      <SubmitButton className='my-4' disabled={phone.length < 1}>
        Pay
      </SubmitButton>
    </div>
  );
};

export default WalletForm;
