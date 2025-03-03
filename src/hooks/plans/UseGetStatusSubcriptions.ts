import DiamondIcon from '@/assets/homepage/subcription-buttons/diamond-icon.png';
import GoldMemberIcon from '@/assets/homepage/subcription-buttons/gold-icon.png';
import SeedsIcon from '@/assets/homepage/subcription-buttons/icon-subcriptions-1.png';
import SilverMemberIcon from '@/assets/homepage/subcription-buttons/silver-icon.png';
import { getSubscriptionStatus } from '@/repository/subscription.repository';
import { type StatusSubscription } from '@/utils/interfaces/subscription.interface';
import { useEffect, useState } from 'react';

const subscriptionPlans = [
  {
    tagText: 'Subscribe Now',
    description: 'Get exclusive perks & premium benefits!',
    title: 'Join MySeeds Plan Today',
    href: '/seedsplan',
    icon: SeedsIcon,
    type: 'subscribe'
  },
  {
    tagText: 'UPGRADE NOW!',
    description: 'Exclusive perks and premium benefits are now yours!',
    title: 'Welcome to Seeds Plan! ✨',
    href: '/seedsplan',
    classNameText: 'text-gray-800',
    icon: SilverMemberIcon,
    type: 'silver'
  },
  {
    tagText: 'UPGRADE NOW!',
    description: 'Exclusive perks and premium benefits are now yours!',
    title: 'Welcome to Seeds Plan! ✨',
    href: '/seedsplan',
    icon: GoldMemberIcon,
    type: 'gold'
  },
  {
    description: 'Exclusive perks and premium benefits are now yours!',
    title: 'Welcome to Seeds Plan! ✨',
    href: '/seedsplan',
    icon: DiamondIcon,
    type: 'platinum'
  }
];

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

  const activeType =
    dataSubscription?.active_subscription?.subscription_type?.toLowerCase();
  const activeIndex = subscriptionPlans.findIndex(
    plan => plan.type === activeType
  );

  // Menentukan paket yang akan ditampilkan
  const selectedPlan =
    dataSubscription == null
      ? subscriptionPlans[0] // Jika tidak ada data, akan tertampil paket subcription
      : activeIndex === subscriptionPlans.length - 1 ||
        dataSubscription?.incoming_subscription !== null
      ? subscriptionPlans[activeIndex] // Jika paket terakhir atau ada incoming_subscription,tidak menampilkan apapun
      : subscriptionPlans[activeIndex + 1]; // Tampilkan paket selanjutnya

  return {
    dataSubscription,
    isLoading,
    selectedPlan
  };
};

export default UseGetStatusSubcriptionPlan;
