import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import twitter from 'public/assets/circle/share/twitter.svg';
import whatsapp from 'public/assets/circle/share/whatsapp.svg';
import facebook from 'public/assets/images/facebook.svg';
import linkedin from 'public/assets/images/linkedin.png';
import metaschoolBarcode from 'public/assets/metaschool/metaschool-barcode.png';
import metaschoolFlayer from 'public/assets/metaschool/metaschool-flyer.png';
import metaschoolSquare from 'public/assets/metaschool/metaschool-square.png';
import metaschool from 'public/assets/metaschool/metaschool.png';
import React, { useEffect, useState } from 'react';

const follow = [
  {
    title: 'Gaji Tinggi untuk Spesialis Web3',
    subtitle:
      'Rata-rata Web3 Developer di AS bisa meraih hingga $13.000/bulan. Pasar global pun mulai butuh banyak talenta!',
    logo: '💰'
  },
  {
    title: 'Developer Tanpa Spesialisasi Rentan Kena PHK',
    subtitle:
      'Industri teknologi terus berubah. Spesialisasi = Kunci bertahan & sukses!',
    logo: '💼'
  },
  {
    title: 'Web3: Masa Depan Internet',
    subtitle:
      'Blockchain, smart contracts, dan dApps makin diadopsi perusahaan besar. Punya skill ini = banyak peluang! Tinggal pilih kamu mau jadi pelopor atau penonton?',
    logo: '🌐'
  },
  {
    title: 'Investasi Karier yang Cerdas',
    subtitle:
      'Web3 bukan sekadar tren. Ini adalah masa depan internet! Kamu bisa jadi bagian dari revolusi digital.',
    logo: '🎯'
  }
];

const learn = [
  'Intro ke Web3 & Blockchain',
  'Smart Contracts & Cara Kerjanya',
  'Bikin dApps dari Nol',
  'Studi Kasus & Hands-On Project',
  'Final Project & Portofolio Web3'
];

const implement = [
  {
    title: 'Tanggal: 3 - 7 Maret 2025',
    logo: '📅'
  },
  {
    title: 'Waktu: 16.00 - 18.00 WIB (5 hari, 2 jam/hari)',
    logo: '⏰'
  },
  {
    title: 'Tempat: Online Live Session (Zoom/Platform Eksklusif)',
    logo: '📍'
  },
  {
    title: 'Biaya: Rp100.000 (Early Bird Rp50.000 untuk 50 pendaftar pertama!)',
    logo: '💰'
  },
  {
    title: 'Bonus: Akses rekaman & materi eksklusif setelah acara!',
    logo: '🎁'
  }
];

const whyseeds = [
  {
    title: 'Seeds Academy:',
    subtitle:
      ' Platform edukasi digital Web3 yang mencetak talenta siap pakai global.',
    logo: '🎓'
  },
  {
    title: 'Metaschool:',
    subtitle:
      ' Lembaga Web3 kelas dunia yang telah mencetak banyak praktisi blockchain unggul.',
    logo: '🌍'
  }
];

const privilege = [
  {
    title: 'Sertifikat Resmi Metaschool ',
    subtitle: '– Tambahkan nilai plus di CV lo!'
  },
  {
    title: 'Akses Komunitas Eksklusif ',
    subtitle: '– Diskusi & networking dengan sesama developer.'
  },
  {
    title: 'Personal Branding & Career Support ',
    subtitle: '– Lebih dari coding, pelajari cara menonjol di pasar kerja.'
  },
  {
    title: 'Voucher Diskon Kelas Lanjutan ',
    subtitle: '– Upgrade skill Web3 dengan harga spesial!'
  }
];
const steps = [
  {
    title: '1. Registrasi Online',
    subtitle: '– Klik tombol “Daftar Sekarang” & isi data.'
  },
  {
    title: '2. Konfirmasi Pembayaran',
    subtitle: '– Transfer, dapetin email & WhatsApp konfirmasi.'
  },
  {
    title: '3. Ikuti Kelas Live',
    subtitle: '– Hadir, dapetin ilmu dari mentor profesional!'
  },
  {
    title: '4. Selesaikan Tugas & Raih Sertifikat!',
    subtitle: '🎓'
  }
];
const Ads = (): React.ReactElement => {
  const targetDate = new Date('2025-03-10T12:00:00').getTime();
  const calculateTimeLeft = (): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } => {
    const difference = targetDate - new Date().getTime();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [targetDate]);

  return (
    <div className="font-poppins flex flex-col gap-5 p-2 sm:py-5">
      <section className="flex sm:justify-center">
        <div className="sm:w-3/4 flex flex-col gap-2 sm:gap-5">
          <p className="text-center text-lg sm:text-2xl md:text-4xl text-[#333333] font-bold">
            💻 INGIN RAUP GAJI HINGGA $13.000/BULAN SEBAGAI WEB3 DEVELOPER? 👨‍💻
          </p>
          <Image src={metaschool} alt="metaschool" className="rounded-lg" />
          <Link
            href="https://api.whatsapp.com/send/?phone=628118883519"
            target="_blank"
            className="w-full"
          >
            <Button className="font-poppins bg-seeds-button-green w-full">
              BOOK NOW!
            </Button>
          </Link>

          <div className="flex flex-col gap-2">
            <div className="bg-[#f4f4f4] text-[#333333] rounded p-2.5 text-xs sm:text-sm md:text-base">
              ❌ Fenomena Layoff di Industri Teknologi Makin Luas. Banyak
              developer non-spesialis terkena dampaknya.
            </div>
            <div className="bg-[#f4f4f4] text-[#333333] rounded p-2.5 text-xs sm:text-sm md:text-base">
              <p>✅ Web3 & Blockchain = Masa Depan!</p>
              <p>
                Skill yang lagi dicari-cari sama perusahaan besar. Siap jadi
                spesialis berpenghasilan tinggi?
              </p>
            </div>
            <div className="bg-[#f4f4f4] text-[#333333] rounded p-2.5 text-xs sm:text-sm md:text-base">
              <p>🌟 Kolaborasi Spesial:</p>
              <p className="font-semibold">Seeds Academy x Metaschool</p>
            </div>
            <div className="bg-[#f4f4f4] text-[#333333] rounded p-2.5 text-xs sm:text-sm md:text-base">
              💎 Peluang emas buat kamu yang mau mulai karier di Web3 dan
              blockchain!
            </div>
          </div>
        </div>
      </section>
      <section className="flex sm:justify-center items-center">
        <div className="sm:w-3/4 flex flex-col gap-2 sm:gap-5">
          <p className="text-lg sm:text-2xl md:text-4xl text-[#6a11cb] font-semibold">
            🔍 KENAPA HARUS IKUT?🤔
          </p>
          <div className="flex flex-col gap-2">
            {follow.map((val, i) => (
              <div
                key={i}
                className="flex gap-1 bg-[#f4f4f4] text-[#333333] rounded p-2.5 text-xs sm:text-sm md:text-base"
              >
                <div>✅</div>
                <div className="flex flex-col">
                  <p className="font-bold">{val.title}</p>
                  <div className="flex gap-1">
                    <div>{val.logo}</div>
                    <p>{val.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex sm:justify-center items-center">
        <div className="w-full sm:w-3/4 flex flex-col gap-2 sm:gap-5">
          <p className="text-lg sm:text-2xl md:text-4xl text-[#6a11cb] font-semibold">
            🎯 Apa yang Akan Dipelajari?
          </p>
          <Image
            src={metaschoolFlayer}
            alt="metaschoolFlayer"
            className="rounded-lg w-3/4 self-center"
          />

          <div className="flex flex-col gap-2">
            {learn.map((val, i) => (
              <div
                key={i}
                className="flex gap-1 bg-[#f4f4f4] text-[#333333] rounded p-2.5 text-xs sm:text-sm md:text-base"
              >
                <div>📌</div>
                <p className="">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex sm:justify-center items-center">
        <div className="sm:w-3/4 flex flex-col gap-2 sm:gap-5">
          <p className="text-lg sm:text-2xl md:text-4xl text-[#6a11cb] font-semibold">
            Pelaksanan:
          </p>
          <div className="flex flex-col gap-2">
            {implement.map((val, i) => (
              <div
                key={i}
                className="flex gap-1 bg-[#f4f4f4] text-[#333333] rounded p-2.5 text-xs sm:text-sm md:text-base"
              >
                <div className="w-5 text-center">{val.logo}</div>
                <p>{val.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex sm:justify-center items-center">
        <div className="sm:w-3/4 flex flex-col gap-2 sm:gap-5">
          <p className="text-lg sm:text-2xl md:text-4xl text-[#6a11cb] font-semibold">
            🌟 Kenapa Harus Seeds Academy x Metaschool?
          </p>
          <Image
            src={metaschoolSquare}
            alt="metaschoolSquare"
            className="rounded-lg w-3/4 self-center"
          />
          <div className="flex flex-col gap-2">
            {whyseeds.map((val, i) => (
              <div
                key={i}
                className="flex gap-1 bg-[#f4f4f4] text-[#333333] rounded p-2.5 text-xs sm:text-sm md:text-base"
              >
                <div className="w-5 text-center">{val.logo}</div>
                <p>
                  <span className="font-bold">{val.title}</span>
                  {val.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex sm:justify-center items-center">
        <div className="sm:w-3/4 flex flex-col gap-2 sm:gap-5">
          <p className="text-lg sm:text-2xl md:text-4xl text-[#6a11cb] font-semibold">
            Keunggulan Tambahan:
          </p>
          <div className="flex flex-col gap-2">
            {privilege.map((val, i) => (
              <div
                key={i}
                className="flex gap-1 bg-[#f4f4f4] text-[#333333] rounded p-2.5 text-xs sm:text-sm md:text-base"
              >
                <div>✔️</div>
                <p>
                  <span className="font-bold">{val.title}</span>
                  {val.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex sm:justify-center items-center">
        <div className="sm:w-3/4 flex flex-col gap-2 sm:gap-5">
          <p className="text-lg sm:text-2xl md:text-4xl text-[#6a11cb] font-semibold">
            🎯 Daftar Sekarang & Kunci Masa Depan Kariermu!
          </p>
          <Image
            src={metaschoolBarcode}
            alt="metaschoolBarcode"
            className="rounded-lg"
          />
          <p className="text-base sm:text-xl md:text-2xl text-[#6a11cb] font-semibold">
            Cara Daftarnya Gampang Banget! 📝
          </p>
          <div className="flex flex-col gap-2">
            {steps.map((val, i) => (
              <div
                key={i}
                className="flex gap-1 bg-[#f4f4f4] text-[#333333] rounded p-2.5 text-xs sm:text-sm md:text-base"
              >
                <div>✔️</div>
                <p>
                  <span className="font-bold">{val.title}</span>
                  {val.subtitle}
                </p>
              </div>
            ))}
          </div>
          <p className="text-base sm:text-xl md:text-2xl text-[#6a11cb] font-semibold">
            📢 Jangan Tunda Lagi!
          </p>
          <div className="flex flex-col gap-2 sm:gap-5 items-center bg-[#f4f4f4] text-[#333333] rounded p-2.5 text-xs sm:text-sm md:text-base">
            <p className="font-bold self-start">
              🎯 Wujudkan karier impian kamu di industri Web3, dapetin skill
              yang dicari perusahaan global, dan hindari risiko layoff!
            </p>
            <div className="flex flex-col gap-2 sm:gap-5">
              <Link
                href="https://api.whatsapp.com/send/?phone=628118883519"
                target="_blank"
                className="w-full"
              >
                <p className="font-bold text-base sm:text-xl md:text-2xl text-[#6a11cb]">
                  🔻 DAFTAR SEKARANG! 🔻
                </p>
              </Link>

              <div className="text-white font-bold text-xs sm:text-sm md:text-base flex justify-center items-center gap-2 sm:gap-5">
                <div className="flex flex-col justify-center items-center w-1/4 aspect-square rounded-lg bg-[#6a11cb]">
                  <p>{timeLeft.days}</p>
                  <p>Hari</p>
                </div>
                <div className="flex flex-col justify-center items-center w-1/4 aspect-square rounded-lg bg-[#6a11cb]">
                  <p>{timeLeft.hours}</p>
                  <p>Jam</p>
                </div>
                <div className="flex flex-col justify-center items-center w-1/4 aspect-square rounded-lg bg-[#6a11cb]">
                  <p>{timeLeft.minutes}</p>
                  <p>Menit</p>
                </div>
                <div className="flex flex-col justify-center items-center w-1/4 aspect-square rounded-lg bg-[#6a11cb]">
                  <p>{timeLeft.seconds}</p>
                  <p>Detik</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex sm:justify-center items-center">
        <div className="sm:w-3/4 flex flex-col gap-2 sm:gap-5"></div>
      </section>
      <section className="flex sm:justify-center items-center">
        <div className="sm:w-3/4 flex flex-col gap-2 sm:gap-5">
          <p className="text-lg sm:text-2xl md:text-4xl text-[#6a11cb] font-semibold">
            📢 Bagikan & Raih Manfaat Lebih Banyak!
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 bg-[#f4f4f4] text-[#333333] rounded p-2.5 text-xs sm:text-sm md:text-base">
              <p>
                💬 <span className="font-bold">Testimoni Alumni:</span> “Belajar
                Web3 di Seeds Academy benar-benar membuka peluang baru.
                Sertifikat dari Metaschool menambah nilai plus di CV saya!” —
                Andi, Front-End Developer
              </p>
              <div>
                <p className="font-bold">👥 Ajak Teman & Komunitas!</p>
                <p>
                  Bagikan info ini ke rekan-rekan developer lain yang ingin
                  upgrade skill buat menghindari PHK masal dan siap jadi
                  developer masa depan!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center">
        <div className="sm:w-3/4 flex flex-col gap-2 sm:gap-5 items-center justify-center">
          <p className="font-bold text-base sm:text-xl md:text-2xl text-[#6a11cb]">
            Pantau terus update di sosial media kami!
          </p>
          <div className="flex gap-2">
            <Link
              href="https://www.facebook.com/sharer/sharer.php?u=https://seeds.finance/ads"
              target="_blank"
            >
              <Image
                src={facebook}
                alt="facebook"
                className="cursor-pointer w-7 sm:w-9 md:w-10"
              />
            </Link>
            <Link
              href="https://twitter.com/intent/tweet?url=https://seeds.finance/ads"
              target="_blank"
            >
              <Image
                src={twitter}
                alt="twitter"
                className="cursor-pointer w-7 sm:w-9 md:w-10"
              />
            </Link>
            <Link
              href="https://api.whatsapp.com/send?text=https://seeds.finance/ads"
              target="_blank"
            >
              <Image
                src={whatsapp}
                alt="twitter"
                className="cursor-pointer w-7 sm:w-9 md:w-10"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/sharing/share-offsite/?url=https://seeds.finance/ads"
              target="_blank"
            >
              <Image
                src={linkedin}
                alt="twitter"
                className="cursor-pointer w-7 sm:w-9 md:w-10"
              />
            </Link>
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center">
        <div className="sm:w-3/4 flex flex-col gap-2 sm:gap-5 items-center justify-center">
          <p className="font-bold text-base text-center sm:text-xl md:text-2xl text-[#6a11cb]">
            🌟 Mulailah langkah besarmu sekarang juga!
          </p>
          <Link
            href="https://api.whatsapp.com/send/?phone=628118883519"
            target="_blank"
            className="w-full"
          >
            <Button className="font-poppins bg-seeds-button-green w-full">
              BOOK NOW!
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Ads;
