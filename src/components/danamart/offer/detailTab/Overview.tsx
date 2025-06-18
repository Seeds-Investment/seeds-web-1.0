import CAccordion from '@/components/CAccordion';
import { type DetailProspektus } from '@/utils/interfaces/danamart.interface';
import { Typography } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';

interface Props {
  detailProspektus: DetailProspektus;
}

const Overview: React.FC<Props> = ({ detailProspektus }) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.detail.tab.overview';

  return (
    <div className="flex flex-col gap-4">
      <Typography className="font-poppins font-semibold text-xl">
        {t(`${pathTranslation}.title`)}
      </Typography>
      <div
        className="font-poppins"
        dangerouslySetInnerHTML={{
          __html: detailProspektus?.Data?.Overview?.informasiPenerbit ?? ''
        }}
      />
      <div>
        <CAccordion
          key={1}
          title={
            detailProspektus?.Data?.jenisEfek === 'Obligasi Bertahap'
              ? t(`${pathTranslation}.proyek.title`)
              : t(`${pathTranslation}.proyeksi.title`)
          }
          description={
            detailProspektus?.Data?.jenisEfek === 'Obligasi Bertahap' ? (
              <div className="w-full flex flex-wrap justify-between items-start">
                <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                  <Typography className="font-poppins font-semibold text-[#262626]">
                    {t(`${pathTranslation}.proyek.text1`)}
                  </Typography>
                  <Typography className="font-poppins text-[#262626]">
                    {detailProspektus?.Data?.Overview?.Proyek?.NilaiProyek}
                  </Typography>
                </div>
                <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                  <Typography className="font-poppins font-semibold text-[#262626]">
                    {t(`${pathTranslation}.proyek.text2`)}
                  </Typography>
                  <Typography className="font-poppins text-[#262626]">
                    {
                      detailProspektus?.Data?.Overview?.Proyek
                        ?.ProyeksiImbalHasilProyek
                    }
                  </Typography>
                </div>
                <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                  <Typography className="font-poppins font-semibold text-[#262626]">
                    {t(`${pathTranslation}.proyek.text3`)}
                  </Typography>
                  <Typography className="font-poppins text-[#262626]">
                    {
                      detailProspektus?.Data?.Overview?.Proyek
                        ?.JenisPengerjaanProyek
                    }
                  </Typography>
                </div>
                <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                  <Typography className="font-poppins font-semibold text-[#262626]">
                    {t(`${pathTranslation}.proyek.text4`)}
                  </Typography>
                  <Typography className="font-poppins text-[#262626]">
                    {
                      detailProspektus?.Data?.Overview?.Proyek
                        ?.UraianMengenaiProyek
                    }
                  </Typography>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-wrap justify-between items-center">
                <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                  <Typography className="font-poppins font-semibold text-[#262626]">
                    {t(`${pathTranslation}.proyeksi.text1`)}
                  </Typography>
                  <Typography className="font-poppins text-[#262626]">
                    {
                      detailProspektus?.Data?.Overview?.Proyeksi
                        ?.ProyeksiPenjualanPerBulan
                    }
                  </Typography>
                </div>
                <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                  <Typography className="font-poppins font-semibold text-[#262626]">
                    {t(`${pathTranslation}.proyeksi.text2`)}
                  </Typography>
                  <Typography className="font-poppins text-[#262626]">
                    {
                      detailProspektus?.Data?.Overview?.Proyeksi
                        ?.ProyeksiPenjualanPerTahun
                    }
                  </Typography>
                </div>
              </div>
            )
          }
        />
        <CAccordion
          key={2}
          title={t(`${pathTranslation}.bisnis.title`)}
          description={
            <div className="w-full flex flex-wrap justify-between items-start">
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.bisnis.text1`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {detailProspektus?.Data?.Overview?.Bisnis?.namaPerusahaan}
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.bisnis.text2`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {detailProspektus?.Data?.Overview?.Bisnis?.AlamatPerusahaan}
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.bisnis.text3`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {
                    detailProspektus?.Data?.Overview?.Bisnis?.[
                      'Lama Perusahaan Berdiri'
                    ]
                  }
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.bisnis.text4`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {detailProspektus?.Data?.Overview?.Bisnis?.SektorUsaha}
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.bisnis.text5`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {detailProspektus?.Data?.Overview?.Bisnis?.JumlahDirektur}
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.bisnis.text6`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {detailProspektus?.Data?.Overview?.Bisnis?.JumlahKomisaris}
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.bisnis.text7`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {
                    detailProspektus?.Data?.Overview?.Bisnis
                      ?.JumlahPemegangSaham
                  }
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.bisnis.text8`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {detailProspektus?.Data?.Overview?.Bisnis?.JumlahKaryawan}
                </Typography>
              </div>
            </div>
          }
        />
        <CAccordion
          key={3}
          title={t(`${pathTranslation}.keuangan.title`)}
          description={
            <div className="w-full flex flex-wrap justify-between items-start">
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.keuangan.text1`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {detailProspektus?.Data?.Overview?.Keuangan?.Penjualan}
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.keuangan.text2`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {detailProspektus?.Data?.Overview?.Keuangan?.LabaUsaha}
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.keuangan.text3`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {detailProspektus?.Data?.Overview?.Keuangan?.LabaBersih}
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.keuangan.text4`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {detailProspektus?.Data?.Overview?.Keuangan?.AsetLancar}
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.keuangan.text5`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {detailProspektus?.Data?.Overview?.Keuangan?.AsetTetap}
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.keuangan.text6`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {detailProspektus?.Data?.Overview?.Keuangan?.HutangLancar}
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.keuangan.text7`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {
                    detailProspektus?.Data?.Overview?.Keuangan
                      ?.HutangJangkaPanjang
                  }
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.keuangan.text8`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {detailProspektus?.Data?.Overview?.Keuangan?.Ekuitas}
                </Typography>
              </div>
            </div>
          }
        />
        <CAccordion
          key={4}
          title={t(`${pathTranslation}.penanggungJawab.title`)}
          description={
            <div className="w-full flex flex-wrap justify-between items-start">
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.penanggungJawab.text1`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {
                    detailProspektus?.Data?.Overview?.PenanggungJawab
                      ?.NamaLengkap
                  }
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.penanggungJawab.text2`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {
                    detailProspektus?.Data?.Overview?.PenanggungJawab?.[
                      'Jenis Kelamin'
                    ]
                  }
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.penanggungJawab.text3`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {detailProspektus?.Data?.Overview?.PenanggungJawab?.Umur}
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.penanggungJawab.text4`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {
                    detailProspektus?.Data?.Overview?.PenanggungJawab?.[
                      'Pendidikan Terakhir'
                    ]
                  }
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.penanggungJawab.text5`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {detailProspektus?.Data?.Overview?.PenanggungJawab?.Alamat}
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-start w-full md:w-1/2 mt-4">
                <Typography className="font-poppins font-semibold text-[#262626]">
                  {t(`${pathTranslation}.penanggungJawab.text6`)}
                </Typography>
                <Typography className="font-poppins text-[#262626]">
                  {detailProspektus?.Data?.Overview?.PenanggungJawab?.Jabatan}
                </Typography>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Overview;
