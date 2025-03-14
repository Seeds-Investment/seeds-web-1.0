import { updateFinancialInformation } from '@/repository/danamart/danamart.repository';
import {
  type FinancialInfoForm,
  type FinancialInfoFormPayload
} from '@/utils/interfaces/danamart.interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg'];

const useUpdateFinancialInfo = (): any => {
  const schema = yup.object().shape({
    dm_pen_06001: yup.string().required('This field is required'),
    dm_pen_06002: yup
      .string()
      .required('This field is required')
      .matches(/^\d+$/, 'Only numbers are allowed'),
    validateSalary: yup
      .boolean()
      .required('This field is required')
      .oneOf([true], 'This field is required'),
    dm_penmit_07001: yup.string().required('This field is required'),
    dm_penmit_07002: yup
      .string()
      .required('This field is required')
      .min(8, 'Bank account number must be at least 10 digits')
      .max(18, 'Bank account number must not exceed 16 digits')
      .matches(/^\d+$/, 'Only numbers are allowed'),
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
    fileKartuAkses: yup
      .mixed<FileList>()
      .nullable()
      .when('pernyataan', {
        is: '1',
        then: schema =>
          schema
            .required('This field is required')
            .test('fileType', 'Only JPEG and JPG files are allowed', value => {
              if (value === null || value === undefined) return true;

              const file = value[0];
              return SUPPORTED_FORMATS.includes(file.type);
            })
            .test('fileSize', 'File size must be less than 4MB', value => {
              if (value === null || value === undefined) return true;
              return value[0].size <= MAX_FILE_SIZE;
            }),
        otherwise: schema => schema.notRequired()
      }),
    bo_confirm: yup.string().required('This field is required'),
    bo_nama: yup.string().when('bo_confirm', {
      is: 'Y',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_jns_kelamin: yup.string().when('bo_confirm', {
      is: 'Y',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_no_identitas: yup.string().when('bo_confirm', {
      is: 'Y',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    fileIdentitas: yup
      .mixed<FileList>()
      .nullable()
      .when('bo_confirm', {
        is: 'Y',
        then: schema =>
          schema
            .required('This field is required')
            .test('fileType', 'Only JPEG and JPG files are allowed', value => {
              if (value === null || value === undefined) return true;

              const file = value[0];
              return SUPPORTED_FORMATS.includes(file.type);
            })
            .test('fileSize', 'File size must be less than 4MB', value => {
              if (value === null || value === undefined) return true;
              return value[0].size <= MAX_FILE_SIZE;
            }),
        otherwise: schema => schema.notRequired()
      }),
    bo_alamat: yup.string().when('bo_confirm', {
      is: 'Y',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_tmp_lahir: yup.string().when('bo_confirm', {
      is: 'Y',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_tgl_lahir: yup.string().when('bo_confirm', {
      is: 'Y',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_kewarganegaraan: yup.string().when('bo_confirm', {
      is: 'Y',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_pekerjaan: yup.string().when('bo_confirm', {
      is: 'Y',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_alamat_pekerjaan: yup.string().when('bo_confirm', {
      is: 'Y',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_no_telp_pekerjaan: yup.string().when('bo_confirm', {
      is: 'Y',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_nama_ibu: yup.string().when('bo_confirm', {
      is: 'Y',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_sumber_dana: yup.string().when('bo_confirm', {
      is: 'Y',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_hasil_perbulan: yup.string().when('bo_confirm', {
      is: 'Y',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_tujuan_invest: yup.string().when('bo_confirm', {
      is: 'Y',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_hub_bo: yup.string().when('bo_confirm', {
      is: 'Y',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_status_perkawinan_bo: yup.string().when('bo_confirm', {
      is: 'Y',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_relation_nama: yup.string().when('bo_status_perkawinan_bo', {
      is: 'married',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_relation_jns_kelamin: yup.string().when('bo_status_perkawinan_bo', {
      is: 'married',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_relation_no_ktp: yup.string().when('bo_status_perkawinan_bo', {
      is: 'married',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    fileKtp: yup
      .mixed<FileList>()
      .nullable()
      .when('bo_status_perkawinan_bo', {
        is: 'married',
        then: schema =>
          schema
            .required('This field is required')
            .test('fileType', 'Only JPEG and JPG files are allowed', value => {
              if (value === null || value === undefined || value.length === 0) {
                return true;
              }
              const file = value[0];
              return SUPPORTED_FORMATS.includes(file.type);
            })
            .test('fileSize', 'File size must be less than 4MB', value => {
              if (value === null || value === undefined) return true;
              return value[0].size <= MAX_FILE_SIZE;
            }),
        otherwise: schema => schema.notRequired()
      }),
    bo_relation_alamat: yup.string().when('bo_status_perkawinan_bo', {
      is: 'married',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_relation_tempat_lahir: yup.string().when('bo_status_perkawinan_bo', {
      is: 'married',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_relation_tgl_lahir: yup.string().when('bo_status_perkawinan_bo', {
      is: 'married',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_relation_warga: yup.string().when('bo_status_perkawinan_bo', {
      is: 'married',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_relation_pekerjaan: yup.string().when('bo_status_perkawinan_bo', {
      is: 'married',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_relation_alamat_kerja: yup.string().when('bo_status_perkawinan_bo', {
      is: 'married',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    bo_relation_no_telp_kerja: yup.string().when('bo_status_perkawinan_bo', {
      is: 'married',
      then: schema => schema.required('This field is required'),
      otherwise: schema => schema.notRequired()
    })
  });

  const defaultValues = {
    dm_pen_06001: '',
    dm_pen_06002: '',
    validateSalary: false,
    cek_pendapatan_baru: '0',
    dm_penmit_07001: '',
    dm_penmit_07002: '',
    dm_penmit_07003: '',
    pernyataan: '',
    dm_penmit_07008: '',
    dm_penmit_07009: '',
    fileKartuAkses: null,
    dm_penmit_07010: null,
    bo_confirm: '',
    bo_nama: '',
    bo_jns_kelamin: '',
    bo_no_identitas: '',
    fileIdentitas: null,
    bo_file_identitas: null,
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
    fileKtp: null,
    bo_relation_file_ktp: null,
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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: FinancialInfoForm): Promise<void> => {
    try {
      setIsLoading(true);
      const {
        validateSalary,
        fileKartuAkses,
        fileIdentitas,
        fileKtp,
        ...rest
      } = data;

      const updatedForm: FinancialInfoFormPayload = {
        ...rest,
        dm_penmit_07010: fileKartuAkses?.[0] ?? null,
        bo_file_identitas: fileIdentitas?.[0] ?? null,
        bo_relation_file_ktp: fileKtp?.[0] ?? null
      };

      const response = await updateFinancialInformation(updatedForm);
      if (response.statusCode === 200) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to update financial information');
    } finally {
      setIsLoading(false);
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
    onSubmit,
    isLoading
  };
};

export default useUpdateFinancialInfo;
