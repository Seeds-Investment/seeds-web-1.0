export interface PortfolioRes {
  StatusCode: string
  Status: string
  message: string
  UserId: string
  data: PortfolioData[]
  dataco: any[]
}

export interface PortfolioData {
  statusPendanaan: string
  statusPinjaman: string
  kodeEfek: string
  gbrSektorUsahaSquare: string
  status: string
  statusUser: string
  pinjamanId: string
  hargaPerlembarSaham: string
  hargalembarSaham: string
  imbalHasil: string
  jangkaWaktu: string
  jatuhTempo: string
  buktiPotongPph: any
  jumlahPendanaan: string
  batalPembelian: BatalPembelian
  informasiPenawaran: InformasiPenawaran
  is_co: string
  modalInfoPinjaman: ModalInfoPinjaman
  modalInfoPendanaan: ModalInfoPendanaan
  modalInfoBiayaBunga: ModalInfoBiayaBunga
}

export interface BatalPembelian {
  statusBeli: StatusBeli
  kodePendanaan: string
  userId: string
  pinjamanId: string
}

export interface StatusBeli {
  status: string
  message: string
}

export interface InformasiPenawaran {
  pinjamanId?: string
  user_peminjam_id?: string
  jenisEfek: string
  namaPenerbit: string
  sektorUsaha: string
  TanggalPembagianDividen?: string
  PersentaseSahamYangDilepas?: string
  IntensitasPembagianDividen?: string
  PersentasePembagianDividen?: string
  TanggalPenyerahanDana: string
  "JadwalPembayaranKupon/Dividen": string
  StatusPembayaran: string
  Kupon?: string
  Tenor?: string
  JenisPenawaran?: string
}

export interface ModalInfoPinjaman {
  tipeEfek: string
  namaPenerbit: string
  jenisEfek: string
  status: string
  TanggalPenyerahanDana: string
  "PembayaranKupon/Dividen": string
  SektorUsaha: string
  StatusPembayaran: string
  waktuBulan: string
}

export interface ModalInfoPendanaan {
  tanggalPembelian: string
  jumlahPembelian: string
  kontribusi: string
}

export interface ModalInfoBiayaBunga {
  text1: string
  value1: string
  text2: string
  value2: string
  text3: string
  value3: string
  text4: string
  value4: string
}
