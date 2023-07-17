import OTPCard from '@/containers/auth/OTPCard';
import type { IRegisterPaging } from '@/pages/auth/register';
import { isEmptyString, isUndefindOrNull } from '@/utils/common/utils';
import { Typography } from '@material-tailwind/react';

const ValidateOTPPage = ({
  setPage,
  formdata,
  setFormdata
}: IRegisterPaging): JSX.Element => {
  return (
    <div>
      <div>
        <Typography variant="h5" color="black">
          Enter OTP Code
        </Typography>
      </div>
      <div>
        <OTPCard
          onSubmit={data => {
            if (
              !isUndefindOrNull(data.status) &&
              data?.status === true &&
              !isUndefindOrNull(data.otp) &&
              !isEmptyString(data.otp)
            ) {
              setFormdata(prevState => ({
                ...prevState,
                otp: data.otp
              }));
              setPage(3);
            }
          }}
          phoneNumber={`${formdata.countryCode.replace(
            '+',
            ''
          )}${formdata.phoneNumber.replace(/\s/g, '')}`}
        />
      </div>
    </div>
  );
};

export default ValidateOTPPage;
