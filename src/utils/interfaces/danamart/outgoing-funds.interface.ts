export interface OutgoingFundI {
  StatusCode: number;
  Status: string;
  message: string;
  data: OutgoingFundsData[];
}

export interface OutgoingFundsData {
  withdraw_id: string;
  user_pendana_id: string;
  tgl_withdraw: string;
  jml_withdraw: string;
  status: string;
  jns_withdraw: string;
  kode_pendanaan: string;
  ket: string;
}
