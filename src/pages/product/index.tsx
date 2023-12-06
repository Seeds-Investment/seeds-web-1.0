import Footer from '@/components/layouts/Footer';
import Section7 from '@/containers/temporary/Section1';
import NewSection1 from './components/NewSection1';
import NewSection2 from './components/NewSection2';
import NewSection3 from './components/NewSection3';
import Section3 from './components/Section3';

const Product = (): React.ReactElement => {
  return (
    <>
      <NewSection1 />
      <NewSection2 />
      <NewSection3 />
      <Section3 />
      <Section7 />
      <Footer />
    </>
  );
};

export default Product;
