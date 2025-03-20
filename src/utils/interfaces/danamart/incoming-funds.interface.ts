export interface IncomingFundI {
  StatusCode: string;
  Status: string;
  message: string;
  data1: number;
  data2: number;
  data3: number;
  data: IncomingFundsData[];
}

export interface IncomingFundsData {
  deposit_id?: string;
  user_pendana_id: string;
  tgl_deposit: string;
  tgl_pencairan?: string;
  jml_deposit: string;
  jns_deposit?: string;
  ket: string;
  id?: string;
}

export interface BankList {
  id: number;
  name: string;
}

export type BankData = BankDataI[];

export interface BankDataI {
  id: string;
  title: string;
  body: string;
}
