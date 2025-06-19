import TrackerEvent from '@/helpers/GTM';
import {
  Accordion,
  AccordionBody,
  AccordionHeader
} from '@material-tailwind/react';
import Image from 'next/image';
import path from 'public/assets/ads/path.svg';
import pathm from 'public/assets/ads/pathm.svg';
import React from 'react';
import { FiPlus } from 'react-icons/fi';

const Faq = (): React.ReactElement => {
  const [open, setOpen] = React.useState(0);
  const data = [
    {
      label: 'Kalau gue kalah, duitnya hilang dong?',
      desc: 'Nggak, kamu cuma kehilangan biaya pendaftaran kuis (mulai dari Rp10.000), tapi sebagai gantinya kamu tetap dapat ilmu + pengalaman + badge partisipasi. Anggap aja biaya kursus, tapi dengan cara yang lebih seru!'
    },
    {
      label: 'Kalo belom jago investasi gimana?',
      desc: 'Tenang aja! Justru Seeds dibuat buat kamu yang pengen belajar. Soal-soalnya disusun biar kamu makin paham dunia investasi—mulai dari dasar banget sampai yang lebih advanced. Sambil main, sambil belajar!'
    },
    {
      label: 'Gimana cara cairkan hadiah?',
      desc: 'Hadiah yang kamu menangkan akan langsung masuk ke dompet digital kamu di aplikasi Seeds. Dari situ, kamu bisa pilih untuk tarik tunai ke rekening, atau dipakai buat ikut kuis lagi. Fleksibel, tinggal klik!'
    },
    {
      label: 'Apa beda kuis gratis & berbayar?',
      desc: 'Kuis gratis cocok buat pemanasan dan latihan, kamu bisa belajar tanpa biaya. Nah, kuis berbayar punya hadiah yang lebih besar, tantangan lebih seru, dan biasanya pesertanya lebih kompetitif. Tapi dua-duanya tetap ngasih ilmu kok!'
    },
    {
      label: 'Apa Seeds bisa bantu investasi beneran?',
      desc: 'Bisa banget! Seeds bantu kamu bangun dasar investasi yang kuat. Setelah ngerti konsepnya, kamu bisa lebih pede mulai investasi beneran. Bahkan beberapa kuis kasih bonus atau voucher buat mulai investasi langsung dari partner Seeds!'
    }
  ];

  return (
    <>
      <Image
        src={path}
        alt="path"
        className="absolute hidden md:block -top-1/4 lg:-top-1/3 left-0 w-full z-0"
      />
      <Image
        src={pathm}
        alt="pathm"
        className="absolute md:hidden -top-1/3 sm:-top-1/2 left-0 w-full z-0"
      />
      <div className="flex flex-col gap-6 md:gap-3 justify-center items-center">
        <p className="text-2xl sm:text-5xl sm:py-2 text-center bg-clip-text bg-gradient-to-b from-white to-[#A8A8A8] text-transparent">
          Masih Ragu?
        </p>
        <p className="text-center font-medium text-sm sm:text-base text-[#999999]">
          Berikut jawaban untuk pertanyaan yang sering ditanyakan. Masih
          bingung? Langsung coba aja kuis gratisnya!
        </p>
      </div>
      <div className="flex flex-col xl:w-1/2 gap-6">
        {data.map((v, i) => {
          const Icon = ({
            open,
            id
          }: {
            open: number;
            id: number;
          }): React.ReactElement => (
            <FiPlus
              className={`transition-all duration-300 ease-in-out ${
                open === id ? 'rotate-45' : 'rotate-0'
              }`}
            />
          );
          return (
            <Accordion
              open={open === i}
              key={i}
              icon={<Icon open={open} id={i} />}
            >
              <AccordionHeader
                className={`font-poppins p-4 md:py-6 md:px-8 flex justify-between items-center gap-6 w-full font-semibold text-base sm:text-lg text-[#FFFFFFB8] hover:text-[#FFFFFFB8] bg-[#FFFFFF0D] border-b border-b-[#FFFFFF1A] ${
                  open === i ? 'rounded-t-xl' : 'border-none rounded-xl'
                } `}
                onClick={() => {
                  if (open === i) {
                    setOpen(5);
                    TrackerEvent({
                      event: `SW_Quiz_Ads_GASS_button_faq_close`
                    });
                  } else {
                    setOpen(i);
                    TrackerEvent({
                      event: `SW_Quiz_Ads_GASS_button_faq_${i}`
                    });
                  }
                }}
              >
                {v.label}
              </AccordionHeader>
              <AccordionBody
                className={`font-poppins text-[#FFFFFFB8] bg-[#FFFFFF0D] p-4 md:py-6 md:px-8 text-sm sm:text-base ${
                  open === i ? 'rounded-b-xl' : 'border-none rounded-xl'
                }`}
              >
                {v.desc}
              </AccordionBody>
            </Accordion>
          );
        })}
      </div>
    </>
  );
};

export default Faq;
