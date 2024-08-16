import CCard from '@/components/CCard';
import { PromoIcon } from '@/constants/assets/images';
import { standartCurrency } from '@/helpers/currency';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { PaymentSVG } from 'public/assets/circle';

interface props {
  setStep: any;
  detailPost: any;
  changeValue: any;
  errorMessage: string;
}

const FeeMembership: React.FC<props> = ({
  setStep,
  detailPost,
  changeValue,
  errorMessage
}) => {
  return (
    <CCard className="flex p-8 mx-5 md:rounded-lg border-none rounded-none">
      <div className="flex flex-col justify-center pt-4">
        <div className="flex justify-center pl-4 pt-2">
          <Image src={PaymentSVG} alt="image" className="w-[230px] h-[230px]" />
        </div>

        <h1 className="font-poppins font-semibold text-xl text-black text-center mt-4">
          Premium Content
        </h1>

        <h1 className="font-poppins font-light text-sm text-black text-center">
          Get access to this content by purchasing premium
        </h1>
      </div>

      <div className="flex justify-center">
        <form className="w-[400px] p-2 mt-5 rounded-lg border border-black flex items-center">
          <button type="submit" className="rounded-full">
            <Image src={PromoIcon.src} height={30} width={30} alt="promo" />
          </button>
          <input
            type="text"
            name="promo_code"
            onChange={changeValue}
            className="border-none focus:outline-none flex-grow px-4"
            placeholder="Input Promo Code"
          />
        </form>
      </div>
      <div className="flex justify-center">
        <p className="text-red-500 w-[400px]">{errorMessage}</p>
      </div>

      <div className="flex justify-center mt-5">
        <div className="w-[400px] mt-2 rounded-2xl border border-seeds-purple">
          <div className="bg-seeds-purple w-full p-2 rounded-t-xl pl-2 text-white">
            <h1 className="font-poppins text-xs font-medium">
              Premium Content
            </h1>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col pb-7 px-7">
              <h1 className="pt-4 text-center text-black font-poppins text-base font-semibold">
                {standartCurrency(detailPost?.premium_fee)}
              </h1>
              <h1 className="pt-2 text-center font-poppins text-base font-light">
                One time payment for this specific content
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          className="w-1/3 bg-seeds-button-green mt-10 text-sm font-semibold rounded-full capitalize"
          onClick={() => {
            setStep('tnc');
          }}
        >
          Purchase this Content
        </Button>
      </div>
    </CCard>
  );
};

export default FeeMembership;
