export interface OfferData {
  StatusCode: string
  Status: string
  message: string
  opsiSektorUsaha: string[]
  data: OfferList[]
  data_old: DataOld[]
}

export interface OfferList {
  pinjaman_id: string
  days: Days
  slotPembelian: number
  kupon: string
  tenor: string
  inisial: string
  jenisEfek: string
  is_co: string
  isPrelisting: string
  gbr_sektor_usaha: string
  gbr_sektor_usaha_square: string
  url_ceotalk?: string
  esg_label?: string
  esg_category?: string
  jml_pinjaman_terbit: string
  progress: string
  progresEfek: number
  batas_tanggal: string
  jml_pendanaan: string
  total_pemodal: string
  nama_perusahaan: string
  deskripsi: string
  sektor: string
  lokasi: string
  dm_pem_05001: string
  prospektus: string
  status: string
  status_sla: string
}

export interface Days {
  prelistingDays: string
  listingDays: string
}

export interface DataOld {
  pinjaman_id: string
  days: Days2
  slotPembelian: number
  kupon: string
  tenor: string
  inisial: string
  jenisEfek: string
  is_co: string
  isPrelisting: string
  gbr_sektor_usaha: string
  gbr_sektor_usaha_square: string
  url_ceotalk?: string
  esg_label?: string
  esg_category?: string
  jml_pinjaman_terbit: string
  progress: string
  progresEfek: number
  batas_tanggal: string
  jml_pendanaan: string
  total_pemodal: string
  nama_perusahaan: string
  deskripsi: string
  sektor: string
  lokasi: string
  dm_pem_05001: string
  prospektus: string
  status: string
  status_sla: string
}

export interface Days2 {
  prelistingDays: string
  listingDays: string
}
