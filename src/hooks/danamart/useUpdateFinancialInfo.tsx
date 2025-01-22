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
    bo_confirm: '',
    bo_nama: '',
    bo_jns_kelamin: '',
    bo_no_identitas: '',
    bo_file_identitas: '',
    bo_alamat: '',
    bo_tmp_lahir: '',
    bo_tgl_lahir: '',
    bo_kewarganegaraan: '',
    bo_pekerjaan: '',
    bo_alamat_pekerjaan: '',
    bo_no_telp_pekerjaan: '',
    bo_nama_ibu: '',
    bo_sumber_dana: '',
    bo_hasil_perbulan: '',
    bo_tujuan_invest: '',
    bo_hub_bo: '',
    bo_status_perkawinan_bo: '',
    bo_relation_nama: '',
    bo_relation_jns_kelamin: '',
    bo_relation_no_ktp: '',
    bo_relation_file_ktp: '',
    bo_relation_alamat: '',
    bo_relation_tempat_lahir: '',
    bo_relation_tgl_lahir: '',
    bo_relation_warga: '',
    bo_relation_pekerjaan: '',
    bo_relation_alamat_kerja: '',
    bo_relation_no_telp_kerja: '',
    dm_pen_06005: '',
    app: 'web'
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
