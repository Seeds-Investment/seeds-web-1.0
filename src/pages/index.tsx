import Section1 from '@/containers/landing/Section1';
import Section2 from '@/containers/landing/Section2';
import Section3 from '@/containers/landing/Section3';

export default function Home(): React.ReactElement {
  return (
    <div>
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
}
