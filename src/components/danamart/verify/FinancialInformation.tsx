import MInput from '@/components/form-input/multi-input';
import {
  useConfirmBeneficialOwner,
  useConfirmShares,
  useGender,
  useIncome,
  useInvestmentGoals,
  useJobList,
  useMarriageStatus
} from '@/components/form-input/multi-input/data/dropdown-data';
import Loading from '@/components/popup/Loading';
import useUpdateFinancialInfo from '@/hooks/danamart/useUpdateFinancialInfo';
import { getFinancialInformationData } from '@/repository/danamart/danamart.repository';
import {
  type AccountVerification,
  type FinancialInfoForm
} from '@/utils/interfaces/danamart.interface';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { WarningGreenIcon } from 'public/assets/vector';
import React, { useEffect, useState } from 'react';
import { FaRegCheckCircle, FaRegTrashAlt } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import ModalConfirmationForm from './ModalConfirmationForm';

interface FinancialInformationProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  t: (key: string) => string;
}

const FinancialInformation: React.FC<FinancialInformationProps> = ({
  step,
  setStep,
  t
}) => {
  const [financialInformationData, setFinancialInformationData] =
    useState<AccountVerification>();
  const [isSwitchActive, setIsSwitchActive] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const gender = useGender();
  const income = useIncome();
  const marriageStatus = useMarriageStatus();
  const investmentGoals = useInvestmentGoals();
  const jobList = useJobList();

  const {
    control,
    errors,
    handleSubmit,
    register,
    watch,
    onSubmit,
    setValue,
    isLoading
  } = useUpdateFinancialInfo();

  const [previewUrlfileKartuAkses, setPreviewUrlfileKartuAkses] = useState<string | null>(null);
  const fileKartuAkses = watch('fileKartuAkses');

  const [previewUrlfileIdentitas, setPreviewUrlfileIdentitas] = useState<string | null>(null);
  const fileIdentitas = watch('fileIdentitas');

  const [previewUrlfileKtp, setPreviewUrlfileKtp] = useState<string | null>(null);
  const fileKtp = watch('fileKtp');

  const fetchDataFinancial = async (): Promise<void> => {
    try {
      const response = await getFinancialInformationData();
      setFinancialInformationData(response);
    } catch (error: any) {
      toast.error(`Error fetching data Financial Information`);
    }
  };

  useEffect(() => {
    if (step === 3) {
      void fetchDataFinancial();
    }
  }, [step]);

  const handleSwitchChange = (): void => {
    if (!isSwitchActive) {
      setShowModal(true);
    } else {
      setIsSwitchActive(false);
      setValue('validateSalary', false);
      setValue('cek_pendapatan_baru', '0');
    }
  };

  const handleModalResponse = (isConfirmed: boolean): void => {
    setShowModal(false);
    if (isConfirmed) {
      setIsSwitchActive(true);
      setValue('validateSalary', true);
      setValue('cek_pendapatan_baru', '1');
    } else {
      setIsSwitchActive(false);
      setValue('validateSalary', false);
      setValue('cek_pendapatan_baru', '0');
    }
  };

  useEffect(() => {
    void assignImage();
    setValue('dm_pen_06001', financialInformationData?.dana?.dm_pen_06001);
    setValue('dm_pen_06002', financialInformationData?.dana?.dm_pen_06002);
    if (watch('dm_pen_06002') !== '') {
      setValue('validateSalary', true);
    }
    setValue('dm_penmit_07001', financialInformationData?.bank?.dm_penmit_07001);
    setValue('dm_penmit_07002', financialInformationData?.bank?.dm_penmit_07002);
    setValue('dm_penmit_07003', `${financialInformationData?.bank?.dm_penmit_07003 ?? ''}#${financialInformationData?.bank?.dm_penmit_07006 ?? ''}`);
    setValue('pernyataan', financialInformationData?.bank?.pernyataan);
    if (watch('pernyataan') === '1') {
      setValue('dm_penmit_07008', financialInformationData?.bank?.dm_penmit_07008);
      setValue('dm_penmit_07009', (financialInformationData?.bank?.dm_penmit_07009 ?? '')?.replace(/\//g, '-'));
    }
    if (financialInformationData?.penmit?.bo_confirm === 'Y') {
      setValue('bo_confirm', 'Y');
      setValue('bo_nama', financialInformationData?.penmit?.bo_nama);
      setValue('bo_jns_kelamin', (financialInformationData?.penmit?.bo_jns_kelamin)?.toUpperCase());
      setValue('bo_no_identitas', financialInformationData?.penmit?.bo_no_identitas);
      setValue('bo_alamat', financialInformationData?.penmit?.bo_alamat);
      setValue('bo_tmp_lahir', financialInformationData?.penmit?.bo_tmp_lahir);
      setValue('bo_tgl_lahir', financialInformationData?.penmit?.bo_tgl_lahir);
      setValue('bo_kewarganegaraan', financialInformationData?.penmit?.bo_kewarganegaraan);
      setValue('bo_pekerjaan', financialInformationData?.penmit?.bo_pekerjaan);
      setValue('bo_alamat_pekerjaan', financialInformationData?.penmit?.bo_alamat_pekerjaan);
      setValue('bo_no_telp_pekerjaan', financialInformationData?.penmit?.bo_no_telp_pekerjaan);
      setValue('bo_nama_ibu', financialInformationData?.penmit?.bo_nama_ibu);
      setValue('bo_sumber_dana', financialInformationData?.penmit?.bo_sumber_dana);
      setValue('bo_hasil_perbulan', Number((financialInformationData?.penmit?.bo_hasil_perbulan ?? 0).replace(/\./g, '')));
      setValue('bo_tujuan_invest', financialInformationData?.penmit?.bo_tujuan_invest);
      setValue('bo_hub_bo', financialInformationData?.penmit?.bo_hub_bo);
      setValue('bo_status_perkawinan_bo', financialInformationData?.penmit?.bo_status_perkawinan_bo);
      setValue('bo_relation_nama', financialInformationData?.penmit?.bo_relation_nama);
      setValue('bo_relation_jns_kelamin', (financialInformationData?.penmit?.bo_relation_jns_kelamin)?.toUpperCase());
      setValue('bo_relation_no_ktp', financialInformationData?.penmit?.bo_relation_no_ktp);
      setValue('bo_relation_alamat', financialInformationData?.penmit?.bo_relation_alamat);
      setValue('bo_relation_tempat_lahir', financialInformationData?.penmit?.bo_relation_tempat_lahir);
      setValue('bo_relation_tgl_lahir', financialInformationData?.penmit?.bo_relation_tgl_lahir);
      setValue('bo_relation_warga', financialInformationData?.penmit?.bo_relation_warga);
      setValue('bo_relation_pekerjaan', financialInformationData?.penmit?.bo_relation_pekerjaan);
      setValue('bo_relation_alamat_kerja', financialInformationData?.penmit?.bo_relation_alamat_kerja);
      setValue('bo_relation_no_telp_kerja', financialInformationData?.penmit?.bo_relation_no_telp_kerja);
    } else {
      setValue('bo_confirm', 'N');
    }
  }, [financialInformationData])

  const assignImage = async (): Promise<void> => {
    if (financialInformationData != null && financialInformationData !== undefined) {
      const fileKartuAksesTemp = await handleAssignImage(financialInformationData?.bank?.dm_penmit_07010 ?? '');
      const fileIdentitasTemp = await handleAssignImage(financialInformationData?.penmit?.bo_file_identitas ?? '');
      const fileKtpTemp = await handleAssignImage(financialInformationData?.penmit?.bo_relation_file_ktp ?? '');

      if (watch('pernyataan') === '1') {
        setValue('fileKartuAkses', [fileKartuAksesTemp]);
      }

      if (financialInformationData?.penmit?.bo_confirm === 'Y') {
        setValue('fileIdentitas', [fileIdentitasTemp]);
        setValue('fileKtp', [fileKtpTemp]);
      }
    }
  };

  const handleAssignImage = async (filename: string): Promise<File> => {
    const fileUrl = `https://dev.danamart.id/development/dm-scf-api/writable/uploads/${filename}`;
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  }

  const handleRemoveAccessCard = async(): Promise<void> => {
    setPreviewUrlfileKartuAkses(null)
    if (financialInformationData?.bank?.dm_penmit_07010 !== null && financialInformationData?.bank?.dm_penmit_07010 !== undefined) {
      const fileKartuAksesTemp = await handleAssignImage(financialInformationData?.bank.dm_penmit_07010);
      setValue('fileKartuAkses', [fileKartuAksesTemp]);
    } else {
      setValue('fileKartuAkses', null);
    }
  }

  const handleRemoveIdentityCard = async(): Promise<void> => {
    setPreviewUrlfileIdentitas(null)
    if (financialInformationData?.penmit?.bo_file_identitas !== null && financialInformationData?.penmit?.bo_file_identitas !== undefined) {
      const fileKartuAksesTemp = await handleAssignImage(financialInformationData?.penmit?.bo_file_identitas);
      setValue('fileIdentitas', [fileKartuAksesTemp]);
    } else {
      setValue('fileIdentitas', null);
    }
  }

  const handleRemoveIdCard = async(): Promise<void> => {
    setPreviewUrlfileKtp(null)
    if (financialInformationData?.penmit?.bo_relation_file_ktp !== null && financialInformationData?.penmit?.bo_relation_file_ktp !== undefined) {
      const fileKartuAksesTemp = await handleAssignImage(financialInformationData?.penmit?.bo_relation_file_ktp);
      setValue('fileKtp', [fileKartuAksesTemp]);
    } else {
      setValue('fileKtp', null);
    }
  }

  useEffect(() => {
    if ((Boolean(fileKartuAkses)) && fileKartuAkses.length > 0) {
      const file = fileKartuAkses[0];

      if (file instanceof File) {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrlfileKartuAkses(objectUrl);

        return () => {
          URL.revokeObjectURL(objectUrl);
        };
      }
    }
  }, [fileKartuAkses]);

  useEffect(() => {
    if ((Boolean(fileIdentitas)) && fileIdentitas.length > 0) {
      const file = fileIdentitas[0];

      if (file instanceof File) {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrlfileIdentitas(objectUrl);

        return () => {
          URL.revokeObjectURL(objectUrl);
        };
      }
    }
  }, [fileIdentitas]);

  useEffect(() => {
    if ((Boolean(fileKtp)) && fileKtp.length > 0) {
      const file = fileKtp[0];

      if (file instanceof File) {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrlfileKtp(objectUrl);

        return () => {
          URL.revokeObjectURL(objectUrl);
        };
      }
    }
  }, [fileKtp]);

  return (
    <div className="w-full flex flex-col gap-6 rounded-lg">
      <div className="w-full flex justify-start items-center gap-2">
        <Typography className="font-poppins font-semibold md:text-xl text-base text-seeds-button-green">
          {t('danamart.verification.financial.income')}
        </Typography>
        <Image
          src={WarningGreenIcon}
          alt="WarningGreenIcon"
          width={20}
          height={20}
        />
      </div>
      <div className="w-full flex flex-wrap md:flex-nowrap items-center gap-2">
        <MInput
          label={t('danamart.verification.financial.incomeSource')}
          registerName="dm_pen_06001"
          type="dropdown"
          errors={errors}
          rounded={true}
          options={income}
          fullWidth={true}
          control={control}
        />
        <MInput
          label={t('danamart.verification.financial.incomePerMonth')}
          registerName="dm_pen_06002"
          control={control}
          watch={watch}
          type="number"
          errors={errors}
          prefix="Rp"
          placeholder="Rp"
        />
      </div>
      <div className="w-full flex items-center flex-wrap md:flex-nowrap gap-4">
        <div className="w-auto">
          <MInput
            type="switch"
            registerName="validateSalary"
            control={control}
            errors={errors}
            onSwitchToggle={handleSwitchChange}
          />
        </div>
        <Typography className="font-poppins text-sm font-normal text-[#7C7C7C] text-justify">
          {t('danamart.verification.financial.validateInputForm')}
        </Typography>
      </div>
      <Typography className="font-poppins font-semibold md:text-xl text-base text-seeds-button-green">
        {t('danamart.verification.financial.bankInformation')}
      </Typography>
      <div className="w-full flex flex-wrap md:flex-nowrap gap-2">
        <MInput
          label={t('danamart.verification.financial.nameOfAccount')}
          registerName="dm_penmit_07001"
          register={register}
          type="text"
          errors={errors}
          placeholder={t('danamart.verification.financial.nameOfAccount')}
          className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
        />
        <MInput
          label={t('danamart.verification.financial.accountNumber')}
          registerName="dm_penmit_07002"
          register={register}
          type="text"
          errors={errors}
          onInput={e => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
          }}
          placeholder={t(
            'danamart.verification.financial.accountNumberPlaceHolder'
          )}
          className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
        />
        <MInput
          label={t('danamart.verification.financial.bankName')}
          registerName="dm_penmit_07003"
          type="dropdown"
          errors={errors}
          control={control}
          options={financialInformationData?.bList?.map((item, index) => ({
            key: index,
            label: item.name,
            value: `${item.name}#${item.code}`
          }))}
          rounded={true}
          fullWidth={true}
        />
      </div>
      <div className="w-full flex justify-start items-center gap-2">
        <Typography className="font-poppins font-semibold md:text-xl text-base text-seeds-button-green">
          {t('danamart.verification.financial.sidInformation')}
        </Typography>
        <Image
          src={WarningGreenIcon}
          alt="WarningGreenIcon"
          width={20}
          height={20}
        />
      </div>
      <div
        className={
          watch('pernyataan') === '1'
            ? 'w-full flex flex-wrap md:flex-nowrap items-center gap-2'
            : ''
        }
      >
        <MInput
          label={t('danamart.verification.financial.doYouAlready')}
          registerName="pernyataan"
          type="dropdown"
          control={control}
          watch={watch}
          errors={errors}
          options={useConfirmShares()}
          rounded={true}
          fullWidth={true}
        />
        {watch('pernyataan') === '1' && (
          <MInput
            label={t('danamart.verification.financial.noSID')}
            registerName="dm_penmit_07008"
            register={register}
            type="text"
            errors={errors}
            onInput={e => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '');
            }}
            className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
          />
        )}
      </div>
      {watch('pernyataan') === '1' && (
        <div>
          <div className="w-full flex flex-wrap md:flex-nowrap justify-center items-start gap-2">
            <MInput
              label={t('danamart.verification.financial.monthYearRegis')}
              registerName="dm_penmit_07009"
              type="date"
              register={register}
              errors={errors}
              className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
            />
            <div className="w-full">
              <MInput
                label={t('danamart.verification.financial.accessCard')}
                registerName="fileKartuAkses"
                type="image"
                register={register}
                usePreview={false}
                fileType=".jpg,.jpeg"
                errors={errors}
                extraClasses="border border-[#BDBDBD] rounded-lg p-2 w-full"
              />
              {(
                (previewUrlfileKartuAkses !== null) && (previewUrlfileKartuAkses !== undefined) || 
                ((fileKartuAkses !== null) && (fileKartuAkses !== undefined))
              ) && (
                <div className='flex justify-between items-center'>
                  <div className='flex justify-start items-center gap-2 mt-2'>
                    <a
                      href={
                        previewUrlfileKartuAkses !== null && previewUrlfileKartuAkses !== undefined
                          ? previewUrlfileKartuAkses
                          : `https://dev.danamart.id/development/dm-scf-api/writable/uploads/${fileKartuAkses as string}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-start items-center"
                    >
                      <div className="flex gap-2 bg-[#E5EDFC] py-2 px-3 w-fit rounded-md">
                        <IoDocumentTextOutline className="w-6 h-6 flex-shrink-0 text-seeds-button-green" />
                        <Typography className="font-poppins font-medium text-seeds-button-green">
                          Preview document
                        </Typography>
                      </div>
                    </a>
                    <FaRegCheckCircle className="w-4 h-4 flex-shrink-0 text-seeds-button-green"/>
                  </div>
                  {
                    (previewUrlfileKartuAkses !== null && previewUrlfileKartuAkses !== undefined) &&
                      <FaRegTrashAlt
                        onClick={async() => { await handleRemoveAccessCard() }}
                        className="w-5 h-5 flex-shrink-0 text-[#DA2D1F] cursor-pointer"
                      />
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Typography className="font-poppins font-semibold md:text-xl text-base text-seeds-button-green">
        {t('danamart.verification.financial.beneficialInformation')}
      </Typography>
      <MInput
        label={t('danamart.verification.financial.isThereBeneficial')}
        registerName="bo_confirm"
        type="dropdown"
        control={control}
        errors={errors}
        options={useConfirmBeneficialOwner()}
        rounded={true}
        fullWidth={true}
      />
      {watch('bo_confirm') === 'Y' && (
        <>
          <div className="w-full flex flex-wrap md:flex-nowrap gap-2">
            <MInput
              label={t('danamart.verification.financial.fullName')}
              registerName="bo_nama"
              type="text"
              register={register}
              errors={errors}
              className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
              placeholder="John Doe"
            />
            <MInput
              label={t('danamart.verification.financial.gender')}
              registerName="bo_jns_kelamin"
              type="dropdown"
              control={control}
              errors={errors}
              options={gender}
              rounded={true}
              fullWidth={true}
            />
            <MInput
              label={t('danamart.verification.financial.identityNumber')}
              registerName="bo_no_identitas"
              type="text"
              register={register}
              errors={errors}
              onInput={e => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
              }}
              className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
              placeholder="01234"
            />
          </div>
          <div className="w-full flex flex-wrap md:flex-nowrap gap-2">
            <div className="w-full">
              <MInput
                label={t('danamart.verification.financial.fileIdentity')}
                registerName="fileIdentitas"
                type="image"
                register={register}
                usePreview={false}
                fileType=".jpg,.jpeg"
                errors={errors}
                extraClasses="border border-[#BDBDBD] rounded-lg p-2 w-full"
              />
              {(
                (previewUrlfileIdentitas !== null) && (previewUrlfileIdentitas !== undefined) || 
                ((fileIdentitas !== null) && (fileIdentitas !== undefined))
              ) && (
                <div className='flex justify-between items-center'>
                  <div className='flex justify-start items-center gap-2 mt-2'>
                    <a
                      href={
                        previewUrlfileIdentitas !== null && previewUrlfileIdentitas !== undefined
                          ? previewUrlfileIdentitas
                          : `https://dev.danamart.id/development/dm-scf-api/writable/uploads/${fileIdentitas as string}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-start items-center"
                    >
                      <div className="flex gap-2 bg-[#E5EDFC] py-2 px-3 w-fit rounded-md">
                        <IoDocumentTextOutline className="w-6 h-6 flex-shrink-0 text-seeds-button-green" />
                        <Typography className="font-poppins font-medium text-seeds-button-green">
                          Preview document
                        </Typography>
                      </div>
                    </a>
                    <FaRegCheckCircle className="w-4 h-4 flex-shrink-0 text-seeds-button-green"/>
                  </div>
                  {
                    (previewUrlfileIdentitas !== null && previewUrlfileIdentitas !== undefined) &&
                      <FaRegTrashAlt
                        onClick={async() => { await handleRemoveIdentityCard() }}
                        className="w-5 h-5 flex-shrink-0 text-[#DA2D1F] cursor-pointer"
                      />
                  }
                </div>
              )}
            </div>
            <MInput
              label={t('danamart.verification.financial.address')}
              registerName="bo_alamat"
              type="text"
              register={register}
              errors={errors}
              className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
              placeholder="Jl. Boulevard"
            />
            <MInput
              label={t('danamart.verification.financial.birthPlace')}
              registerName="bo_tmp_lahir"
              type="text"
              register={register}
              errors={errors}
              className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
              placeholder="Jakarta"
            />
          </div>
          <div className="w-full flex flex-wrap md:flex-nowrap gap-2">
            <MInput
              label={t('danamart.verification.financial.birthDate')}
              registerName="bo_tgl_lahir"
              type="date"
              register={register}
              errors={errors}
              className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
            />
            <MInput
              label={t('danamart.verification.financial.citizenship')}
              registerName="bo_kewarganegaraan"
              type="text"
              register={register}
              errors={errors}
              className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
              placeholder="Indonesia"
            />
            <MInput
              label={t('danamart.verification.financial.job')}
              registerName="bo_pekerjaan"
              type="dropdown"
              control={control}
              errors={errors}
              options={jobList}
              rounded={true}
              fullWidth={true}
            />
          </div>
          <div className="w-full flex flex-wrap md:flex-nowrap gap-2">
            <MInput
              label={t('danamart.verification.financial.jobAddress')}
              registerName="bo_alamat_pekerjaan"
              type="text"
              register={register}
              errors={errors}
              className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
              placeholder="Jl. Boulevard"
            />
            <MInput
              label={t('danamart.verification.financial.jobPhoneNumber')}
              registerName="bo_no_telp_pekerjaan"
              type="text"
              register={register}
              errors={errors}
              onInput={e => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
              }}
              className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
              placeholder="021"
            />
            <MInput
              label={t('danamart.verification.financial.biologicalMotherName')}
              registerName="bo_nama_ibu"
              type="text"
              register={register}
              errors={errors}
              className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
              placeholder="John Doi"
            />
          </div>
          <div className="w-full flex flex-wrap md:flex-nowrap gap-2">
            <MInput
              label={t('danamart.verification.financial.sourceOfFunds')}
              registerName="bo_sumber_dana"
              type="dropdown"
              errors={errors}
              rounded={true}
              options={income}
              fullWidth={true}
              control={control}
            />
            <MInput
              label={t('danamart.verification.financial.incomePerMonth')}
              registerName="bo_hasil_perbulan"
              control={control}
              watch={watch}
              type="number"
              errors={errors}
              prefix="Rp"
              placeholder="2.000.000"
            />
            <MInput
              label={t('danamart.verification.financial.investmentGoals')}
              registerName="bo_tujuan_invest"
              type="dropdown"
              errors={errors}
              rounded={true}
              options={investmentGoals}
              fullWidth={true}
              control={control}
            />
          </div>
          <div className="w-full flex flex-wrap md:flex-nowrap gap-2">
            <MInput
              label={t(
                'danamart.verification.financial.relationshipWithBeneficial'
              )}
              registerName="bo_hub_bo"
              type="text"
              register={register}
              errors={errors}
              className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
              placeholder="Director"
            />
            <MInput
              label={t('danamart.verification.financial.marriageStatus')}
              registerName="bo_status_perkawinan_bo"
              type="dropdown"
              errors={errors}
              rounded={true}
              options={marriageStatus}
              fullWidth={true}
              control={control}
            />
          </div>
          {watch('bo_status_perkawinan_bo') === 'married' && (
            <>
              <div className="w-full flex items-center gap-2">
                <Typography className="font-poppins font-normal text-base text-[#bdbdbd]">
                  Informasi Pernikahan
                </Typography>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <div className="w-full flex flex-wrap md:flex-nowrap gap-2">
                <MInput
                  label={t('danamart.verification.financial.partnerFullname')}
                  registerName="bo_relation_nama"
                  type="text"
                  register={register}
                  errors={errors}
                  className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
                  placeholder="Angel"
                />
                <MInput
                  label={t('danamart.verification.financial.gender')}
                  registerName="bo_relation_jns_kelamin"
                  type="dropdown"
                  control={control}
                  errors={errors}
                  options={gender}
                  rounded={true}
                  fullWidth={true}
                />
                <MInput
                  label={t('danamart.verification.financial.ktpNumber')}
                  registerName="bo_relation_no_ktp"
                  type="text"
                  register={register}
                  errors={errors}
                  onInput={e => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                  className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
                  placeholder="001122"
                />
              </div>
              <div className="w-full flex flex-wrap md:flex-nowrap gap-2">
                <div className="w-full">
                  <MInput
                    label={t('danamart.verification.financial.fileIdentity')}
                    registerName="fileKtp"
                    type="image"
                    register={register}
                    errors={errors}
                    usePreview={false}
                    fileType=".jpg,.jpeg"
                    extraClasses="border border-[#BDBDBD] rounded-lg p-2 w-full"
                  />
                  {(
                    (previewUrlfileKtp !== null) && (previewUrlfileKtp !== undefined) || 
                    ((fileKtp !== null) && (fileKtp !== undefined))
                  ) && (
                    <div className='flex justify-between items-center'>
                      <div className='flex justify-start items-center gap-2 mt-2'>
                        <a
                          href={
                            previewUrlfileKtp !== null && previewUrlfileKtp !== undefined
                              ? previewUrlfileKtp
                              : `https://dev.danamart.id/development/dm-scf-api/writable/uploads/${fileKtp as string}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex justify-start items-center"
                        >
                          <div className="flex gap-2 bg-[#E5EDFC] py-2 px-3 w-fit rounded-md">
                            <IoDocumentTextOutline className="w-6 h-6 flex-shrink-0 text-seeds-button-green" />
                            <Typography className="font-poppins font-medium text-seeds-button-green">
                              Preview document
                            </Typography>
                          </div>
                        </a>
                        <FaRegCheckCircle className="w-4 h-4 flex-shrink-0 text-seeds-button-green"/>
                      </div>
                      {
                        (previewUrlfileKtp !== null && previewUrlfileKtp !== undefined) &&
                          <FaRegTrashAlt
                            onClick={async() => { await handleRemoveIdCard() }}
                            className="w-5 h-5 flex-shrink-0 text-[#DA2D1F] cursor-pointer"
                          />
                      }
                    </div>
                  )}
                </div>
                <MInput
                  label={t('danamart.verification.financial.address')}
                  registerName="bo_relation_alamat"
                  type="text"
                  register={register}
                  errors={errors}
                  className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
                  placeholder="Jl. Boulevard"
                />
                <MInput
                  label={t('danamart.verification.financial.birthPlace')}
                  registerName="bo_relation_tempat_lahir"
                  type="text"
                  register={register}
                  errors={errors}
                  className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
                  placeholder="Jakarta"
                />
              </div>
              <div className="w-full flex flex-wrap md:flex-nowrap gap-2">
                <MInput
                  label={t('danamart.verification.financial.birthDate')}
                  registerName="bo_relation_tgl_lahir"
                  type="date"
                  register={register}
                  errors={errors}
                  className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
                />
                <MInput
                  label={t('danamart.verification.financial.citizenship')}
                  registerName="bo_relation_warga"
                  type="text"
                  register={register}
                  errors={errors}
                  className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
                  placeholder="Indonesia"
                />
                <MInput
                  label={t('danamart.verification.financial.job')}
                  registerName="bo_relation_pekerjaan"
                  type="dropdown"
                  control={control}
                  errors={errors}
                  options={jobList}
                  rounded={true}
                  fullWidth={true}
                />
              </div>
              <div className="w-full flex flex-wrap md:flex-nowrap gap-2">
                <MInput
                  label={t('danamart.verification.financial.jobAddress')}
                  registerName="bo_relation_alamat_kerja"
                  type="text"
                  register={register}
                  errors={errors}
                  className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
                  placeholder="Jl. Boulevard"
                />
                <MInput
                  label={t('danamart.verification.financial.jobPhoneNumber')}
                  registerName="bo_relation_no_telp_kerja"
                  type="text"
                  register={register}
                  errors={errors}
                  onInput={e => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                  className="px-4 font-normal text-base text-[#201B1C] border border-[#BDBDBD] rounded-lg"
                  placeholder="021"
                />
              </div>
            </>
          )}
        </>
      )}
      {(isLoading as boolean) && <Loading />}
      <div className="flex items-center justify-end">
        <Button
          className="w-[155.5px] h-[36px] px-4 py-2 text-sm font-semibold bg-seeds-button-green rounded-full capitalize mt-2"
          onClick={async() => {
            await handleSubmit(async (data: FinancialInfoForm) => {
              const result = await onSubmit(data);
              if (result?.statusCode === 200) {
                setStep(4)
              }
            })();
          }}
        >
          {t('danamart.verification.buttonSave')}
        </Button>
      </div>
      {showModal && (
        <ModalConfirmationForm
          onConfirm={() => {
            handleModalResponse(true);
          }}
          onCancel={() => {
            handleModalResponse(false);
          }}
          t={t}
        />
      )}
    </div>
  );
};

export default FinancialInformation;

