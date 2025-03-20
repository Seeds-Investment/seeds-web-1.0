export interface PurchaseHistoryI {
  StatusCode: string;
  Status: string;
  message: string;
  data: PurchaseHistoryData[];
}

export interface PurchaseHistoryData {
  kodeEfek: string;
  penawaranId: string;
  jmlPembelian: string;
  tanggalPembelian: string;
  buktiPotongPph: any;
  modalPembiayaan: ModalPembiayaan;
  ModalPembelian: ModalPembelian;
  modalInfoBiayaBunga: ModalInfoBiayaBunga;
}

export interface ModalPembiayaan {
  namaPenerbit: string;
  idPenawaran: string;
  getId: string;
  sukuBunga: string;
  creditRating: string;
  jangkaWaktu: string;
  jatuhTempo: string;
  tglPenyerahanDana: string;
  'tglKupon/Dividen': string[];
  sektorUsaha: string;
  statuspembayaran: string;
}

export interface ModalPembelian {
  tglPembelian: string;
  jmlPembelian: string;
  kontribusi: string;
}

export interface ModalInfoBiayaBunga {
  text1: string;
  value1: string;
  text2: string;
  value2: string;
  text3: string;
  value3: string;
  text4: string;
  value4: string;
}
