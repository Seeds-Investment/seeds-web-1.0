import { type CreateCreatorQuizReqFormI } from '@/utils/interfaces/creator-space/quiz/quiz';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const UseCreateQuizCreator = () => {
  const TncSchema = yup.object().shape({
    id: yup.string().required('Tnc ID is required'),
    en: yup.string().required('Tnc English content is required')
  });

  const BannerSchema = yup.object().shape({
    image_url: yup
      .string()
      .url('Invalid URL')
      .required('Banner image URL is required'),
    image_link: yup
      .string()
      .url('Invalid URL')
      .required('Banner image link is required')
  });

  const PaymentSchema = yup.object().shape({
    amount: yup
      .number()
      .positive('Amount must be positive')
      .required('Amount is required'),
    payment_gateway: yup.string().required('Payment gateway is required'),
    payment_method: yup.string().required('Payment method is required'),
    phone_number: yup.string().required('Phone number is required'),
    promo_code: yup.string().optional(),
    is_use_coins: yup.boolean().required('Coin usage must be specified'),
    success_url: yup
      .string()
      .url('Invalid success URL')
      .required('Success URL is required'),
    cancel_url: yup
      .string()
      .url('Invalid cancel URL')
      .required('Cancel URL is required')
  });

  const CreateQuizSchema = yup.object().shape({
    name: yup.string().required('Quiz title is required'),
    tnc: TncSchema.required('Tnc is required'),
    category: yup.string().required('Category is required'),
    prizes: yup
      .array()
      .of(yup.number().positive('Prize must be positive').defined()) // ⬅️ `defined()` memastikan tidak ada `undefined`
      .min(1, 'At least one prize is required'),
    banner: BannerSchema.required('Banner is required'),
    total_questions: yup.string().required('Total questions is required'),
    is_prize_pool: yup.boolean().required('Prize pool status is required'),
    winner_percentage_prize: yup
      .array()
      .of(yup.number().min(0).max(100))
      .nullable() // ⬅️ Mengizinkan `null` atau `undefined`
      .default([]),
    winner_link_url: yup
      .array()
      .of(yup.string().url('Invalid URL').defined()) // ⬅️ Pastikan tidak ada `undefined`
      .required('Winner link URLs are required'),
    winner_image_url: yup
      .array()
      .of(yup.mixed().required('Winner image file is required')) // ⬅️ Pastikan setiap item tidak `undefined`
      .required('Winner images are required'),
    prize_type: yup.string().required('Prize type is required'),
    started_at: yup.string().required('Start date is required'),
    ended_at: yup.string().required('End date is required'),
    admission_fee: yup
      .number()
      .min(0, 'Admission fee cannot be negative')
      .required('Admission fee is required'),
    payment: PaymentSchema.required('Payment details are required')
  });

  const [prizeType, setPrizeType] = useState<string | null>(null);
  const methods = useForm<CreateCreatorQuizReqFormI>({
    mode: 'onSubmit',
    resolver: yupResolver(CreateQuizSchema),
    defaultValues: {
      winner_percentage_prize: [] // ⬅️ Pastikan `winner_percentage_prize` tidak `undefined`
    }
  });

  const handlePrizeTypeChange = (value: string) => {
    methods.reset();
    setPrizeType(value);
  };

  const _createQuiz = (data: any) => {};
  const { handleSubmit } = methods;

  const handleCreate = handleSubmit(_createQuiz);

  return {
    methods,
    prizeType,
    setPrizeType,
    handlePrizeTypeChange,
    handleCreate
  };
};

export default UseCreateQuizCreator;
