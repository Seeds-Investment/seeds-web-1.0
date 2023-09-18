import CCard from '@/components/CCard';
import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Typography
} from '@material-tailwind/react';

interface props {
  changeStep: any;
  isLoadingBalance: boolean;
  balance: number;
}

const WithdrawMethod: React.FC<props> = ({
  changeStep,
  balance,
  isLoadingBalance
}) => {
  const width = useWindowInnerWidth();

  const placeholderMethod = (): string => {
    return 'Select your withdraw method';
  };

  return (
    <PageGradient
      defaultGradient
      className="relative overflow-hidden flex flex-col items-center sm:p-0 sm:pb-16 w-full"
    >
      <CardGradient
        defaultGradient
        className={`relative overflow-hidden w-full sm:w-[90%] sm:rounded-[18px] sm:min-h-[36rem] bg-white sm:px-20 py-8 ${
          width !== undefined && width < 370
            ? 'min-h-[38rem]'
            : width !== undefined && width < 400
            ? 'min-h-[45rem]'
            : width !== undefined && width < 415
            ? 'min-h-[48rem]'
            : ''
        } bg-white`}
      >
        <div className="flex items-center justify-center rounded-xl">
          <CCard className="p-9 border-none rounded-none shadow-none w-full bg-white">
            <Card className="bg-[#8a70e0] h-full">
              <CardBody>
                <Typography color="white" className="text-base font-normal">
                  Circle Balance
                </Typography>
                <Typography color="white" className="text-2xl font-semibold">
                  {isLoadingBalance ? 'Loading...' : `IDR ${balance}`}
                </Typography>
              </CardBody>
            </Card>
            <div className="my-8">
              <label className="font-semibold text-base text-[#262626]">
                Withdraw Method
              </label>
              <Select variant="standard" selected={placeholderMethod}>
                <Option>
                  <Typography>Bank Transfer</Typography>
                  <Typography>Transfer via Banks</Typography>
                </Option>
                <Option>
                  <Typography>E-Wallet</Typography>
                  <Typography>Transfer via E-Wallets</Typography>
                </Option>
              </Select>
            </div>
            <div className="mb-8">
              <label className="font-semibold text-base text-[#262626]">
                Bank Account
              </label>
              <Input
                variant="static"
                color="green"
                type="number"
                name="name"
                // onChange={change}
                // value={formRequest?.name}
                placeholder="IDR 0"
              />
            </div>
            <div className="mb-8">
              <label className="font-semibold text-base text-[#262626]">
                Account Number
              </label>
              <Input
                variant="static"
                color="green"
                type="number"
                name="name"
                // onChange={change}
                // value={formRequest?.name}
                placeholder="IDR 0"
              />
            </div>
            <div className="mb-8">
              <label className="font-semibold text-base text-[#262626]">
                Account Name
              </label>
              <Input
                variant="static"
                color="green"
                type="number"
                name="name"
                // onChange={change}
                // value={formRequest?.name}
                placeholder="IDR 0"
              />
            </div>

            <div className="w-full flex items-center justify-center">
              <Button
                className="w-1/2 bg-seeds-button-green mt-5 rounded-full capitalize"
                onClick={() => changeStep('method')}
              >
                Continue
              </Button>
            </div>
          </CCard>
        </div>
      </CardGradient>
    </PageGradient>
  );
};

export default WithdrawMethod;
