import Image from 'next/image';
import bgLine from 'public/assets/story-boarding/bg-line.png';
import hello from 'public/assets/story-boarding/hello.png';
import logo from 'public/assets/story-boarding/logo-seeds.png';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import LanguageSwitcher from '../LanguageSwitcher';

export default function AuthLayout({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}): React.ReactElement {
  return (
    <div className="flex min-w-full min-h-screen">
      <div className="w-full h-screen hidden lg:block">
        <div className="min-h-screen flex items-center justify-center min-w-full transition-all duration-300  bg-gradient-to-tr from-seeds-green  to-seeds-purple px-[8%] py-[3%]">
          <Image
            className="fixed bottom-0 w-1/2 left-0 z-0"
            src={bgLine}
            alt=""
          />
          <Image className="left-0 w-[30vw]" src={hello} alt="" />
        </div>
      </div>
      <div className="w-full h-screen relative">
        <div className="absolute h-full w-full z-20">
          <div className="w-full flex items-center justify-center lg:px-20 lg:py-14 h-full p-8 ">
            <div
              className={`bg-white ${className} min-w-full min-h-full py-12 px-8 lg:px-16 relative rounded-2xl shadow-center text-sm lg:text-base`}
            >
              <div className="w-full flex justify-between items-center lg:pr-0">
                <Image src={logo} alt="" />
                <LanguageSwitcher />
              </div>
              <div className="opacity-0 fade-in">{children}</div>
            </div>
          </div>
        </div>
        <div className="w-full h-1/2 flex justify-center">
          <div
            className="rounded-full bg-seeds-green blur-[100px]"
            style={{ height: '700px', width: '700px' }}
          />
        </div>
        <div className="w-full h-1/2 justify-between flex">
          <div
            className="rounded-full bg-seeds-green blur-[100px] "
            style={{ height: '350px', width: '350px' }}
          />
          <div
            className="rounded-full bg-seeds-purple blur-[100px]  right-0"
            style={{ height: '350px', width: '350px' }}
          />
        </div>
      </div>
    </div>
  );
}
