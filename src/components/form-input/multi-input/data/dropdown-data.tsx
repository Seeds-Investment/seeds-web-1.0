import { useTranslation } from 'react-i18next';

interface ILabel {
  key: number;
  label: string;
  value: string;
}

export const useAnswer = (): ILabel[] => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.verification.accountInformation.dropdown';

  return [
    {
      key: 1,
      label: t(`${pathTranslation}.yes`),
      value: 'Ya'
    },
    {
      key: 2,
      label: t(`${pathTranslation}.no`),
      value: 'Tidak'
    }
  ];
};

export const useDeclarationsStatement = (): ILabel[] => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.verification.accountInformation.dropdown';

  return [
    {
      key: 1,
      label: t(`${pathTranslation}.yes`),
      value: '1'
    },
    {
      key: 2,
      label: t(`${pathTranslation}.no`),
      value: '2'
    }
  ];
};

export const useDeclarationsNPWP = (): ILabel[] => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.verification.accountInformation.dropdown';

  return [
    {
      key: 1,
      label: t(`${pathTranslation}.yes`),
      value: '1'
    },
    {
      key: 2,
      label: t(`${pathTranslation}.no`),
      value: '0'
    }
  ];
};

export const useConfirmShares = (): ILabel[] => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.verification.accountInformation.dropdown';

  return [
    {
      key: 1,
      label: t(`${pathTranslation}.yes`),
      value: '1'
    },
    {
      key: 2,
      label: t(`${pathTranslation}.no`),
      value: '0'
    }
  ];
};

export const useConfirmBeneficialOwner = (): ILabel[] => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.verification.accountInformation.dropdown';

  return [
    {
      key: 1,
      label: t(`${pathTranslation}.yes`),
      value: 'Y'
    },
    {
      key: 2,
      label: t(`${pathTranslation}.no`),
      value: 'N'
    }
  ];
};

export const useGender = (): ILabel[] => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.verification.accountInformation.dropdown';

  return [
    {
      key: 1,
      label: t(`${pathTranslation}.male`),
      value: 'LAKI-LAKI'
    },
    {
      key: 2,
      label: t(`${pathTranslation}.female`),
      value: 'PEREMPUAN'
    }
  ];
};

export const useReligion = (): ILabel[] => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.verification.accountInformation.dropdown';

  return [
    {
      key: 1,
      label: t(`${pathTranslation}.religion.text1`),
      value: 'ISLAM'
    },
    {
      key: 2,
      label: t(`${pathTranslation}.religion.text2`),
      value: 'KATOLIK'
    },
    {
      key: 3,
      label: t(`${pathTranslation}.religion.text3`),
      value: 'PROTESTAN'
    },
    {
      key: 4,
      label: t(`${pathTranslation}.religion.text4`),
      value: 'HINDU'
    },
    {
      key: 5,
      label: t(`${pathTranslation}.religion.text5`),
      value: 'BUDHA'
    },
    {
      key: 6,
      label: t(`${pathTranslation}.religion.text6`),
      value: 'KONGHUCU'
    }
  ];
};

export const useLastEducation = (): ILabel[] => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.verification.accountInformation.dropdown';

  return [
    {
      key: 1,
      label: t(`${pathTranslation}.education.text1`),
      value: 'Strata III'
    },
    {
      key: 2,
      label: t(`${pathTranslation}.education.text2`),
      value: 'Strata II'
    },
    {
      key: 3,
      label: t(`${pathTranslation}.education.text3`),
      value: 'Strata I / Diploma IV'
    },
    {
      key: 4,
      label: t(`${pathTranslation}.education.text4`),
      value: 'Diploma III / Akademi'
    },
    {
      key: 5,
      label: t(`${pathTranslation}.education.text5`),
      value: 'SLTA / Sederajat'
    },
    {
      key: 6,
      label: t(`${pathTranslation}.education.text6`),
      value: 'SLTP / Sederajat'
    },
    {
      key: 7,
      label: t(`${pathTranslation}.education.text7`),
      value: 'SD / Sederajat'
    }
  ];
};

export const useWorkingLength = (): ILabel[] => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.verification.accountInformation.dropdown';

  return [
    {
      key: 1,
      label: `<1 ${t(`${pathTranslation}.workingLength.text1`)}`,
      value: '<1 year'
    },
    {
      key: 2,
      label: `1 - <2 ${t(`${pathTranslation}.workingLength.text2`)}`,
      value: '1 - <2 years'
    },
    {
      key: 3,
      label: `2 - 3 ${t(`${pathTranslation}.workingLength.text2`)}`,
      value: '2 - 3 years'
    },
    {
      key: 4,
      label: `>3 ${t(`${pathTranslation}.workingLength.text2`)}`,
      value: '>3 years'
    }
  ];
};

export const useDanamartInformation = (): ILabel[] => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.verification.accountInformation.dropdown';

  return [
    {
      key: 1,
      label: t(`${pathTranslation}.information.text1`),
      value: 'Search Engine'
    },
    {
      key: 2,
      label: t(`${pathTranslation}.information.text2`),
      value: 'Instagram'
    },
    {
      key: 3,
      label: t(`${pathTranslation}.information.text3`),
      value: 'Facebook'
    },
    {
      key: 4,
      label: t(`${pathTranslation}.information.text4`),
      value: 'Tiktok'
    },
    {
      key: 5,
      label: t(`${pathTranslation}.information.text5`),
      value: 'Youtube'
    },
    {
      key: 6,
      label: t(`${pathTranslation}.information.text6`),
      value: 'Referral'
    },
    {
      key: 7,
      label: t(`${pathTranslation}.information.text7`),
      value: 'Event'
    },
    {
      key: 8,
      label: t(`${pathTranslation}.information.text8`),
      value: 'News'
    },
    {
      key: 9,
      label: t(`${pathTranslation}.information.text9`),
      value: 'Radio'
    },
    {
      key: 10,
      label: t(`${pathTranslation}.information.text10`),
      value: 'Lainnya'
    }
  ];
};

export const useIncome = (): ILabel[] => {
  const { t } = useTranslation();
  const path = 'danamart.verification.financial.listIncome';

  return [
    {
      key: 1,
      label: t(`${path}.salary`),
      value: 'Gaji'
    },
    {
      key: 2,
      label: t(`${path}.profit`),
      value: 'Keuntungan'
    },
    {
      key: 3,
      label: t(`${path}.husbandOrParent`),
      value: 'Suami / Orang Tua'
    },
    {
      key: 4,
      label: t(`${path}.other`),
      value: 'Lainnya'
    }
  ];
};

export const useMarriageStatus = (): ILabel[] => {
  const { t } = useTranslation();
  const path = 'danamart.verification.financial.marriageStatusList';

  return [
    {
      key: 1,
      label: t(`${path}.single`),
      value: 'single'
    },
    {
      key: 2,
      label: t(`${path}.married`),
      value: 'married'
    }
  ];
};

export const useInvestmentGoals = (): ILabel[] => {
  const { t } = useTranslation();
  const path = 'danamart.verification.financial.investmentGoalsList';

  return [
    {
      key: 1,
      label: t(`${path}.longTermInvest`),
      value: 'Investasi Jangka Panjang'
    },
    {
      key: 2,
      label: t(`${path}.shortTermInvest`),
      value: 'Investasi Jangka Pendek'
    },
    {
      key: 3,
      label: t(`${path}.speculation`),
      value: 'Spekulasi'
    },
    {
      key: 4,
      label: t(`${path}.income`),
      value: 'Pendapatan'
    },
    {
      key: 5,
      label: t(`${path}.other`),
      value: 'Lainnya'
    }
  ];
};

export const useJobList = (): ILabel[] => {
  const { t } = useTranslation();
  const path = 'danamart.verification.financial.jobList';

  return [
    {
      key: 1,
      label: t(`${path}.governmentEmployee`),
      value: 'GOVERNMENT_EMPLOYEE'
    },
    {
      key: 2,
      label: t(`${path}.privateSectorEmployee`),
      value: 'PRIVATE_SECTOR_EMPLOYEE'
    },
    {
      key: 3,
      label: t(`${path}.stateOwnedEnterpriseEmployee`),
      value: 'STATE_OWNED_ENTERPRISE_EMPLOYEE'
    },
    {
      key: 4,
      label: t(`${path}.nationalMilitaryOrPoliceOfficer`),
      value: 'NATIONAL_MILITARY_OR_POLICE_OFFICER'
    },
    {
      key: 5,
      label: t(`${path}.businessOwner`),
      value: 'BUSINESS_OWNER'
    },
    {
      key: 6,
      label: t(`${path}.trader`),
      value: 'TRADER'
    },
    {
      key: 7,
      label: t(`${path}.farmerOrFisherman`),
      value: 'FARMER_OR_FISHERMAN'
    },
    {
      key: 8,
      label: t(`${path}.student`),
      value: 'STUDENT'
    },
    {
      key: 9,
      label: t(`${path}.housewife`),
      value: 'HOUSEWIFE'
    },
    {
      key: 10,
      label: t(`${path}.unemployed`),
      value: 'UNEMPLOYED'
    },
    {
      key: 11,
      label: t(`${path}.employee`),
      value: 'EMPLOYEE'
    },
    {
      key: 12,
      label: t(`${path}.entrepreneur`),
      value: 'ENTREPRENEUR'
    },
    {
      key: 13,
      label: t(`${path}.stateOfficial`),
      value: 'STATE_OFFICIAL'
    },
    {
      key: 14,
      label: t(`${path}.accountant`),
      value: 'ACCOUNTANT'
    },
    {
      key: 15,
      label: t(`${path}.lawyerOrNotary`),
      value: 'LAWYER_OR_NOTARY'
    },
    {
      key: 16,
      label: t(`${path}.profession`),
      value: 'PROFESSION'
    },
    {
      key: 17,
      label: t(`${path}.retiree`),
      value: 'RETIREE'
    },
    {
      key: 18,
      label: t(`${path}.privateLecturerOrTeacher`),
      value: 'PRIVATE_LECTURER_OR_TEACHER'
    },
    {
      key: 19,
      label: t(`${path}.publicLecturerOrTeacher`),
      value: 'PUBLIC_LECTURER_OR_TEACHER'
    },
    {
      key: 20,
      label: t(`${path}.doctor`),
      value: 'DOCTOR'
    }
  ];
};

export const useJobDetailList = (): ILabel[] => {
  const { t } = useTranslation();
  const path =
    'danamart.verification.accountInformation.dropdown.jobDetailList';

  return [
    {
      key: 1,
      label: t(`${path}.text1`),
      value: 'Alas Kaki'
    },
    {
      key: 2,
      label: t(`${path}.text2`),
      value: 'Asuransi'
    },
    {
      key: 3,
      label: t(`${path}.text3`),
      value: 'Bank'
    },
    {
      key: 4,
      label: t(`${path}.text4`),
      value: 'Elektronik dan Komponennya'
    },
    {
      key: 5,
      label: t(`${path}.text5`),
      value: 'Energi'
    },
    {
      key: 6,
      label: t(`${path}.text6`),
      value: 'Garmen, Tekstil'
    },
    {
      key: 7,
      label: t(`${path}.text7`),
      value: 'Iklan, Percetakan dan Media'
    },
    {
      key: 8,
      label: t(`${path}.text8`),
      value: 'Institusi Keuangan'
    },
    {
      key: 9,
      label: t(`${path}.text9`),
      value: 'Jalan Tol, Bandara dan Pelabuhan'
    },
    {
      key: 10,
      label: t(`${path}.text10`),
      value: 'Kabel'
    },
    {
      key: 11,
      label: t(`${path}.text11`),
      value: 'Kayu'
    },
    {
      key: 12,
      label: t(`${path}.text12`),
      value: 'Keramik, Kaca atau Porselain'
    },
    {
      key: 13,
      label: t(`${path}.text13`),
      value: 'Kertas'
    },
    {
      key: 14,
      label: t(`${path}.text14`),
      value: 'Kimia'
    },
    {
      key: 15,
      label: t(`${path}.text15`),
      value: 'Konstruksi Bangunan'
    },
    {
      key: 16,
      label: t(`${path}.text16`),
      value: 'Konstruksi Non-Bangunan'
    },
    {
      key: 17,
      label: t(`${path}.text17`),
      value: 'Kosmetik dan Rumah Tangga'
    },
    {
      key: 18,
      label: t(`${path}.text18`),
      value: 'Layanan Komputer'
    },
    {
      key: 19,
      label: t(`${path}.text19`),
      value: 'Makanan dan Minuman'
    },
    {
      key: 20,
      label: t(`${path}.text20`),
      value: 'Mesin dan Alat Berat'
    },
    {
      key: 21,
      label: t(`${path}.text21`),
      value: 'Obat-obatan'
    },
    {
      key: 22,
      label: t(`${path}.text22`),
      value: 'Otomotif dan Komponennya'
    },
    {
      key: 23,
      label: t(`${path}.text23`),
      value: 'Pakan Ternak'
    },
    {
      key: 24,
      label: t(`${path}.text24`),
      value: 'Pariwisata, Hotel dan Restauran'
    },
    {
      key: 25,
      label: t(`${path}.text25`),
      value: 'Pendidikan'
    },
    {
      key: 26,
      label: t(`${path}.text26`),
      value: 'Peralatan Rumah Tangga'
    },
    {
      key: 27,
      label: t(`${path}.text27`),
      value: 'Perikanan'
    },
    {
      key: 28,
      label: t(`${path}.text28`),
      value: 'Perkebunan'
    },
    {
      key: 29,
      label: t(`${path}.text29`),
      value: 'Pertambangan Batu/Pasir'
    },
    {
      key: 30,
      label: t(`${path}.text30`),
      value: 'Pertambangan Batubara'
    },
    {
      key: 31,
      label: t(`${path}.text31`),
      value: 'Pertambangan Gas Alam'
    },
    {
      key: 32,
      label: t(`${path}.text32`),
      value: 'Pertambangan Logam dan Mineral'
    },
    {
      key: 33,
      label: t(`${path}.text33`),
      value: 'Perumahan dan Property'
    },
    {
      key: 34,
      label: t(`${path}.text34`),
      value: 'Perusahaan Grosir'
    },
    {
      key: 35,
      label: t(`${path}.text35`),
      value: 'Perusahaan Investasi'
    },
    {
      key: 36,
      label: t(`${path}.text36`),
      value: 'Perusahaan Retail'
    },
    {
      key: 37,
      label: t(`${path}.text37`),
      value: 'Perusahaan Sekuritas'
    },
    {
      key: 38,
      label: t(`${path}.text38`),
      value: 'Plastik dan Kemasan'
    },
    {
      key: 39,
      label: t(`${path}.text39`),
      value: 'Produk Logam'
    },
    {
      key: 40,
      label: t(`${path}.text40`),
      value: 'Pusat Kesehatan'
    },
    {
      key: 41,
      label: t(`${path}.text41`),
      value: 'Semen'
    },
    {
      key: 42,
      label: t(`${path}.text42`),
      value: 'Tanaman'
    },
    {
      key: 43,
      label: t(`${path}.text43`),
      value: 'Telekomunikasi'
    },
    {
      key: 44,
      label: t(`${path}.text44`),
      value: 'Tembakau'
    },
    {
      key: 45,
      label: t(`${path}.text45`),
      value: 'Transportasi'
    },
    {
      key: 46,
      label: t(`${path}.text46`),
      value: 'Lainnya'
    }
  ];
};

export const useCashSource = (): ILabel[] => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.purchase.form.sourceCash';

  return [
    {
      key: 1,
      label: t(`${pathTranslation}.text2`),
      value: 'DanaCash'
    },
    {
      key: 2,
      label: t(`${pathTranslation}.text3`),
      value: 'TransferDana'
    }
  ];
};

export const useBankName = (): ILabel[] => {
  return [
    {
      key: 1,
      label: 'VA BCA (Max. Rp 50.000.000,-)',
      value: 'BCA'
    },
    {
      key: 2,
      label: 'VA Permata (Max. Rp 9.000.000,-)',
      value: 'PERMATA'
    },
    {
      key: 3,
      label: 'VA Mandiri (Max. Rp 50.000.000,-)',
      value: 'MANDIRI'
    },
    {
      key: 4,
      label: 'VA BNI (Max. Rp 50.000.000,-)',
      value: 'BNI'
    },
    {
      key: 5,
      label: 'VA BRI (Max. Rp 50.000.000,-)',
      value: 'BRI'
    }
  ];
};

export const useFormatFile = (): ILabel[] => {
  return [
    {
      key: 1,
      label: 'PDF',
      value: 'pdf'
    },
    {
      key: 2,
      label: 'Excel',
      value: 'excel'
    }
  ];
};
