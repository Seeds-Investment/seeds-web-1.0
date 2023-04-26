import * as Yup from 'yup';
import type { IFormMethod, IOTPMethod } from '../interfaces/form.interfaces';

export const formMethodSchema: any = Yup.object<Shape<IFormMethod>>().shape({
  method: Yup.string().required(),
  email: Yup.string().when('method', {
    is: 'email',
    then: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    otherwise: Yup.string().email('Invalid email')
  }),
  phoneNumber: Yup.number().when('method', {
    is: 'phoneNumber',
    then: Yup.number()
      .typeError('Phone number only accept 1-9')
      .required('Phone is required'),
    otherwise: Yup.number()
  })
});
export const formOtpSchema: any = Yup.object<Shape<IOTPMethod>>().shape({
  method: Yup.string().required(),
  sms: Yup.string().when('method', {
    is: 'whatsapp',
    then: Yup.string().min(4).max(4).required('Email is required'),
    otherwise: Yup.string()
  }),
  whatsapp: Yup.string().when('method', {
    is: 'whatsapp',
    then: Yup.string().min(4).max(4).required('Phone is required'),
    otherwise: Yup.string()
  })
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
