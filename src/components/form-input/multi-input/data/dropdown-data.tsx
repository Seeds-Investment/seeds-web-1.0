import { useTranslation } from "react-i18next";

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
      value: '0'
    },
    {
      key: 2,
      label: t(`${pathTranslation}.no`),
      value: '1'
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

export const gender = [
  {
    key: 1,
    label: 'Laki-laki',
    value: 'LAKI-LAKI'
  },
  {
    key: 2,
    label: 'Perempuan',
    value: 'PEREMPUAN'
  }
];

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
      value: 'Islam'
    },
    {
      key: 2,
      label: t(`${pathTranslation}.religion.text2`),
      value: 'Katolik'
    },
    {
      key: 3,
      label: t(`${pathTranslation}.religion.text3`),
      value: 'Protestan'
    },
    {
      key: 4,
      label: t(`${pathTranslation}.religion.text4`),
      value: 'Hindu'
    },
    {
      key: 5,
      label: t(`${pathTranslation}.religion.text5`),
      value: 'Budha'
    },
    {
      key: 6,
      label: t(`${pathTranslation}.religion.text6`),
      value: 'Konghucu'
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

export const useMarriage = (): ILabel[] => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.verification.accountInformation.dropdown';

  return [
    {
      key: 1,
      label: t(`${pathTranslation}.marriage.text1`),
      value: 'Belum Kawin'
    },
    {
      key: 2,
      label: t(`${pathTranslation}.marriage.text2`),
      value: 'Kawin'
    },
    {
      key: 3,
      label: t(`${pathTranslation}.marriage.text3`),
      value: 'Cerai Hidup'
    },
    {
      key: 4,
      label: t(`${pathTranslation}.marriage.text4`),
      value: 'Cerai Mati'
    }
  ];
};

export const useWorkingLength = (): ILabel[] => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.verification.accountInformation.dropdown';

  return [
    {
      key: 1,
      label: `0 - 1 ${t(`${pathTranslation}.workingLength.text1`)}`,
      value: '0 - 1 Tahun'
    },
    {
      key: 2,
      label: `1 - 3 ${t(`${pathTranslation}.workingLength.text2`)}`,
      value: '1 - 3 Tahun'
    },
    {
      key: 3,
      label: `3 - 5 ${t(`${pathTranslation}.workingLength.text2`)}`,
      value: '3 - 5 Tahun'
    },
    {
      key: 4,
      label: `5 - 10 ${t(`${pathTranslation}.workingLength.text2`)}`,
      value: '5 - 10 Tahun'
    },
    {
      key: 5,
      label: `${t(`${pathTranslation}.workingLength.text3`)} 10 ${t(
        `${pathTranslation}.workingLength.text1`
      )}`,
      value: 'Lebih dari 10 Tahun'
    }
  ];
};

export const useInvestingPlan = (): ILabel[] => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.verification.accountInformation.dropdown';

  return [
    {
      key: 1,
      label: t(`${pathTranslation}.plan.text1`),
      value: 'Dana Tabungan'
    },
    {
      key: 2,
      label: t(`${pathTranslation}.plan.text2`),
      value: 'Dana Pensiun'
    },
    {
      key: 3,
      label: t(`${pathTranslation}.plan.text3`),
      value: 'Dana Darurat'
    },
    {
      key: 4,
      label: t(`${pathTranslation}.plan.text4`),
      value: 'Modal Usaha'
    },
    {
      key: 5,
      label: t(`${pathTranslation}.plan.text5`),
      value: 'Lainnya'
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
      value: 'Media Sosial'
    },
    {
      key: 2,
      label: t(`${pathTranslation}.information.text2`),
      value: 'Iklan'
    },
    {
      key: 3,
      label: t(`${pathTranslation}.information.text3`),
      value: 'Teman'
    },
    {
      key: 4,
      label: t(`${pathTranslation}.information.text4`),
      value: 'Keluarga'
    },
    {
      key: 5,
      label: t(`${pathTranslation}.information.text5`),
      value: 'Website Danamart'
    },
    {
      key: 6,
      label: t(`${pathTranslation}.information.text6`),
      value: 'Lainnya'
    }
  ];
};

export const useIncome = (): ILabel[] => {
  const { t } = useTranslation();
  const path = 'danamart.verification.financial.listIncome'

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