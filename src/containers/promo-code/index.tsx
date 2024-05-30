import {
  getPromocodeActive,
  promoValidate
} from '@/repository/promo.repository';
import { setPromoCodeValidationResult } from '@/store/redux/features/promo-code';
import { type IDetailTournament } from '@/utils/interfaces/tournament.interface';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

interface PromoCodeSelectionProps {
  detailTournament: IDetailTournament | undefined;
}

interface PromoCode {
  id: string;
  promo_code: string;
  start_date: string;
  end_date: string;
  discount_percentage: number;
  quantity: number;
  initial_quantity: number;
  institution: string;
}

const PromoCodeSelection: React.FC<PromoCodeSelectionProps> = ({
  detailTournament
}) => {
  const [activePromoCodes, setActivePromoCodes] = useState<PromoCode[]>([]);
  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const dispatch = useDispatch();

  const handleDropdownClick = (): void => {
    setShowRadioButtons(!showRadioButtons);
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const activePromoCodesResponse = await getPromocodeActive(1, 10);
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        setActivePromoCodes(activePromoCodesResponse?.data || []);
      } catch (error) {
        toast.error('Error fetching promo codes:');
      }
    };

    void fetchData();
  }, []);

  const handlePromoCodeSelection = async (promoCode: string): Promise<void> => {
    setPromoCode(promoCode);
    try {
      const response = await promoValidate({
        promo_code: promoCode,
        spot_type: 'Paid Tournament',
        item_price: detailTournament?.admission_fee,
        item_id: detailTournament?.id,
        currency: detailTournament?.currency
      });

      if (response.total_discount !== undefined) {
        setPromoCode(promoCode);
        setTotalDiscount(response.total_discount);

        dispatch(setPromoCodeValidationResult(response));
      } else {
        toast.error('Error Promo Code:', response.message);
      }
    } catch (error) {
      toast.error('Error Promo Code only for New User');
      setPromoCode('');
        dispatch(setPromoCodeValidationResult(0));
    }
  };

  return (
    <div>
      <div
        className="w-full p-2 bg-white justify-between rounded-xl flex border-[#3AC4A0] border border-1"
        onClick={handleDropdownClick}
        id="radiobtn"
      >
        <div className="px-2 flex" id="radioSelect">
          <span className="px-2">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 19.9374C15.936 19.9374 19.9374 15.936 19.9374 11C19.9374 6.06394 15.936 2.0625 11 2.0625C6.06394 2.0625 2.0625 6.06394 2.0625 11C2.0625 15.936 6.06394 19.9374 11 19.9374Z"
                fill="#7555DA"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11 1.375C5.68769 1.375 1.375 5.68769 1.375 11C1.375 16.3123 5.68769 20.625 11 20.625C16.3123 20.625 20.625 16.3123 20.625 11C20.625 5.68769 16.3123 1.375 11 1.375ZM11 2.75C15.5533 2.75 19.25 6.44669 19.25 11C19.25 15.5533 15.5533 19.25 11 19.25C6.44669 19.25 2.75 15.5533 2.75 11C2.75 6.44669 6.44669 2.75 11 2.75ZM13.9948 12.397C14.7414 12.5324 15.2384 13.2481 15.103 13.9948C14.9676 14.7414 14.2519 15.2384 13.5052 15.103C12.7586 14.9676 12.2616 14.2519 12.397 13.5052C12.5324 12.7586 13.2481 12.2616 13.9948 12.397ZM13.9514 7.07644L7.07644 13.9514C6.80831 14.2196 6.80831 14.6554 7.07644 14.9236C7.34456 15.1917 7.78044 15.1917 8.04856 14.9236L14.9236 8.04856C15.1917 7.78044 15.1917 7.34456 14.9236 7.07644C14.6554 6.80831 14.2196 6.80831 13.9514 7.07644ZM8.49475 6.897C9.24138 7.03244 9.73844 7.74812 9.603 8.49475C9.46756 9.24137 8.75187 9.73844 8.00525 9.603C7.25862 9.46756 6.76156 8.75188 6.897 8.00525C7.03244 7.25863 7.74813 6.76156 8.49475 6.897Z"
                fill="#3AC4A0"
              />
            </svg>
          </span>
          Kode Promo
        </div>
        <div className="mt-2">
          <svg
            width="6"
            height="12"
            viewBox="0 0 6 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 11L5.5 6L0.5 1"
              stroke="#262626"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <i className="fa fa-angle-down" />
      </div>

      <div
        className={showRadioButtons ? 'BudgetRadioDd' : 'BudgetRadioDd hidden'}
        id="RadioDd"
      >
        <fieldset>
          <div className="flex justify-between">
            <label className="flex items-center p-2 w-full justify-between rounded-lg border border-1 border-[#3AC4A0] bg-white mb-1">
              <span>Tanpa Promo Code</span>
              <input
                className="ml-auto"
                type="radio"
                name="promoCodes"
                value=""
                checked={promoCode === ''}
                onChange={() => {
                  void handlePromoCodeSelection('');
                }}
              />
            </label>
          </div>
          {activePromoCodes?.map((promo, index) => (
            <div key={index} className="flex justify-between">
              <label className="flex items-center p-2 w-full justify-between  rounded-lg border border-1 border-[#3AC4A0] bg-white mb-1">
                <span>{promo.promo_code}</span>
                <input
                  className="ml-auto"
                  type="radio"
                  name="promoCodes"
                  value={promo.promo_code}
                  checked={promoCode === promo.promo_code}
                  onChange={() => {
                    void handlePromoCodeSelection(promo.promo_code);
                  }}
                />
              </label>
            </div>
          ))}
        </fieldset>
      </div>
      {totalDiscount > 0 && (
        <div className="text-green-500">Hooray! hemat {totalDiscount}</div>
      )}
    </div>
  );
};

export default PromoCodeSelection;
