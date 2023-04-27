export interface IFormMethod {
  email?: string;
  phoneNumber?: string;
  method: 'email' | 'phoneNumber';
}

export interface IOTPMethod {
  whatsapp?: string;
  sms?: string;
  method: 'whatsapp' | 'sms';
}

export interface ICreateNewPassword {
  password: string;
  rePassword: string;
}
