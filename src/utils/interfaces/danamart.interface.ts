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
