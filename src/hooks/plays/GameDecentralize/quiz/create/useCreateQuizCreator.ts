import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const UseCreateQuizCreator = () => {
  const schema = yup.object().shape({
    name: yup.string().required('Quiz title is required')
  });
  const [prizeType, setPrizeType] = useState<string | null>(null);
  const methods = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
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
