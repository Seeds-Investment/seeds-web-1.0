import { Typography } from '@material-tailwind/react';

const NewSection5: React.FC = () => {
  return (
    <section className="flex m-20 gap-10 items-center">
      <iframe
        width="686"
        height="418"
        src="https://www.youtube.com/embed/IfFJdZxpyKA?si=6YAuxYQsMlmFQbkY"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <div className="w-[554px]">
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
