import { SubcriptionButton } from '@/components/homepage/SubcriptionButton';

const SubcroptionSection = (): JSX.Element => {
  return (
    <section>
      <div className="w-full ">
        <SubcriptionButton
          promoText="Subscribe Now"
          description="Get exclusive perks & premium benefits!"
          title="Join MySeeds Plan Today"
          href="/seedsplan"
        ></SubcriptionButton>
      </div>
    </section>
  );
};

export default SubcroptionSection;
