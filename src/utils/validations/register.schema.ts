import {
  countrycode,
  email,
  passwordPattern,
  phoneNumber,
  seedsTag
} from '@/utils/common/pattern';
import type { IRegisterFormdata } from '@/utils/interfaces/form.interfaces';
import type { Shape } from '@/utils/validations/common.schema';
import * as Yup from 'yup';

export const formRegisterPersonalInfoSchema: any = Yup.object<
  Shape<IRegisterFormdata>
>().shape({
  countryCode: Yup.string()
    .required('required')
    .matches(countrycode, 'invalid Country Code'),
  phoneNumber: Yup.string()
    .required('required')
    .matches(phoneNumber, 'invalid Phone Number')
    .min(10, 'Email must have at least 10 characters length')
    .max(20, 'Email must have at most 20 characters length'),
  email: Yup.string().required().matches(email, 'Invalid Email'),
  birthdate: Yup.string().required()
});

export const formConfigureSeedsUserSchema: any = Yup.object<
  Shape<IRegisterFormdata>
>().shape({
  name: Yup.string().required(),
  seedsTag: Yup.string()
    .required()
    .matches(seedsTag, "Don't need to add '@'")
    .min(2, 'Seeds Tag must contain text')
    .max(20, 'Seeds Tag must have at most 20 characters length'),
  referralCode: Yup.string()
});

export const formCreatePasswordSchema: any = Yup.object<
  Shape<IRegisterFormdata>
>().shape({
  password: Yup.string()
    .required()
    .matches(passwordPattern, 'invalid Input Password'),
  rePassword: Yup.string()
    .required()
    .matches(passwordPattern, 'invalid Confirm Password')
});
