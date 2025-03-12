export interface UserLogI {
  StatusCode: string
  Status: string
  message: string
  data: UserLogData[]
}

export interface UserLogData {
  id: string
  datetime: string
  user_id: string
  nama: string
  email: string
  pengguna: string
  module: string
  device: string
  type: string
  ket: string
  jenis_aksi: string
  json_ipgeo: string
}
