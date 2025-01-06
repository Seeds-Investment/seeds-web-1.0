export interface RegistrationForm {
  namaDepan: string;
  namaBlkng: string;
  email: string;
  tipePermodal: string;
  nohp: string;
  password: string;
  repassword: string;
  kode_referral: string;
  notifikasi: string;
}

export interface UserDashboard {
  StatusCode: string;
  Status: string;
  message: string;
  dataSaldoUser: DataSaldoUser;
  dataChart: DataChart;
  mobileApps: MobileApps;
}

export interface DataSaldoUser {
  danaCash: string;
  dana_cash: number;
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

export interface UserProfile {
  StatusCode: string;
  Status: string;
  message: string;
  Pengguna: string;
  User: User;
  detailUser: DetailUser[];
  namaPerusahaan: string;
  detailDigisign: any;
  detailDokumen: any[];
  dataRekening: DataRekening;
  tarikdana: string;
  danakeluar: any;
}

export interface User {
  id: string;
  login_id: string;
  nama: string;
  email: string;
  email_sosmed: any;
  nohp: string;
  access: string;
  status: string;
}

export interface DetailUser {
  user_pendana_id: string;
  username_digisign: string;
  paymentcode_bca: string;
  paymentcode_bri: string;
  paymentcode_mandiri: string;
  paymentcode_bni: string;
  customer_id: string;
  fva_id: string;
  ext_fva_id: string;
  rdl_id: string;
  rdl_ext_id: string;
  rdl_cif_number: string;
  rdl_account_number: string;
  sre: any;
  sid: any;
  panggilan: string;
  nama: string;
  email: string;
  slug_url: string;
  handphone: string;
  referral_id_lv1: string;
  referral_id_lv2: string;
  notifikasi: string;
  status_email: string;
  status_hp: string;
  status_form: string;
  status_digisign: string;
  doc_digisign: any;
  create_date: string;
}

export interface DataRekening {
  RekBni: string;
  RekBri: string;
  RekMandiri: string;
  RekPermata: string;
  RekBca: string;
}
