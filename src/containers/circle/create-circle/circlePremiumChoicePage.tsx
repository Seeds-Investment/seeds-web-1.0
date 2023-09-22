import CCard from '@/components/CCard';
import {
  Button,
  Card,
  CardBody,
  Radio,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { ArrowBackwardIcon } from 'public/assets/vector';

const CirclePremiumChoicePage = ({
  change,
  formRequest,
  changeStep
}: any): JSX.Element => {
  return (
    <div className="md:mx-8 lg:mx-[10rem] xl:mx-[22rem]">
      {formRequest !== undefined && (
        <>
          <div className="flex flex-row mb-4">
            <button
              className="w-1/3 items-start text-left transition-colors rounded-md hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:bg-gray-200"
              onClick={() => changeStep('')}
            >
              <Image src={ArrowBackwardIcon} alt="arrow-backward-icon" />
            </button>

            <Typography className="mb-2 text-center text-base font-poppins font-semibold">
              Setting Circle Premium
            </Typography>
          </div>
          <CCard className="mt-2 p-10 border-none shadow-none rounded-xl bg-white">
            <Typography className="mb-2 text-base font-poppins font-semibold text-[#262626]">
              Premium Circle Choice
            </Typography>
            <Typography className="mb-2 text-sm font-poppins font-normal text-[#7C7C7C]">
              Set your circle premium to Lifetime Membership or Subscription.
            </Typography>

            <Card
              color="white"
              shadow={false}
              className="w-full border-2 mb-5 mt-3"
            >
              <CardBody className="p-3 inline-block h-auto">
                <div className="flex flex-row">
                  <div className="flex w-full flex-col gap-0.5">
                    <Typography className="font-semibold text-xs text-[#262626]">
                      Lifetime Membership
                    </Typography>
                    <Typography className="font-normal text-xs text-[#7C7C7C]">
                      Member only need to pay one time to have access to the
                      circle
                    </Typography>
                  </div>
                  <div className="items-end">
                    {formRequest.type === 'lifetime' ? (
                      <Radio
                        name="type"
                        value="lifetime"
                        onChange={change}
                        checked={true}
                      />
                    ) : (
                      <Radio
                        name="type"
                        value="lifetime"
                        onChange={change}
                        checked={false}
                      />
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card color="white" shadow={false} className="w-full border-2 mb-5">
              <CardBody className="p-3 inline-block h-auto">
                <div className="flex flex-row">
                  <div className="flex w-full flex-col gap-0.5">
                    <Typography className="font-semibold text-xs text-[#262626]">
                      Subscription
                    </Typography>
                    <Typography className="font-normal text-xs text-[#7C7C7C]">
                      Member need to pay subscription every month/3
                      month/6month/12 month
                    </Typography>
                  </div>
                  <div className="items-end">
                    {formRequest.type === 'subscription' ? (
                      <Radio
                        name="type"
                        value="subscription"
                        onChange={change}
                        checked={true}
                      />
                    ) : (
                      <Radio
                        name="type"
                        value="subscription"
                        onChange={change}
                        checked={false}
                      />
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
            <Button
              className="w-full mt-16 font-semibold text-sm bg-seeds-button-green rounded-full capitalize"
              onClick={() => changeStep('membership_fee')}
            >
              Done
            </Button>
          </CCard>
        </>
      )}
    </div>
  );
};

export default CirclePremiumChoicePage;
