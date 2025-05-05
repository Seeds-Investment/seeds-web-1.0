/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { updateUserInformation } from '@/repository/danamart/danamart.repository';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useBase64ToFile } from './useBase64ToFile';

export interface UserInfoFormData {
  pernyataan: string;
  dm_penmit_01010: string;
  dm_penmit_01003: string;
  dm_penmit_01038: string;
  dm_penmit_01006: string;
  dm_penmit_01007: string;
  dm_penmit_01015: string;
  dm_penmit_01027: string;
  dm_penmit_01026: string;
  namaPasangan?: string;
  dm_penmit_01029: string;
  dm_penmit_01039: string;
  dm_penmit_01040: string;
  alamat_tmpt_kerja: string;
  telepon_tmpt_kerja: string;
  dm_penmit_01032: string;
  dm_penmit_01019rt: string;
  dm_penmit_01019rw: string;
  dm_penmit_01037: string;
  dm_penmit_01036: string;
  dm_penmit_01035: string;
  dm_penmit_01034: string;
  dm_penmit_01033: number;
  dm_penmit_01017: string;
  masa_berlaku: boolean;
  dm_penmit_01018?: string;
  dm_penmit_01022: string;
  dm_penmit_01041: string;
  dm_penmit_01042: string;
  dm_pen_08002: string;
  dm_pen_08009: string;
  pernyataan_npwp: string;
  dm_penmit_01013?: any;
  dm_penmit_01008: string;
}

const useUpdateUserInfoForm = (): any => {
  const { t } = useTranslation();
  const pathTranslation =
    'danamart.verification.accountInformation.validationForm';

  const schema = yup.object().shape({
    pernyataan: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01010: yup
      .string()
      .matches(
        /^\d{16}$/,
        t(`${pathTranslation}.text2`) ?? 'Must be exactly 16 digits long'
      )
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01003: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01038: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01006: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01007: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01015: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01027: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01026: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    namaPasangan: yup.string().when('dm_penmit_01026', {
      is: 'married',
      then: schema =>
        schema.required(
          t(`${pathTranslation}.text1`) ?? 'This field is required'
        ),
      otherwise: schema => schema.notRequired()
    }),
    dm_penmit_01029: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01039: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01040: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    alamat_tmpt_kerja: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    telepon_tmpt_kerja: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01032: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01019rt: yup
      .string()
      .matches(
        /^\d{3}$/,
        t(`${pathTranslation}.text4`) ?? 'Must be exactly 3 digits long'
      )
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01019rw: yup
      .string()
      .matches(
        /^\d{3}$/,
        t(`${pathTranslation}.text4`) ?? 'Must be exactly 3 digits long'
      )
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01037: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01036: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01035: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01034: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01033: yup
      .number()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01017: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    masa_berlaku: yup
      .boolean()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01018: yup.string().when('masa_berlaku', {
      is: false,
      then: schema =>
        schema.required(
          t(`${pathTranslation}.text1`) ?? 'This field is required'
        ),
      otherwise: schema => schema.notRequired()
    }),
    dm_penmit_01022: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01041: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01042: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_pen_08002: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_pen_08009: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    pernyataan_npwp: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required'),
    dm_penmit_01012: yup.string().when('pernyataan_npwp', {
      is: '1',
      then: schema =>
        schema
          .matches(
            /^\d{15,16}$/,
            t(`${pathTranslation}.text3`) ?? 'This field is required'
          )
          .required(t(`${pathTranslation}.text3`) ?? 'This field is required'),
      otherwise: schema => schema.notRequired()
    }),
    dm_penmit_01045: yup.string().when('pernyataan_npwp', {
      is: '1',
      then: schema =>
        schema.required(
          t(`${pathTranslation}.text1`) ?? 'This field is required'
        ),
      otherwise: schema => schema.notRequired()
    }),
    dm_penmit_01013: yup.string().when('pernyataan_npwp', {
      is: '1',
      then: schema =>
        schema.required(
          t(`${pathTranslation}.text1`) ?? 'This field is required'
        ),
      otherwise: schema => schema.notRequired()
    }),
    dm_penmit_01008: yup
      .string()
      .required(t(`${pathTranslation}.text1`) ?? 'This field is required')
  });

  const defaultValues: UserInfoFormData = {
    pernyataan: '',
    dm_penmit_01010: '',
    dm_penmit_01003: '',
    dm_penmit_01038: '',
    dm_penmit_01006: '',
    dm_penmit_01007: '',
    dm_penmit_01015: '',
    dm_penmit_01027: '',
    dm_penmit_01026: '',
    namaPasangan: '',
    dm_penmit_01029: '',
    dm_penmit_01039: '',
    dm_penmit_01040: '',
    alamat_tmpt_kerja: '',
    telepon_tmpt_kerja: '',
    dm_penmit_01032: '',
    dm_penmit_01019rt: '',
    dm_penmit_01019rw: '',
    dm_penmit_01037: '',
    dm_penmit_01036: '',
    dm_penmit_01035: '',
    dm_penmit_01034: '',
    dm_penmit_01033: 0,
    dm_penmit_01017: '',
    masa_berlaku: true,
    dm_penmit_01018: '',
    dm_penmit_01022: '',
    dm_penmit_01041: '',
    dm_penmit_01042: '',
    dm_pen_08002: '',
    dm_pen_08009: '',
    pernyataan_npwp: '',
    dm_penmit_01008: ''
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    trigger,
    watch
  } = useForm<UserInfoFormData>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues
  });

  const { base64ToFile } = useBase64ToFile();

  const onSubmit = async (data: UserInfoFormData): Promise<void> => {
    try {
      const formData = new FormData();

      const adjustedData = {
        ...data,
        masa_berlaku: data.masa_berlaku ? 'on' : ''
      };

      Object.entries(adjustedData).forEach(([key, value]) => {
        if (
          key !== 'dm_penmit_01013' &&
          value !== undefined &&
          value !== null
        ) {
          formData.append(key, String(value));
        }
      });

      const isBase64 =
        typeof data.dm_penmit_01013 === 'string' &&
        data.dm_penmit_01013.startsWith('data:image');
      const isOldFilename = data.dm_penmit_01013.includes('npwp') && !isBase64;

      // Upload new NPWP
      if (isBase64) {
        const file = base64ToFile(data.dm_penmit_01013, 'image.jpg');
        formData.append('dm_penmit_01013', file);
      }

      // Keep existing NPWP
      if (isOldFilename) {
        formData.append('dm_penmit_01013_exist', data.dm_penmit_01013);

        const imageUrl = `https://dev.danamart.id/development/dm-scf-api/writable/uploads/${
          data.dm_penmit_01013 as string
        }`;
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', { type: blob.type });

        formData.append('dm_penmit_01013', file);
      }

      const response = await updateUserInformation(formData);

      if (
        response?.message ===
        'Data Formulir Informasi Pribadi berhasil di-update'
      ) {
        toast.success('User information updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update user information');
    }
  };

  return {
    handleSubmit,
    register,
    errors,
    control,
    setValue,
    trigger,
    watch,
    onSubmit
  };
};

export default useUpdateUserInfoForm;
