export interface RegistrationForm {
  namaDepan: string;
  namaBlkng: string;
  email: string;
  tipePemodal: string;
  nohp: string;
  password: string;
  repassword: string;
  kode_referral: string;
  notifikasi: string;
}

export interface RegisterLog {
  email: string;
  phone_number: string;
  type: string;
}

export interface RegisterRes {
  userId: string;
  nama: string;
  message: string;
  redirect: string;
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

export interface AccountVerification {
  detect?: string;
  pemodal: Pemodal;
  penmit: Penmit;
  bank?: Bank;
  resiko?: Resiko;
  bList?: BList[];
  dana?: Dana;
  info_1: string;
  info_2: string;
  info_3: string;
  info_4: string;
  info_5?: string;
  info_6?: string;
  info_7?: string;
  info_8?: string;
  dom_code?: string;
  status?: number;
}

export interface Pemodal {
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
  password: string;
  referral_id_lv1: string;
  referral_id_lv2: string;
  notifikasi: string;
  kode_otp: string;
  status_email: string;
  status_hp: string;
  status_form: string;
  status_digisign: any;
  doc_digisign: any;
  create_date: string;
  notif_date: any;
  dm_code: string;
  rm_code: string;
}

export interface Penmit {
  informasi_penmit_id: string;
  user_penmit_id: string;
  dm_penmit_01001: string;
  dm_penmit_01002: string;
  dm_penmit_01003: string;
  dm_penmit_01004: string;
  dm_penmit_01005: string;
  dm_penmit_01006: string;
  dm_penmit_01007: string;
  dm_penmit_01008: string;
  dm_penmit_01009: string;
  dm_penmit_01010: string;
  dm_penmit_01011: string;
  dm_penmit_01012: string;
  dm_penmit_01013: string;
  dm_penmit_01014: string;
  dm_penmit_01015: string;
  dm_penmit_01016: string;
  dm_penmit_01017: string;
  dm_penmit_01018: string;
  dm_penmit_01019: string;
  dm_penmit_01020: string;
  dm_penmit_01021: string;
  dm_penmit_01022: string;
  dm_penmit_01023: string;
  dm_penmit_01024: string;
  dm_penmit_01025: string;
  dm_penmit_01026: string;
  nama_pasangan: string;
  alamat_tmpt_kerja: string;
  telepon_tmpt_kerja: string;
  dm_penmit_01027: string;
  dm_penmit_01028: string;
  dm_penmit_01029: string;
  dm_penmit_01030: string;
  dm_penmit_01031: string;
  dm_penmit_01032: string;
  dm_penmit_01033: string;
  dm_penmit_01034: string;
  dm_penmit_01035: string;
  dm_penmit_01036: string;
  dm_penmit_01037: string;
  dm_penmit_01038: string;
  dm_penmit_01039: string;
  dm_penmit_01040: string;
  dm_penmit_01041: string;
  dm_penmit_01042: string;
  dm_penmit_01043: string;
  dm_penmit_01044: string;
  dm_penmit_01045: string;
  dm_penmit_01046: string;
  dm_penmit_01047: string;
  dm_penmit_01048: string;
  dm_penmit_01049: string;
  bo_confirm: string;
  bo_nama: any;
  bo_jns_kelamin: any;
  bo_no_identitas: any;
  bo_file_identitas: any;
  bo_alamat: any;
  bo_tmp_lahir: any;
  bo_tgl_lahir: any;
  bo_kewarganegaraan: any;
  bo_pekerjaan: any;
  bo_alamat_pekerjaan: any;
  bo_no_telp_pekerjaan: any;
  bo_nama_ibu: any;
  bo_sumber_dana: any;
  bo_hasil_perbulan: any;
  bo_tujuan_invest: any;
  bo_hub_bo: any;
  bo_status_perkawinan_bo: any;
  bo_relation_nama: any;
  bo_relation_jns_kelamin: any;
  bo_relation_no_ktp: any;
  bo_relation_file_ktp: any;
  bo_relation_alamat: any;
  bo_relation_tempat_lahir: any;
  bo_relation_tgl_lahir: any;
  bo_relation_warga: any;
  bo_relation_pekerjaan: any;
  bo_relation_alamat_kerja: any;
  bo_relation_no_telp_kerja: any;
  pernyataan: string;
  pernyataan_npwp: string;
  catatan: string;
  status_ocr: string;
  selfie_fail: any;
}

export interface Bank {
  informasi_bank_id: string;
  user_penmit_id: string;
  dm_penmit_07001: string;
  dm_penmit_07002: string;
  dm_penmit_07003: string;
  dm_penmit_07004: string;
  dm_penmit_07005: string;
  dm_penmit_07006: string;
  dm_penmit_07007: string;
  dm_penmit_07008: string;
  dm_penmit_07009: string;
  dm_penmit_07010: string;
  pernyataan: string;
  pernyataan_rekbank: string;
  ewallet: any;
  ewallet_phone: any;
}

export interface BList {
  name: string;
  code: string;
  can_disburse: boolean;
  can_name_validate: boolean;
}

export interface Dana {
  informasi_sumber_dana_id: string;
  user_pendana_id: string;
  dm_pen_06001: string;
  dm_pen_06002: string;
  dm_pen_06003: string;
  dm_pen_06004: string;
  dm_pen_06005: string;
  dm_pen_06006: string;
  dm_pen_06007: string;
  date_pendapatan_baru: string;
  cek_pendapatan_baru: any;
  maks_pendanaan: any;
  status: string;
}

export interface FinancialInfoForm {
  dm_pen_06001: string;
  dm_pen_06002: string;
  validateSalary: boolean;
  cek_pendapatan_baru?: string;
  dm_penmit_07001: string;
  dm_penmit_07002: string;
  dm_penmit_07003: string;
  pernyataan: string;
  dm_penmit_07008?: string;
  dm_penmit_07009?: string;
  fileKartuAkses?: FileList | null;
  dm_penmit_07010?: File | null;
  bo_confirm: string;
  bo_nama?: string;
  bo_jns_kelamin?: string;
  bo_no_identitas?: string;
  fileIdentitas?: FileList | null;
  bo_file_identitas?: File | null;
  bo_alamat?: string;
  bo_tmp_lahir?: string;
  bo_tgl_lahir?: string;
  bo_kewarganegaraan?: string;
  bo_pekerjaan?: string;
  bo_alamat_pekerjaan?: string;
  bo_no_telp_pekerjaan?: string;
  bo_nama_ibu?: string;
  bo_sumber_dana?: string;
  bo_hasil_perbulan?: string;
  bo_tujuan_invest?: string;
  bo_hub_bo?: string;
  bo_status_perkawinan_bo?: string;
  bo_relation_nama?: string;
  bo_relation_jns_kelamin?: string;
  bo_relation_no_ktp?: string;
  fileKtp?: FileList | null;
  bo_relation_file_ktp?: File | null;
  bo_relation_alamat?: string;
  bo_relation_tempat_lahir?: string;
  bo_relation_tgl_lahir?: string;
  bo_relation_warga?: string;
  bo_relation_pekerjaan?: string;
  bo_relation_alamat_kerja?: string;
  bo_relation_no_telp_kerja?: string;
  dm_pen_06005?: string;
  app?: string;
}

export type FinancialInfoFormPayload = Omit<
  FinancialInfoForm,
  'validateSalary' | 'fileKartuAkses' | 'fileIdentitas' | 'fileKtp'
>;

export interface Resiko {
  informasi_profil_resiko_id: string;
  user_pendana_id: string;
  dm_pen_08001: string;
  dm_pen_08002: string;
  dm_pen_08003: string;
  dm_pen_08004: string;
  dm_pen_08005: string;
  dm_pen_08006: string;
  dm_pen_08007: string;
  dm_pen_08008: string;
  dm_pen_08009: string;
}

export interface UpdateUserInfoForm {
  pernyataan: string;
  dm_penmit_01010: string;
  dm_penmit_01003: string;
  dm_penmit_01006: string;
  dm_penmit_01007: string;
  dm_penmit_01015: string;
  dm_penmit_01027: string;
  dm_penmit_01026: string;
  namaPasangan?: string;
  dm_penmit_01029: string;
  dm_penmit_01039: string;
  dm_penmit_01040: string;
  alamat_tmpt_kerja: string;
  telepon_tmpt_kerja: string;
  dm_penmit_01032: string;
  dm_penmit_01019rt: string;
  dm_penmit_01019rw: string;
  dm_penmit_01037: string;
  dm_penmit_01036: string;
  dm_penmit_01034: string;
  dm_penmit_01033: string;
  dm_penmit_01017: string;
  masa_berlaku: boolean;
  dm_penmit_01018?: string;
  dm_penmit_01042: string;
  dm_pen_08002: string;
  dm_pen_08009: string;
  pernyataan_npwp: string;
  dm_penmit_01013?: string;
  dm_penmit_01008: string;
}

export interface DetailProspektus {
  StatusCode: string;
  Status: string;
  message: string;
  Data: Data;
}

export interface Data {
  gambarSektorUsaha: string;
  gambarProspektus: string[];
  idPinjaman: string;
  StatusListing: string;
  durasi: string;
  days: Days;
  jenisEfek: string;
  jmlDana: string;
  jmlMinDana: string;
  TPD: string;
  JangkaWaktu: string;
  Jaminan: string;
  JenisPenawaran: string;
  userpeminjamid: string;
  ProgresPersen: string;
  ProgresBar: string;
  groupWa: string;
  cekOmbak: string;
  NamaPenerbit: string;
  Sosmed: Sosmed;
  TimelinePenawaran: TimelineOffer;
  BeliEfek: BeliEfek;
  Overview: Overview;
  investorCorner: any[];
  investorCornerSum: number;
  investorCornerCount: number;
  investorCornerMin: number;
  investorCornerMax: number;
  investorCornerAvg: number;
  KabarTerbaru: KabarTerbaru[];
  Prospektus: string;
  Kupon: string;
}

export interface Days {
  prelistingDays: string;
  listingDays: string;
  endPrelisting: string;
  endListing: string;
}

export interface Sosmed {
  facebook: string;
  instagram: string;
  linkedin: string;
}

export interface TimelineOffer {
  Status: string;
  statusProspektus: string;
  ListStatus: string;
  status_sla: string;
  tglTimeline: string | undefined[];
  beforeTimeline: string[];
}

export interface BeliEfek {
  PinjamanId: string;
  UserPinjamanId: string;
}

export interface Overview {
  informasiPenerbit: string;
  Proyek?: Proyek;
  Proyeksi?: Proyeksi;
  Bisnis: Bisnis;
  Keuangan: Keuangan;
  PenanggungJawab: PenanggungJawab;
}

export interface Proyek {
  NilaiProyek: string;
  ProyeksiImbalHasilProyek: string;
  JenisPengerjaanProyek: string;
  UraianMengenaiProyek: string;
}

export interface Proyeksi {
  ProyeksiPenjualanPerBulan: string;
  ProyeksiPenjualanPerTahun: string;
}

export interface Bisnis {
  namaPerusahaan: string;
  AlamatPerusahaan: string;
  'Lama Perusahaan Berdiri': string;
  SektorUsaha: string;
  JumlahDirektur: string;
  JumlahKomisaris: string;
  JumlahPemegangSaham: string;
  JumlahKaryawan: string;
}

export interface Keuangan {
  Penjualan: string;
  LabaUsaha: string;
  LabaBersih: string;
  AsetLancar: string;
  AsetTetap: string;
  HutangLancar: string;
  HutangJangkaPanjang: string;
  Ekuitas: string;
}

export interface PenanggungJawab {
  NamaLengkap: string;
  'Jenis Kelamin': string;
  Umur: string;
  'Pendidikan Terakhir': string;
  Alamat: string;
  Jabatan: string;
}

export interface KabarTerbaru {
  name: string;
  datetime: string;
  info_update: string;
}
