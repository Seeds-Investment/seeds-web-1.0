import testi1 from '@/assets/landing-page/testi1.jpg';
import testi2 from '@/assets/landing-page/testi2.jpg';
import testi3 from '@/assets/landing-page/testi3.jpg';
import testi4 from '@/assets/landing-page/testi4.jpg';
import testi5 from '@/assets/landing-page/testi5.jpg';
import { getAllQuizNoToken, getQuizById } from '@/repository/quiz.repository';
import { Button, Card } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import adsPhone from 'public/assets/ads/ads-phone.png';
import bigTree from 'public/assets/ads/big-tree.png';
import blink from 'public/assets/ads/blink.png';
import calender from 'public/assets/ads/calender.svg';
import ellipse from 'public/assets/ads/ellipse.svg';
import gift from 'public/assets/ads/gift.svg';
import image1 from 'public/assets/ads/image-1.png';
import image2 from 'public/assets/ads/image-2.png';
import image3 from 'public/assets/ads/image-3.png';
import image4 from 'public/assets/ads/image-4.png';
import image5 from 'public/assets/ads/image-5.png';
import image6 from 'public/assets/ads/image-6.png';
import image7 from 'public/assets/ads/image-7.png';
import image from 'public/assets/ads/image.png';
import line from 'public/assets/ads/line.svg';
import pattern from 'public/assets/ads/pattern.png';
import seeds from 'public/assets/ads/seeds.png';
import sprout from 'public/assets/ads/sprout.png';
import star from 'public/assets/ads/star.png';
import tree from 'public/assets/ads/tree.png';
import user from 'public/assets/ads/user.svg';
import React, { useCallback, useEffect, useState } from 'react';

export interface QuizRoot {
  id: string;
  quiz_unique_id: string;
  name: string;
  banner: Banner;
  questions: number;
  participants: number;
  category: string;
  status: string;
  privacy: string;
  featured_link: string;
  admission_fee: number;
  is_played: boolean;
  is_recommended: boolean;
  is_free_voucher_claimed: boolean;
  started_at: string;
  ended_at: string;
  company_id: string;
  created_at: string;
  rank: number;
}

export interface Banner {
  iamge_url: string;
  image_link: string;
}
export interface QuizIdRoot {
  id: string;
  quiz_unique_id: string;
  circle_category_id: string;
  name: string;
  tnc: Tnc;
  status: string;
  min_participant: number;
  max_participant: number;
  duration_in_minute: number;
  published_at: string;
  started_at: string;
  ended_at: string;
  admission_fee: number;
  category: string;
  prize_type: string;
  prizes: number[];
  winner_link_url: any;
  winner_image_url: string[];
  winners: any;
  rank: number;
  sponsors: Sponsors;
  communities: Communities;
  banner: Banner;
  lifelines: Lifeline[];
  participant_lifelines: any;
  total_played: number;
  total_questions: number;
  is_joined: boolean;
  is_recommended: boolean;
  participant_status: string;
  participant_user_ids: any;
  payment_method: any;
  is_free_voucher_claimed: boolean;
  is_need_invitation_code: boolean;
  created_at: string;
}

export interface Tnc {
  en: string;
  id: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Sponsors {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Communities {}

export interface Lifeline {
  Name: string;
  Price: number;
}


const categoryQuiz = [
  { name: 'US Stocks', image },
  { name: 'Indo Stocks', image: image1 },
  { name: 'Crypto', image: image2 },
  { name: 'Mutual Funds', image: image3 },
  { name: 'Forex', image: image4 },
  { name: 'Bonds', image: image5 },
  { name: 'Finance', image: image6 },
  { name: 'Commodities (Gold / Oil)', image: image7 }
];

const grow = [
  {
    title: 'Seru & Edukatif',
    sub: 'Pelajari investasi dengan cara yang menyenangkan.',
    image: seeds
  },
  {
    title: 'Hadiah Menarik',
    sub: 'Semakin sering bermain, semakin besar peluang menang!',
    image: sprout
  },
  {
    title: 'Tantang Temanmu',
    sub: 'Bersaing dan buktikan siapa ahli investasi sesungguhnya',
    image: tree
  },
  {
    title: 'Beragam Kategori',
    sub: 'Pilih topik investasi yang paling kamu minati',
    image: bigTree
  }
];

const testimony = [
  {
    avatar: testi1,
    name: 'Andhika',
    title: 'Juara 1 US Stocks',
    comment:
      '“Seru dan menantang! Bisa belajar investasi sambil bersaing dengan pemain”',
    star: 5
  },
  {
    avatar: testi2,
    name: 'Amiyeri',
    title: 'Juara 2 Indo Stocks',
    comment:
      '“Hadiah jutaan rupiah bikin makin semangat! Kuisnya juga bermanfaat banget.”',
    star: 4
  },
  {
    avatar: testi3,
    name: 'Ariandra',
    title: 'Juara 3 Crypto',
    comment:
      '“Seru! Bisa uji pengetahuan kripto sambil naik peringkat di leaderboard!”',
    star: 4
  },
  {
    avatar: testi4,
    name: 'Syalwa',
    title: 'Juara 1 Finance',
    comment:
      '“Bersaing di leaderboard itu nagih! Ditambah hadiahnya bikin makin semangat.”',
    star: 5
  },
  {
    avatar: testi5,
    name: 'Fitria',
    title: 'Juara 2 Forex',
    comment:
      '“Seru banget! Bisa belajar, bersaing, dan dapat hadiah. Bikin ketagihan!”',
    star: 3
  }
];

const QuizPlay = ({ cta }: { cta?: string }): React.ReactElement => {
  const [dataQuiz, setDataQuiz] = useState<QuizIdRoot[]>([]);
  const handleQuiz = useCallback(async () => {
    const res = await getAllQuizNoToken({ limit: 5, page: 1, status: '' });
    // eslint-disable-next-line prefer-const
    let counter = 0;

    while (counter < res.data.length) {
    const resId:QuizIdRoot = await getQuizById({
      id: res.data[counter].id as string,
      currency: ''
    });
    setDataQuiz(prev=>([...prev,resId]));
    counter++; 
    }
  }, []);
  useEffect(() => {
    void handleQuiz();
  }, [handleQuiz]);
  return (
    <div className="flex flex-col gap-6 md:gap-16 font-poppins">
      <section>
        <div className="relative flex">
          <Image
            src={pattern}
            alt="pattern"
            className="absolute h-full brightness-[15]"
          />

          <div className="z-10 w-screen flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-b from-[#5987CB]/90 to-[#66E3B6]/90">
            <Image
              src={ellipse}
              alt="ellipse"
              className="absolute top-0 left-0 w-2/3 hidden md:block"
            />
            <div className="z-20 font-poppins md:w-2/3 flex items-center md:items-start justify-center flex-col gap-6 lg:ps-20 lg:pe-0 px-4 pb-7 lg:pb-0">
              <p className="text-white font-semibold lg:text-4xl text-base">
                Tantang Dirimu &
              </p>
              <p className="font-bold lg:text-7xl text-4xl bg-gradient-to-r from-[#B798FF] from-0% via-[#E3D2E3] via-60% to-[#FFF7D2] to-70% text-transparent bg-clip-text text-center md:text-left">
                Raih Hadiah Fantastis
              </p>
              <div className="text-white text-sm lg:text-base text-center md:text-left">
                <p>Yakin punya keahlian jadi pro investasi?</p>
                <p> Uji pengetahuanmu dengan kuis seru dan penuh hadiah!</p>
                <p>
                  Bersaing dengan yang lain, naik peringkat, dan menangkan
                  hadiah jutaan rupiah!
                </p>
              </div>
              <Link
                href={
                  cta !== undefined
                    ? cta
                    : 'https://gass.seeds.finance/cta?p=939E98001B6C92B322B0F42C05121F1E&divisi=qontak&msg=ID+%5B_gid_%5D%25break%25Hai+Min+Seeds%2C%25break%25Saya+Mau+Daftar+Event+Web3%25break%25Apakah+Promonya+masih+ada%3F'
                }
              >
                <Button className="w-fit bg-[#3AC4A0] rounded-full capitalize font-poppins">
                  Play Now
                </Button>
              </Link>
            </div>
            <Image src={adsPhone} alt="ads-phone" className="md:w-1/3" />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6 lg:gap-16 px-4 md:px-20">
        <div className="py-6 flex flex-col gap-8 lg:gap-16">
          <div className="flex flex-col gap-2 lg:gap-4 items-center justify-center">
            <p className="font-semibold text-base md:text-4xl text-center text-neutral-medium">
              🔥 Kuis Trending – Main Sekarang!
            </p>
            <p className="font-normal text-neutral-soft text-sm md:text-base text-center">
              Ikuti kuis paling populer sekarang! Seru, menantang, dan penuh
              hadiah—siap terima tantangannya?
            </p>
          </div>
          <div className="flex flex-col gap-8">
            {dataQuiz.map((v: QuizIdRoot, i) => (
              <Card
                className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 lg:p-8 gap-3 lg:gap-0"
                key={i}
              >
                <div className="flex gap-4 lg:gap-8 items-center">
                  <img
                    className="aspect-square w-20 lg:w-32 rounded-full"
                    src={v.banner.iamge_url}
                    alt={v.name}
                  />
                  <div className="flex flex-col gap-1 lg:hidden">
                    <p className="font-semibold text-neutral-medium text-sm">
                      {v.name}
                    </p>
                    <p className="font-semibold text-[#BDBDBD] text-[10px] leading-4">
                      {v.category}
                    </p>
                  </div>
                  <div className="lg:flex flex-col gap-8 hidden">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 items-center">
                        <p className="font-semibold text-neutral-medium text-xl">
                          {v.name}
                        </p>
                        <p className="font-semibold text-[#BDBDBD] text-xl">
                          .
                        </p>
                        <p className="font-semibold text-[#BDBDBD] text-xs">
                          {v.category}
                        </p>
                      </div>
                      <p className="font-normal text-neutral-soft text-base">
                        {v.tnc.id}
                      </p>
                    </div>
                    <div className="flex gap-8">
                      <div className="flex gap-4">
                        <Image
                          src={user}
                          alt="user"
                          className="text-neutral-medium"
                        />
                        <p className="text-neutral-medium">{v.total_played}</p>
                      </div>
                      <div className="flex gap-4">
                        <Image
                          src={calender}
                          alt="calender"
                          className="text-neutral-medium"
                        />
                        <p className="text-neutral-medium">
                          {new Intl.DateTimeFormat('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                          }).format(new Date(v.started_at))}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <Image
                          src={gift}
                          alt="gift"
                          className="text-neutral-medium"
                        />
                        <p className="text-neutral-medium">
                          {v.prizes.reduce((acc, num) => acc + num, 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="font-normal text-neutral-soft text-sm lg:hidden">
                  {v.tnc.id}
                </p>
                <div className="flex flex-col gap-2 lg:hidden">
                  <div className="flex gap-4">
                    <Image
                      src={user}
                      alt="user"
                      className="w-4 text-neutral-medium"
                    />
                    <p className="text-xs text-neutral-medium">
                      {v.total_played}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Image
                      src={calender}
                      alt="calender"
                      className="w-4 text-neutral-medium"
                    />
                    <p className="text-xs text-neutral-medium">
                      {new Intl.DateTimeFormat('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                      }).format(new Date(v.started_at))}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Image
                      src={gift}
                      alt="gift"
                      className="w-4 text-neutral-medium"
                    />
                    <p className="text-xs text-neutral-medium">
                      {v.prizes.reduce((acc, num) => acc + num, 0)}
                    </p>
                  </div>
                </div>
                <Link
                  className="w-full sm:w-fit sm:self-end lg:self-auto"
                  href={cta !== undefined ? cta : `/play/quiz/${v.id}`}
                >
                  <Button className="rounded-full bg-[#3AC4A0] capitalize font-poppins font-semibold text-xl w-full">
                    Play Now
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
        <div className="py-4 flex flex-col gap-8 items-center">
          <p className="font-semibold text-base md:text-4xl text-center text-neutral-medium">
            Kenapa Harus Main?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {grow.map((v, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <Image src={v.image} alt={v.title} />
                <div className="flex flex-col items-center gap-2 lg:gap-4">
                  <p className="font-semibold text-sm text-neutral-medium lg:text-lg">
                    {v.title}
                  </p>
                  <p className="font-normal text-neutral-soft text-xs lg:text-base text-center">
                    {v.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8 md:gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="font-semibold text-base md:text-4xl text-center text-neutral-medium">
              Jelajahi & Mainkan Kategori Kuis Favoritmu!
            </p>
            <p className="font-normal text-neutral-soft text-xs md:text-base text-center">
              Uji pengetahuan investasimu, asah keterampilan, dan menangkan
              hadiah menarik. Pilih kategori favoritmu dan mulai petualangan
              sekarang!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-x-16">
            {categoryQuiz.map((v, i) => (
              <div
                key={i}
                className="flex flex-col md:gap-2 justify-center items-center"
              >
                <Image src={v.image} alt={v.name} />
                <p className="font-semibold text-neutral-medium text-sm md:text-xl text-center">
                  {v.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="flex flex-col gap-8 md:gap-16 items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
            <p className="font-semibold text-base md:text-4xl text-center text-neutral-medium">
              🏆 Siapa yang Memimpin Permainan?
            </p>
            <p className="font-normal text-neutral-soft text-xs md:text-base text-center">
              Persaingan semakin seru! 🔥 Lihat papan peringkat dan cek posisimu
              di antara para pemain terbaik. Terus bermain, kumpulkan poin, dan
              raih posisi teratas untuk hadiah eksklusif!
            </p>
          </div>
          <div className="relative">
            <div className="absolute w-[19%] rounded-full aspect-square bg-black right-1/2 translate-x-1/2" />
            <div className="absolute w-[7%] rounded-full aspect-square bg-blue-400 right-[40%] top-[20%]" />

            <div className="absolute w-[17%] rounded-full aspect-square bg-red-400 top-[7%] left-[8%]" />
            <div className="absolute w-[5%] rounded-full aspect-square bg-blue-400 left-[20%] top-[27%]" />
            <div className="absolute w-[17%] rounded-full aspect-square bg-red-400 top-[7%] right-[8%]" />
            <div className="absolute w-[5%] rounded-full aspect-square bg-blue-400 right-[8%] top-[27%]" />

            <Image src={kotak} alt="kotak" />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
            <p className="font-semibold text-base md:text-4xl text-center text-neutral-medium">
              Main Sekarang & Lihat Papan Peringkat Lengkap!
            </p>
            <p className="font-normal text-neutral-medium text-xs md:text-base lg:text-2xl text-center">
              Jangan sampai ketinggalan siapa yang memimpin! Tantang dirimu,
              kumpulkan poin, dan raih hadiah luar biasa! 🔥
            </p>
          </div>
        </div> */}
      </section>
      <section className="px-4 md:px-0 flex flex-col gap-4 md:gap-12">
        <p className="font-semibold text-base md:text-4xl text-center text-neutral-medium">
          Apa Kata Pemain Tentang Kuis Kami?
        </p>
        <div className="relative flex gap-8 h-96 justify-center items-center overflow-hidden">
          <div className="flex gap-8 animate-infinite-line z-10">
            {[...testimony, ...testimony].map((v, j) => (
              <Card
                className="flex flex-col justify-between gap-5 w-80 h-72 z-10 p-8 bg-[#F3F3F3]"
                key={j}
              >
                <div className="flex gap-3 items-center">
                  <Image
                    className="w-16 rounded-full aspect-square "
                    src={v.avatar}
                    alt={v.name}
                  />
                  <div className="flex flex-col gap-1 justify-center">
                    <p className="font-semibold text-[#201B1C] text-xl">
                      {v.name}
                    </p>
                    <p className="font-light text-[#106B6E] text-base">
                      {v.title}
                    </p>
                  </div>
                </div>
                <i className="font-light text-lg text-[#201B1C]">{v.comment}</i>
                <div className="flex gap-1 items-center">
                  <p>{v.star}/5</p>
                  {Array.from({ length: v.star }).map((_, i) => (
                    <Image key={i} src={star} alt="star" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
          <div className="flex gap-8 animate-infinite-line z-10">
            {[...testimony, ...testimony].map((v, j) => (
              <Card
                className="flex flex-col justify-between gap-5 w-80 h-72 z-10 p-8 bg-[#F3F3F3]"
                key={j}
              >
                <div className="flex gap-3 items-center">
                  <Image
                    className="w-16 rounded-full aspect-square "
                    src={v.avatar}
                    alt={v.name}
                  />
                  <div className="flex flex-col gap-1 justify-center">
                    <p className="font-semibold text-[#201B1C] text-xl">
                      {v.name}
                    </p>
                    <p className="font-light text-[#106B6E] text-base">
                      {v.title}
                    </p>
                  </div>
                </div>
                <i className="font-light text-lg text-[#201B1C]">{v.comment}</i>
                <div className="flex gap-1 items-center">
                  <p>{v.star}/5</p>
                  {Array.from({ length: v.star }).map((_, i) => (
                    <Image key={i} src={star} alt="star" className="h-full" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
          <Image src={line} alt="line" className="absolute z-0" />
        </div>
      </section>
      <section className="bg-[#eff6f9] flex flex-col md:flex-row gap-6 md:gap-9 items-center justify-between py-10 px-4 md:py-11 lg:ps-9 lg:pe-20">
        <Image src={blink} alt="blink" />
        <div className="flex flex-col gap-2 md:gap-6">
          <p className="font-semibold text-neutral-medium text-xl md:text-3xl lg:text-5xl text-center md:text-left">
            Berani Uji Pengetahuan Investasimu?
          </p>
          <p className="font-normal text-neutral-medium text-xs md:text-base lg:text-2xl text-center md:text-left">
            Main sekarang, taklukkan kuis, kalahkan rivalmu, dan raih hadiah
            jutaan rupiah! 🏆🔥
          </p>
          <Link
            href={
              cta !== undefined
                ? cta
                : 'https://gass.seeds.finance/cta?p=939E98001B6C92B322B0F42C05121F1E&divisi=qontak&msg=ID+%5B_gid_%5D%25break%25Hai+Min+Seeds%2C%25break%25Saya+Mau+Daftar+Event+Web3%25break%25Apakah+Promonya+masih+ada%3F'
            }
            className="self-center md:self-start"
          >
            <Button className="mt-4 md:mt-0 capitalize rounded-full bg-[#3AC4A0] font-semibold font-poppins text-xl w-[237px]">
              Play Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default QuizPlay;
