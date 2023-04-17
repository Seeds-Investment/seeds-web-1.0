import arrowLeft from '@/assets/story-boarding/arrow-left.svg';

import Container from '@/components/Container';
import Image from 'next/image';

export default function Login(): React.ReactElement {
  return (
    <div>
      <Container>
        <p className="font-bold">Legal</p>
        <div>
          <div className="flex justify-between">
            <div className="flex">
              {/* <Image className="mr-3" src={iconDoc} width={20} alt="" /> */}
              <p>Terms & Conditions</p>
            </div>
            <Image className="" src={arrowLeft} width={10} alt="" />
          </div>
        </div>
      </Container>
    </div>
  );
}
