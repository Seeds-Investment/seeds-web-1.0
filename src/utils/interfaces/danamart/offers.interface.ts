export interface OfferData {
  StatusCode: string;
  Status: string;
  message: string;
  opsiSektorUsaha: string[];
  data: OfferList[];
  data_old: DataOld[];
}

export interface OfferList {
  pinjaman_id: string;
  days: Days;
  slotPembelian: number;
  kupon: string;
  tenor: string;
  inisial: string;
  jenisEfek: string;
  is_co: string;
  isPrelisting: string;
  gbr_sektor_usaha: string;
  gbr_sektor_usaha_square: string;
  url_ceotalk?: string;
  esg_label?: string;
  esg_category?: string;
  jml_pinjaman_terbit: string;
  progress: string;
  progresEfek: number;
  batas_tanggal: string;
  jml_pendanaan: string;
  total_pemodal: string;
  nama_perusahaan: string;
  deskripsi: string;
  sektor: string;
  lokasi: string;
  dm_pem_05001: string;
  prospektus: string;
  status: string;
  status_sla: string;
}

export interface Days {
  prelistingDays: string;
  listingDays: string;
}

export interface DataOld {
  pinjaman_id: string;
  days: Days2;
  slotPembelian: number;
  kupon: string;
  tenor: string;
  inisial: string;
  jenisEfek: string;
  is_co: string;
  isPrelisting: string;
  gbr_sektor_usaha: string;
  gbr_sektor_usaha_square: string;
  url_ceotalk?: string;
  esg_label?: string;
  esg_category?: string;
  jml_pinjaman_terbit: string;
  progress: string;
  progresEfek: number;
  batas_tanggal: string;
  jml_pendanaan: string;
  total_pemodal: string;
  nama_perusahaan: string;
  deskripsi: string;
  sektor: string;
  lokasi: string;
  dm_pem_05001: string;
  prospektus: string;
  status: string;
  status_sla: string;
}

export interface Days2 {
  prelistingDays: string;
  listingDays: string;
}

export interface TimelineOffer {
  Status: string;
  statusProspektus: string;
  ListStatus: string;
  status_sla: string;
  tglTimeline: string | undefined[];
  beforeTimeline: string[];
}

export interface ReportData {
  StatusCode: string;
  Status: string;
  message: string;
  UserId: string;
  data: ReportI[];
}

export interface ReportI {
  tglLaporan: string;
  jenisLaporan: string;
  jenis: string;
  modelDetail?: ModelDetail;
  modalDetail?: ModalDetail;
}

export interface ModelDetail {
  dataDok: DataDok;
  NamaDireksi: string;
  NamaDewanKomisaris: string;
  dataLaporan: DataLaporan;
}

export interface DataDok {
  RealisasiPenggunaanDana: string;
  LaporanNeraca: string;
  LaporanPerubahanEkuitas: string;
  CatatanAtasLaporanKeuangan: string;
  'LaporanLaba/Rugi': string;
  LaporanArusKas: string;
  HasilRups: string;
  jmlPembagianDividen: string;
  tglPembagianDividen: string;
}

export interface DataLaporan {
  text1: string;
  value1: string;
  text2: string;
  value2: string;
  text3: string;
  value3: string;
  text4: string;
  value4: string;
}

export interface ModalDetail {
  dokumen?: string;
  perkembanganProyek?: string;
  dm_ebus_01003?: string;
  dm_ebus_01004?: string;
  dm_ebus_01005?: string;
}

// Purchase Offer

export interface DashboardDataUser {
  StatusCode: string;
  Status: string;
  message: string;
  dataSaldoUser: DataSaldoUser;
  dataChart: DataChart;
  mobileApps: MobileApps;
}

export interface DataSaldoUser {
  danaCash: string;
  dana_cash: string;
  total_wd0: number;
  total_dana_dalam_efek: number;
  danaRewerd: string;
  TotalDanaRewerd: number;
  danaInterim: string;
  TotalDanaTersedia: string;
  DanaDapatDiinvestasikan: string;
  TotalDanadalamEfek: string;
  totalDana: string;
  danaBisaTarik: string;
  batasPembelian: number;
  sisaPembelian: string;
  pendapatPertahun: number;
}

export interface DataChart {
  totalPembelianSektor: number;
  jmlSektor: number;
  chartjs: Chartjs;
  apexchart: Apexchart;
}

export interface Chartjs {
  persenEbus: string;
  persenEbe: string;
}

export interface Apexchart {
  SektorUsaha: string;
  jmlSektor: string;
}

export interface MobileApps {
  banner: Banner;
}

export interface Banner {
  image: string;
  type: string;
  url: string;
}

//

export interface FormPurchaseData {
  dataForm: DataForm;
  dataInput: DataInput;
  dm_pem_05001: string;
}

export interface DataForm {
  kodeEfek: string;
  sektorUsaha: string;
  slotPembelian: string;
  sisaPembelian: string;
  hargaLembarSaham: number;
  statuSimpan: string;
  BagiHasil?: string;
  jangkaWaktu?: string;
}

export interface DataInput {
  nohp: string;
  user_peminjam_id: string;
  user_pendana_id: string;
  pinjaman_id: string;
  sektor_usaha: string;
  bunga_persen: string;
  credit_rating: string;
  dm_pem_02003: string;
  dm_pem_02004: string;
  jml_pinjaman_terbit: string;
  tgl_jatuh_tempo: string;
  referral_id_lv1_peminjam: string;
  referral_id_lv2_peminjam: string;
  referral_id_lv1_pendana: string;
  referral_id_lv2_pendana: string;
  total_dana_reward: string;
  statusPembayaran: string;
  statusMetode: string;
  statusKeuangan: string;
  statusHp: number;
  inputSaham: InputSaham;
  inputObligasi: InputObligasi;
}

export interface InputSaham {
  harga_perlembar_saham: string;
  lembar_saham: string;
}

export interface InputObligasi {
  bid_cash: string;
}

//

export interface PurchaseI {
  user_peminjam_id?: string;
  user_pendana_id?: string;
  pinjaman_id?: string;
  sektor_usaha?: string;
  bunga_persen?: string;
  credit_rating?: string;
  dm_pem_02003?: string;
  dm_pem_02004?: string;
  jml_pinjaman_terbit?: string;
  tgl_jatuh_tempo?: string;
  referral_id_lv1_peminjam?: string;
  referral_id_lv2_peminjam?: string;
  referral_id_lv1_pendana?: string;
  referral_id_lv2_pendana?: string;
  total_dana_reward?: string;
  bid_cash?: string | number;
  harga_perlembar_saham?: string;
  lembar_saham?: string;
  bank_code?: string;
  bid_rewerd?: boolean;
  bid_reward?: boolean;
  sumberDana: string;
  kodeOtp?: string;
}

//

export interface PaymentDetail {
  StatusCode: string;
  Status: string;
  message: string;
  Data: Data;
}

export interface Data {
  id: string;
  create_date: string;
  callback_date: string | null;
  expiration_date: string;
  id_agent: string | null;
  platform: string;
  user_pendana_id: string;
  email: string;
  handphone: string;
  pinjaman_id: string;
  jml_pendanaan: string;
  kode_pembayaran: string;
  fpc: string | null;
  fpc_id: string | null;
  fva: string;
  ext_id: string;
  fva_id: string;
  status_payment: string;
}

// Purchase Offer Ends
