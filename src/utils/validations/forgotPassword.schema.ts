import * as Yup from 'yup';
import type {
  ICreateNewPassword,
  IFormMethod,
  IOTPMethod
} from '../interfaces/form.interfaces';

const invalidEmail = 'errorMessage.invalidEmail';
const requiredEmail = 'errorMessage.requiredEmail';
const invalidPhoneNumber = 'errorMessage.invalidPhoneNumber';
const requiredPhoneNumber = 'errorMessage.requiredPhoneNumber';
const requiredPassword = 'errorMessage.requiredPassword';
const requiredRePassword = 'errorMessage.requiredRePassword';
const invalidPassword = 'errorMessage.invalidPassword';
const unmatchPassword = 'errorMessage.unmatchPassword';

export const formMethodSchema: any = Yup.object<Shape<IFormMethod>>().shape({
  method: Yup.string().required(),
  email: Yup.string().when('method', {
    is: 'email',
    then: Yup.string().email(invalidEmail).required(requiredEmail),
    otherwise: Yup.string().email(invalidEmail)
  }),
  phoneNumber: Yup.number().when('method', {
    is: 'phoneNumber',
    then: Yup.number()
      .typeError(invalidPhoneNumber)
      .required(requiredPhoneNumber),
    otherwise: Yup.number()
  })
});
export const formOtpSchema: any = Yup.object<Shape<IOTPMethod>>().shape({
  method: Yup.string().required(),
  sms: Yup.string().when('method', {
    is: 'whatsapp',
    then: Yup.string().min(4).max(4).required(requiredEmail),
    otherwise: Yup.string()
  }),
  whatsapp: Yup.string().when('method', {
    is: 'whatsapp',
    then: Yup.string().min(4).max(4).required(requiredPhoneNumber),
    otherwise: Yup.string()
  })
});

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const formCreateNewPasswordSchema: any = Yup.object<
  Shape<ICreateNewPassword>
>().shape({
  password: Yup.string()
    .required(requiredPassword)
    .matches(passwordPattern, invalidPassword),
  rePassword: Yup.string()
    .required(requiredRePassword)
    .matches(passwordPattern, invalidPassword)
    .oneOf([Yup.ref('password'), null], unmatchPassword)
});

export type ConditionalSchema<T> = T extends string
  ? Yup.StringSchema
  : T extends number
  ? Yup.NumberSchema
  : T extends boolean
  ? Yup.BooleanSchema
  : T extends Record<any, any>
  ? Yup.AnyObjectSchema
  : T extends any[]
  ? Yup.ArraySchema<any, any>
  : Yup.AnySchema;

export type Shape<Fields> = {
  [Key in keyof Fields]: ConditionalSchema<Fields[Key]>;
};
