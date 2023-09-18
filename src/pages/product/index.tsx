import Section6 from '@/containers/landing/Section6';
import Section1 from './components/Section1';
import Section2 from './components/Section2';

const Product = (): React.ReactElement => {
  return (
    <div className="pb-[10] h-screen font-poppins">
      <Section1 />
      <Section2 />
      <Section6 />
    </div>
  );
};

export default Product;
