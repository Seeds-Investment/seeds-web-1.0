import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { getUserInfo } from '@/repository/profile.repository';
import { type UserInfo } from '@/utils/interfaces/earning.interfaces';
import moment from 'moment';
import Image from 'next/image';
import GoldPlan from 'public/assets/subscription/gold-plan.svg';
import SilverPlan from 'public/assets/subscription/silver-plan.svg';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const HistoryTransaction: React.FC = () => {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState<UserInfo>();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const dataInfo = await getUserInfo();
        setUserInfo(dataInfo);
      } catch (error) {
        toast(`Error fetching data user: ${error as string}`);
      }
    };
    fetchData()
      .then()
      .catch(() => {});
  }, []);

  const data = [
    {
      id: 1,
      name_plan: 'Gold',
      transaction_date: '2022-01-01',
      status: 'success',
      amount: 30000
    },
    {
      id: 2,
      name_plan: 'Silver',
      transaction_date: '2022-02-15',
      status: 'canceled',
      amount: 20000
    },
    {
      id: 3,
      name_plan: 'Gold',
      transaction_date: '2022-03-10',
      status: 'success',
      amount: 50000
    },
    {
      id: 4,
      name_plan: 'Silver',
      transaction_date: '2022-04-25',
      status: 'canceled',
      amount: 15000
    },
    {
      id: 5,
      name_plan: 'Gold',
      transaction_date: '2022-05-30',
      status: 'success',
      amount: 25000
    },
    {
      id: 6,
      name_plan: 'Gold',
      transaction_date: '2022-05-30',
      status: 'success',
      amount: 25000
    },
    {
      id: 7,
      name_plan: 'Gold',
      transaction_date: '2022-05-30',
      status: 'success',
      amount: 25000
    },
    {
      id: 8,
      name_plan: 'Silver',
      transaction_date: '2022-04-25',
      status: 'canceled',
      amount: 15000
    }
  ];

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="bg-white p-5 rounded-[18px] shadow-lg">
        <h1 className="font-semibold text-xl">
          {t('subscription.transactionHistory')}
        </h1>
        <div>
          {data.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center p-3 my-2 bg-[#F9F9F9] rounded-xl hover:shadow-md duration-300"
            >
              <div className="flex flex-row items-center gap-6">
                <div>
                  <div
                    className={`absolute w-[50px] h-[50px] rounded-full bg-gradient-to-b ${
                      item.name_plan === 'Gold'
                        ? 'from-[#b5dda4] to-[#FEEBA6]'
                        : 'from-[#a8dbce] to-[#d7e5e1]'
                    }`}
                  ></div>
                  <div className="relative left-2 top-1">
                    <Image
                      src={item.name_plan === 'Gold' ? GoldPlan : SilverPlan}
                      alt="Plan Subscription"
                      width={35}
                      height={35}
                    />
                  </div>
                </div>
                <div className="flex-col">
                  <p className="font-semibold text-sm">{item.name_plan} Plan</p>
                  <p className="text-xs text-[#BDBDBD]">
                    {moment(item.transaction_date).format('dddd, DD MMM YYYY')}
                  </p>
                </div>
              </div>
              <div className="flex-col">
                <p className="text-xs text-[#BDBDBD]">
                  {item.amount.toLocaleString('id-ID', {
                    currency: userInfo?.preferredCurrency ?? 'IDR',
                    style: 'currency'
                  })}
                </p>
                <p
                  className={`capitalize text-sm font-semibold ${
                    item.status === 'success'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {item.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageGradient>
  );
};

export default HistoryTransaction;
