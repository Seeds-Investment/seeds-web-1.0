import Section7 from '@/containers/temporary/Section1';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';

const Product = (): React.ReactElement => {
  return (
    <div className="pb-[10] h-screen font-poppins">
      <Section1 />
      <Section2 />
      <Section3 />
      <Section7 />
      {/* <Section6 /> */}
    </div>
  );
};

export default Product;
