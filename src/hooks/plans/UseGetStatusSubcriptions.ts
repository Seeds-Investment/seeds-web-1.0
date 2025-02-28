import { getSubscriptionStatus } from '@/repository/subscription.repository';
import { type StatusSubscription } from '@/utils/interfaces/subscription.interface';
import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const UseGetStatusSubcriptionPlan = () => {
  const [dataSubscription, setDataSubscription] =
    useState<StatusSubscription | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getSubscriptionPlan = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const planStatus = await getSubscriptionStatus();
      if (planStatus !== undefined) {
        setDataSubscription(planStatus);
      }
    } catch (error) {
      console.error(`${error as string}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void getSubscriptionPlan();
  }, []);

  return {
    dataSubscription,
    isLoading
  };
};

export default UseGetStatusSubcriptionPlan;
