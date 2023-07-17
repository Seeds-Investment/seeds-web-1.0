import { useTranslation } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const TermsConditions = () => {
  const { t } = useTranslation();
  return (
    <div className="max-h-96 overflow-auto pr-4">
      <p className="text-center font-bold">
        {t(`termAndCondition.tnc.desc.header`)}
      </p>
      <p className="text-justify mt-10">{t(`termAndCondition.tnc.desc.p1`)}</p>
      <p className="font-bold mt-8">
        {t(`termAndCondition.tnc.desc.definition`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.tnc.desc.definition_1`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.tnc.desc.definition_2`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.tnc.desc.definition_3`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.tnc.desc.definition_4`)}
      </p>
      <p className="font-bold mt-8">
        {t(`termAndCondition.tnc.desc.statement`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.tnc.desc.statement_desc`)}
      </p>
      <p className="font-bold mt-8">{t(`termAndCondition.tnc.desc.service`)}</p>
      <p className="text-justify">{t(`termAndCondition.tnc.desc.service_1`)}</p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.tnc.desc.service_2`)}:
      </p>
      <div className="flex items-center">
        <div className="rounded-full w-2 h-2 border mr-3 ml-8 border-solid border-black"></div>
        <p>{t(`termAndCondition.tnc.desc.service_sub_1`)}</p>
      </div>
      <div className="flex items-center">
        <div className="rounded-full w-2 h-2 border mr-3 ml-8 border-solid border-black"></div>
        <p>{t(`termAndCondition.tnc.desc.service_sub_2`)}</p>
      </div>
      <div className="flex items-center">
        <div className="rounded-full w-2 h-2 border mr-3 ml-8 border-solid border-black"></div>
        <p>{t(`termAndCondition.tnc.desc.service_sub_3`)}</p>
      </div>
      <div className="flex items-center">
        <div className="rounded-full w-2 h-2 border mr-3 ml-8 border-solid border-black"></div>
        <p>{t(`termAndCondition.tnc.desc.service_sub_4`)}</p>
      </div>
      <p className="mt-8 font-bold">
        {t(`termAndCondition.tnc.desc.guideline`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.tnc.desc.guideline_1`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.tnc.desc.guideline_2`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.tnc.desc.guideline_3`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.tnc.desc.guideline_4`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.tnc.desc.guideline_5`)}
      </p>
      <p className="mt-8 font-bold">
        {t(`termAndCondition.tnc.desc.personal_data`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.tnc.desc.personal_data_1`)}{' '}
        <span className="text-blue-400">
          {t(`termAndCondition.tnc.desc.personal_data_blue`)}
        </span>
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.tnc.desc.personal_data_2`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.tnc.desc.personal_data_3`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.tnc.desc.personal_data_4`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.tnc.desc.personal_data_5`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.tnc.desc.personal_data_6`)}:
      </p>
      <div className="flex items-start mt-1">
        <div className="rounded-full w-4 h-2 border mr-3 ml-4 border-solid border-black"></div>
        <p className="-mt-1">
          {t(`termAndCondition.tnc.desc.personal_data_sub_1`)}
        </p>
      </div>
      <div className="flex items-start mt-1">
        <div className="rounded-full w-4 h-2 border mr-3 ml-4 border-solid border-black "></div>
        <p className="-mt-1">
          {t(`termAndCondition.tnc.desc.personal_data_sub_2`)}
        </p>
      </div>
      <div className="flex items-center">
        <div className="rounded-full w-3 h-2 border mr-3 ml-4 border-solid border-black"></div>
        <p>{t(`termAndCondition.tnc.desc.personal_data_sub_3`)}</p>
      </div>
      <p className="mt-8 text-justify">
        {t(`termAndCondition.tnc.desc.personal_data_7`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.tnc.desc.personal_data_8`)}
      </p>
      <p className="mt-8 font-bold">
        {t(`termAndCondition.tnc.desc.liability`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.tnc.desc.liability_1`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.tnc.desc.liability_2`)}
      </p>
      <p className="mt-8 font-bold">
        {t(`termAndCondition.tnc.desc.subject_policy`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.tnc.desc.subject_policy_desc`)}{' '}
      </p>
      <p className="mt-8 font-bold">
        {t(`termAndCondition.tnc.desc.intellectual`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.tnc.desc.intellectual_desc`)}
      </p>
      <p className="mt-8 font-bold">
        {t(`termAndCondition.tnc.desc.temporary`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.tnc.desc.temporary_desc`)}
      </p>
      <p className="mt-8 font-bold">
        {t(`termAndCondition.tnc.desc.termination`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.tnc.desc.termination_desc`)}
      </p>
      <p className="mt-8 font-bold">
        {t(`termAndCondition.tnc.desc.disclaimer`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.tnc.desc.disclaimer_desc`)}
      </p>
      <p className="mt-8 font-bold">
        {t(`termAndCondition.tnc.desc.governing_law`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.tnc.desc.governing_law_desc`)}
      </p>
      <p className="mt-8 font-bold">
        {t(`termAndCondition.tnc.desc.variance`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.tnc.desc.variance_desc`)}
      </p>
      <p className="mt-8 font-bold">
        {t(`termAndCondition.tnc.desc.dispute_settlement`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.tnc.desc.dispute_settlement_desc`)}
      </p>
    </div>
  );
};

export default TermsConditions;
