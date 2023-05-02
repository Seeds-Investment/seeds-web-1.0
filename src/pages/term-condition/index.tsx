import CAccordion from '@/components/CAccordion';
import Container from '@/components/Container';
import { useTranslation } from 'react-i18next';
import id from '../../../public/locales/id';
import CircleMembership from './CircleMembership';
import PrivacyPolicy from './PrivacyPolicy';
import TermsConditions from './TermsConditions';

export default function Login(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <div>
      <Container>
        <p className="font-bold text-2xl mt-8">Legal</p>
        <div className="mt-4">
          {Object.keys(id.termAndCondition)
            ?.filter((k, i) => i > 1)
            .map((key, idx) => (
              <CAccordion
                key={key}
                title={t(`termAndCondition.${key}.title`)}
                description={
                  key === 'tnc' ? (
                    <TermsConditions />
                  ) : key === 'privacyPolicy' ? (
                    <PrivacyPolicy />
                  ) : (
                    <CircleMembership />
                  )
                }
              />
            ))}
        </div>
      </Container>
    </div>
  );
}
