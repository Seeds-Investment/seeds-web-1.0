import { useTranslation } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <div className="max-h-96 overflow-auto pr-4">
      <p className="text-center font-bold">
        {t(`termAndCondition.privacyPolicy.desc.header`)}
      </p>
      <p className="text-justify mt-10">
        {t(`termAndCondition.privacyPolicy.desc.p1`)}
      </p>
      <p className="text-justify mt-10">
        {t(`termAndCondition.privacyPolicy.desc.p2`)}
      </p>
      <p className="text-justify mt-10">
        {t(`termAndCondition.privacyPolicy.desc.guidelines_title`)}:
      </p>
      <div className="flex mt-2">
        <p className="mr-3">1.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.guidelines_1`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">2.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.guidelines_2`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">3.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.guidelines_3`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">4.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.guidelines_4`)}</p>
      </div>
      <p className="text-justify mt-10">
        {t(`termAndCondition.privacyPolicy.desc.prohibit_title`)}
      </p>
      <div className="flex mt-2">
        <p className="mr-3">1.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.prohibit_1`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">2.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.prohibit_2`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">3.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.prohibit_3`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">4.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.prohibit_4`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">5.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.prohibit_5`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">6.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.prohibit_6`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">7.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.prohibit_7`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">8.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.prohibit_8`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">9.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.prohibit_9`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">10.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.prohibit_10`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">11.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.prohibit_11`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">12.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.prohibit_12`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">13.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.prohibit_13`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">14.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.prohibit_14`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">15.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.prohibit_15`)}</p>
      </div>
      <p className="text-justify mt-10">
        {t(`termAndCondition.privacyPolicy.desc.policy_title`)}
      </p>
      <div className="flex mt-2">
        <p className="mr-3">1.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.policy_1`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">2.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.policy_2`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">3.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.policy_3`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">4.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.policy_4`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">5.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.policy_5`)}</p>
      </div>
      <div className="flex">
        <p className="mr-3">6.</p>
        <p>{t(`termAndCondition.privacyPolicy.desc.policy_6`)}</p>
      </div>
      <p className="text-justify mt-8">
        {t(`termAndCondition.privacyPolicy.desc.consequences`)}:
      </p>
      <p className="text-justify mt-5">
        {t(`termAndCondition.privacyPolicy.desc.consequences_desc`)}
      </p>
      <p className="text-justify mt-8">
        {t(`termAndCondition.privacyPolicy.desc.agreement`)}:
      </p>
      <p className="text-justify mt-5">
        {t(`termAndCondition.privacyPolicy.desc.agreement_desc`)}
      </p>
    </div>
  );
};

export default PrivacyPolicy;
