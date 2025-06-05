import SeedyWAOTP from '@/assets/auth/SeedyWAOTP.png';
import MInput from '@/components/form-input/multi-input';
import useFilePreview from '@/hooks/useFilePreview';
import { gassPost } from '@/repository/gass.repository';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Dialog } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface FormData {
  name: string;
  email: string;
  date: string;
  city: string;
  education: string;
  job: string;
  available: string;
  motivation: string;
  from: string;
  refferal: string;
  number: number;
  image?: string | FileList;
}
const Dev = (): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => {
    setOpen(!open);
  };
  const list = [
    {
      name: 'Fundamental Web3 & Blockchain',
      list: [
        { name: 'Future Coin – Basic Web3', date: 'Minggu, 27 April 2025' },
        {
          name: 'Tradting – Fundamental Web3 (Part 1)',
          date: 'Sabtu, 3 Mei 2025'
        },
        {
          name: 'iCrypto – Fundamental Web3 (Part 2)',
          date: 'Minggu, 4 Mei 2025'
        }
      ]
    },
    {
      name: 'Technical Analysis & Trading Strategies',
      list: [
        {
          name: 'Arofx – Technical Web3 Analysis',
          date: 'Sabtu, 10 Mei 2025'
        },
        {
          name: 'Cryptosouse – Trading Strategies (Part 2)',
          date: 'Minggu, 11 Mei 2025'
        }
      ]
    },
    {
      name: 'NFT & Digital Assets',
      list: [
        {
          name: 'CryptoJogja – NFT & Web3 Ecosystem (Part 1)',
          date: 'Sabtu, 17 Mei 2025'
        },
        {
          name: 'Explore Cryptopedia – NFT & Web3 Ecosystem (Part 2)',
          date: 'Minggu, 18 Mei 2025'
        }
      ]
    },
    {
      name: 'Web3 Careers & Future Opportunities',
      list: [
        {
          name: 'Theory of Wales – Building a Career in Web3',
          date: 'Minggu, 25 Mei 2025'
        }
      ]
    }
  ];
  const schema = yup.object().shape({
    name: yup.string().required(),
    date: yup.string().required(),
    city: yup.string().required(),
    education: yup.string().required(),
    job: yup.string().required(),
    available: yup.string().required(),
    motivation: yup.string().required(),
    from: yup.string().required(),
    refferal: yup.string().required(),
    number: yup.number().required(),
    email: yup.string().email().required()
  });

  const { register, control, watch, handleSubmit } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      number: 0,
      date: '',
      city: '',
      education: '',
      job: '',
      available: '',
      motivation: '',
      from: '',
      refferal: ''
    }
  });
  const [imageURLPreview] = useFilePreview(watch('image') as FileList);

  const submit = async (data: FormData): Promise<void> => {
    const visitorId = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('visitor_id='))
      ?.split('=')[1];
    try {
      await gassPost({
        act: 'form_trigger_custom',
        phone: String(watch('number')),
        event: 'prospek',
        visitor_id: visitorId
      });
      await fetch(
        'https://script.google.com/macros/s/AKfycbx5nRuxwc51vg8i88uymdwv5BISqhyRrO6XwdrvIO3ekSK_vwMa1HJoRr7u1uuVWO1MgA/exec',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'text/plain'
          },
          body: JSON.stringify({ ...data, id: visitorId })
        }
      );
      handleOpen();
    } catch (e) {}
  };
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        size="xs"
        className="w-full flex flex-col justify-center items-center p-4 gap-4"
      >
        <div className="font-poppins text-black font-semibold">
          <p className="text-center">Pendaftaran berhasil!</p>
          <p className="text-center">Yuk join grup dan konfirmasi ke admin</p>
        </div>

        <Image src={SeedyWAOTP} alt="SeedyWAOTP" className="w-1/2" />
        <Link
          href="https://chat.whatsapp.com/HWHfXyQH5uT9aRhWgeg3wm"
          target="_blank"
          className="w-full"
          onClick={handleOpen}
        >
          <Button className="bg-seeds-button-green text-white font-poppins font-semibold rounded-full px-4 py-2 w-full text-center capitalize text-base">
            Join Now!
          </Button>
        </Link>
      </Dialog>
      <div className="flex flex-col gap-2 md:gap-8 md:w-2/3 w-full m-2 md:m-8 z-10">
        <img
          src="https://assets.seeds.finance/storage/cloud/cc233377-88fa-4a39-a3b9-f36ff658ceb2.png"
          alt=""
          className="w-full rounded-md"
        />
        <Card className="w-full bg-white rounded-lg px-4 py-8">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
            <p className="font-poppins font-semibold text-2xl text-black">
              Seeds Academy Web3 Innovators Program🚀
            </p>
            <div className="text-sm font-poppins text-black flex flex-col gap-8">
              <div>
                <p className="font-semibold">
                  🔥 Belajar Web3, Blockchain, & NFT dengan Biaya Super
                  Terjangkau! 🔥
                </p>
                <p>
                  <span className="font-semibold">💰 Hanya Rp50.000! </span>
                  Dapatkan akses eksklusif ke bootcamp Web3 selama
                  <span className="font-semibold"> 5 minggu</span>, dipandu oleh
                  <span className="font-semibold">
                    {' '}
                    mentor ahli dari berbagai bidang!
                  </span>
                </p>
              </div>
              <div className="font-semibold">
                <p>📅 Periode Bootcamp: 27 April – 25 Mei 2025</p>
                <p>📍 Format: Online (Live Session + Interactive Q&A)</p>
              </div>
              <div className="font-semibold">
                <p>Bagaimana Cara Bergabung : </p>
                <p>1. Kamu bisa registrasi dengan mengisi gform ini</p>
                <p>2. Lakukan pembayaran registrasi sebesar Rp. 50.000</p>
                <p>
                  🏦 Bank: <span className="font-normal">BCA</span>
                </p>
                <p>
                  🏢 Account Name:{' '}
                  <span className="font-normal">
                    PT Benih Investasi Teknologi
                  </span>
                </p>
                <p>
                  🔢 Account Number:{' '}
                  <span className="font-normal">6640828887</span>
                </p>
                <p className="font-normal">CC : Pendaftaran seeds academy</p>
              </div>

              <div>
                <p className="font-semibold">💡 KENAPA KAMU HARUS IKUT?</p>
                <p>✅ Belajar dari Pakar Web3 & Blockchain</p>
                <p>
                  ✅ Materi lengkap dari dasar hingga strategi tingkat lanjut
                </p>
                <p>✅ Sertifikat resmi untuk menambah nilai CV-mu</p>
                <p>✅ Jaringan dengan komunitas & profesional Web3</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">
                  ✨ APA YANG AKAN KAMU PELAJARI? ✨
                </p>
                {list.map((v, i) => (
                  <div key={i}>
                    <p className="font-semibold">🔹 {v.name}</p>
                    <div>
                      {v.list.map((val, j) => (
                        <p key={j}>
                          📍 <i>{val.name}</i> 🗓{' '}
                          <span className="font-semibold">{val.date}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-semibold">
                  ⏰ Semua sesi dimulai pukul 15.00 WIB
                </p>
                <p>
                  📢 Kesempatan terbatas! Jangan sampai ketinggalan dan jadi
                  bagian dari revolusi Web3!
                </p>
                <p className="font-semibold">
                  🔗 Daftar sekarang dan amankan tempatmu! 🚀
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <MInput
                type="text"
                register={register}
                registerName="name"
                label="Full Name"
                className="focus:outline-none"
              />
              <div className="flex flex-col md:flex-row gap-2">
                <MInput
                  type="date"
                  register={register}
                  registerName="date"
                  label="Date of Birth
"
                  className="focus:outline-none"
                />
                <MInput
                  type="text"
                  register={register}
                  registerName="city"
                  label="City of Residence"
                  className="focus:outline-none"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <MInput
                  type="email"
                  register={register}
                  registerName="email"
                  label="Email Address"
                  className="focus:outline-none"
                />
                <MInput
                  type="number"
                  control={control}
                  watch={watch}
                  registerName="number"
                  label="WhatsApp Phone Number"
                  allowNegativeValue={false}
                  disableGroupSeparators
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <MInput
                  type="dropdown"
                  registerName="education"
                  label="Current Education"
                  control={control}
                  options={[
                    { key: 1, label: 'SD', value: 'SD' },
                    { key: 2, label: 'SMP', value: 'SMP' },
                    { key: 3, label: 'SMA/SMK', value: 'SMA/SMK' },
                    { key: 4, label: 'Bachelor', value: 'Bachelor' }
                  ]}
                />
                <MInput
                  type="text"
                  register={register}
                  registerName="job"
                  label="Current Job"
                  className="focus:outline-none"
                />
              </div>
              <div className="flex flex-col md:flex-row-reverse gap-2">
                <MInput
                  type="dropdown"
                  registerName="available"
                  label="Time Avaibility"
                  control={control}
                  options={[
                    { key: 1, label: 'Can', value: 'Can' },
                    { key: 2, label: `Can't`, value: `Can't` },
                    { key: 3, label: 'Adapt', value: 'Adapt' }
                  ]}
                />
                <MInput
                  type="text"
                  register={register}
                  registerName="motivation"
                  label="Motivation to join bootcamp"
                  className="focus:outline-none"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <MInput
                  type="radio"
                  data={[
                    { label: 'Instagram', value: 'Instagram' },
                    { label: 'Facebook', value: 'Facebook' },
                    { label: 'Tiktok', value: 'Tiktok' },
                    { label: 'Twitter', value: 'Twitter' },
                    { label: 'Linkedin', value: 'Linkedin' },
                    { label: 'Other', value: 'Other' }
                  ]}
                  register={register}
                  registerName="from"
                  label="How did you know about this workshop?"
                />
                <MInput
                  type="text"
                  register={register}
                  registerName="refferal"
                  label="Refferal Code"
                  className="focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 font-poppins text-sm font-semibold text-black">
                <p className="text-base">💳 Bank Transfer Details</p>
                <p>
                  🏦 Bank: <span className="font-normal">BCA</span>
                </p>
                <p>
                  🏢 Account Name:{' '}
                  <span className="font-normal">
                    PT Benih Investasi Teknologi
                  </span>
                </p>
                <p>
                  🔢 Account Number:{' '}
                  <span className="font-normal">6640828887</span>
                </p>
              </div>
              <MInput
                type="image"
                register={register}
                registerName="image"
                label="Proof of Transfer"
                usePreview
                imageURLPreview={imageURLPreview}
              />
            </div>
            <Button
              type="submit"
              className="capitalize rounded-full bg-seeds-button-green font-poppins text-base"
            >
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Dev;
