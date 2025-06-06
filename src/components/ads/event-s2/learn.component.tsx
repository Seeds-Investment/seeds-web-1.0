import bonus from 'public/assets/ads/bonus.png';
import learn from 'public/assets/ads/learn.png';
import React from 'react';
import CardLearn from '../event/card-learn.component';

const learnList = [
  {
    img: learn,
    title: 'Apa Yang Akan Kamu Pelajari ?',
    list: [
      'Kenapa harus trading',
      'Rahasia Side Income dari CFD Trading',
      'Step by step untuk bisa make money dari trading',
      'Modal 1 Juta Bisa Jadi 10 Juta',
      'Terjun langsung Dalam Trading'
    ]
  },
  {
    img: bonus,
    title: 'Benefit & Bonus Spesial!',
    list: [
      'E-Certificate',
      'Akses ke Grup Networking Eksklusif',
      'Diskon untuk Program Lanjutan',
      'Dana Investasi Rp 100.000'
    ]
  }
];

const Learn = (): React.ReactElement => {
  return (
    <div className="flex flex-col sm:flex-row gap-8 justify-center sm:items-start items-center">
      {learnList.map((v, i) => (
        <CardLearn key={i} img={v.img} title={v.title} list={v.list} />
      ))}
    </div>
  );
};

export default Learn;
