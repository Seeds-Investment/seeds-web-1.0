export interface BankList {
  statusCode: number
  dataRek: DataRek | '';
  dataRekIns: any
  bList: BList[]
  message: string
}

export interface DataRek {
  informasi_bank_id: string
  user_penmit_id: string
  dm_penmit_07001: string
  dm_penmit_07002: string
  dm_penmit_07003: string
  dm_penmit_07004: string
  dm_penmit_07005: string
  dm_penmit_07006: string
  dm_penmit_07007: string
  dm_penmit_07008: string
  dm_penmit_07009: string
  dm_penmit_07010: string
  pernyataan: string
  pernyataan_rekbank: string
  ewallet: any
  ewallet_phone: any
}

export interface BList {
  name: string
  code: string
  can_disburse: boolean
  can_name_validate: boolean
}
