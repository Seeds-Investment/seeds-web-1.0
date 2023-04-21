import * as Yup from 'yup';
import type { IForgotPassword } from '../interfaces/form.interfaces';

export const forgotPasswordSchema: any = Yup.object<
  Shape<IForgotPassword>
>().shape({
  method: Yup.string().required(),
  email: Yup.string().when('method', {
    is: 'email',
    then: Yup.string().email('Invalid email').required('Email is required'),
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
