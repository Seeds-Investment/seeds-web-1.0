import DiamondIcon from '@/assets/homepage/subcription-buttons/diamond-icon.png';
import GoldMemberIcon from '@/assets/homepage/subcription-buttons/gold-icon.png';
import SeedsIcon from '@/assets/homepage/subcription-buttons/icon-subcriptions-1.png';
import SilverMemberIcon from '@/assets/homepage/subcription-buttons/silver-icon.png';
import CCard from '@/components/CCard';
import { SubcriptionButton } from '@/components/homepage/SubcriptionButton';
import UseGetStatusSubcriptionPlan from '@/hooks/plans/UseGetStatusSubcriptions';

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

const SubscriptionSection = (): JSX.Element => {
  const { dataSubscription, isLoading } = UseGetStatusSubcriptionPlan();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const activeType =
    dataSubscription?.active_subscription?.subscription_type?.toLowerCase();
  const activeIndex = subscriptionPlans.findIndex(
    plan => plan.type === activeType
  );

  // Jika tidak ditemukan atau jika `dataSubscription` null, maka yang ditampilkan akan subcriptionPlans[0]
  if (dataSubscription == null) {
    return (
      <section className="w-full flex flex-col gap-12">
        <CCard className="p-3 mb-5 h-auto rounded-none shadow-none flex-col gap-2">
          {' '}
          <SubcriptionButton {...subscriptionPlans[0]} />
        </CCard>
      </section>
    );
  }

  // Jika sudah mencapai paket terakhir atau incomingnya sudah ada, maka tidak akan di tampilkan apapun
  if (
    activeIndex === subscriptionPlans.length - 1 ||
    dataSubscription?.incoming_subscription !== null
  ) {
    return <></>;
  }

  // memilih paket selanjutnya
  const nextPlan = subscriptionPlans[activeIndex + 1];

  return (
    <section className="w-full flex flex-col gap-12">
      <CCard className="p-3 mb-5 h-auto rounded-none shadow-none flex-col gap-2">
        <SubcriptionButton {...nextPlan} />
      </CCard>
    </section>
  );
};

export default SubscriptionSection;
