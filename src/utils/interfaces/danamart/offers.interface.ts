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

export interface TimelinePenawaran {
  Status: string
  statusProspektus: string
  ListStatus: string
  status_sla: string
  tglTimeline: string | undefined[]
  beforeTimeline: string[]
}

export interface ReportData {
  StatusCode: string
  Status: string
  message: string
  UserId: string
  data: ReportI[]
}

export interface ReportI {
  tglLaporan: string
  jenisLaporan: string
  jenis: string
  modelDetail?: ModelDetail
  modalDetail?: ModalDetail
}

export interface ModelDetail {
  dataDok: DataDok
  NamaDireksi: string
  NamaDewanKomisaris: string
  dataLaporan: DataLaporan
}

export interface DataDok {
  RealisasiPenggunaanDana: string
  LaporanNeraca: string
  LaporanPerubahanEkuitas: string
  CatatanAtasLaporanKeuangan: string
  "LaporanLaba/Rugi": string
  LaporanArusKas: string
  HasilRups: string
  jmlPembagianDividen: string
  tglPembagianDividen: string
}

export interface DataLaporan {
  text1: string
  value1: string
  text2: string
  value2: string
  text3: string
  value3: string
  text4: string
  value4: string
}

export interface ModalDetail {
  dokumen?: string
  perkembanganProyek?: string
  dm_ebus_01003?: string
  dm_ebus_01004?: string
  dm_ebus_01005?: string
}
