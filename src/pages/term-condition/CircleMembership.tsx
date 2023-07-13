import { useTranslation } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const CircleMembership = () => {
  const { t } = useTranslation();
  return (
    <div className="max-h-96 overflow-auto pr-4">
      <p className="text-center font-bold">
        {t(`termAndCondition.circleMembership.desc.header_1`)}
      </p>
      <p className="text-center font-bold">
        {t(`termAndCondition.circleMembership.desc.header_2`)}
      </p>
      <p className="text-justify mt-10">
        {t(`termAndCondition.circleMembership.desc.p1`)}
        <span className="font-bold">
          {t(`termAndCondition.circleMembership.desc.bold_1`)}
        </span>
        {t(`termAndCondition.circleMembership.desc.p2`)}
        <span className="font-bold">
          {t(`termAndCondition.circleMembership.desc.bold_2`)}
        </span>
        {t(`termAndCondition.circleMembership.desc.p3`)}
        <span className="font-bold">
          {t(`termAndCondition.circleMembership.desc.bold_3`)}
        </span>
        {t(`termAndCondition.circleMembership.desc.p4`)}
        <span className="font-bold">
          {t(`termAndCondition.circleMembership.desc.bold_3`)}
        </span>
        {t(`termAndCondition.circleMembership.desc.p5`)}
      </p>
      <p className="font-bold mt-8">
        {t(`termAndCondition.circleMembership.desc.service`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.circleMembership.desc.service_1`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.circleMembership.desc.service_2`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.circleMembership.desc.service_3`)}{' '}
        <span className="text-blue-400">
          {t(`termAndCondition.circleMembership.desc.blue_1`)}
        </span>{' '}
        {t(`termAndCondition.circleMembership.desc.service_4`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.circleMembership.desc.service_5`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.circleMembership.desc.service_6`)}
      </p>
      <p className="font-bold mt-8">
        {t(`termAndCondition.circleMembership.desc.responsibility`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.circleMembership.desc.responsibility_1`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.circleMembership.desc.responsibility_2`)}
      </p>
      <p className="font-bold mt-8">
        {t(`termAndCondition.circleMembership.desc.commision_title`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.circleMembership.desc.commision_1`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.circleMembership.desc.commision_2`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.circleMembership.desc.commision_3`)}
      </p>
      <p className="mt-2 text-justify">
        <mark>{t(`termAndCondition.circleMembership.desc.commision_4`)}</mark>
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.circleMembership.desc.commision_5`)}
      </p>
      <p className="font-bold mt-8">
        {t(`termAndCondition.circleMembership.desc.protection_title`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.circleMembership.desc.protection_1`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.circleMembership.desc.protection_2`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.circleMembership.desc.protection_3`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.circleMembership.desc.protection_4`)}
      </p>
      <p className="font-bold mt-8">
        {t(`termAndCondition.circleMembership.desc.intellectual`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.circleMembership.desc.intellectual_desc`)}
      </p>
      <p className="font-bold mt-8">
        {t(`termAndCondition.circleMembership.desc.limitation`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.circleMembership.desc.limitation_desc`)}
      </p>
      <p className="font-bold mt-8">
        {t(`termAndCondition.circleMembership.desc.termination`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.circleMembership.desc.termination_1`)}
      </p>
      <p className="mt-2 text-justify">
        {t(`termAndCondition.circleMembership.desc.termination_1`)}
      </p>
      <p className="font-bold mt-8">
        {t(`termAndCondition.circleMembership.desc.governing_law`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.circleMembership.desc.governing_law_desc`)}
      </p>
      <p className="font-bold mt-8">
        {t(`termAndCondition.circleMembership.desc.dispute_settlemet`)}
      </p>
      <p className="text-justify">
        {t(`termAndCondition.circleMembership.desc.dispute_settlemet_desc`)}
      </p>
    </div>
  );
};

export default CircleMembership;
