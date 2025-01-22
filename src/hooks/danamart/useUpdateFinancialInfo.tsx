import { type FinancialInfoForm } from '@/utils/interfaces/danamart.interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const useUpdateFinancialInfo = (): any => {
  const schema = yup.object().shape({
    dm_pen_06001: yup.string().required('This field is required'),
    dm_pen_06002: yup
      .string()
      .matches(/^\d+$/, 'Only numbers are allowed')
      .required('This field is required'),
    cek_pendapatan_baru: yup.boolean().required('This field is required'),
    dm_penmit_07001: yup.string().required('This field is required'),
    dm_penmit_07002: yup
      .string()
      .matches(/^\d+$/, 'Only numbers are allowed')
      .min(10, 'Bank account number must be at least 10 digits')
      .max(16, 'Bank account number must not exceed 16 digits')
      .required('This field is required'),
    dm_penmit_07003: yup.string().required('This field is required'),
    pernyataan: yup.string().required('This field is required'),
    dm_penmit_07008: yup.string().when('pernyataan', {
      is: '1',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    dm_penmit_07009: yup.string().when('pernyataan', {
      is: '1',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    dm_penmit_07010: yup.mixed<string | File>().when('pernyataan', {
      is: '1',
      then: schema =>
        schema
          .test('fileSize', 'File is required', value => {
            return value instanceof File;
          })
          .test('fileSize', 'File size exceeds 4MB', value => {
            if (value instanceof File) {
              return value.size <= 4 * 1024 * 1024;
            }
            return true;
          })
          .required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_confirm: yup.string().required('This field is required')
  });

  const defaultValues = {
    dm_pen_06001: '',
    dm_pen_06002: '',
    cek_pendapatan_baru: false,
    dm_penmit_07001: '',
    dm_penmit_07002: '',
    dm_penmit_07003: '',
    pernyataan: '',
    dm_penmit_07008: '',
    dm_penmit_07009: '',
    dm_penmit_07010: '',
    bo_confirm: ''
  };

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
    reset,
    setValue
  } = useForm<FinancialInfoForm>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues
  });

  const onSubmit = async (data: FinancialInfoForm): Promise<void> => {
    try {
      // await updateFinancialInformation(data);
      console.log(data);

      toast.success('Financial information updated successfully');
      // reset();
    } catch (error) {
      toast.error('Failed to update financial information');
    }
  };

  return {
    handleSubmit,
    register,
    errors,
    control,
    watch,
    reset,
    setValue,
    onSubmit
  };
};

export default useUpdateFinancialInfo;
