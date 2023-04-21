export interface IForgotPassword {
  email?: string;
  phoneNumber?: string;
  method: 'email' | 'phoneNumber';
}
