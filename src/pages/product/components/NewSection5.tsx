import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const NewSection5: React.FC = () => {
  const measurement = 900;
  const [isBottom, setBottom] = useState(0);
  const { ref, inView, entry } = useInView({
    threshold: 0.2
  });
  useEffect(() => {
    const bottom = entry?.boundingClientRect.bottom ?? 0;
    console.log(bottom);
    setBottom(bottom);
  }, [entry]);
  return (
    <section ref={ref} className="flex m-20 gap-10 items-center">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/bdPIT9Y2THs?si=jbD5c6wSrUqZqYYY"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={`aspect-video ${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      ></iframe>
      <div
        className={`w-[554px] ${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      >
        <Typography className="font-poppins font-bold text-[64px] text-[#201B1C] leading-[77.45px]">
          How to Play <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-tr to-[#7555DA] from-[#4FE6AF]">
            Tournament?
          </span>
        </Typography>
        <Typography className="font-normal font-poppins text-2xl text-[#7C7C7C]">
          Watch a quick video about how to play a tournament. Listen and watch
          so you can challenge other people and win a lot of prizes. Learn
          everything about virtual trading here!
        </Typography>
      </div>
    </section>
  );
};

export default NewSection5;
