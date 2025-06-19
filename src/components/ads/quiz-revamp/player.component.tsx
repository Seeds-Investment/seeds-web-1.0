import Image from 'next/image';
import calendarCheck from 'public/assets/ads/calendarCheck.svg';
import giftGreen from 'public/assets/ads/giftGreen.svg';
import people from 'public/assets/ads/people.png';
import starGreen from 'public/assets/ads/starGreen.svg';
import tail from 'public/assets/ads/tail.svg';
import usersFour from 'public/assets/ads/usersFour.svg';
import { useEffect, useRef, useState } from 'react';

const Player = (): React.ReactElement => {
  const section = [
    { label: '50K+', desc: 'Pemain Aktif', img: usersFour },
    { label: '100+', desc: 'Kuis Setiap Bulan', img: calendarCheck },
    { label: 'Rp50JT+', desc: 'Total Hadiah Dibagikan', img: giftGreen },
    { label: '4.8/5', desc: 'Rating di Play Store', img: starGreen }
  ];
  const rotations = ['rotate-0', 'rotate-90', 'rotate-180', 'rotate-270'];
  const translate = [
    'translate-x-12',
    'translate-y-20',
    '-translate-x-32',
    '-translate-y-20'
  ];
  const boxRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (boxRef.current !==null) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current !== null) observer.unobserve(boxRef.current);
    };
  }, [hasAnimated]);
  return (
    <section className="md:py-[100px] py-6 flex flex-col gap-6 md:gap-12 justify-center items-center">
      <p className="bg-clip-text bg-gradient-to-b text-transparent from-white to-[#A8A8A8] font-medium text-2xl text-center">
        {`"Gue ikut kuis berbayar cuma modal 10rb, menang ranking 2 langsung dapet
        200rb. Worth banget sih! Lebih seru dari main game biasa, soalnya sambil
        nambah ilmu investasi juga."`}
      </p>
      <Image src={people} alt="people" className="w-fit" />
      <div
        ref={boxRef}
        className="relative grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-0 md:w-3/4 lg:w-2/3 w-full"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <Image
            src={tail}
            alt="tail"
            key={i}
            className={`absolute hidden md:block top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 transition-transform duration-1000 ease-out ${
              hasAnimated ? `${translate[i]}` : ''
            } ${rotations[i]}`}
          />
        ))}
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#060311] shadow-lg shadow-seeds-button-green/50 rounded-3xl">
          <div className="hidden md:block bg-[url('/assets/ads/skyNight.png')] shadow-[inset_0_32px_64px_0_var(--tw-shadow-color)] shadow-seeds-button-green/[8%] drop-shadow-[0_-1px_18px_#3AC4A040] z-20 px-6 py-9 rounded-3xl">
            Player
          </div>
        </div>
        {section.map((v, i) => (
          <div
            key={i}
            className={`hover:shadow-lg hover:shadow-seeds-button-green/50 md:hover:shadow-none md:rounded-none rounded-3xl ${
              (i + 1) % 2 === 0
                ? 'md:border-l md:border-r-0'
                : 'md:border-r md:border-l-0'
            } ${
              i <= 1 ? 'md:border-b md:border-t-0' : 'md:border-t md:border-b-0'
            } md:border-white`}
          >
            <div className="rounded-3xl md:rounded-none aspect-video md:aspect-square hover:bg-[url('/assets/ads/skyNight.png')] md:hover:bg-none bg-[#060311] md:hover:bg-transparent hover:shadow-[inset_0_32px_64px_0_var(--tw-shadow-color)] hover:shadow-seeds-button-green/[8%] md:hover:shadow-none p-8 flex flex-col gap-6 md:gap-8 items-center hover:drop-shadow-[0_-1px_18px_#3AC4A040] md:hover:drop-shadow-none">
              <div className="w-20 aspect-square bg-gradient-to-b from-seeds-button-green/[8%] to-white/[8%] rounded-2xl flex justify-center items-center">
                <Image src={v.img} alt="img" />
              </div>
              <div className="text-center">
                <h5 className="bg-clip-text bg-gradient-to-b text-transparent from-white to-[#A8A8A8] font-semibold text-4xl md:text-5xl">
                  {v.label}
                </h5>
                <p className="bg-clip-text bg-gradient-to-b text-transparent from-white to-[#A8A8A8] font-normal text-lg md:text-3xl">
                  {v.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Player;
